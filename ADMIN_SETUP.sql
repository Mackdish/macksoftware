-- ============================================
-- SUPABASE ADMIN DASHBOARD SETUP SCRIPT
-- ============================================
-- Run this SQL in your Supabase dashboard to set up the blog_posts table

-- ============================================
-- 1. Create blog_posts table
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT 'Technology' CHECK (category IN ('Technology', 'Design', 'Marketing', 'Business', 'Development', 'Other')),
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. Create indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_title ON blog_posts(title);

-- ============================================
-- 3. Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. Create RLS Policies
-- ============================================

-- Policy: Anyone can read published blog posts
CREATE POLICY "Enable read for published posts"
ON blog_posts FOR SELECT
USING (published = true OR auth.uid() IS NOT NULL);

-- Policy: Authenticated users can read all posts
CREATE POLICY "Enable read for authenticated users"
ON blog_posts FOR SELECT
TO authenticated
USING (true);

-- Policy: Only admins can insert
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

-- Policy: Only admins can update
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

-- Policy: Only admins can delete
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

-- ============================================
-- 5. Create sample blog posts (optional)
-- ============================================
-- Uncomment to insert sample data

INSERT INTO blog_posts (title, summary, content, category, published)
VALUES 
(
  'Getting Started with React',
  'Learn the basics of React and how to build your first component.',
  'React is a JavaScript library for building user interfaces with reusable components. In this guide, we''ll cover the fundamentals of React including JSX, components, state, and props. You''ll learn how to set up a React project and create your first interactive application.',
  'Technology',
  true
),
(
  'Web Design Trends for 2026',
  'Explore the latest design trends shaping web development this year.',
  'Web design is constantly evolving. This article covers the top design trends for 2026 including minimalism, dark mode, micro-interactions, and sustainable design practices. Learn how to implement these trends in your projects.',
  'Design',
  true
),
(
  'Digital Marketing Strategies',
  'Comprehensive guide to modern digital marketing techniques.',
  'Digital marketing encompasses all marketing efforts that use the internet or electronic devices. This guide covers SEO, content marketing, email marketing, social media marketing, and paid advertising strategies to help grow your business online.',
  'Marketing',
  true
),
(
  'Cloud Computing Fundamentals',
  'Understanding cloud computing and its benefits for businesses.',
  'Cloud computing allows organizations to use computing resources on-demand without owning physical infrastructure. Learn about IaaS, PaaS, SaaS, and how to choose the right cloud solution for your needs.',
  'Technology',
  false
),
(
  'Building Scalable Applications',
  'Best practices for designing applications that grow with your business.',
  'Scalability is crucial for successful applications. This article covers database optimization, caching strategies, microservices architecture, and load balancing techniques to ensure your application can handle growth.',
  'Development',
  true
);

-- ============================================
-- 6. Verify setup (run these as checks)
-- ============================================
-- Check table exists
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'blog_posts';

-- Check RLS is enabled
-- SELECT tablename FROM pg_tables WHERE tablename = 'blog_posts';

-- Check indexes
-- SELECT indexname FROM pg_indexes WHERE tablename = 'blog_posts';

-- Check policies
-- SELECT policyname FROM pg_policies WHERE tablename = 'blog_posts';

-- ============================================
-- 7. Cleanup (if needed, run these to reset)
-- ============================================
-- DROP POLICY IF EXISTS "Enable read for published posts" ON blog_posts;
-- DROP POLICY IF EXISTS "Enable read for authenticated users" ON blog_posts;
-- DROP POLICY IF EXISTS "Enable insert for admins" ON blog_posts;
-- DROP POLICY IF EXISTS "Enable update for admins" ON blog_posts;
-- DROP POLICY IF EXISTS "Enable delete for admins" ON blog_posts;
-- DROP TABLE IF EXISTS blog_posts;

-- ============================================
-- 8. Default Admin Credentials (For Testing)
-- ============================================
-- Create admin user in Supabase Auth panel:
-- Email: macknonvulimu@gmail.com
-- Password: Macknon@2013
--
-- After first login, assign admin role in Supabase:
-- INSERT INTO user_roles (user_id, role) 
-- VALUES ('<user_uuid_from_auth.users>', 'admin');
--
-- ⚠️ IMPORTANT: Change these credentials after first login for production!

-- ============================================
-- Setup Complete!
-- ============================================
-- Your admin dashboard is ready to use.
-- Navigate to /admin in your application to start managing content.
