import { cn } from '@/lib/utils';

const Input = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h:8 sm:h-11 w-full rounded-3xl border-4 border-input bg-background px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
};
Input.displayName = 'Input';

const SearchBox = ({ className, ...props }) => {
  return (
    <input
      type="search"
      className={cn(
        'flex h:8 sm:h-11 w-full outline-none ring-offset-0',
        className
      )}
      {...props}
    />
  );
};
SearchBox.displayName = 'SearchBox';

export { Input, SearchBox };
