# Update Admin Credentials in Supabase ✅

**Date:** January 27, 2026  
**Status:** Credentials Updated

---

## 📋 Credentials Changed

| Field | Old | New |
|-------|-----|-----|
| **Email** | macknonvulimu708@gmail.com | macknonvulimu@gmail.com |
| **Password** | Mackdish@708 | Macknon@2013 |

---

## 🔧 How to Update in Supabase

### **Step 1: Go to Supabase Dashboard**

1. Visit [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (mackdish project)
3. Go to **Authentication** > **Users**

### **Step 2: Find the Admin User**

Look for the user with the OLD email:
- Search for: `macknonvulimu708@gmail.com`

### **Step 3: Update Email (Option A - If user exists)**

1. Click on the user
2. Click the **three dots** menu
3. Select **Edit user**
4. Change email from `macknonvulimu708@gmail.com` to `macknonvulimu@gmail.com`
5. Click **Update user**

**OR**

### **Step 3: Delete & Recreate User (Option B - Cleaner)**

1. Delete the old user with email `macknonvulimu708@gmail.com`
2. Invite new user with email `macknonvulimu@gmail.com`
3. Set password to `Macknon@2013`

### **Step 4: Verify in Database**

In Supabase SQL Editor, verify the user exists:

```sql
SELECT id, email, created_at FROM auth.users WHERE email = 'macknonvulimu@gmail.com';
```

Should return one row with your new email.

### **Step 5: Verify user_roles Table**

Ensure the admin role is set:

```sql
SELECT user_id, role FROM user_roles WHERE role = 'admin';
```

Should show the admin user.

---

## 🧪 Testing New Credentials

### **Test 1: Login with New Email**

1. Visit: `https://mackdish.store/auth` (or local: `http://localhost:5173/auth`)
2. Enter:
   - Email: `macknonvulimu@gmail.com`
   - Password: `Macknon@2013`
3. Click **Login**
4. Expected: Should login successfully and redirect to `/admin`

### **Test 2: Old Credentials Should Fail**

1. Try logging in with old email: `macknonvulimu708@gmail.com`
2. Expected: "Invalid login credentials" error

### **Test 3: Admin Access**

1. After logging in with new credentials
2. Visit: `https://mackdish.store/admin`
3. Expected: Dashboard should load (not "Access Denied")

---

## 📝 Documentation Updated

All documentation files have been updated with new credentials:

- ✅ ADMIN_QUICK_START.md
- ✅ ADMIN_SETUP.sql
- ✅ README_ADMIN_DASHBOARD.md
- ✅ START_HERE.md
- ✅ ADMIN_TRUEHOST_GUIDE.md
- ✅ ADMIN_AUTHENTICATION_FIX.md

---

## ⚠️ Important Notes

1. **Keep credentials secure**
   - Don't share these credentials publicly
   - Don't commit to version control
   - Store securely

2. **Update your password notes**
   - Update any password manager
   - Update your team's secure documentation
   - Inform team members

3. **Old credentials**
   - Old email no longer works
   - If user still exists in Supabase, delete it
   - Any bookmarks with old email won't work

4. **For TrueHost deployment**
   - These credentials work the same way
   - No code changes needed
   - Just ensure Supabase is updated

---

## 🚀 Deployment Checklist

Before deploying to TrueHost:

- [ ] Supabase user updated to `macknonvulimu@gmail.com`
- [ ] Supabase user has admin role in `user_roles` table
- [ ] Password changed to `Macknon@2013` in Supabase
- [ ] Tested login with new credentials (local)
- [ ] Tested admin access works
- [ ] Old credentials don't work
- [ ] Documentation files updated
- [ ] Ready to deploy to TrueHost

---

## 📞 Troubleshooting

### **Issue: Cannot login with new credentials**

**Check:**
1. Email is exactly: `macknonvulimu@gmail.com`
2. Password is exactly: `Macknon@2013`
3. User exists in Supabase (check Authentication > Users)
4. User has admin role (check user_roles table)
5. Try in incognito/private window

### **Issue: Can login but not admin access**

**Check:**
1. Go to Supabase > user_roles table
2. Verify user_id matches the logged-in user
3. Verify role is exactly: `admin`
4. Add entry if missing:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('USER_ID', 'admin');
   ```

### **Issue: Old user still exists**

**Solution:**
1. Go to Supabase Authentication > Users
2. Find: `macknonvulimu708@gmail.com`
3. Click three dots > Delete user
4. Confirm deletion

---

## 📊 Summary

| Task | Status |
|------|--------|
| Update documentation | ✅ Done |
| Change email | ⏳ Manual (in Supabase) |
| Change password | ⏳ Manual (in Supabase) |
| Test new credentials | ⏳ User's turn |
| Deploy to TrueHost | ⏳ User's turn |

---

## ✅ Next Steps

1. **Update Supabase User**
   - Follow Steps 1-5 above

2. **Test Locally**
   - Run: `npm run dev`
   - Test login with new credentials

3. **Deploy to TrueHost**
   - Upload dist folder
   - Test on live site

4. **Verify on TrueHost**
   - Visit: mackdish.store/auth
   - Login with new credentials
   - Verify admin access works

---

**Default Admin Credentials:**
- 📧 Email: macknonvulimu@gmail.com
- 🔑 Password: Macknon@2013

---

**Last Updated:** January 27, 2026  
**Version:** 1.0.0
