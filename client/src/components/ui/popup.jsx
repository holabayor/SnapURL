// src/components/ui/Popup.jsx
import { cn } from '@/lib/utils';
import React from 'react';

const Popup = ({ className, children, show, ...props }) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        `absolute max-w-64 max-h-52 overflow-y-auto px-4 py-2 text-sm rounded-md shadow-lg bg-secondary z-50 transition-all scrollbar-hide ${
          show ? ' translate-y-0 opacity-100' : 'opacity-0 invisible'
        }`,
        className
      )}
      aria-hidden={!show}
      {...props}
    >
      {children}
    </div>
  );
};

export default Popup;
