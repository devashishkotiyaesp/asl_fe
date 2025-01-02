import { CourseProgressEnum } from 'constants/common.constant';
import { QuizData } from 'modules/Course/Admin/form/types';

export interface CourseListType {
  type: string;
  type_id: string;
  courses: ICourse[];
}

export interface ICourse {
  id: string;
  type_id: string;
  common_id?: string;
  sub_type_id: string | null;
  asl_level_id: string;
  category_id: string | null;
  cover_image: string | null;
  cover_video: string | null;
  srt_file_path: string | null;
  is_full_course: boolean | null;
  zoom_link: string | null;
  title: string;
  description: string;
  price: string | null;
  key_learnings: string[];
  address: string | null;
  city: string | null;
  country: string | null;
  zip_code: string | null;
  user_teacher_id: string | null;
  start_date: string | null;
  end_date: string | null;
  repeat_interval_days: number[] | null;
  timezone: string | null;
  start_time: string | null;
  end_time: string | null;
  min_participants: number | null;
  max_participants: number | null;
  has_modules: boolean | null;
  is_student_roster: boolean | null;
  is_private: boolean;
  slug: string;
  last_updated_by: string;
  created_by: string | null;
  is_published: boolean;
  introduction_video: string | null;
  course_user_tracking: {
    status: CourseProgressEnum;
  }[];
  parent_id: string | null;
  language_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sub_type: {
    id: string;
    type: string;
  };
  type: {
    id: string;
    type: string;
  };
  updated_by: {
    full_name: string;
    id: string;
  };
  language: {
    id: string;
    name: string;
    short_name: string;
  } | null;
  courseCategory: {
    id: string;
    name: string;
  };
  is_edit_access: boolean;
}

export interface CourseModule {
  id: string;
  course_id: string;
  common_id?: string;
  parent_table_id: string | null;
  title: string;
  cover_image: string | null;
  sort_order: string;
  slug: string;
  language_id: string;
  created_by: string;
  last_updated_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  lesson_count: string;
  quiz_exist: boolean;
  quiz: QuizData[];
}

export interface LessonViewTypes {
  id: string;
  course_module_id: string;
  course_id: string;
  parent_table_id: string | null;
  title: string;
  video_link: string;
  description: string;
  banner_image: string | null;
  lesson_video: string | null;
  srt_file_path: string | null;
  sort_order: string;
  slug: string;
  common_id?: string;
  created_by: string;
  last_updated_by: string;
  language_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  quiz: QuizData[];
  course_user_tracking: {
    status: CourseProgressEnum;
  };
}
