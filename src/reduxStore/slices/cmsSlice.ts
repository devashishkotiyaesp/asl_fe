import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguagesEnum } from 'constants/common.constant';
import { RootStateType } from 'reduxStore/store';
import { CmsLanguageStateType } from 'reduxStore/types';

const initialState: CmsLanguageStateType = {
  activeLanguage: 0,
  formLanguage: LanguagesEnum.ENGLISH,
  nextFormLanguage: '',
  prevFormLanguage: '',
};

const slice = createSlice({
  name: 'cmsLanguage',
  initialState,
  reducers: {
    setLanguage(
      state: CmsLanguageStateType,
      action: PayloadAction<Partial<CmsLanguageStateType>>
    ) {
      const { activeLanguage, formLanguage, nextFormLanguage, prevFormLanguage } =
        action.payload;
      if (activeLanguage !== undefined) state.activeLanguage = activeLanguage;
      if (formLanguage !== undefined) state.formLanguage = formLanguage;
      if (nextFormLanguage !== undefined) state.nextFormLanguage = nextFormLanguage;
      if (prevFormLanguage !== undefined) state.prevFormLanguage = prevFormLanguage;
    },
  },
});

export const { reducer } = slice;
export const useCmsLanguage = (state: RootStateType) => state.cmsLanguage;
export const { setLanguage } = slice.actions;

export default slice;
