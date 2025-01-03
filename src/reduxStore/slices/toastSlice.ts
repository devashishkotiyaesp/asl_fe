import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { RootStateType } from 'reduxStore/store';
import { ToastCommonSliceType, ToastSliceType } from 'reduxStore/types';

const initialState: ToastCommonSliceType = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'commonToast',
  initialState,
  reducers: {
    setToast(state: ToastCommonSliceType, action: PayloadAction<ToastSliceType>) {
      state.toasts.push({
        message: action.payload.message,
        type: action.payload.type,
        id: action.payload.id,
        variant: action.payload.variant,
      });
    },
    removeToast(state: ToastCommonSliceType, action: PayloadAction<{ id: number }>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload.id);
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});
export const { reducer } = toastSlice;
export const { setToast, removeToast } = toastSlice.actions;
export const getToast = (state: RootStateType) => state.commonToast.toasts;

export default toastSlice;
