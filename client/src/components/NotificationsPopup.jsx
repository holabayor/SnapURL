import React from 'react';
import Popup from './ui/popup';

const NotificationsPopup = ({ notifications, show }) => {
  return (
    <Popup show={show} className="top-16 right-4 w-52 h-56">
      <div className="p-2 text-sm">
        <h3 className="font-semibold">Notifications</h3>
        {notifications ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="mt-2">
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <small>
                  {new Date(notification.timestamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <div>No new notifications</div>
        )}
      </div>
    </Popup>
  );
};

export default NotificationsPopup;
