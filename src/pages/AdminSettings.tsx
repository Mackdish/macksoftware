import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Lock, User, Save } from 'lucide-react';

/**
 * Settings Page
 * Allows admins to manage their profile and preferences
 */
const SettingsPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: profile?.full_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    blogNotifications: true,
    userNotifications: true,
    weeklyReport: true,
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // TODO: Implement profile update
      console.log('Updating profile:', profileData);
      setTimeout(() => {
        alert('Profile updated successfully!');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement password change
      console.log('Changing password');
      setTimeout(() => {
        alert('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error changing password:', error);
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      // TODO: Implement notification preferences save
      console.log('Saving notification preferences:', notifications);
      setTimeout(() => {
        alert('Notification preferences saved!');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setLoading(false);
    }
  };

  return (
    <AdminLayout currentPage="settings">
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your profile and preferences
          </p>
        </div>

        {/* Profile Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User size={24} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Full Name
              </label>
              <Input
                type="text"
                value={profileData.fullName}
                onChange={(e) => handleProfileChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                placeholder="Enter your email"
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSaveProfile}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={24} className="text-red-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Change Password</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Current Password
              </label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                placeholder="Enter your current password"
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                placeholder="Enter your new password"
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                placeholder="Confirm your new password"
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
              >
                <Lock size={18} />
                {loading ? 'Updating...' : 'Change Password'}
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-green-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
                className="w-4 h-4 rounded"
              />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receive email notifications</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.blogNotifications}
                onChange={() => handleNotificationChange('blogNotifications')}
                className="w-4 h-4 rounded"
              />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Blog Updates</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Get notified about blog posts</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.userNotifications}
                onChange={() => handleNotificationChange('userNotifications')}
                className="w-4 h-4 rounded"
              />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">User Activity</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Get notified about new users</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={() => handleNotificationChange('weeklyReport')}
                className="w-4 h-4 rounded"
              />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Weekly Report</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receive weekly analytics report</p>
              </div>
            </label>

            <div className="pt-4">
              <Button
                onClick={handleSaveNotifications}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Account Information</h3>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>
              <strong>User ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Email Verified:</strong> {user?.email_confirmed_at ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Account Created:</strong>{' '}
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </p>
            <p>
              <strong>Last Sign In:</strong>{' '}
              {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
