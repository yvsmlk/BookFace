export interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
  }
  
  export const notificationsData: Notification[] = [
    {
      id: 1,
      title: "Nouveau message",
      message: "Vous avez reçu un nouveau message de John Doe.",
      timestamp: "2023-04-11T10:30:00Z",
      isRead: false,
    },
    {
      id: 2,
      title: "Demande d'ami",
      message: "John Doe vous a envoyé une demande d'ami.",
      timestamp: "2023-04-10T15:45:00Z",
      isRead: true,
    },
    {
      id: 3,
      title: "Publication commentée",
      message: "Votre publication a été commentée par Jane Smith.",
      timestamp: "2023-04-09T09:15:00Z",
      isRead: true,
    },
    // Ajoutez d'autres notifications fictives ici
  ];
  