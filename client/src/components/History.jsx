import { Copy, CopyCheck, Link, Pen, Trash, Unlink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './ui/table';
import { data } from '../data';

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
  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      console.log('Link copied to clipboard:', value);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const columnIcons = {
    status: (value) => {
      switch (value) {
        case 'active':
          return (
            <>
              <Link size={14} strokeWidth={1} className="text-green-500" />{' '}
              Active
            </>
          );
        case 'inactive':
          return (
            <>
              <Unlink size={14} strokeWidth={1} className="text-yellow-500" />
              Inactive
            </>
          );

        default:
          return null;
      }
    },
    shortLink: (value) => {
      return (
        <>
          {value}
          <Copy
            onClick={() => copyToClipboard(value)}
            size={18}
            strokeWidth={1.5}
            className="ml-auto cursor-pointer hover:scale-125 transition-all"
          />
        </>
      );
    },
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {dataKeys.map((key) => (
              <TableCell key={`${rowIndex}-${key}`}>
                {/* Custom rendering for specific columns can go here */}
                {columnIcons[key] ? columnIcons[key](row[key]) : row[key]}
              </TableCell>
            ))}
            <TableCell>
              <Pen size={14} strokeWidth={1} />
              <Trash size={14} strokeWidth={1} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default History;
