import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

/**
 * Hook to fetch quote requests from Supabase (used as blog posts)
 */
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (post: any) => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([{ ...post, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      setPosts([data, ...posts]);
      toast({
        title: 'Success',
        description: 'Post created successfully',
      });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updatePost = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPosts(posts.map((p) => (p.id === id ? data : p)));
      toast({
        title: 'Success',
        description: 'Post updated successfully',
      });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update post';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase.from('quote_requests').delete().eq('id', id);

      if (error) throw error;
      setPosts(posts.filter((p) => p.id !== id));
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete post';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('quote_requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quote_requests' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPosts([payload.new, ...posts]);
          } else if (payload.eventType === 'UPDATE') {
            setPosts(posts.map((p) => (p.id === payload.new.id ? payload.new : p)));
          } else if (payload.eventType === 'DELETE') {
            setPosts(posts.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { posts, isLoading, error, fetchPosts, createPost, updatePost, deletePost };
};

/**
 * Hook to fetch users from Supabase
 */
export const useAdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*, user_roles(role)')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setUsers(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role })
        .select();

      if (error) throw error;
      setUsers(
        users.map((u) =>
          u.user_id === userId ? { ...u, user_roles: { role } } : u
        )
      );
      toast({
        title: 'Success',
        description: 'User role updated successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update role';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;

      setUsers(users.filter((u) => u.user_id !== userId));
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, fetchUsers, updateUserRole, deleteUser };
};

/**
 * Hook to fetch analytics data
 */
export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalUsers: 0,
    postsThisMonth: 0,
    monthlyData: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);

        // Fetch quote requests (posts)
        const { data: posts, error: postsError } = await supabase
          .from('quote_requests')
          .select('*');

        if (postsError) throw postsError;

        // Fetch users
        const { data: users, error: usersError } = await supabase
          .from('profiles')
          .select('*');

        if (usersError) throw usersError;

        const totalPosts = posts?.length || 0;
        const publishedPosts = posts?.filter((p: any) => p.status === 'completed').length || 0;
        const totalUsers = users?.length || 0;

        // Calculate posts this month
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const postsThisMonth = posts?.filter((p: any) => {
          const postDate = new Date(p.created_at);
          return postDate >= monthStart;
        }).length || 0;

        // Generate monthly data for charts
        const monthlyData = generateMonthlyData(posts || []);

        setAnalytics({
          totalPosts,
          publishedPosts,
          totalUsers,
          postsThisMonth,
          monthlyData,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch analytics';
        console.error('Analytics fetch error:', err);
        // Don't show toast on analytics error - just set default values
        setAnalytics({
          totalPosts: 0,
          publishedPosts: 0,
          totalUsers: 0,
          postsThisMonth: 0,
          monthlyData: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { ...analytics, isLoading };
};

/**
 * Helper function to generate monthly data for charts
 */
const generateMonthlyData = (posts: any[]) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const data = months.map((month, index) => {
    const count = posts.filter((p) => {
      const postDate = new Date(p.created_at);
      return postDate.getMonth() === index;
    }).length;
    return { month, count };
  });

  return data;
};
