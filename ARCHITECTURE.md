# Admin Dashboard Architecture & Data Flow

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ADMIN DASHBOARD                             │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
            ┌───────▼────────┐ ┌──▼────────┐ ┌──▼──────────┐
            │  User Interface │ │  Business │ │  Data Layer │
            │   (Components)  │ │  Logic    │ │  (Hooks)    │
            └─────────────────┘ │  (Pages)  │ └─────────────┘
                                 └──────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
         ┌──────────▼────────┐  ┌────▼─────────┐  ┌──▼──────────────┐
         │  Supabase Client  │  │ Toast Notif. │  │  Context (Auth) │
         │   (supabase.js)   │  │  (Sonner)    │  │                 │
         └───────────────────┘  └──────────────┘  └─────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
         ┌──────────▼────────┐  ┌────▼──────────┐  ┌──▼──────────────┐
         │ PostgreSQL        │  │ Real-time     │  │ Authentication  │
         │ (blog_posts,      │  │ Subscriptions │  │ (Session Mgmt)  │
         │  profiles,        │  │              │  │                 │
         │  user_roles)      │  │              │  │                 │
         └───────────────────┘  └───────────────┘  └─────────────────┘
```

---

## 📊 Component Hierarchy

```
AdminDashboardNew (Page)
    ↓
AdminLayout (Layout Wrapper)
    ├─ Sidebar Navigation
    │   ├─ Dashboard
    │   ├─ Blog
    │   ├─ Users
    │   ├─ Analytics
    │   └─ Settings
    ├─ Header
    │   ├─ Page Title
    │   ├─ Notifications
    │   ├─ Dark Mode Toggle
    │   └─ User Profile
    └─ Content Area
        ├─ DashboardSummary (Cards)
        ├─ Charts (Recharts)
        └─ Quick Actions


AdminBlog (Page)
    ↓
AdminLayout (Layout Wrapper)
    └─ Content Area
        ├─ Header (Title + Buttons)
        ├─ Filters & Search
        ├─ BlogTable
        │   ├─ Row Selection
        │   ├─ Edit Button
        │   ├─ Delete Button
        │   └─ Status Toggle
        └─ BlogModal (Overlay)
            ├─ Title Input
            ├─ Summary Textarea
            ├─ Content Textarea
            ├─ Category Dropdown
            ├─ Publish Toggle
            └─ Submit Button


AdminUsers (Page)
    ↓
AdminLayout (Layout Wrapper)
    └─ Content Area
        ├─ Header (Title + Buttons)
        ├─ Filters & Search
        ├─ UsersTable
        │   ├─ User Avatar
        │   ├─ Role Dropdown
        │   ├─ Status Badge
        │   ├─ Edit Button
        │   └─ Delete Button
        └─ Statistics Cards


AdminAnalytics (Page)
    ↓
AdminLayout (Layout Wrapper)
    └─ Content Area
        ├─ Summary Cards
        ├─ Bar Chart (Posts)
        ├─ Line Chart (Users)
        └─ Performance Metrics


AdminSettings (Page)
    ↓
AdminLayout (Layout Wrapper)
    └─ Content Area
        ├─ Profile Section
        ├─ Password Section
        ├─ Notifications Section
        └─ Account Info Section
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                      USER INTERACTION                            │
└──────────────────────────────────────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Click Event   │
                    └───────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼────┐      ┌──────▼──────┐      ┌────▼──────┐
    │ Create │      │ Update      │      │ Delete    │
    │ Action │      │ Action      │      │ Action    │
    └───┬────┘      └──────┬──────┘      └────┬──────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼────────┐
                    │ useAdminData   │
                    │    (Hook)      │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │ Supabase Query │
                    │  (RPC/REST)    │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │  PostgreSQL    │
                    │   Database     │
                    └───────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼────┐      ┌──────▼──────┐      ┌────▼──────┐
    │Success │      │ Error        │      │ RLS Check │
    │Response│      │ Response     │      │ (Auth)    │
    └───┬────┘      └──────┬──────┘      └────┬──────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼────────┐
                    │ State Update   │
                    │  (setData)     │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │ Toast Notif.   │
                    │ (Success/Error)│
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │ Re-render      │
                    │ Component      │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │  Real-time     │
                    │ Subscription   │
                    │  Updates       │
                    └────────────────┘
