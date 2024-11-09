import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'reduxStore/store';
import { TitleType } from 'reduxStore/types';

const initialState: TitleType = {
  title: 'ASL Shop',
};

const slice = createSlice({
  name: 'documentTitle',
  initialState,
  reducers: {
    setTitle(state: TitleType, action: PayloadAction<TitleType>) {
      state.title = action.payload.title;
    },
    setDefaultTitle(state: TitleType) {
      state.title = 'ASL Shop';
    },
  },
});

export const { reducer } = slice;
export const { setTitle, setDefaultTitle } = slice.actions;
export const getTitle = (state: RootStateType) => state.title.title;
export default slice;
