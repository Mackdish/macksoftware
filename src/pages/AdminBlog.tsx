import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogTable, BlogPost } from '@/components/admin/BlogTable';
import { BlogModal } from '@/components/admin/BlogModal';
import { useBlogPosts } from '@/hooks/useAdminData';
import { useExportData } from '@/hooks/useExportData';
import { Plus, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Blog Management Page
 * Allows admins to create, edit, delete, and manage blog posts
 */
const BlogManagementPage: React.FC = () => {
  const { posts, isLoading, createPost, updatePost, deletePost } = useBlogPosts();
  const { exportToCSV } = useExportData();
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Published' && post.published) ||
      (statusFilter === 'Draft' && !post.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
    }
  };

  const handleSubmit = async (data: any) => {
    if (editingPost) {
      await updatePost(editingPost.id, data);
    } else {
      await createPost(data);
    }
    setShowModal(false);
    setEditingPost(undefined);
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    await updatePost(id, { published });
  };

  const handleExport = () => {
    const exportData = filteredPosts.map((post) => ({
      Title: post.title,
      Summary: post.summary,
      Category: post.category,
      Status: post.published ? 'Published' : 'Draft',
      'Created At': post.created_at,
    }));
    exportToCSV(exportData, 'blog-posts');
  };

  return (
    <AdminLayout currentPage="blog">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Blog Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </Button>
            <Button
              onClick={() => {
                setEditingPost(undefined);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={18} />
              New Post
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* Blog Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
          <BlogTable
            posts={filteredPosts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
            isLoading={isLoading}
          />
        </div>

        {/* Modal */}
        <BlogModal
          isOpen={showModal}
          post={editingPost}
          onClose={() => {
            setShowModal(false);
            setEditingPost(undefined);
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default BlogManagementPage;
