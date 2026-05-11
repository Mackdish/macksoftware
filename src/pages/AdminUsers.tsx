import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { UsersTable, AdminUser } from '@/components/admin/UsersTable';
import { useAdminUsers } from '@/hooks/useAdminData';
import { useExportData } from '@/hooks/useExportData';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Users Management Page
 * Allows admins to view, edit, and manage user accounts
 */
const UsersManagementPage: React.FC = () => {
  const { users, isLoading, updateUserRole, deleteUser } = useAdminUsers();
  const { exportToCSV } = useExportData();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Transform profile data to AdminUser format
  const adminUsers: AdminUser[] = users.map((user: any) => ({
    id: user.id || user.user_id,
    email: user.email || '',
    full_name: user.full_name || 'Unknown',
    role: user.user_roles?.role || 'user',
    status: 'active',
    created_at: user.created_at || new Date().toISOString(),
  }));

  // Filter users
  const filteredUsers = adminUsers.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleChangeRole = async (userId: string, role: 'admin' | 'user') => {
    await updateUserRole(userId, role);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
    }
  };

  const handleExport = () => {
    const exportData = filteredUsers.map((user) => ({
      Name: user.full_name,
      Email: user.email,
      Role: user.role,
      Status: user.status,
      'Joined At': user.created_at,
    }));
    exportToCSV(exportData, 'users');
  };

  return (
    <AdminLayout currentPage="users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Users Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="All">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
          <UsersTable
            users={filteredUsers}
            onEdit={(user) => {
              // TODO: Implement edit user functionality
              console.log('Edit user:', user);
            }}
            onDelete={handleDelete}
            onChangeRole={handleChangeRole}
            isLoading={isLoading}
          />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {adminUsers.length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Admins</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {adminUsers.filter((u) => u.role === 'admin').length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Active Users</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {adminUsers.filter((u) => u.status === 'active').length}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersManagementPage;
