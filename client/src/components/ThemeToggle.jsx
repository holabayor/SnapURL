import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ mobile = false }) => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  const toggleMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <>
      <div
        onClick={toggleMode}
        className="flex flex-col justify-center items-center cursor-pointer text-secondary-foreground select-none text-sm h-40 w-10"
      >
        <div className="relative rounded-3xl bg-[#181e29] h-full w-full border border-[#c9ced6] dark:border-white p-1 flex justify-center items-center">
          <div
            className={`absolute top-1 left-1 right-1 h-1/2 rounded-2xl bg-[#144ee3] transition-all duration-300 ease-in-out ${
              isDarkMode ? 'translate-y-[88%]' : 'translate-y-0'
            }`}
          ></div>
          {/* Text labels with vertical orientation */}
          <div className="absolute flex flex-col justify-around items-center h-full w-full">
            <span
              className={`flex  items-center gap-1 z-10 ${
                !isDarkMode ? 'font-semibold text-white' : ''
              }`}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }} // CSS for vertical text
            >
              <Sun size={16} strokeWidth={1.5} />
              Light
            </span>
            <span
              className={`flex items-center gap-1 z-10 ${
                isDarkMode ? 'font-semibold text-white' : 'text-offWhite'
              }`}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }} // CSS for vertical text
            >
              <Moon size={16} strokeWidth={1.5} />
              Dark
            </span>
          </div>
        </div>
      </div>
      {mobile && (
        <div
          onClick={toggleMode}
          className="flex justify-center items-center cursor-pointer p-2"
          style={{ width: '60px', height: '60px' }}
        >
          <div className="relative">
            <div
              className={`transition-opacity duration-300 ease-in-out ${
                isDarkMode ? 'opacity-0' : 'opacity-100'
              } absolute`}
            >
              <Sun size={28} className="text-[#c9ced6]" />{' '}
            </div>
            <div
              className={`transition-opacity duration-300 ease-in-out ${
                !isDarkMode ? 'opacity-0' : 'opacity-100'
              } absolute`}
            >
              <Moon size={28} className="text-blue-500" />{' '}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
