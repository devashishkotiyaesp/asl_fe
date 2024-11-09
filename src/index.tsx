import App from 'App';
import { setupAxios } from 'base-axios';
import NotificationListener from 'components/PushNotification';
import SocketComponent from 'components/Socket/SocketComponent';
import Toast from 'components/Toast';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import './localization';
import store, { persistor } from './reduxStore/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

setupAxios(store);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch((err) => {
      console.log('Service worker registration failed, error:', err);
    });
}

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NotificationListener />
      <SocketComponent />
      <Toast />
      <App />
    </PersistGate>
  </Provider>
);
