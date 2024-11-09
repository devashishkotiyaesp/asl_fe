importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: 'AIzaSyAyqGm66MYFRRlDrFbKEQuScJnn1fyDLNk',
  authDomain: 'the-asl-shop-1d8ac.firebaseapp.com',
  projectId: 'the-asl-shop-1d8ac',
  storageBucket: 'the-asl-shop-1d8ac.appspot.com',
  messagingSenderId: '18082154616',
  appId: '1:18082154616:web:767dd9b59fbb12c91bc58d',
  measurementId: 'G-FTGDXMRT7D',
  vapidKey:
    'BBj1ZJHanS8ZuxwfEU14b6jwpAhFuvdkZFLbrubgH6RVP2ZNaEouoqdY1F9LhzdNXnn4XoLRTcdOpR9oFTE2n4w',
});

// Create an instance of Firebase Messaging
const messaging = firebase?.messaging?.isSupported() ? firebase?.messaging() : null;

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
