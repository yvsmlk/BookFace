import React, { useState } from "react";
import NotificationItem from "./NotificationItem"; // Composant pour les éléments de notification
import { notificationsData } from "./NotificationsData"; // Données de notification fictives
// Fichier CSS pour la mise en page avec Tailwind


const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  

  return (
    <div className=' flex flex-1  '>
      <header className=" py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-green-800">Notifications</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        {notifications.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notifications.map((notification) => (
              <li key={notification.id}>
                <NotificationItem
                  notification={notification}
                  onDelete={() =>
                    setNotifications((prevNotifications) =>
                      prevNotifications.filter(
                        (n) => n.id !== notification.id
                      )
                    )
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-800 text-center mt-8">
            Aucune notification pour le moment.
          </p>
        )}
      </main>
    </div>
  );
};

export default NotificationsPage;
