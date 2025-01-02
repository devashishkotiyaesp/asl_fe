/* eslint-disable no-underscore-dangle */
import { Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
import { ApiCallConstant, ToastVariant } from 'constants/common.constant';
import { setToast } from 'reduxStore/slices/toastSlice';
import { setToken } from 'reduxStore/slices/tokenSlice';
import { refreshAuthToken } from 'utils';

export const Axios = axios.create({ baseURL: `${REACT_APP_API_URL}` });

export const setupAxios = (store: Store) => {
  // Logic to set token in header
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  Axios.interceptors.request.use((request) => {
    const authToken = store.getState().token?.token || null;
    const language = store.getState().language?.language || null;
    request.headers['accept-timezone'] = timeZone;

    if (request.headers !== undefined && authToken) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    if (language) {
      request.headers['accept-language'] = ApiCallConstant[language];
    }
    request.withCredentials = true;
    return request;
  });
  // Logic to show toast message on API response
  Axios.interceptors.response.use(
    (res) => {
      const { toast } = res.data;
      if (toast) {
        const toastId = new Date().getTime();
        store.dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: res.data.message,
            type: res.data.response_type,
            id: toastId,
          })
        );
      }
      return res.data;
    },
    async (e) => {
      // Logic to call refresh token on Unauthorized error from Backend
      const originalRequest = e.config;
      if (e.response && e.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshAuthToken(store);

        store.dispatch(setToken({ token: newAccessToken }));
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // call original request on token refresh
        return Axios(originalRequest);
      }
      if (
        e.response.status === 400 ||
        e.response.status === 500 ||
        e.response.status === 401 ||
        e.response.status === 422
      ) {
        const { toast } = e.response.data;
        if (toast) {
          const toastId = new Date().getTime();
          store.dispatch(
            setToast({
              message: e.response.data.message,
              variant: 'Warning',
              type: e.response.data.response_type,
              id: toastId,
            })
          );
        }
      }
      throw e.response.data;
    }
  );
};

export default axios;
