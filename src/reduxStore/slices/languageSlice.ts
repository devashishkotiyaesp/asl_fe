import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { languageConstant } from 'constants/common.constant';
import { RootStateType } from 'reduxStore/store';
import { AllLanguages, LanguageType } from 'reduxStore/types';

const initialState: LanguageType = {
  language: '',
  allLanguages: [],
  defaultLanguage: languageConstant.DEFAULT,
};

const slice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state: LanguageType, action: PayloadAction<{ language: string }>) {
      if (action.payload.language !== '') state.language = action.payload.language;
    },
    setAllLanguage(
      state: LanguageType,
      action: PayloadAction<{ allLanguages?: AllLanguages[] }>
    ) {
      state.allLanguages = action.payload.allLanguages;
    },
  },
});

export const { reducer } = slice;
export const useLanguage = (state: RootStateType) => state.language;
export const getActiveLanguage = (state: RootStateType) => state.language.language;

export const { setLanguage, setAllLanguage } = slice.actions;

export default slice;
