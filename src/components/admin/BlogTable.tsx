import React, { useState } from 'react';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  published: boolean;
  created_at: string;
}

interface BlogTableProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
  isLoading?: boolean;
}

export const BlogTable: React.FC<BlogTableProps> = ({
  posts,
  onEdit,
  onDelete,
  onTogglePublish,
  isLoading = false,
}) => {
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedPosts.size === posts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(posts.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPosts(newSelected);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedPosts.size === posts.length && posts.length > 0}
                onChange={toggleSelectAll}
                className="rounded"
              />
            </th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
              Title
            </th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
              Category
            </th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
              Status
            </th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
              Created
            </th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                Loading...
              </td>
            </tr>
          ) : posts.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                No blog posts found
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPosts.has(post.id)}
                    onChange={() => toggleSelect(post.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {post.summary}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onTogglePublish(post.id, !post.published)}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      post.published
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-200'
                    }`}
                  >
                    {post.published ? (
                      <>
                        <Eye size={14} />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff size={14} />
                        Draft
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {formatDate(post.created_at)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
