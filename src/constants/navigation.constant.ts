import { FeatureEnum, PermissionEnum } from './common.constant';

// Routes which are publically available will be available here.
export const PublicNavigation: { [key: string]: string } = Object.freeze({
  login: '/auth/login',
  twoFA: '/auth/2fa',
  mfa: '/mfa',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  somethingWentWrong: '/something-went-wrong',
  GetAll: '/asl',
  AddLevel: 'asl',
  EditLevel: 'asl',
  DeleteLevel: 'asl',
  Static: '/static',
  Static2: '/static2',
  Static3: '/static3',
  Static4: '/static4',
  Static5: '/static5',
  acceptInvite: '/accept-invite',
});

// Routes related to cms will be available here.
export const CmsNavigation = Object.freeze({
  Home: '/',
  Course: '/cms-course',
  VirtualClasses: '/cms-v-classes',
  Dictionary: '/cms-dictionary',
  Org: '/cms-org',
  Blog: '/cms-blog',
  BlogDetails: '/cms-blog-details/:slug',
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
    studentView: {
      path: '/community',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/community/add/:type',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/community/edit/:id',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    viewDetail: {
      path: '/community/:id',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
  },
  // courses: {
  //   view: {
  //     path: '/courses',
  //     feature: FeatureEnum.LiveAssessment,
  //     permission: PermissionEnum.View,
  //   },
  //   assessmentView: {
  //     path: '/courses/assessment',
  //     feature: FeatureEnum.LiveAssessment,
  //     permission: PermissionEnum.View,
  //   },
  // },
  profile: {
    view: {
      path: '/profile',
      feature: FeatureEnum.Profile,
      permission: PermissionEnum.View,
    },
  },
  courses: {
    view: {
      path: '/courses',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    detailView: {
      path: '/courses/view/:id/:common_id',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    lessonView: {
      path: '/courses/:slug/lesson/:lesson_slug',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    list: {
      path: '/courses/all/:type_id',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    bookAppointment: {
      path: '/courses/book-appointment',
      feature: FeatureEnum.LiveAssessment,
      permission: PermissionEnum.View,
    },
    assessmentView: {
      path: '/courses/assessment',
      feature: FeatureEnum.LiveAssessment,
      permission: PermissionEnum.View,
    },
  },
  dictionary: {
    view: {
      path: '/dictionary',
      feature: FeatureEnum.Dictionary,
      permission: PermissionEnum.View,
    },
    viewSign: {
      path: '/dictionary/:vocabularyId',
      feature: FeatureEnum.Dictionary,
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
    viewUser: {
      path: '/manage-users/:userId/:role',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/manage-users/add-user',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
    add_user: {
      path: '/manage-users/add-users/:role',
      feature: FeatureEnum.User,
      permission: PermissionEnum.Create,
    },
  },
  deletedUser: {
    view: {
      path: '/manage-users/delete_user',
      feature: FeatureEnum.User,
      permission: PermissionEnum.View,
    },
  },
  courses: {
    add: {
      path: '/courses/add',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    edit: {
      path: '/courses/:common_id/:slug',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    view: {
      path: '/courses',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    list: {
      path: '/courses/all/:type_id',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    detailView: {
      path: '/courses/view/:id/:common_id',
      feature: FeatureEnum.Course,
      permission: PermissionEnum.View,
    },
    lessonView: {
      path: '/courses/:slug/lesson/:lesson_slug',
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
      path: '/settings',
    },
    asl_level: {
      path: '/settings/asl-level',
      feature: FeatureEnum.Blog,
      permission: PermissionEnum.View,
    },
    course_category: {
      path: '/settings/course-category',
      feature: FeatureEnum.Blog,
      permission: PermissionEnum.View,
    },
    organization_types: {
      path: '/settings/organization-types',
      feature: FeatureEnum.Blog,
      permission: PermissionEnum.View,
    },
    support_faqs: {
      path: '/settings/support-faqs',
      feature: FeatureEnum.SupportRequest,
      permission: PermissionEnum.View,
    },
    tags: {
      path: '/settings/tags',
      feature: FeatureEnum.Tags,
      permission: PermissionEnum.View,
    },
  },
  dashboard: {
    view: {
      path: '/admin',
      feature: FeatureEnum.Dashboard,
      permission: PermissionEnum.View,
    },
  },
  calendar: {
    view: {
      path: '/calendar',
      feature: FeatureEnum.Calendar,
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
      path: '/page-list',
    },
    edit: {
      path: '/page-list/:id',
    },
  },
  cms_homeAdmin: {
    view: {
      path: '/cms-home',
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
      path: '/static',
    },
  },
  reported_comments: {
    view: {
      path: '/reported-comments',
    },
  },
  feedback: {
    view: {
      path: '/feedback',
    },
  },
  event: {
    create: {
      path: '/create-event',
    },
    edit: {
      path: '/edit-event/:slug',
    },
  },
  blog: {
    view: {
      path: '/blog',
      feature: FeatureEnum.Blog,
      permission: PermissionEnum.View,
    },
    add: {
      path: '/blog/add',
      feature: FeatureEnum.Blog,
      permission: PermissionEnum.Create,
    },
    edit: {
      path: '/blog/update/:slug',
      feature: FeatureEnum.Blog,
      permission: PermissionEnum.Update,
    },
  },
  audit_log: {
    view: {
      path: '/audit-log',
      feature: FeatureEnum.AuditLog,
      permission: PermissionEnum.View,
    },
  },
  tag: {
    add: {
      path: '/tag/add',
      feature: FeatureEnum.Tags,
      permission: PermissionEnum.Create,
    },
    edit: {
      path: '/tag/update/:slug',
      feature: FeatureEnum.Tags,
      permission: PermissionEnum.Update,
    },
  },
});
export const OrganizationNavigation = Object.freeze({
  // settings: {
  //   view: {
  //     path: '/org/settings',
  //   },
  // },
  // courses: {
  //   view: {
  //     path: '/org/courses',
  //   },
  // },
  // home: {
  //   view: {
  //     path: '/org/home',
  //   },
  // },
  // dictionary: {
  //   view: {
  //     path: '/org/dictionary',
  //   },
  // },
  manageStudent: {
    view: {
      path: '/manage-student',
    },

    add: {
      path: '/manage-student/invite-student',
    },
  },
  deletedStudent: {
    view: {
      path: '/manage-student/deleted-student',
    },
  },
  manageTeachers: {
    view: {
      path: '/teachers',
    },
  },
  // Community: {
  //   view: {
  //     path: '/org/community',
  //   },
  // },
});
