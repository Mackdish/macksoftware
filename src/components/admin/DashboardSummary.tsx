import React from 'react';
import { FileText, Users, TrendingUp } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 ${
                changeType === 'positive'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">{icon}</div>
      </div>
    </div>
  );
};

interface DashboardSummaryProps {
  totalPosts: number;
  publishedPosts: number;
  totalUsers: number;
  postsThisMonth?: number;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  totalPosts,
  publishedPosts,
  totalUsers,
  postsThisMonth = 0,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        title="Total Blog Posts"
        value={totalPosts}
        icon={<FileText className="text-blue-600" size={24} />}
        change={`${postsThisMonth} this month`}
        changeType="positive"
      />
      <SummaryCard
        title="Published Posts"
        value={publishedPosts}
        icon={<TrendingUp className="text-green-600" size={24} />}
        change={`${Math.round((publishedPosts / totalPosts) * 100)}% published`}
        changeType="positive"
      />
      <SummaryCard
        title="Total Users"
        value={totalUsers}
        icon={<Users className="text-purple-600" size={24} />}
        change="Active users"
        changeType="positive"
      />
      <SummaryCard
        title="Engagement Rate"
        value="87%"
        icon={<TrendingUp className="text-orange-600" size={24} />}
        change="↑ 5% from last week"
        changeType="positive"
      />
    </div>
  );
};
