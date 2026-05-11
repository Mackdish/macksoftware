# Admin Dashboard Access Guide - TrueHost Hosting

**Date:** January 27, 2026  
**Hosting Provider:** TrueHost  
**Status:** Ready for Production

---

## 🚀 Quick Access

After hosting your website on TrueHost, access the admin dashboard at:

```
https://yourdomain.com/admin
```

**Replace `yourdomain.com` with your actual domain**

---

## 🔐 Login Credentials

| Field | Value |
|-------|-------|
| **Email** | `macknonvulimu@gmail.com` |
| **Password** | `Macknon@2013` |

> ⚠️ **SECURITY WARNING:** Change these credentials immediately after first login!

---

## 📋 Step-by-Step Access Instructions

### **Step 1: Ensure Website is Deployed**
```
✅ Website deployed to TrueHost
✅ Domain configured and DNS pointing to TrueHost
✅ Website accessible at https://yourdomain.com
✅ SSL certificate installed
```

### **Step 2: Navigate to Admin Dashboard**
```
1. Open browser
2. Go to: https://yourdomain.com/admin
3. You should see the login page
```

### **Step 3: Login with Admin Credentials**
```
Email:    macknonvulimu@gmail.com
Password: Macknon@2013
```

### **Step 4: Access Dashboard**
After successful login, you'll be redirected to the main dashboard at:
```
https://yourdomain.com/admin
```

---

## 🎯 Available Admin Routes

Once logged in, you can access:

| Route | Purpose | URL |
|-------|---------|-----|
| **Dashboard** | Overview & Analytics | `/admin` |
| **Blog Management** | Create/Edit Posts | `/admin/blog` |
| **User Management** | Manage Users & Roles | `/admin/users` |
| **Analytics** | View Statistics | `/admin/analytics` |
| **Settings** | Admin Settings | `/admin/settings` |

**Full URLs:**
```
Dashboard:    https://yourdomain.com/admin
Blog:         https://yourdomain.com/admin/blog
Users:        https://yourdomain.com/admin/users
Analytics:    https://yourdomain.com/admin/analytics
Settings:     https://yourdomain.com/admin/settings
```

---

## 🔧 TrueHost-Specific Deployment Steps

### **1. Prepare Your Build**

Before uploading to TrueHost:

```bash
# Build the production version
npm run build

# This creates a 'dist' folder with all files needed
```

### **2. Upload to TrueHost**

There are two ways to deploy on TrueHost:

#### **Option A: Using TrueHost Control Panel**

1. Log in to your TrueHost account
2. Go to **File Manager**
3. Navigate to **public_html** folder
4. Upload all files from the `dist/` folder
5. Your site will be at `https://yourdomain.com`

#### **Option B: Using FTP/SFTP**

1. Get FTP credentials from TrueHost control panel
2. Connect using FTP client (FileZilla, WinSCP, etc.)
3. Upload all `dist/` files to `public_html/`

```
FTP Details:
- Host: ftp.yourdomain.com (or FTP host from TrueHost)
- Username: Your cPanel username
- Password: Your cPanel password
- Upload to: public_html/
```

### **3. Verify Deployment**

```bash
# Test main site works
https://yourdomain.com
✅ Should show your website

# Test admin access
https://yourdomain.com/admin
✅ Should show login page
```

### **4. Configure Environment Variables (If Needed)**

If you're using Supabase backend, ensure:

1. **Supabase URL** is set in your frontend config
2. **Supabase Key** is accessible
3. These should already be in your code if configured

---

## 🛡️ Security Checklist

### **Before Going Live:**

- [ ] Change default admin password
  ```
  Old: macknonvulimu@gmail.com / Macknon@2013
  New: your-secure-password
  ```

- [ ] Enable HTTPS/SSL on TrueHost
  ```
  Check: Control Panel > SSL/TLS Status
  Should show "Active" or "Valid"
  ```

- [ ] Set up Supabase RLS (Row Level Security)
  ```
  Ensure RLS policies are enabled on your tables
  ```

- [ ] Verify admin authentication works
  ```
  Test login at https://yourdomain.com/admin
  ```