```

---

## 🗄️ Database Schema

```
┌──────────────────────────────────────────────────┐
│            SUPABASE POSTGRESQL DATABASE          │
└──────────────────────────────────────────────────┘
        │                   │                   │
        ├─────────┬─────────┼─────────┬────────┤
        │         │         │         │        │
    ┌───▼──┐  ┌───▼──┐  ┌──▼───┐  ┌─▼───┐  ┌─▼──┐
    │ auth │  │blog_ │  │user_ │  │prof │  │ ... │
    │users │  │posts │  │roles │  │iles │  │    │
    └──────┘  └───┬──┘  └──────┘  └─────┘  └────┘
                  │
        ┌─────────┴─────────┐
        │                   │
    ┌───▼──────────┐   ┌────▼──────┐
    │  Columns:    │   │ Indexes:  │
    │ • id (PK)    │   │ • category│
    │ • title      │   │ • publish │
    │ • summary    │   │ • created │
    │ • content    │   │ • title   │
    │ • category   │   └───────────┘
    │ • published  │
    │ • created_at │
    │ • updated_at │
    └──────────────┘

┌──────────────────────────────────────────────────┐
│              ROW LEVEL SECURITY (RLS)            │
└──────────────────────────────────────────────────┘
    │
    ├─ Published posts: Anyone can read
    ├─ All posts: Authenticated users
    ├─ Insert: Admin users only
    ├─ Update: Admin users only
    └─ Delete: Admin users only
```

---

## 🔐 Authentication & Authorization Flow

```
┌────────────────────────────────────┐
│   User Visits /admin              │
└────────────────────────────────────┘
            │
            ↓
┌────────────────────────────────────┐
│ AuthContext checks session        │
└────────────────────────────────────┘
            │
    ┌───────┴────────┐
    │                │
    ▼                ▼
┌─────────┐    ┌──────────────┐
│Logged In│    │Not Logged In │
└────┬────┘    └──────┬───────┘
     │                │
     ▼                ▼
┌──────────────┐  ┌──────────────┐
│Check Admin   │  │Redirect to   │
│Role         │  │/auth         │
└────┬────────┘  └──────────────┘
     │
 ┌───┴────┐
 │        │
 ▼        ▼
┌─────┐ ┌──────┐
│Admin│ │User  │
└──┬──┘ └───┬──┘
   │        │
   ▼        ▼
┌─────────────────┐  ┌─────────────┐
│Show Dashboard  │  │Redirect to  │
│                │  │/dashboard   │
└─────────────────┘  └─────────────┘
```

---

## 🔄 Real-time Updates Flow

```
┌────────────────────────────────────┐
│   Component Mounts                 │
│  (useEffect runs)                  │
└────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────┐
│ Subscribe to Supabase Channel      │
│ 'table_name_changes'               │
└────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────┐
│ Listen for postgres_changes        │
│ (INSERT, UPDATE, DELETE)           │
└────────────────────────────────────┘
            │
    ┌───────┼───────┐
    │       │       │
    ▼       ▼       ▼
┌────┐  ┌───────┐  ┌──────┐
│ +1 │  │Update │  │ -1   │
│Rows│  │Rows   │  │Rows  │
└─┬──┘  └───┬───┘  └──┬───┘
  │         │        │
  └─────────┼────────┘
            │
            ▼
┌────────────────────────────────────┐
│ Update Local State                 │
│ (setData)                          │
└────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────┐
│ Component Re-renders               │
│ with Fresh Data                    │
└────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────┐
│ User Sees Changes Instantly        │
│ (No refresh needed)                │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Component Unmounts                 │
└────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────┐
│ Unsubscribe from Channel           │
│ (Clean up)                         │
└────────────────────────────────────┘
```

---

## 🎨 Component Communication

```
┌─────────────────────────┐
│    AdminLayout          │
│  (Provides Context)     │
└───────────┬─────────────┘
            │
    ┌───────┼────────┐
    │       │        │
    ▼       ▼        ▼
