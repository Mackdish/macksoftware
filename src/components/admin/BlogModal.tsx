import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlogPost } from './BlogTable';

interface BlogModalProps {
  isOpen: boolean;
  post?: BlogPost;
  onClose: () => void;
  onSubmit: (data: Partial<BlogPost> & { content: string }) => Promise<void>;
  isLoading?: boolean;
}

const CATEGORIES = ['Technology', 'Design', 'Marketing', 'Business', 'Development', 'Other'];

export const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  post,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: 'Technology',
    content: '',
    published: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        summary: post.summary,
        category: post.category,
        content: post.summary, // Use summary as content placeholder
        published: post.published,
      });
    } else {
      setFormData({
        title: '',
        summary: '',
        category: 'Technology',
        content: '',
        published: false,
      });
    }
  }, [post, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Title *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter blog post title"
              required
              className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Summary *
            </label>
            <Textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Enter a brief summary"
              rows={3}
              required
              className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Content *
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter full blog post content"
              rows={6}
              required
              className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Support for Markdown formatting will be added in the future
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="published" className="text-sm font-medium text-slate-900 dark:text-white">
              Publish immediately
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
