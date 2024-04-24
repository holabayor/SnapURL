import { Link, Pen, Trash, Unlink } from 'lucide-react';
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

// Utility function to convert camelCase or snake_case to Normal Case
const formatHeader = (header) => {
  if (header === 'id') return ''; // Skip id or any other fields you want to exclude
  // Convert snake_case
  let formatted = header.replace(/_/g, ' ');
  // Convert camelCase and add space before capital letters
  formatted = formatted.replace(/([A-Z])/g, ' $1');
  // Capitalize the first letter of each word
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return formatted.trim();
};

// Assuming `data` state is already populated with fetched data
const dataKeys =
  data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'id') : [];
const headers = dataKeys.map(formatHeader);

const History = () => {
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

  return (
    <Table>
      <TableHead>
        <TableRow className="bg-primary">
          {headers.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="border-b border-b-foreground border-b-opacity-85 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            {dataKeys.map((key) => (
              <TableCell key={`${rowIndex}-${key}`}>
                {columnIcons[key]
                  ? columnIcons[key](row[key], rowIndex)
                  : row[key]}
              </TableCell>
            ))}
            <TableCell>
              <span className="p-2 border rounded-full">
                <Pen size={16} strokeWidth={1.5} className="" />
              </span>
              <span className="p-2 border rounded-full">
                <Trash size={16} strokeWidth={1.5} className="" />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default History;
