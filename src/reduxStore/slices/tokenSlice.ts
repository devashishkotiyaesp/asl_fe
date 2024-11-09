import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'reduxStore/store';
import { TokenSliceType } from 'reduxStore/types';

const initialState: TokenSliceType = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state: TokenSliceType, action: PayloadAction<TokenSliceType>) {
      state.token = action.payload.token;
    },
    clearToken(state: TokenSliceType) {
      state.token = null;
    },
  },
});

export const { reducer } = tokenSlice;

export const { setToken, clearToken } = tokenSlice.actions;

export const getAuthToken = (state: RootStateType) => state.token.token;

export default tokenSlice;
