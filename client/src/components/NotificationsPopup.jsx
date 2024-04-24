import React from 'react';
import Popup from './ui/popup';

const NotificationsPopup = ({ notifications, show, onClose }) => {
  return (
    <Popup show={show} onClose={onClose} className="top-16 right-4 w-52 h-56">
      <h3 className="font-semibold border-b border-primary">Notifications</h3>
      {notifications ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="mt-2">
              <span className="font-medium">{notification.title}</span>
              <p className="font-light">{notification.message}</p>
              {/* <small className="font-extralight">
                  {new Date(notification.timestamp).toLocaleString()}
                </small> */}
            </li>
          ))}
        </ul>
      ) : (
        <div>No new notifications</div>
      )}
    </Popup>
  );
};

export default NotificationsPopup;
