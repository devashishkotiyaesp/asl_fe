export const languageConstant: { [key: string]: string } = {
  ES: 'es',
  EN: 'en',
  DEFAULT: 'en',
};

export enum LanguagesEnum {
  SPANISH = 'spanish',
  ENGLISH = 'english',
}

export const ToastVariant = {
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
  Blog = 'Blog',
  Tags = 'Tags',
  LiveAssessment = 'LiveAssessment',
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
  MICROSOFT = 'azure',
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

export enum CourseTypeEnum {
  SELF_PACED_COURSES = 'Self Paced Courses',
  IN_PERSON_CLASS = 'In-Person Class',
  ZOOM_CLASS = 'Zoom Class',
  APPOINTMENTS = 'Appointments',
  MINI_LESSONS = 'Mini Lessons',
  FULL_COURSE = 'Full Course',
}

export enum CourseSubTypeEnum {
  MINI_COURSE = 'Mini Course',
}

export enum CourseMaterialTypeEnum {
  PRACTICE = 'practice',
  TEACHING = 'teaching',
}
export const TABLE_DATA_LIMIT = 10;

export enum StatusTypeEnum {
  REQUEST = 'Request',
  RESPONDED = 'Responded',
  CLOSED = 'Closed',
}

export enum ReplyTypeEnum {
  USER = 'User',
  ADMIN = 'Admin',
}
export enum CourseProgressEnum {
  Pending = 'pending',
  Completed = 'completed',
  In_Progress = 'in-progress',
}
