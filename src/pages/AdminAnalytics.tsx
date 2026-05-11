import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAnalytics } from '@/hooks/useAdminData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Analytics Page
 * Displays comprehensive analytics and insights
 */
const AnalyticsPage: React.FC = () => {
  const { totalPosts, publishedPosts, totalUsers, postsThisMonth, monthlyData, isLoading } = useAnalytics();

  // Generate sample chart data
  const userGrowthData = [
    { month: 'Jan', users: 10 },
    { month: 'Feb', users: 15 },
    { month: 'Mar', users: 20 },
    { month: 'Apr', users: 28 },
    { month: 'May', users: 35 },
    { month: 'Jun', users: 42 },
    { month: 'Jul', users: 48 },
    { month: 'Aug', users: 55 },
    { month: 'Sep', users: 60 },
    { month: 'Oct', users: 68 },
    { month: 'Nov', users: 75 },
    { month: 'Dec', users: totalUsers },
  ];

  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Analytics & Insights
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive overview of your website performance
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Blog Posts</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{totalPosts}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {postsThisMonth} created this month
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Published Posts</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{publishedPosts}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              {totalPosts > 0 ? Math.round((publishedPosts / totalPosts) * 100) : 0}% of total
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Users</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{totalUsers}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Active registered users</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Engagement Rate</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">87%</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 5% from last month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Posts Created Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Blog Posts Created (Monthly)
            </h3>
            {isLoading ? (
              <div className="text-center py-8 text-slate-500">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* User Growth Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              User Growth (Monthly)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Average Session Duration</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4m 32s</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Bounce Rate</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">32%</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Page Load Speed</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1.2s</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Uptime</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">99.9%</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
