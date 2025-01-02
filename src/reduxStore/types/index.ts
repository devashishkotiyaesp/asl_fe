export type RoleType = {
  id: number;
  name: string;
};

export type PermissionType = {
  id: number;
  name: string;
};

export type RolePermissionType = {
  id: number;
  roleId: string;
  permissionId: string;
  featureId: string;
  feature_name?: string;
  permission_name?: string;
  access: string[];
};

export type RoleSliceType = {
  roles: RoleType[];
  rolePermissions: RolePermissionType[];
  permission: PermissionType[];
  access: string[];
};

export type AuthUserType = {
  id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  provider_type?: string;
  email?: string;
  profile_image?: string;
  video_link?: string;
  date_format?: string;
  fcmToken?: string;
  is_show_profile?: boolean;
  is_user_banned?: boolean;
  sub?: string;
  bio?: string;
  address?: string;
  asl_level_id?: string;
  interests?: string[];
  role_id: string;
  last_sign_id?: string;
  role?: {
    role: string;
  };
};

export type OrganizationType = {
  id?: string;
  user_id: string;
  organization_type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  userDetails: Partial<AuthUserType | null>;
};

export type AuthSliceType = {
  user?: Partial<AuthUserType | null>;
  isAuthenticated?: boolean;
  organization?: OrganizationType[];
};

export type DropdownType = {
  label: string;
  value: string;
};

export type CourseCommonType = {
  aslLevel: DropdownType[];
  courseType: DropdownType[];
  courseCategory: DropdownType[];
};

export type PaginationType = {
  currentPage: number;
};

export type ToastSliceType = {
  message: string | null;
  type: string | null;
  id: number;
  variant: string;
};

export type ToastCommonSliceType = {
  toasts: ToastSliceType[];
};

export type TokenSliceType = {
  token?: null | string;
};

export type LanguageType = {
  language: string;
  allLanguages?: AllLanguages[];
  defaultLanguage: string;
  languageDetail?: AllLanguages;
};

export type AllLanguages = {
  id: string;
  name: string;
  short_name: string;
  slug?: string;
  created_by?: number;
  updated_by?: number;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type TitleType = {
  title: string;
};

export type SideBarType = {
  isSidebarOpen: boolean;
  isSidebarActive: string | null;
  isHeaderActive: string | null;
  activeLayoutType: string;
};

export type CmsLanguageStateType = {
  activeLanguage: number;
  formLanguage: string;
  nextFormLanguage?: string;
  prevFormLanguage?: string;
  isNextClicked?: boolean;
  isPrevClicked?: boolean;
};

export type CoursesLanguagesType = {
  slug_language_pair: SlugLanguagePair[];
  course_languages: string[];
};

export interface SlugLanguagePair {
  language_id: string;
  slug: string;
}
export interface IVocabulary {
  id: string;
  name: string;
  sign_photo: string;
}

export type VocabSliceType = {
  vocabularies: IVocabulary[];
  currentPage: number;
};
