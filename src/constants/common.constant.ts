export const languageConstant: { [key: string]: string } = {
  ES: 'es',
  EN: 'en',
  DEFAULT: 'en',
};

export enum LanguagesEnum {
  SPANISH = 'spanish',
  ENGLISH = 'english',
}

export const ToastVarient = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  WARNING: 'Warning',
};
// export const FeatureEnum = {
//   Dashboard: 'Dashboard',
//   Users: 'Users',
//   Home: 'Home',
//   Cms: 'Cms',
//   Course: 'Course',
//   Dictionary: 'Dictionary',
//   Profile: 'Profile',
// };
export enum FeatureEnum {
  Permission = 'Permission',
  RolePermission = 'RolePermission',
  Feature = 'Feature',
  Role = 'Role',
  User = 'User',
  Dashboard = 'Dashboard',
  Profile = 'Profile',
  Course = 'Course',
  Organization = 'Organization',
  Teacher = 'Teacher',
  Student = 'Student',
  Calendar = 'Calendar',
  Subscription = 'Subscription',
  Dictionary = 'Dictionary',
  Community = 'Community',
  AuditLog = 'AuditLog',
  Quiz = 'Quiz',
  Feedback = 'Feedback',
  Vocabularies = 'Vocabularies',
  SupportRequest = 'SupportRequest',
  Comments = 'Comments',
  Posts = 'Posts',
  Likes = 'Likes',
  Cms = 'Cms',
}

export const PermissionEnum = {
  Update: 'Update',
  Delete: 'Delete',
  Create: 'Create',
  View: 'View',
};

export const Roles = Object.freeze({
  Admin: 'Admin',
  Organization: 'Organization',
  Teacher: 'Teacher',
  Student: 'Student',
});

export enum ProvidersEnum {
  EMAIL = 'email',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
  MICROSOFT = 'microsoft',
}

export const LayoutConstant = {
  CMS: 'CMS',
  ...Roles,
};

export const ApiCallConstant: { [key: string]: string } = {
  es: 'spanish',
  en: 'english',
};
export enum OrganizationTypeEnum {
  SCHOOL_FOR_DEAF = 'School for Deaf',
  PUBLIC_PRIVATE_SCHOOL = 'Public/Private school',
  CORPORATION = 'Corporation',
  NON_PROFIT_ORG = 'Non Profit Org',
  HOME_SCHOOL = 'Home school',
  OTHER = 'Other',
}

export const OrganizationTypeOption = [
  {
    label: 'School for Deaf',
    value: 'School for Deaf',
  },
  {
    label: 'Public/Private school',
    value: 'Public/Private school',
  },
  {
    label: 'Corporation',
    value: 'Corporation',
  },
  {
    label: 'Non Profit Org',
    value: 'Non Profit Org',
  },
  {
    label: 'Home school',
    value: 'Home school',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];
