import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'reduxStore/store';
import { AuthSliceType, OrganizationType } from 'reduxStore/types';

const initialState: AuthSliceType = {
  user: null,
  isAuthenticated: false,
  organization: [],
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setUserData(state, action: PayloadAction<AuthSliceType>) {
      const { user } = action.payload;
      if (user) {
        state.user = {
          ...user,
        };
      } else {
        state.user = null;
      }
    },
    setUserProfile(state: AuthSliceType, action: PayloadAction<string>) {
      if (state.user) state.user.profile_image = action.payload;
    },
    setUserDateFormat(state: AuthSliceType, action: PayloadAction<string>) {
      if (state.user) {
        state.user.date_format = action.payload;
      }
    },
    setUserOrganization(
      state: AuthSliceType,
      action: PayloadAction<OrganizationType[]>
    ) {
      if (state.organization) {
        state.organization = action.payload;
      }
    },
    setCredentials(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      const { user } = action.payload;
      if (user) {
        state.user = action.payload.user;
      } else {
        state.user = null;
      }
    },
    setLogoutData(state: AuthSliceType) {
      state.user = null;
    },
  },
});

export const { reducer } = slice;

export const {
  setCredentials,
  setLogoutData,
  setAuthenticated,
  setUserData,
  setUserProfile,
  setUserDateFormat,
  setUserOrganization,
} = slice.actions;

export const getAuth = (state: RootStateType) => state.auth;

export const getIsAuthenticated = (state: RootStateType) =>
  state.auth.isAuthenticated;

export const getCurrentUser = (state: RootStateType) => state.auth.user;

export const getOrganization = (state: RootStateType) => state.auth.organization;

export const getCurrentUserDateFormat = (state: RootStateType) =>
  state.auth.user?.date_format;

export const getCurrentUserProfileImage = (state: RootStateType) =>
  state.auth.user?.profile_image;

export default slice;
