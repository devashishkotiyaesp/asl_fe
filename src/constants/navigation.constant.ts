import { FeatureEnum, PermissionEnum } from './common.constant';

// Routes which are publically available will be available here.
export const PublicNavigation = Object.freeze({
  login: '/auth/login',
  twoFA: '/auth/2fa',
  mfa: '/mfa',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  somethingWentWrong: '/something-went-wrong',
  GetAll: '/asl/get-all',
  AddLevel: 'asl/addLevel',
  EditLevel: 'asl/editLevel',
  DeleteLevel: 'asl/deleteLevel',
  Static: '/static',
  Static2: '/static2',
});

// Routes related to cms will be available here.
export const CmsNavigation = Object.freeze({
  Home: '/',
  Course: '/cms-course',
  VirtualClasses: '/cms-v-classes',
  Dictionary: '/cms-dictionary',
  Org: '/cms-org',
  Blog: '/cms-blog',
  BlogDetails: '/cms-blog-details',
  About: '/cms-about',
  StudentProfile: '/student-profile',
  Event: '/cms-event',
  Refer: '/cms-refer',
  GiftCard: '/cms-gift-card',
  Product: '/cms-product',
  PrivacyPolicy: '/privacy-policy',
  TermsOfUse: '/terms-of-use',
});

export const StudentNavigation = Object.freeze({
  dashboard: {
    view: {
      path: '/',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  users: {
    view: {
      path: '/manage_users',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
  },
  setting: {
    view: {
      path: '/settings',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
  },
  community: {
    view: {
      path: '/community',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/community/add/:type',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    viewDetail: {
      path: '/community/:id',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
  },
  profile: {
    view: {
      path: '/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
  },
});

export const PRIVATE_CMS_NAVIGATION = Object.freeze({
  home: {
    updateProfile: { view: { path: '/users/updateProfile' } },
  },
});

// Routes which will be accessible by multiple roles will be available here.
export const PrivateNavigation = Object.freeze({
  dashboard: {
    view: {
      path: '/',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  users: {
    view: {
      path: '/manage-users',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
  },
  courses: {
    view: {
      path: '/manage-courses',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
  },
  profile: {
    view: {
      path: '/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
  },
});

export const AdminNavigation = Object.freeze({
  settings: {
    view: {
      path: '/admin/settings',
    },
  },
  dashboard: {
    view: {
      path: '/admin',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  dictionary: {
    view: {
      path: '/dictionary',
    },
  },
  cms_management: {
    view: {
      path: '/admin/page-list',
    },
    edit: {
      path: '/admin/page-list/:id',
    },
  },
  cms_homeAdmin: {
    view: {
      path: '/admin/cms-home',
    },
  },
  profile: {
    view: {
      path: '/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
  },
  static: {
    view: {
      path: '/admin/static',
    },
  },
  reported_comments: {
    view: {
      path: '/admin/reported-comments',
    },
  },
  feedback: {
    view: {
      path: '/admin/feedback',
    },
  },
});
// export const OrganizationNavigation = Object.freeze({
//   settings: {
//     view: {
//       path: '/org/settings',
//     },
//   },
//   courses: {
//     view: {
//       path: '/org/courses',
//     },
//   },
//   home: {
//     view: {
//       path: '/org/home',
//     },
//   },
//   dictionary: {
//     view: {
//       path: '/org/dictionary',
//     },
//   },
//   Community: {
//     view: {
//       path: '/org/community',
//     },
//   },
// });
