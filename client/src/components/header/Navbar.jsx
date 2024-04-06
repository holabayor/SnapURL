import { useState } from 'react';
import { Bell, BellOff, ChevronDown, ChevronUp, LogIn } from 'lucide-react';
import Button from '@/components/ui/button';
import Popup from '../ui/popup';
import { user, notifications } from '@/data';
import NotificationsPopup from '../NotificationsPopup';

const Navbar = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showBellPopup, setShowBellPopup] = useState(false);

  return (
    <nav className="flex gap-2">
      {user ? (
        <>
          <Button
            onClick={() => setShowUserPopup(!showUserPopup)}
            variant={'secondary'}
            className="text-white gap-4"
          >
            <span className="flex flex-col items-start">
              <small className="text-[8px] font-thin">Welcome</small>
              <span className="leading-none">{user.firstName}</span>
            </span>
            <ChevronDown
              size={16}
              strokeWidth={1}
              className={`transition-transform duration-300 ${
                showUserPopup ? 'transform rotate-180' : ''
              }`}
            />
          </Button>
          <Popup show={showUserPopup} className="top-16 right-16">
            <div>
              <a href="#">Profile Settings</a>
            </div>
            <div>
              <a href="#">Log out</a>
            </div>
          </Popup>
          <Button
            size={'icon'}
            onClick={() => setShowBellPopup(!showBellPopup)}
            className="relative"
          >
            {notifications ? (
              <>
                <Bell size={16} />
                <span className="absolute flex h-3 w-3 top-0 right-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground"></span>
                </span>
              </>
            ) : (
              <BellOff size={16} />
            )}
          </Button>
          <NotificationsPopup
            show={showBellPopup}
            notifications={notifications}
          />
        </>
      ) : (
        <>
          <Button variant={'secondary'} className="text-white gap-2">
            Login
            <LogIn size={16} strokeWidth={1.5} />
          </Button>
          <Button className="hidden sm:block text-white">Register Now</Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
