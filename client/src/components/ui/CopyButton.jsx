import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from './button';

const CopyButton = ({ content, index }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
      console.log('Link copied to clipboard:', content);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      size={'icon'}
      variant={'secondary'}
      className="relative ml-auto"
      onClick={copyToClipboard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Copy
        size={18}
        strokeWidth={1.5}
        className={`cursor-pointer hover:scale-110 transition-all ${
          copied ? 'text-blue-700' : ''
        }`}
      />
      {/* <span
        style={{ pointerEvents: 'none' }}
        className={`absolute -top-8 -right-2.5 bg-input text-foreground text-xs py-1 px-2 rounded-sm transition-opacity ${
          copied ? 'opacity-100' : hovered ? 'opacity-100' : 'opacity-0 '
        }`}
      >
        {copied ? 'Copied' : 'Copy'}
      </span> */}
    </Button>
  );
};

export default CopyButton;
