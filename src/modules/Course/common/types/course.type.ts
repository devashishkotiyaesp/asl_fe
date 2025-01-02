import { CourseProgressEnum } from 'constants/common.constant';
import { UserModalType } from 'hooks/useModal';
import { QuizData } from 'modules/Course/Admin/form/types';

export interface AslLevel {
  id: string;
  level: string;
}

export interface CourseItemResponseType {
  id: string;
  type: string;
}

export interface CourseType {
  label: string;
  value: string;
}

export interface Language {
  id: string;
  name: string;
  short_name: string;
}

export interface SelectedValuesType {
  courseValue: string;
  is_full_course: boolean | null;
  languageValues: string[];
}

export interface SelectedLanguageType {
  courseValue: string;
  is_full_course: boolean | null;
  language_value?: { language_id: string }[];
}

export interface ICourseItem {
  id: string;
  type_id: string;
  sub_type_id: string | null;
  asl_level_id: string;
  common_id?: string;
  category_id: string | null;
  cover_image: string | null;
  cover_video: string | null;
  srt_file_path: string | null;
  is_full_course: boolean | null;
  zoom_link: string | null;
  title: string;
  description: string;
  price: number | null;
  key_learnings: string[];
  address: string | null;
  city: string | null;
  country: string | null;
  zip_code: string | null;
  user_teacher_id: string | null;
  start_date: string | null;
  end_date: string | null;
  repeat_interval_days: number | null;
  timezone: string | null;
  start_time: string | null;
  end_time: string | null;
  min_participants: number | null;
  max_participants: number | null;
  has_modules: boolean | null;
  is_private: boolean;
  slug: string;
  last_updated_by: string | null;
  is_published: boolean;
  introduction_video: string | null;
  parent_table_id: string | null;
  language_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  courseCategory: string | null;
  AslLevel: AslLevel;
  sub_type: string | null;
  type: CourseItemResponseType;
  updated_by: string | null;
  language: Language;
}

export interface CourseResponseData {
  data: ICourseItem[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export interface IModulesItem {
  id?: string;
  course_id: string;
  parent_table_id?: string;
  title: string;
  cover_image: File | string;
  sort_order?: string | null;
  slug?: string;
  common_id?: string;
  language_id: string;
  quiz_exist?: boolean;
  quiz: QuizData[];
  is_active?: boolean;
  lesson_count?: number;
  created_by?: string;
  last_updated_by?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface ILessonsItem {
  id?: string;
  course_id: string;
  is_active?: boolean;
  course_module_id: string;
  common_id: string;
  language_id: string;
  title: string;
  description: string;
  video_link: string;
  slug?: string;
  sort_order?: string | null;
  parent_table_id?: string;
  banner_image: string;
  lesson_video: string;
  srt_file_path: string;
  created_by?: string;
  last_updated_by?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  quiz_exist?: boolean;
  quiz: QuizData[];
  course_user_tracking: {
    status: CourseProgressEnum;
  };
}
export interface IModulesResponse {
  data: IModulesItem[];
  count?: number;
  currentPage?: number;
  limit?: number;
  lastPage?: number;
}

export interface ILessonResponse {
  data: ILessonsItem[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export type ICourseCategory = {
  id: string;
  image: string | null;
  name: string;
  slug: string;
  created_by: string;
  parent_table_id: string | null;
  language_id: string;
  last_updated_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export interface CourseCategoryResponse {
  data: ICourseCategory[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export interface AddEditCategoryProps {
  modal: UserModalType;
  initialCategories?: ICourseCategory[];
  refetch: () => void;
}
