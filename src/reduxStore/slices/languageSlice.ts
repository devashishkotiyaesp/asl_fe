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
    setDefaultLanguage(
      state: LanguageType,
      action: PayloadAction<{ defaultLanguage: string }>
    ) {
      state.defaultLanguage = action.payload.defaultLanguage;
    },
  },
});

export const { reducer } = slice;
export const useLanguage = (state: RootStateType) => state.language;
export const useDefaultLanguage = (state: RootStateType) =>
  state.language.defaultLanguage;

export const { setLanguage, setAllLanguage, setDefaultLanguage } = slice.actions;

export default slice;
