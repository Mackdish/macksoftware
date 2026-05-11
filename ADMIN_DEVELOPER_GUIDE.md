# Admin Dashboard - Developer Extension Guide

## 🔧 Extending the Admin Dashboard

This guide helps you customize and extend the admin dashboard with new features.

---

## 📝 Common Extensions

### 1. Adding New Admin Pages

#### Step 1: Create the Page Component
```tsx
// src/pages/AdminNewFeature.tsx
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';

const NewFeaturePage: React.FC = () => {
  return (
    <AdminLayout currentPage="newfeature">
      <div className="space-y-6">
        {/* Your content here */}
      </div>
    </AdminLayout>
  );
};

export default NewFeaturePage;
```

#### Step 2: Update App.tsx
```tsx
import AdminNewFeature from "./pages/AdminNewFeature";

// Add route
<Route path="/admin/newfeature" element={<AdminNewFeature />} />
```

#### Step 3: Update AdminLayout Navigation
In `src/components/admin/AdminLayout.tsx`, add to `menuItems`:
```tsx
{ id: 'newfeature', label: 'New Feature', icon: IconComponent, path: '/admin/newfeature' }
```

---

### 2. Adding New API Hooks

Create a new hook in `src/hooks/useAdminData.ts`:

```tsx
/**
 * Hook to fetch custom data from Supabase
 */
export const useCustomData = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data: fetchedData, error: fetchError } = await supabase
        .from('your_table_name')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setData(fetchedData || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
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

  const createItem = async (item: any) => {
    try {
      const { data: newItem, error } = await supabase
        .from('your_table_name')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      setData([newItem, ...data]);
      toast({
        title: 'Success',
        description: 'Item created successfully',
      });
      return newItem;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create item';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateItem = async (id: string, updates: any) => {
    try {
      const { data: updated, error } = await supabase
        .from('your_table_name')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setData(data.map((item) => (item.id === id ? updated : item)));
      toast({
        title: 'Success',
        description: 'Item updated successfully',
      });
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update item';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('your_table_name')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setData(data.filter((item) => item.id !== id));
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete item';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, fetchData, createItem, updateItem, deleteItem };
};
```

---

### 3. Creating Reusable Table Components

```tsx
// src/components/admin/CustomTable.tsx
import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  sortable?: boolean;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export const CustomTable = <T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading = false,
}: CustomTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-6 py-3 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-8 text-center">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-8 text-center">
                No data found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4">
                    {col.render ? col.render(item[col.key], item) : String(item[col.key])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 flex gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(item)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(item.id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
```

---

### 4. Adding Custom Modals

```tsx
// src/components/admin/CustomModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  isLoading = false,
  children,
}) => {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({});
      onClose();
    } catch (error) {
      console.error('Modal submission error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {children}

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button type="button" onClick={onClose} variant="outline" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? 'Saving...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

---

### 5. Adding Real-time Subscriptions

```tsx
// Example: Add real-time subscription to a custom table
useEffect(() => {
  const subscription = supabase
    .channel('custom_table_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'your_table' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setData([payload.new, ...data]);
        } else if (payload.eventType === 'UPDATE') {
          setData(data.map((item) => (item.id === payload.new.id ? payload.new : item)));
        } else if (payload.eventType === 'DELETE') {
          setData(data.filter((item) => item.id !== payload.old.id));
        }
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [data]);
```

---

### 6. Custom Chart Components

```tsx
// Example: Add a custom pie chart
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const CustomPieChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);
```

---

## 🎨 Styling Customization

### Dark Mode
All components support dark mode with `dark:` prefix:
```tsx
<div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
  Content
</div>
```

### Custom Colors
Update Tailwind colors in `tailwind.config.ts`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

---

## 🔌 Adding API Integrations

### Example: Integration with External API

```tsx
const useExternalAPI = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchFromAPI = async (endpoint: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('API request failed');
      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'API error';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, fetchFromAPI };
};
```

---

## 📊 Adding Analytics Features

```tsx
// Example: Custom analytics card
const AnalyticsCard = ({
  title,
  value,
  trend,
  trendType,
}: {
  title: string;
  value: number;
  trend: string;
  trendType: 'up' | 'down';
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{title}</p>
    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
    <p className={`text-sm mt-2 ${trendType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
      {trend}
    </p>
  </div>
);
```

---

## ✅ Best Practices

### 1. Component Structure
- Keep components small and focused
- Use TypeScript for type safety
- Document complex logic with comments

### 2. Error Handling
```tsx
try {
  // Operation
  toast({ title: 'Success', description: 'Operation completed' });
} catch (error) {
  toast({
    title: 'Error',
    description: error instanceof Error ? error.message : 'Unknown error',
    variant: 'destructive',
  });
}
```

### 3. Loading States
```tsx
{isLoading ? (
  <div className="text-center py-8">Loading...</div>
) : data.length === 0 ? (
  <div className="text-center py-8">No data found</div>
) : (
  // Render data
)}
```

### 4. Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

---

## 🧪 Testing Your Extensions

1. **Manual Testing**
   - Test CRUD operations
   - Check error handling
   - Verify responsive design
   - Test dark mode

2. **Data Validation**
   - Check database constraints
   - Test form validation
   - Verify data integrity

3. **Performance**
   - Monitor API response times
   - Check database query efficiency
   - Profile component rendering

---

## 📚 Resources for Extension

- [React Hooks Documentation](https://react.dev/reference/react)
- [Supabase JavaScript Guide](https://supabase.com/docs/reference/javascript)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts API](https://recharts.org/en-US/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🚀 Performance Tips

1. **Lazy Load Data**
   - Implement pagination for large datasets
   - Use limit/offset in queries

2. **Cache Data**
   - Use React Query for caching
   - Avoid refetching unnecessary data

3. **Optimize Rendering**
   - Use React.memo for expensive components
   - Implement useCallback for event handlers

4. **Database Optimization**
   - Create proper indexes
   - Use efficient queries
   - Monitor slow queries

---

## 🔐 Security Considerations

1. **Validate Input**
   - Server-side validation in Supabase
   - Client-side validation in forms

2. **Authentication**
   - Check user roles before operations
   - Use RLS policies

3. **API Security**
   - Use HTTPS in production
   - Validate API responses
   - Implement rate limiting

---

## 📝 Code Examples Repository

Check the existing components for more examples:
- `BlogTable.tsx` - Table with actions
- `BlogModal.tsx` - Form modal
- `DashboardSummary.tsx` - Card components
- `useAdminData.ts` - API hooks

---

## 🆘 Troubleshooting Extensions

### Issue: Component not rendering
- Check imports are correct
- Verify component is exported
- Check route is added in App.tsx

### Issue: Data not loading
- Verify table exists in Supabase
- Check RLS policies
- Review console for error messages

### Issue: Styling issues
- Ensure Tailwind classes are used
- Check dark mode classes
- Verify responsive breakpoints

---

## 📞 Support

For questions about extending the dashboard:
1. Review existing components for patterns
2. Check documentation files
3. Consult framework documentation
4. Review error messages in console

---

**Happy Extending! 🚀**

---

**Version**: 1.0.0  
**Last Updated**: January 2026
