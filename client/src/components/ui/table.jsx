import React from 'react';
import { cn } from '@/lib/utils';

const Table = ({ className, children, ...props }) => {
  return (
    <div className="min-w-full table-auto rounded-lg overflow-auto">
      <table
        className={cn(
          // 'min-w-full table-auto rounded-lg overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ className, children, ...props }) => (
  <thead className={cn('', className)} {...props}>
    {children}
  </thead>
);

const TableBody = ({ className, children, ...props }) => (
  <tbody className={cn('bg-background text-foreground', className)} {...props}>
    {children}
  </tbody>
);

const TableRow = ({ className, children, ...props }) => (
  <tr className={cn(className)} {...props}>
    {children}
  </tr>
);

const TableHeaderCell = ({ className, children, ...props }) => (
  <th
    className={cn(
      'px-4 lg:px-6 py-3 md:py-4 text-left font-semibold whitespace-nowrap',
      className
    )}
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({ className, children, ...props }) => (
  <td
    className={cn(
      'px-4 lg:px-6 py-2 md:py-4 text-left whitespace-nowrap text-sm',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">{children}</div>
  </td>
);

// Export the table components
export { Table, TableHead, TableBody, TableHeaderCell, TableRow, TableCell };
