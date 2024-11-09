import { onMessageListener } from 'lib/firebase';
import { useEffect } from 'react';

interface NotificationPayload {
  notification: {
    title: string;
    body: string;
  };
}

const NotificationListener = () => {
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        const typedPayload = payload as NotificationPayload;

        const { title, body } = typedPayload.notification;
        console.log('Notification:', title, body);
      })
      .catch((err: any) => {
        console.log('Failed to get notification:', err);
      });
  }, []);

  return null;
};

export default NotificationListener;
