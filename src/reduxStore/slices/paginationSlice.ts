import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'reduxStore/store';
import { PaginationType } from 'reduxStore/types';

const initialState = {
  currentPage: 1,
};

export const slice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    currentPageCount: (
      state: PaginationType,
      action: PayloadAction<PaginationType>
    ) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { reducer } = slice;

export const currentPageSelector = (state: RootStateType) => {
  return state.currentPage;
};

export const { currentPageCount } = slice.actions;

export default slice;
