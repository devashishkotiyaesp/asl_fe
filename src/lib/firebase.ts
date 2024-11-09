import Axios from 'axios'; // Ensure you have Axios imported
import {
  REACT_APP_API_URL,
  REACT_APP_FCM_API_KEY,
  REACT_APP_FCM_APP_ID,
  REACT_APP_FCM_AUTH_DOMAIN,
  REACT_APP_FCM_MEASUREMENT_ID,
  REACT_APP_FCM_MESSAGING_SENDER_ID,
  REACT_APP_FCM_PROJECT_ID,
  REACT_APP_FCM_STORAGE_BUCKET,
  REACT_APP_FCM_VAPID_KEY,
} from 'config';
import { initializeApp } from 'firebase/app';
import { getToken, onMessage } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging/sw';
import { AuthUserType } from 'reduxStore/types';

const firebaseConfig = {
  apiKey: REACT_APP_FCM_API_KEY,
  authDomain: REACT_APP_FCM_AUTH_DOMAIN,
  projectId: REACT_APP_FCM_PROJECT_ID,
  storageBucket: REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: REACT_APP_FCM_APP_ID,
  measurementId: REACT_APP_FCM_MEASUREMENT_ID,
  vapidKey: REACT_APP_FCM_VAPID_KEY,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Utility function to update the FCM token
const updateFCMToken = async (token: string, authToken: string) => {
  try {
    const response = await Axios.patch(
      `${REACT_APP_API_URL}/users/fcmToken`,
      {
        fcmToken: token,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating FCM token:', error);
    return {
      error: (error as { message: string }).message || 'Failed to update token',
    };
  }
};

export const requestPermissionAndGetToken = async (
  authToken: string,
  getUser: Partial<AuthUserType | null> | undefined
) => {
  try {
    const token = await getToken(messaging, { vapidKey: firebaseConfig.vapidKey });
    if (token) {
      if (getUser?.fcmToken !== token) {
        await updateFCMToken(token, authToken); // Update only if the tokens are different
      }
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
