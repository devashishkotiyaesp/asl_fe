import { combineReducers } from '@reduxjs/toolkit';
import { reducer as authReducer } from './slices/authSlice';
import { reducer as cmsLanguageReducer } from './slices/cmsSlice';
import { reducer as documentTitleReducer } from './slices/documentTitleSlice';
import { reducer as languageReducer } from './slices/languageSlice';
import { reducer as layoutReducer } from './slices/layoutSlice';
import { reducer as paginationReducer } from './slices/paginationSlice';
import { reducer as rolePermissionsReducer } from './slices/rolePermissionSlice';
import { reducer as socketReducer } from './slices/socketSlice';
import { reducer as toastReducer } from './slices/toastSlice';
import { reducer as tokenReducer } from './slices/tokenSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  commonToast: toastReducer,
  token: tokenReducer,
  currentPage: paginationReducer,
  rolePermission: rolePermissionsReducer,
  socket: socketReducer,
  language: languageReducer,
  title: documentTitleReducer,
  layout: layoutReducer,
  cmsLanguage: cmsLanguageReducer,
});

export default rootReducer;
