import React, { useState } from 'react';
import { Link, Pen, Trash, Unlink, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './ui/table';
import { data } from '../data';
import CopyButton from './ui/CopyButton';

const formatHeader = (header) => {
  if (header === 'id') return '';
  let formatted = header.replace(/_/g, ' ');
  formatted = formatted.replace(/([A-Z])/g, ' $1');
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return formatted.trim();
};

const dataKeys =
  data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'id') : [];
const headers = dataKeys.map(formatHeader);

const columnIcons = {
  status: (value) => {
    switch (value) {
      case 'active':
        return (
          <>
            <span className="bg-green-300 dark:bg-green-700 p-2 border rounded-full">
              <Link size={16} strokeWidth={1.5} className="" />{' '}
            </span>
            Active
          </>
        );
      case 'inactive':
        return (
          <>
            <span className="bg-yellow-200 dark:bg-yellow-300 dark:bg-opacity-35 p-2 border rounded-full opacity-60">
              <Unlink
                size={16}
                strokeWidth={1.5}
                className=" dark:text-yellow-300 "
              />
            </span>
            Inactive
          </>
        );

      default:
        return null;
    }
  },
  shortLink: (value, rowIndex) => {
    return (
      <>
        {value}
        <CopyButton content={value} index={rowIndex} />
      </>
    );
  },
  originalLink: (value) => {
    const faviconURL = `https://www.google.com/s2/favicons?domain=${value}`;
    return (
      <>
        <img src={faviconURL} alt="favicon" className="w-6 h-6" />
        {value}
      </>
    );
  },
};

const iHistory = () => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (rowIndex) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex);
    } else {
      newExpandedRows.add(rowIndex);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="table-responsive">
      {' '}
      {/* Added responsive table wrapper */}
      <Table>
        <TableHead>
          <TableRow className="bg-primary">
            {headers.map((header) => (
              <TableHeaderCell key={header} className="table-cell-wrap">
                {header}
              </TableHeaderCell>
            ))}
            <TableHeaderCell className="table-cell-wrap">
              Actions
            </TableHeaderCell>
            <TableHeaderCell className="table-cell-wrap">
              Expand
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <>
              <TableRow
                key={rowIndex}
                className="border-b border-b-foreground border-b-opacity-85 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {dataKeys.map((key) => (
                  <TableCell
                    key={`${rowIndex}-${key}`}
                    className="table-cell-wrap"
                  >
                    {columnIcons[key]
                      ? columnIcons[key](row[key], rowIndex)
                      : row[key]}
                  </TableCell>
                ))}
                <TableCell className="table-cell-wrap">
                  <span className="p-2 border rounded-full">
                    <Pen size={16} strokeWidth={1.5} className="" />
                  </span>
                  <span className="p-2 border rounded-full">
                    <Trash size={16} strokeWidth={1.5} className="" />
                  </span>
                </TableCell>
                <TableCell
                  onClick={() => toggleRowExpansion(rowIndex)}
                  className="cursor-pointer table-cell-wrap"
                >
                  {expandedRows.has(rowIndex) ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </TableCell>
              </TableRow>
              {expandedRows.has(rowIndex) && (
                <TableRow key={`details-${rowIndex}`}>
                  <TableCell
                    colSpan={dataKeys.length + 2}
                    className="table-cell-wrap"
                  >
                    More details here or any additional content that doesn't fit
                    above.
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// export default iHistory;
