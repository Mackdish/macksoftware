# 🔐 Security Implementation Checklist

**Project:** Build-a-Lead Admin Dashboard  
**Last Updated:** January 27, 2026  
**Status:** Ready for Implementation

---

## ✅ Phase 1: Authentication & Authorization (Week 1)

### JWT & Token Management
- [ ] Set up JWT secret keys in `.env`
  - `JWT_SECRET` for access tokens
  - `JWT_REFRESH_SECRET` for refresh tokens
  - Use strong random values (minimum 32 characters)
- [ ] Implement `generateTokens()` function
- [ ] Implement `setTokenCookies()` with httpOnly flag
- [ ] Implement `clearTokenCookies()` for logout
- [ ] Create login endpoint that validates credentials
- [ ] Create logout endpoint that clears cookies
- [ ] Create refresh endpoint to get new access tokens
- [ ] Test token generation and validation

### Session Management
- [ ] Access tokens expire in 15 minutes
- [ ] Refresh tokens expire in 7 days
- [ ] Cookies are httpOnly (cannot be accessed by JS)
- [ ] Cookies are Secure (HTTPS only in production)
- [ ] Cookies have SameSite=Strict (CSRF protection)
- [ ] Expired tokens trigger redirect to login
- [ ] Refresh token rotation on each use

### Role-Based Access Control
- [ ] Create `user_roles` table in Supabase
  - Columns: `user_id`, `role` (admin/user), `created_at`
- [ ] Implement `requireRole()` middleware
- [ ] Implement `requireRoles()` middleware
- [ ] Verify admin status in authorization header
- [ ] Route protection on `/admin/*` pages
- [ ] Hide admin UI elements from non-admin users
- [ ] Test access to protected routes

---

## ✅ Phase 2: Input Validation & Sanitization (Week 1-2)

### Frontend Validation
- [ ] Install `zod` package for schema validation
- [ ] Create validation schemas for all forms
  - Login form
  - Registration form
  - Blog post form
  - User profile form
  - File upload form
  - Contact form
  - Search form
- [ ] Implement form validation using React Hook Form + Zod
- [ ] Show validation errors to users
- [ ] Prevent form submission with invalid data
- [ ] Test each validation schema

### Backend Validation
- [ ] Install `zod` for server-side validation
- [ ] Validate all API request bodies
- [ ] Return 400 Bad Request for invalid data
- [ ] Include field-level error messages
- [ ] Test validation on invalid inputs

### Sanitization
- [ ] Install `dompurify` package
- [ ] Sanitize HTML content from users
- [ ] Sanitize text input (remove HTML tags)
- [ ] Prevent XSS attacks in search queries
- [ ] Prevent path traversal in file names
- [ ] Sanitize URLs to prevent javascript: protocol
- [ ] Test with malicious input examples:
  - `<script>alert('xss')</script>`
  - `' OR '1'='1`
  - `../../etc/passwd`
  - `javascript:alert('xss')`

---

## ✅ Phase 3: Security Headers (Week 2)

### HTTP Security Headers
- [ ] Add Content-Security-Policy header
- [ ] Add X-Frame-Options: DENY
- [ ] Add X-Content-Type-Options: nosniff
- [ ] Add X-XSS-Protection header
- [ ] Add Strict-Transport-Security (HSTS) header
  - 1 year max-age for production
  - includeSubDomains enabled
- [ ] Add Referrer-Policy header
- [ ] Add Permissions-Policy header
- [ ] Remove Server and X-Powered-By headers
- [ ] Test headers with curl or security scanner

### CORS Configuration
- [ ] Whitelist trusted origins
  - Development: `localhost:3000`, `localhost:5173`
  - Production: your domains only
- [ ] Allow only necessary HTTP methods
  - GET, POST, PUT, DELETE, PATCH
- [ ] Allow only necessary headers
- [ ] Set appropriate Access-Control-Max-Age
- [ ] Test CORS with different origins
- [ ] Verify cross-origin requests are blocked

