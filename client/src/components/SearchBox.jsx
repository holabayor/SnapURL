import React, { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import Button from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const SearchBox = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [autoPaste, setAutoPaste] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = async () => {
    setIsFocused(true);
    if (autoPaste) {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center p-1 w-full h-10 sm:h-14 md:h-16 border-2 border-border rounded-full">
        <span className="pl-2 md:pl-6">
          <LinkIcon className="text-gray-500" size={20} strokeWidth={2} />
        </span>
        <input
          type="search"
          placeholder="Enter a link here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          className="flex flex-grow bg-transparent px-1 xs:px-2 md:px-6 text-sm md:text-base outline-none ring-offset-0 placeholder:font-light"
        />
        <Button
          type="submit"
          className="h-full font-bold text-xs sm:text-base text-white"
        >
          Shorten
        </Button>
        <div className="flex-none"></div>
      </div>
      <div>
        <div className="my-4 flex items-center justify-center space-x-4">
          <Switch
            id="auto-paste"
            checked={autoPaste}
            onCheckedChange={() => setAutoPaste(!autoPaste)}
          />
          <Label
            htmlFor="auto-paste"
            className="font-normal text-sm lg:text-base"
          >
            Auto Paste from Clipboard
          </Label>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
