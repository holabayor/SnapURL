import React from 'react';
import Popup from './ui/popup';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserPopup = ({ show, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/auth/login'); // Optionally redirect to the login page
    onClose(); // Close the popup if needed
  };
  return (
    <Popup show={show} onClose={onClose} className="top-16 right-16 w-52 h-56">
      <div className="font-semibold">
        <Link to={'/profile'}>Profile Settings</Link>
      </div>
      <div>
        <div onClick={logout} className="flex flex-nowrap items-center gap-2">
          Log out <LogOut size={14} strokeWidth={1.5} />
        </div>
      </div>
    </Popup>
  );
};

export default UserPopup;
