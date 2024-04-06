// src/components/ui/Popup.jsx
import { cn } from '@/lib/utils';
import React from 'react';

const Popup = ({ className, children, show, ...props }) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        `absolute max-w-56 px-4 py-2 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 z-50 transition-all ${
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