- [ ] Test protected routes
  ```
  Try accessing /admin without login
  Should redirect to login page
  ```

---

## 🔑 Change Default Admin Password

### **Step 1: Access Supabase Dashboard**
1. Go to [supabase.com](https://supabase.com)
2. Log in to your project
3. Go to **Authentication > Users**

### **Step 2: Find the Admin User**
Look for user with email: `macknonvulimu@gmail.com`

### **Step 3: Reset Password**
1. Click on the user
2. Click "Reset password"
3. User will receive email with reset link

### **Step 4: New Secure Password**
Create a strong password:
```
Examples of strong passwords:
✅ Mack@Dashboard2024!Secure
✅ Admin_Security_2026#NewPass
✅ TrueHost$Admin_Mackdish2024
```

---

## 🚨 Troubleshooting

### **Issue: Login page appears but can't login**

**Solutions:**
1. Verify Supabase is configured
2. Check Supabase authentication is enabled
3. Ensure the user email exists in Supabase
4. Try resetting password in Supabase dashboard

### **Issue: Admin routes return 404**

**Solutions:**
1. Verify `dist/` folder was uploaded completely
2. Check that router is configured (check App.tsx)
3. Ensure SPA routing is enabled (TrueHost should handle this)
4. Contact TrueHost support if issue persists

### **Issue: "Cannot connect to database"**

**Solutions:**
1. Check Supabase project is active
2. Verify Supabase URL in your code
3. Verify Supabase key is correct
4. Check network requests in browser DevTools (F12)

### **Issue: Analytics not loading**

**Solutions:**
1. Ensure Supabase tables exist (run ADMIN_SETUP.sql)
2. Verify RLS policies are set correctly
3. Check browser console for errors (F12)
4. Verify data exists in tables

---

## 📊 Dashboard Features

Once you're logged in:

### **Dashboard Tab**
- 📈 Analytics overview
- 📊 Charts and statistics
- 📋 Recent activity
- ⚡ Quick actions

### **Blog Tab**
- ➕ Create new blog posts
- ✏️ Edit existing posts
- 🗑️ Delete posts
- 🔍 Search and filter posts
- 📋 Bulk operations

### **Users Tab**
- 👥 View all users
- 🔐 Manage user roles
- 🚫 Deactivate/delete users
- 📊 User statistics

### **Analytics Tab**
- 📈 Monthly trends
- 👤 User growth
- 📝 Post statistics
- 💾 Export reports

### **Settings Tab**
- ⚙️ Admin preferences
- 🔑 Security settings
- 📬 Email notifications
- 🌙 Theme preferences

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| TrueHost Control Panel | https://cpanel.truehost.com |
| Supabase Dashboard | https://supabase.com/dashboard |
| Admin Documentation | See ADMIN_QUICK_START.md |
| Developer Guide | See ADMIN_DEVELOPER_GUIDE.md |

---

## 📞 Getting Help

### **If you encounter issues:**

1. **Check Admin Documentation**
   - ADMIN_QUICK_START.md
   - ADMIN_DEVELOPER_GUIDE.md
   - ADMIN_DASHBOARD_README.md

2. **Check Browser Console**
   - Press `F12` to open DevTools
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Contact Support**
   - TrueHost Support: Contact your TrueHost account
   - Supabase Support: https://supabase.com/support

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Website loads at https://yourdomain.com
- [ ] Admin login page visible at /admin
- [ ] Can login with credentials
- [ ] Dashboard loads and shows data
- [ ] Navigation works between pages
- [ ] Analytics displays correctly
- [ ] Can create/edit/delete items
- [ ] Real-time updates work
- [ ] No console errors (F12)
- [ ] No network errors (F12 > Network)

---

## 🎉 You're All Set!

Your admin dashboard is now accessible on TrueHost at:

```
https://yourdomain.com/admin
```

**Login:** macknonvulimu@gmail.com  
**Password:** Macknon@2013

Remember to:
1. ✅ Change the default password
2. ✅ Enable HTTPS/SSL
3. ✅ Set up regular backups
4. ✅ Monitor admin activity

---

**Last Updated:** January 27, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
