import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'reduxStore/store';
import { IVocabulary, VocabSliceType } from 'reduxStore/types';

const initialState: VocabSliceType = {
  vocabularies: [],
  currentPage: 1,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setVocabularies(state: VocabSliceType, action: PayloadAction<IVocabulary[]>) {
      state.vocabularies = action.payload;
      state.currentPage = 1;
    },
    addVocabularies(state: VocabSliceType, action: PayloadAction<IVocabulary[]>) {
      state.vocabularies = [...state.vocabularies, ...action.payload];
    },
    setCurrentPage(state: VocabSliceType, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { reducer } = slice;

export const { setVocabularies, addVocabularies, setCurrentPage } = slice.actions;

export const getVocabularies = (state: RootStateType) => state.vocabularies;

export default slice;
