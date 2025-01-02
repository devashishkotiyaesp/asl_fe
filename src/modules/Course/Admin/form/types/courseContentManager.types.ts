import { SetFieldValue } from 'types';
import { CourseBasicDetailDataTypes, QuizData } from '.';

interface PracticeMaterialInfo {
  description: string;
  note: string;
  video_link: string;
  course_id?: string;
  id?: string;
}

export interface CourseWeekMedia {
  title: string;
  link: string;
  course_week_id?: string;
  id?: string;
  description: string;
  sort_order: number;
}

export interface WeekData {
  course_id?: string;
  id?: string;
  sort_order?: number;
  week_number?: number;
  course_week_media: CourseWeekMedia[];
  quiz?: QuizData[];
}

export interface CourseTeachingMedia {
  title: string;
  link: string;
  sort_order: number;
  id?: string;
  course_id?: string;
}

export interface CourseMaterials {
  practice_materials: File[] | string[];
  course_material_media: PracticeMaterialInfo;
  course_weeks?: WeekData[];
  course_arranged_weeks?: WeekData[];
  teaching_materials: File[] | string[];
  is_student_roster: string;
  category_id?: string;
  course_teaching_media: CourseTeachingMedia[];
  course_arranged_teaching_media?: CourseTeachingMedia[];
}

export interface CourseMaterialResponse {
  id: string;
  type_id: string;
  asl_level_id: string;
  category_id: string | null;
  cover_image: string | null;
  cover_video: string | null;
  srt_file_path: string | null;
  is_full_course: boolean | null;
  zoom_link: string;
  title: string;
  description: string;
  price: string;
  key_learnings: string[];
  address: string | null;
  city: string | null;
  country: string | null;
  zip_code: string | null;
  user_teacher_id: string;
  start_date: string;
  end_date: string;
  repeat_interval_days: number[];
  timezone: string | null;
  start_time: string;
  end_time: string;
  min_participants: number;
  max_participants: number;
  has_modules: boolean | null;
  is_student_roster: boolean;
  is_private: boolean;
  slug: string;
  last_updated_by: string;
  created_by: string | null;
  is_published: boolean;
  introduction_video: string | null;
  parent_table_id: string | null;
  language_id: string | null;
  is_public: boolean | null;
  can_teacher_view: boolean | null;
  common_id: string;
  visibility_to: string | null;
  private_mode: boolean | null;
  published_at: string | null;
  last_published_at: string | null;
  parent_draft_course_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  practice_materials: File[] | string[];
  course_material_media: PracticeMaterialInfo;
  course_weeks?: WeekData[];
  course_arranged_weeks?: WeekData[];
  teaching_materials: File[] | string[];
  course_teaching_media: CourseTeachingMedia[];
  course_arranged_teaching_media?: CourseTeachingMedia[];
  type: {
    type: string;
    id: string;
  };
}

export interface PracticeMaterialViewTypes {
  course_material: Materials[];
  course_material_media: PracticeMaterialInfo;
  course_weeks?: WeekData[];
}

export interface TeachingMaterialVieTypes {
  course_material: Materials[];
  course_teaching_media: CourseTeachingMedia[];
}

export interface Materials {
  id: string;
  course_id: string;
  material_type: string;
  material_media_type: string;
  material_media_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CourseMaterialProps {
  initialData: { data: CourseBasicDetailDataTypes };
  onSubmit: (data: CourseMaterials) => void;
  isLoading?: boolean;
}

export interface WeekCourseProps {
  setFieldValue: SetFieldValue;
  week: WeekData;
}

export interface WeeklyMediaItemProps {
  index: number;
  sort_order: number;
}

export interface WeekOverviewProps {
  setFieldValue: SetFieldValue;
  course_weeks: WeekData[];
}

export interface CourseTeachingMediaListPorps {
  course_teaching_media: CourseTeachingMedia[];
  setFieldValue: SetFieldValue;
}

export interface CourseTeachingMediaItemProps {
  sort_order: number;
  remove: <X = any>(index: number) => X | undefined;
}
