# Admin Dashboard Quick Start Guide

## 🔐 Default Admin Credentials

**Email:** `macknonvulimu@gmail.com`  
**Password:** `Macknon@2013`

> ⚠️ **Important:** Change these credentials in Supabase Auth immediately after first login for security purposes.

## Getting Started

### 1. Access the Admin Dashboard
After logging in with admin credentials, navigate to:
```
http://localhost:5173/admin
```

### 2. Setup Supabase Tables

Before using the dashboard, ensure you have the `blog_posts` table in Supabase:

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
```

### 3. Enable Row Level Security (RLS)

In Supabase, enable RLS on `blog_posts` table:

```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read
CREATE POLICY "Enable read for authenticated users"
ON blog_posts FOR SELECT
TO authenticated
USING (true);

-- Allow admins to insert
CREATE POLICY "Enable insert for admins"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Allow admins to update
CREATE POLICY "Enable update for admins"
ON blog_posts FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Allow admins to delete
CREATE POLICY "Enable delete for admins"
ON blog_posts FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);
```

## Dashboard Navigation

### Main Menu
- **Dashboard** - Overview with stats and charts
- **Blog Management** - Create, edit, delete blog posts
- **Users** - Manage user accounts and roles
- **Analytics** - View performance metrics and charts
- **Settings** - Update profile and preferences

## Common Tasks

### Creating a Blog Post
1. Click "New Post" button
2. Fill in title, summary, and content
3. Select category from dropdown
4. Toggle "Publish immediately" if you want it visible
5. Click "Create Post"

### Editing a Blog Post
1. Find the post in the blog table
2. Click the edit icon (pencil)
3. Update the information
4. Click "Update Post"

### Publishing a Draft
1. Locate the draft in the blog table
2. Click the eye/eye-slash icon in the Status column
3. Confirm the publish action

### Managing Users
1. Go to Users section
2. Search or filter users
3. Click dropdown in Role column to change role
4. Click trash icon to delete a user

### Exporting Data
1. Navigate to Blog or Users page
2. Click "Export CSV" button
3. File will download automatically

### Dark Mode
1. Click the moon/sun icon in the header
2. Dark mode preference is saved automatically

## Features Walkthrough

### Analytics Dashboard
- **Summary Cards**: Shows key metrics at a glance
- **Monthly Chart**: Bar chart of blog posts created
- **User Growth Chart**: Line chart showing user trends
- **Performance Metrics**: System performance indicators

### Blog Management
- **Search**: Find posts by title or summary
- **Category Filter**: Filter by specific categories
- **Status Filter**: Show published or draft posts
- **Bulk Selection**: Select multiple posts (for future batch operations)

### Users Management
- **Role Management**: Change user roles from the table directly
- **User Search**: Find users by name or email
- **Status Indicator**: See active/inactive status
- **User Statistics**: Total users, admin count, active users

### Settings
- **Profile**: Update your name, email, phone
- **Security**: Change your password
- **Notifications**: Control email notification preferences
- **Account Info**: View your account details

## Tips & Tricks

1. **Use keyboard shortcuts**: Tab to navigate forms quickly
2. **Responsive design**: Works great on tablets and mobile devices
3. **Dark mode**: Better for nighttime admin work
4. **CSV export**: Great for reports and analysis
5. **Real-time updates**: Changes appear instantly without refresh
6. **Search before export**: Export filtered results for specific data

## Troubleshooting

### Blog posts not showing
- Ensure blog_posts table exists in Supabase
- Check if RLS policies are preventing access
- Verify you're logged in with admin role

### Can't edit/delete posts
- Verify you have admin role
- Check Supabase RLS policies
- Check browser console for errors

### Dark mode not working
- Clear browser cache
- Check if localStorage is enabled
- Try refreshing the page

### Charts not displaying
- Ensure recharts package is installed
- Check if you have data in your tables
- Check browser console for errors

## Database Schema

### blog_posts Table
```
- id: UUID (Primary Key)
- title: TEXT (Required)
- summary: TEXT (Required)
- content: TEXT (Optional)
- category: TEXT (Optional)
- published: BOOLEAN (Default: false)
- created_at: TIMESTAMP (Auto)
- updated_at: TIMESTAMP (Auto)
```

## Environment Variables

Ensure your `.env` file has:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

## Performance Notes

- The dashboard is optimized for modern browsers
- Real-time updates are disabled for 60+ items (for performance)
- Charts render efficiently with Recharts
- CSV export handles large datasets smoothly

## Security Best Practices

1. **Always use HTTPS** in production
2. **Enable RLS** on all sensitive tables
3. **Use strong passwords** for admin accounts
4. **Regular backups** of your Supabase database
5. **Monitor user activity** through the admin dashboard
6. **Keep dependencies updated**

## Next Steps

1. ✅ Set up Supabase tables
2. ✅ Configure RLS policies
3. ✅ Create admin user account
4. ✅ Test all dashboard features
5. ✅ Customize styling if needed
6. ✅ Deploy to production

## Support

For detailed documentation, see [ADMIN_DASHBOARD_README.md](./ADMIN_DASHBOARD_README.md)

---

**Last Updated**: January 2026  
**Version**: 1.0.0
