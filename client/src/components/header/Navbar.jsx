import { useState } from 'react';
import { Bell, BellOff, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notifications } from '@/constants';
import NotificationsPopup from '../NotificationsPopup';
import UserPopup from '../UserPopup';
import ThemeToggle from '../ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showBellPopup, setShowBellPopup] = useState(false);

  return (
    <nav className="relative flex gap-2 items-center">
      <ThemeToggle />
      {user ? (
        <>
          <Button
            onClick={() => setShowUserPopup(!showUserPopup)}
            variant={'secondary'}
            className="gap-4"
          >
            <span className="flex flex-col items-start">
              <small className="text-[8px] font-light">Welcome</small>
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
          <UserPopup
            show={showUserPopup}
            onClose={() => setShowUserPopup(false)}
          />

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
            onClose={() => setShowBellPopup(false)}
          />
        </>
      ) : (
        <>
          <Button
            variant={'secondary'}
            className="border-2 border-border gap-2"
          >
            <Link to="/auth/login">Login</Link>
            <LogIn size={16} strokeWidth={1.5} />
          </Button>
          <Button className="hidden sm:block text-white">
            <Link to="/auth/signup">Register Now</Link>
          </Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
