# ⚙️ Security Configuration Guide

**Last Updated:** January 27, 2026

---

## 📋 Environment Variables Setup

Create a `.env.local` file in your project root with these security configurations:

```bash
# ============================================
# JWT Authentication
# ============================================
JWT_SECRET=your-super-secret-key-min-32-chars-randomize-it
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars-randomize-it
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# ============================================
# Supabase Configuration
# ============================================
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret

# ============================================
# API Configuration
# ============================================
API_URL=http://localhost:3000/api
API_TIMEOUT=30000

# ============================================
# Frontend URLs
# ============================================
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# ============================================
# Security
# ============================================
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourdomain.com
NODE_ENV=development
LOG_LEVEL=debug
LOG_FILE=./logs/app.log

# ============================================
# Optional: 2FA & Email
# ============================================
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password

# Optional: Rate Limiting with Redis
REDIS_URL=redis://localhost:6379

# ============================================
# File Upload
# ============================================
MAX_FILE_SIZE=10485760
UPLOAD_FOLDER=./uploads
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf

# ============================================
# Encryption (Optional)
# ============================================
ENCRYPTION_KEY=your-32-byte-encryption-key-in-hex
```

---

## 🔐 How to Generate Secure Secrets

### Generate JWT Secrets (Node.js)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this command twice to get JWT_SECRET and JWT_REFRESH_SECRET.

### Generate Encryption Key (Node.js)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🛠️ Backend Express Setup

```typescript
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';

// Import security middleware
import {
  securityHeadersMiddleware,
  corsMiddleware,
} from './security/middleware/securityHeaders';
import { authMiddleware } from './security/middleware/auth';
import { errorHandler, notFoundHandler, asyncHandler } from './security/middleware/errorHandler';
import {
  rateLimitMiddleware,
  loginLimiter,
  apiLimiter,
} from './security/middleware/rateLimitMiddleware';

const app = express();

// ============================================
// 1. Middleware Setup
// ============================================

// Trust proxy (for X-Forwarded-For header)
app.set('trust proxy', 1);

// Parse cookies
app.use(cookieParser());

// Parse JSON with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Security headers
app.use(securityHeadersMiddleware);

// Helmet for additional security headers
app.use(helmet());

// CORS
app.use(corsMiddleware);

// Rate limiting (global)
app.use('/api/', rateLimitMiddleware(apiLimiter, 'api'));

// ============================================
// 2. Supabase Setup
// ============================================

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role on backend
);

// ============================================
// 3. Routes
// ============================================

// Login endpoint (with strict rate limiting)
app.post('/api/auth/login',
  rateLimitMiddleware(loginLimiter, 'login'),
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate input (server-side)
    if (!email || !password) {
      return res.status(400).json({
        error: { message: 'Email and password required' },
      });
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        error: { message: 'Invalid credentials' },
      });
    }

    // Get user role
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .single();

    // Generate JWT tokens
    const { generateTokens, setTokenCookies } = require('./security/middleware/auth');
    const { accessToken, refreshToken } = generateTokens(
      data.user.id,
      data.user.email!,
      userRole?.role || 'user'
    );

    // Set secure httpOnly cookies
    setTokenCookies(res, accessToken, refreshToken);

    res.json({ success: true });
  })
);

// Protected route
app.get('/api/protected',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    res.json({ user: req.user });
  })
);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// ============================================
// 4. Start Server
// ============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
```

---

## ⚛️ Frontend React Setup

```typescript
// src/utils/api.ts - Secure API Client

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = new URL(
      endpoint,
      process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
    );

    const response = await fetch(url.href, {
      ...options,
      credentials: 'include', // Include httpOnly cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired - redirect to login
        window.location.href = '/login';
      }
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  },

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },
};

// Usage:
// const user = await apiClient.get('/auth/me');
// await apiClient.post('/posts', { title: 'New Post' });
```

---

## 🗄️ Supabase Storage Rules

Create a `storage-rules.json`:

```json
{
  "rules": [
    {
      "bucket": "user-uploads",
      "object": "users/{uid}/*",
      "allow": "authenticated",
      "select": true,
      "insert": true,
      "update": true,
      "delete": true
    }
  ]
}
```

---

## 📋 CORS Configuration Details

```typescript
// Allowed origins
const ALLOWED_ORIGINS = [
  // Development
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  
  // Production
  'https://yourdomain.com',
  'https://www.yourdomain.com',
  'https://admin.yourdomain.com',
];

// Allowed methods
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

// Allowed headers
const ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
];

// Expose headers to client
const EXPOSE_HEADERS = [
  'Content-Type',
  'X-RateLimit-Limit',
  'X-RateLimit-Remaining',
  'X-RateLimit-Reset',
];
```

---

## 🔐 Security Headers Details

### Content-Security-Policy (CSP)

```
default-src 'self'                    # Only from same origin
script-src 'self' 'unsafe-inline'     # Scripts from self
style-src 'self' 'unsafe-inline'      # Styles from self
img-src 'self' data: https:           # Images from self + HTTPS
font-src 'self'                       # Fonts from self
connect-src 'self' https:             # API calls to self + HTTPS
frame-ancestors 'none'                # Cannot be framed
base-uri 'self'                       # Base URLs from self
form-action 'self'                    # Form submissions to self
```

### Strict-Transport-Security (HSTS)

```
max-age=31536000                      # 1 year
includeSubDomains                     # Include subdomains
preload                               # Preload list
```

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

1. **Environment Variables**
   - [ ] JWT secrets are unique and random
   - [ ] Supabase service role key is private
   - [ ] API URLs are production URLs
   - [ ] LOG_LEVEL is set to `warn` or `error`

2. **Security Settings**
   - [ ] NODE_ENV is set to `production`
   - [ ] Secure flag enabled in cookies
   - [ ] HTTPS enforced
   - [ ] HSTS enabled with preload
   - [ ] CSP headers configured

3. **Database**
   - [ ] RLS policies enabled
   - [ ] All sensitive tables have policies
   - [ ] Service role key never exposed to client

4. **Logging**
   - [ ] Logging to file enabled
   - [ ] Log rotation configured
   - [ ] Sensitive data not logged
   - [ ] Error logs monitored

5. **Rate Limiting**
   - [ ] Rate limiters enabled
   - [ ] Limits are appropriate
   - [ ] Redis setup (if distributed)

6. **Testing**
   - [ ] Security tests passing
   - [ ] Integration tests passing
   - [ ] No console errors in production build

---

## 🚨 Troubleshooting

### CORS Errors

**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
1. Verify origin is in `ALLOWED_ORIGINS`
2. Verify `credentials: 'include'` in fetch
3. Check that `Access-Control-Allow-Credentials: true` is set

### Authentication Failures

**Problem:** `Unauthorized: No token provided`

**Solution:**
1. Verify cookies are being sent
2. Check `credentials: 'include'` in API calls
3. Verify JWT secret matches between client and server

### Rate Limiting

**Problem:** `429 Too Many Requests`

**Solution:**
1. Wait for the time specified in `Retry-After` header
2. Check if legitimate traffic is being rate-limited
3. Adjust rate limit thresholds if needed

---

## 📚 Additional Resources

- [Express.js Security Checklist](https://expressjs.com/en/advanced/best-practice-security.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security](https://supabase.com/docs/guides/security)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

**Keep your secrets secret and your code secure!** 🔐
