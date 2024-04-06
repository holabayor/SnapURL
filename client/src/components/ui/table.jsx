// src/components/Table.jsx
import React from 'react';
import { cn } from '@/lib/utils';

const Table = ({ className, children, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table className={cn('min-w-full table-auto', className)} {...props}>
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ className, children, ...props }) => (
  <thead className={cn('bg-', className)} {...props}>
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
      'px-6 py-3 text-left font-semibold whitespace-nowrap',
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
      'flex-inline flex-nowrap items-center px-6 py-4 text-left whitespace-nowrap text-sm',
      className
    )}
    {...props}
  >
    {children}
  </td>
);

// Export the table components
export { Table, TableHead, TableBody, TableHeaderCell, TableRow, TableCell };
