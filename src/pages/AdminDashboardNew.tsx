import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DashboardSummary } from '@/components/admin/DashboardSummary';
import { useAnalytics } from '@/hooks/useAdminData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Main Dashboard Page
 * Displays overview of blog posts, users, and analytics
 */
const AdminDashboardPage: React.FC = () => {
  const { totalPosts, publishedPosts, totalUsers, postsThisMonth, monthlyData, isLoading } = useAnalytics();

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-8">
        {/* Summary Cards */}
        {isLoading ? (
          <div className="text-center py-8 text-slate-500">Loading analytics...</div>
        ) : (
          <DashboardSummary
            totalPosts={totalPosts}
            publishedPosts={publishedPosts}
            totalUsers={totalUsers}
            postsThisMonth={postsThisMonth}
          />
        )}

        {/* Charts Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Blog Posts Created (Last 12 Months)
          </h3>
          {isLoading ? (
            <div className="text-center py-8 text-slate-500">Loading chart...</div>
          ) : monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
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
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Posts Created" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-slate-500">No data available</div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                + Create New Blog Post
              </button>
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                + Add New User
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                View Analytics Report
              </button>
            </div>
          </div>

          {/* System Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Database</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">● Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">API</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">● Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Authentication</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Server Response</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">● Fast (&lt;200ms)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
