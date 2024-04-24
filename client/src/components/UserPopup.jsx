import React from 'react';
import Popup from './ui/popup';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const UserPopup = ({ show, onClose }) => {
  return (
    <Popup show={show} onClose={onClose} className="top-16 right-16 w-52 h-56">
      <div className="font-semibold">
        <Link to={'/profile'}>Profile Settings</Link>
      </div>
      <div>
        <Link to="#" className="flex flex-nowrap items-center gap-2">
          Log out <LogOut size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </Popup>
  );
};

export default UserPopup;
