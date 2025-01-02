import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'reduxStore/store';
import { CourseCommonType, DropdownType } from 'reduxStore/types';

const initialState: CourseCommonType = {
  aslLevel: [],
  courseType: [],
  courseCategory: [],
};

const slice = createSlice({
  name: 'courseCommon',
  initialState,
  reducers: {
    setCommonAslLevel(
      state: CourseCommonType,
      action: PayloadAction<DropdownType[]>
    ) {
      state.aslLevel = action.payload;
    },
    setCommonCourseCategory(
      state: CourseCommonType,
      action: PayloadAction<DropdownType[]>
    ) {
      state.courseCategory = action.payload;
    },
    setCommonCourseTypes(
      state: CourseCommonType,
      action: PayloadAction<DropdownType[]>
    ) {
      state.courseType = action.payload;
    },
  },
});

export const { reducer } = slice;

export const { setCommonAslLevel, setCommonCourseCategory, setCommonCourseTypes } =
  slice.actions;

export const getCommonAslLevel = (state: RootStateType) =>
  state.courseCommon.aslLevel;
export const getCommonCourseCategory = (state: RootStateType) =>
  state.courseCommon.courseCategory;
export const getCommonCourseTypes = (state: RootStateType) =>
  state.courseCommon.courseType;
export const getCommonCourse = (state: RootStateType) => state.courseCommon;

export default slice;
