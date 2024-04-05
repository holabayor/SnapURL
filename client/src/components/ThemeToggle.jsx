import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  const toggleMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const mobile = false;

  return (
    <>
      <div
        onClick={toggleMode}
        className="flex items-center cursor-pointer select-none text-white text-sm"
      >
        <div className="relative rounded-3xl bg-[#181e29] h-10 border border-[#c9ced6] dark:border-white p-4">
          {/* Slider background */}
          <div
            className={`absolute left-1 top-1 bottom-1 w-1/2 rounded-2xl bg-[#144ee3] transition-all duration-300 ease-in-out ${
              isDarkMode ? 'translate-x-[90%]' : 'translate-x-0'
            }`}
          ></div>
          {/* Text labels */}
          <div className="flex justify-around items-center h-full w-full">
            <span
              className={`flex items-center gap-1 z-10 mr-2 ${
                !isDarkMode ? 'mr-4 font-semibold' : ''
              }`}
            >
              <Sun size={16} />
              Light
            </span>
            <span
              className={`flex items-center gap-1 z-10 ml-2 ${
                isDarkMode ? 'ml-4 font-semibold' : ''
              }`}
            >
              <Moon size={16} />
              Dark
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={toggleMode}
        className="flex flex-col justify-center items-center cursor-pointer select-none text-white dark:text-[#0b101b] text-sm h-40 w-10"
      >
        <div className="relative rounded-3xl bg-[#181e29] h-full w-full border border-[#c9ced6] dark:border-white p-1 flex justify-center items-center">
          {' '}
          {/* Padding and flex adjustments */}
          {/* Slider background */}
          <div
            className={`absolute top-1 left-1 right-1 h-1/2 rounded-2xl bg-[#144ee3] transition-all duration-300 ease-in-out ${
              isDarkMode ? 'translate-y-[88%]' : 'translate-y-0'
            }`}
          ></div>
          {/* Text labels with vertical orientation */}
          <div className="absolute flex flex-col justify-around items-center h-full w-full">
            <span
              className={`flex  items-center gap-1 z-10 ${
                !isDarkMode ? 'font-semibold' : ''
              }`}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }} // CSS for vertical text
            >
              <Sun size={16} />
              Light
            </span>
            <span
              className={`flex items-center gap-1 z-10 ${
                isDarkMode ? 'font-semibold' : ''
              }`}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }} // CSS for vertical text
            >
              <Moon size={16} />
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