┌────┐  ┌────┐   ┌────┐
│H1  │  │Pos │   │H2  │
│ea  │  │t   │   │ea  │
│der │  │it  │   │der │
└─┬──┘  │ion │   └┬───┘
  │     │Sec │    │
  │     └────┘    │
  │               │
  ▼               ▼
┌──────────────┐  ┌──────────────┐
│Navigation    │  │Content Area  │
├──────────────┤  ├──────────────┤
│ • Dashboard  │  │ • Blog Table │
│ • Blog       │  │ • Users Tbl  │
│ • Users      │  │ • Charts     │
│ • Analytics  │  │ • Forms      │
│ • Settings   │  │ • Modals     │
└──────────────┘  └──────────────┘
        ▲                 ▲
        │                 │
        └─────────┬───────┘
                  │
            Props & Events
```

---

## 📈 State Management

```
┌─────────────────────────────────────┐
│         Global State                │
│  (AuthContext)                      │
├─────────────────────────────────────┤
│ • user                              │
│ • session                           │
│ • profile                           │
│ • isAdmin                           │
│ • signIn/signOut                    │
└──────────────┬──────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌──────────────┐   ┌──────────────┐
│ Local State  │   │ Hook State   │
│ (useState)   │   │ (useReducer) │
├──────────────┤   ├──────────────┤
│ • modal Open │   │ • data array │
│ • dark Mode  │   │ • isLoading  │
│ • search     │   │ • error      │
│ • filters    │   └──────────────┘
└──────────────┘
```

---

## 🔗 API Call Pattern

```
┌──────────────────────────────────┐
│  Component Requests Data         │
│  (Hook called)                   │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  Hook: useState(isLoading:true)  │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  supabase                        │
│    .from('table')                │
│    .select()                     │
│    .order()                      │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  API Request Processing          │
│  (Supabase handles)              │
└─────────────┬────────────────────┘
              │
    ┌─────────┴──────────┐
    │                    │
    ▼                    ▼
┌────────┐         ┌─────────┐
│Success │         │Error    │
└──┬─────┘         └────┬────┘
   │                    │
   ▼                    ▼
┌──────────────┐  ┌─────────────┐
│setData()     │  │setError()   │
│setState()    │  │Toast notify │
└──┬───────────┘  └─────┬───────┘
   │                    │
   └────────────┬───────┘
                │
                ▼
┌──────────────────────────────────┐
│  Hook: setState(isLoading:false) │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  Component Re-renders            │
│  with Updated Data               │
└──────────────────────────────────┘
```

---

## 🎯 Feature Implementation Map

```
┌─────────────────────────────────────────────────────┐
│            ADMIN DASHBOARD FEATURES                 │
└─────────────────────────────────────────────────────┘
            │
    ┌───────┼───────┬──────────┬──────────┐
    │       │       │          │          │
    ▼       ▼       ▼          ▼          ▼
┌────┐  ┌────┐  ┌───────┐  ┌────────┐ ┌────────┐
│Blog│  │User│  │Admin  │  │Settings│ │Layout  │
│Mgmt│  │Mgmt│  │Panel  │  │Page    │ │/ Auth  │
└─┬──┘  └─┬──┘  └───┬───┘  └───┬────┘ └────────┘
  │       │        │           │
  ├─┬─┬──┴─┬─┐   │           │
  │ │ │    │ │   │           │
  ▼ ▼ ▼    ▼ ▼   ▼           ▼
 CRUD Tbl Sq Analytics    Profile
      │   │ │             │
      └───┴─┴──── + MORE
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Type safety with TypeScript
- ✅ Real-time data synchronization
- ✅ Secure authentication
- ✅ Scalable component structure
- ✅ Efficient data flow
- ✅ Easy to extend and maintain
