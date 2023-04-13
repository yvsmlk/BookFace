import React from "react";
import { Notification } from "./NotificationsData"; // Importer l'interface de Notification si nécessaire

interface NotificationItemProps {
  notification: Notification;
  onDelete: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onDelete,
}) => {
  const { title, message, timestamp, isRead } = notification;

  return (
    <div
      className={`bg-white rounded-lg p-4 ${
        isRead ? "border-green-800" : "border-grey-500"
      } border-2`}
    >
      <h2
        className={`text-xl font-semibold mb-2 ${
          isRead ? "text-green-700" : "text-green-800"
        }`}
      >
        {title}
      </h2>
      <p className="text-gray-600">{message}</p>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-400 text-sm">{timestamp}</p>
        {!isRead && (
          <button
            onClick={onDelete}
            className="text-green-500 text-sm font-medium focus:outline-none"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
