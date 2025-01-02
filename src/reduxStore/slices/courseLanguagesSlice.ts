import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'reduxStore/store';
import { CoursesLanguagesType } from 'reduxStore/types';

const initialState: CoursesLanguagesType = {
  slug_language_pair: [],
  course_languages: [],
};

const slice = createSlice({
  name: 'courseLanguages',
  initialState,
  reducers: {
    setCourseLanguages(
      state: CoursesLanguagesType,
      action: PayloadAction<Partial<CoursesLanguagesType>>
    ) {
      state.slug_language_pair = action.payload.slug_language_pair ?? [];
      state.course_languages = action.payload.course_languages ?? [];
    },
  },
});

export const { reducer } = slice;
export const useCourseLanguages = (state: RootStateType) => state.courseLanguages;
export const { setCourseLanguages } = slice.actions;

export default slice;