### HTTPS
- [ ] Enable HTTPS on production
- [ ] Obtain SSL certificate (Let's Encrypt or similar)
- [ ] Redirect all HTTP traffic to HTTPS
- [ ] Set Secure flag on cookies
- [ ] Test SSL/TLS configuration with SSL Labs

---

## ✅ Phase 4: Rate Limiting (Week 2-3)

### API Rate Limiting
- [ ] Implement rate limiter for login endpoint
  - 5 attempts per 15 minutes per IP
- [ ] Implement rate limiter for API endpoints
  - 100 requests per minute per user
- [ ] Implement rate limiter for password reset
  - 3 attempts per hour per email
- [ ] Return 429 Too Many Requests when limit exceeded
- [ ] Include Retry-After header
- [ ] Log rate limit violations
- [ ] Test rate limiting manually

### IP-Based Limiting
- [ ] Track requests by IP address
- [ ] Extract real IP from X-Forwarded-For header (for proxies)
- [ ] Implement adaptive limiting for suspicious IPs
- [ ] Monitor for DDoS patterns
- [ ] Optional: integrate with Redis for distributed systems

---

## ✅ Phase 5: Supabase Security (Week 3)

### Row Level Security (RLS)
- [ ] Enable RLS on all user tables
- [ ] Create RLS policy: users see own data
- [ ] Create RLS policy: admins see all data
- [ ] Create RLS policy: public posts visible
- [ ] Create RLS policy: draft posts hidden from public
- [ ] Create RLS policy: only admins can insert
- [ ] Create RLS policy: only admins can update
- [ ] Create RLS policy: only admins can delete
- [ ] Test RLS policies with different roles
- [ ] Verify unauthorized access is blocked

### Storage Rules
- [ ] Set up Supabase Storage bucket
- [ ] Create storage rule: users upload to own folder
- [ ] Create storage rule: users can delete own files
- [ ] Create storage rule: files are authenticated only
- [ ] Implement file upload validation
- [ ] Test storage access controls

### Key Management
- [ ] Generate secure API keys
- [ ] Store anon key in client code (public)
- [ ] Store service_role key in backend only (private)
- [ ] Rotate keys regularly
- [ ] Monitor key usage in Supabase dashboard
- [ ] Never commit keys to version control

---

## ✅ Phase 6: API & Backend Security (Week 3-4)

### Authentication Middleware
- [ ] Create `authMiddleware` to verify JWT tokens
- [ ] Extract user info from tokens
- [ ] Attach user to request object
- [ ] Return 401 for missing/invalid tokens
- [ ] Return 401 for expired tokens
- [ ] Test middleware with valid/invalid tokens

### Authorization Middleware
- [ ] Create `requireRole()` for role checking
- [ ] Create `requireRoles()` for multiple roles
- [ ] Create `verifyOwnership()` for data ownership
- [ ] Test authorization on protected routes

### Error Handling
- [ ] Create custom error classes
  - `AppError`, `ValidationError`, `AuthError`, `NotFoundError`
- [ ] Create `asyncHandler` to catch promise rejections
- [ ] Create global error handler middleware
- [ ] Never expose stack traces to client
- [ ] Never expose database errors to client
- [ ] Always return generic error messages
- [ ] Log detailed errors on server
- [ ] Return appropriate HTTP status codes
- [ ] Test error handling with various scenarios

### CSRF Protection
- [ ] Use httpOnly cookies for CSRF protection
- [ ] Optional: implement CSRF tokens
- [ ] Test CSRF attacks are prevented
- [ ] Document for developers

---

## ✅ Phase 7: File Upload Security (Week 4)

### File Validation
- [ ] Validate file type (MIME type check)
- [ ] Validate file extension
- [ ] Validate file size (max 10MB images, 50MB documents)
- [ ] Scan for viruses (optional: third-party service)
- [ ] Reject executable files
- [ ] Reject archive files containing executables
- [ ] Test with malicious file examples

### File Storage
- [ ] Store files in Supabase Storage, not public folder
- [ ] Use unique file names (UUID + extension)
- [ ] Organize by user: `/uploads/{userId}/{fileId}`
- [ ] Implement quota limits per user
- [ ] Generate secure download URLs
- [ ] Set expiring download URLs if needed
- [ ] Test file access controls

### File Download Security
- [ ] Verify user owns the file
- [ ] Use authenticated download URLs
- [ ] Set Content-Disposition to prevent execution
- [ ] Log file downloads for audit trail

---

## ✅ Phase 8: Logging & Monitoring (Week 4)

### Logging Setup
- [ ] Install logging package (Winston or Pino)
- [ ] Create logger utility
- [ ] Create audit logger utility
- [ ] Configure log levels (DEBUG, INFO, WARN, ERROR, CRITICAL)
- [ ] Set up log rotation
- [ ] Log to file in production
- [ ] Log to console in development

### What to Log
- [ ] Authentication events (login/logout/2FA)
- [ ] Failed authentication attempts
- [ ] Authorization failures
- [ ] Data access and modifications
- [ ] Admin actions
- [ ] File uploads
- [ ] API errors
- [ ] Rate limit violations
- [ ] Suspicious activity

### What NOT to Log
- [ ] ❌ Passwords
- [ ] ❌ API tokens
- [ ] ❌ Session tokens
- [ ] ❌ Credit card details
- [ ] ❌ Personal information (SSN, etc.)
- [ ] ❌ Full request/response bodies

### Monitoring & Alerts
- [ ] Monitor failed login attempts
- [ ] Alert on multiple failed logins (brute force)
- [ ] Monitor unusual data access patterns
- [ ] Monitor file upload patterns
- [ ] Alert on rate limit violations
- [ ] Monitor error rates
- [ ] Dashboard for security metrics

---

## ✅ Phase 9: Two-Factor Authentication (Optional, Week 4)

### 2FA Setup
- [ ] Enable Supabase 2FA support
- [ ] Create 2FA setup UI component
- [ ] Generate OTP secret for users
- [ ] Display QR code for authenticator app
- [ ] Provide backup codes
- [ ] Store backup codes securely (hashed)

### 2FA Verification
- [ ] Verify OTP code on login
- [ ] Support TOTP (Time-based OTP)
- [ ] Optional: support SMS OTP
- [ ] Log 2FA attempts
- [ ] Rate limit 2FA attempts

### Account Recovery
- [ ] Use backup codes for account recovery
- [ ] Require user to generate new backup codes
- [ ] Send confirmation email when 2FA is disabled
- [ ] Verify via existing 2FA method to disable

---

## ✅ Phase 10: Testing & Validation (Ongoing)

### Security Testing
- [ ] Test XSS attack prevention
  - Input: `<script>alert('xss')</script>`
  - Verify: Script does not execute
- [ ] Test SQL injection prevention
  - Input: `' OR '1'='1`
  - Verify: No unauthorized data access
- [ ] Test CSRF prevention
  - Attempt: Request from different origin
  - Verify: Request is blocked
- [ ] Test authentication bypass
  - Verify: Cannot access /admin without login
  - Verify: Cannot access protected routes
- [ ] Test authorization bypass
  - Attempt: User accessing admin data
  - Verify: Access denied
- [ ] Test file upload vulnerabilities
  - Upload: Executable file
  - Verify: Upload rejected
  - Upload: Oversized file
  - Verify: Upload rejected

### Automated Testing
- [ ] Run `npm audit` to check for vulnerable packages
- [ ] Run security linters
- [ ] Run OWASP ZAP for automated scanning
- [ ] Run Burp Suite for manual testing
- [ ] Set up GitHub security scanning

### Code Review
- [ ] Security code review checklist
- [ ] Review all authentication code
- [ ] Review all database queries
- [ ] Review file upload code
- [ ] Review API endpoints
- [ ] Review error handling

---

## ✅ Phase 11: Documentation

### Security Documentation
- [ ] Document all security measures
- [ ] Create security guidelines for developers
- [ ] Document authentication flow
- [ ] Document authorization rules
- [ ] Document RLS policies
- [ ] Document error handling approach
- [ ] Create security checklist (this file)

### Incident Response
- [ ] Create incident response plan
- [ ] Document how to respond to security breaches
- [ ] Document how to reset compromised accounts
- [ ] Document password reset procedures
- [ ] Document 2FA recovery procedures

---

## ✅ Phase 12: Deployment & Maintenance

### Pre-Deployment
- [ ] Environment variables configured correctly
- [ ] Secrets not in source code
- [ ] SSL/TLS configured
- [ ] Security headers enabled
- [ ] Rate limiting enabled
- [ ] RLS policies enabled
- [ ] Logging enabled
- [ ] Error handling in place

### Post-Deployment
- [ ] Monitor error logs
- [ ] Monitor security logs
- [ ] Monitor for suspicious activity
- [ ] Regular security audits (quarterly)
- [ ] Keep dependencies updated
- [ ] Monitor for new vulnerabilities
- [ ] Review logs for anomalies

### Maintenance
- [ ] Update packages monthly
- [ ] Rotate encryption keys
- [ ] Rotate API keys
- [ ] Review and update security policies
- [ ] Backup data regularly
- [ ] Test backup restoration
- [ ] Security training for team

---

## 📊 Security Scoring

### Phase Completion
- [ ] Phase 1: 10%
- [ ] Phase 2: 15%
- [ ] Phase 3: 10%
- [ ] Phase 4: 10%
- [ ] Phase 5: 15%
- [ ] Phase 6: 15%
- [ ] Phase 7: 10%
- [ ] Phase 8: 5%
- [ ] Phase 9: 5% (optional)
- [ ] Phase 10: 5%

**Total: 100%**

---

## 🎯 Next Steps

1. Print this checklist
2. Assign team members to phases
3. Schedule implementation timeline
4. Set up tracking system
5. Weekly progress meetings
6. Monthly security audits
7. Quarterly penetration testing (optional)

---

**Start with Phase 1 & 2 - They are the foundation for everything else!**

For questions, refer to `SECURITY_IMPLEMENTATION.md` and specific middleware/utility documentation.
