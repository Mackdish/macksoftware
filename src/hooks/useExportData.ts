/**
 * Hook for exporting data to CSV format
 */
export const useExportData = () => {
  const exportToCSV = (data: any[], filename: string) => {
    try {
      if (!data || data.length === 0) {
        alert('No data to export');
        return;
      }

      // Get column headers from first object
      const headers = Object.keys(data[0]);

      // Create CSV header row
      const csvHeaders = headers.map((h) => `"${h}"`).join(',');

      // Create CSV data rows
      const csvRows = data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape quotes and wrap in quotes
            if (value === null || value === undefined) {
              return '""';
            }
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(',')
      );

      // Combine headers and rows
      const csv = [csvHeaders, ...csvRows].join('\n');

      // Create blob and download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export data');
    }
  };

  return { exportToCSV };
};
