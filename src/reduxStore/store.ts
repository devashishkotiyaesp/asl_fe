import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { REACT_APP_NODE_ENV } from 'config';
import persistStore from 'redux-persist/es/persistStore';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'language'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: REACT_APP_NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch: () => AppDispatchType = useDispatch;

export type RootStateType = ReturnType<typeof store.getState>;
export default store;
export const persistor = persistStore(store);
