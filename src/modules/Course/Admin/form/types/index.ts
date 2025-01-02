import { UserModalType } from 'hooks/useModal';
import { IModulesItem } from 'modules/Course/common/types/course.type';
import { SetFieldValue } from 'types';
import { CourseMaterials, WeekData } from './courseContentManager.types';

export interface SelfPacedBasicTypes {
  cover_video?: string | null;
  cover_image?: string | null;
  srt_file_path?: string | null;
  description: string;
  title: string;
  asl_level_id: string;
  key_learnings: string[];
  editor_teacher_id?: string[];
  subscription_type_id?: string;
  category_id?: string;
  has_modules?: boolean | null;
}

export interface SelfPacedModuleTypes {
  has_modules: boolean | null;
  category_id?: string | null;
}

export interface MiniCourseBasicTypes {
  cover_video?: string | null;
  cover_image?: string | null;
  srt_file_path?: string | null;
  description: string;
  title: string;
  category_id?: string;
}

export interface InPersonBasicTypes {
  cover_video?: string | null;
  cover_image?: string | null;
  srt_file_path?: string | null;
  description: string;
  title: string;
  asl_level_id: string;
  key_learnings: string[];
  editor_teacher_id?: string[];
  subscription_type_id?: string;
  address: string;
  user_teacher_id?: string;
  city: string;
  zip_code: string;
  country: string;
  start_date: string | null;
  end_date: string | null;
  price: string;
  max_participants: number;
  min_participants: number;
  repeat_interval_days: number[];
  category_id?: string;
}

export interface ZoomBasicTypes {
  cover_video: string | null;
  cover_image: string | null;
  srt_file_path: string | null;
  description: string;
  title: string;
  asl_level_id: string;
  key_learnings: string[];
  user_teacher_id?: string;
  editor_teacher_id?: string[];
  subscription_type_id: string;
  start_date: string | null;
  end_date: string | null;
  price: string;
  max_participants: number;
  min_participants: number;
  zoom_link: string;
  category_id?: string;
}

export interface CourseQuizPayload {
  id?: string;
  slug?: string;
  parent_table_id?: string;
  course_id: string;
  course_module_id?: string;
  course_lesson_id?: string;
  course_week_id?: string;
  language_id?: string;
  languages?: string[];
  created_by?: string;
  last_updated_by?: string;
  data: QuestionData[];
}

export interface DataPayloadTypes {
  data:
    | SelfPacedBasicTypes
    | ZoomBasicTypes
    | InPersonBasicTypes
    | CourseMaterials
    | MiniCourseBasicTypes
    | SelfPacedModuleTypes;
  course_id?: string | null;
  type_id: string;
  step: number;
  slug?: string;
  common_id?: string;
  language_id?: string;
  languages?: string[];
  is_full_course: boolean | null;
  category_id?: string | null;
}

interface AslLevelTypes {
  id: string | null;
  level: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

interface LanguageTypes {
  id: string | null;
  name: string | null;
  short_name: string | null;
}

interface CourseTypeTypes {
  id: string | null;
  type: string | null;
}

export interface CourseBasicDetailDataTypes {
  id: string;
  type_id: string;
  sub_type_id: string | null;
  asl_level_id: string;
  category_id: string | null;
  cover_image: string | null;
  cover_video: string | null;
  srt_file_path: string | null;
  is_full_course: string | null;
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
  repeat_interval_days: number[];
  timezone: string | null;
  start_time: Date | null;
  end_time: Date | null;
  min_participants: number | null;
  max_participants: number | null;
  has_modules: boolean | null;
  is_student_roster: boolean | null;
  is_private: boolean | null;
  slug: string | null;
  last_updated_by: string | null;
  created_by: string | null;
  is_published: boolean | null;
  introduction_video: string | null;
  parent_table_id: string | null;
  language_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null | null;
  courseCategory: string | null;
  language?: LanguageTypes;
  type?: CourseTypeTypes;
  sub_type: string | null;
  AslLevel?: AslLevelTypes;
  invited_course_editors?: InvitedCourseEditorsTypes[] | null;
  subscription_type_id: string;
  private_mode?: 'In-person' | 'Zoom';
  editor_teacher_id?: string[] | null;
}

export interface InvitedCourseEditorsTypes {
  id: string;
  course_id: string;
  user_teacher_id: string;
  created_by: string | null;
  last_updated_by: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface FormDataTypes {
  data: CourseBasicDetailDataTypes;
  course_id?: string | null;
  type_id: string;
  course_type?: string;
  slug?: string | null;
  common_id?: string | null;
  is_full_course: boolean | null;
}

// ** Quiz Components types  **

export interface QuizProps {
  isPreview?: boolean;
  addQuiz: UserModalType;
  slug?: string;
  courseCommonId?: string;
  lesson_common_id?: string;
  module_common_id?: string;
  common_id?: string;
  course_week_id?: string;
  refetchData?: (data?: QuizResponse) => void;
}

export interface OptionProps {
  isEditable?: boolean;
  quiz: QuestionData;
  index: number;
  isEdit?: boolean;
  setFieldValue: SetFieldValue;
  isOrder?: boolean;
}

interface CourseLesson {
  id: string;
  language_id: string;
}

export interface QuizData {
  id?: string;
  course_id?: string;
  course_module_id?: string | null;
  course_lesson_id?: string | null;
  course_week_id?: string | null;
  language_id?: string;
  created_by?: string;
  last_updated_by?: string;
  slug?: string;
  common_id?: string;
  title?: string | null;
  parent_table_id?: string;
  course_lesson?: CourseLesson | null;
  course_modules?: IModulesItem | null;
  course_week?: WeekData | null;
  quizQuestions?: QuestionData[];
}

export interface QuestionOption {
  id?: string;
  question_id?: string;
  course_id?: string;
  created_by?: string;
  last_updated_by?: string;
  slug?: string;
  language_id?: string;
  option_attachment_url?: string | File;
  option_text?: string;
  correct_answer?: string;
  correct_sequence?: number;
  is_correct?: boolean;
  course_slug?: string;
  isCorrect?: boolean;
  isSelected?: boolean;
  common_id?: string;
  isDisabled?: boolean;
  parent_table_id?: string;
}

export interface QuestionData {
  id?: string;
  quiz_id?: string;
  course_id?: string;
  created_by?: string;
  last_updated_by?: string;
  language_id?: string;
  question: string;
  question_type: string;
  question_attachment_url?: string | File;
  slug?: string;
  question_options?: QuestionOption[];
  arranged_options?: QuestionOption[];
  correct_answer?: string | string[];
}

export interface QuizResponse {
  id: string;
  title: string;
  course_week_id: string;
  slug: string;
  common_id: string;
  course_id: string;
  course_module_id: string | null;
  course_lesson_id: string | null;
  created_by: string;
  last_updated_by: string;
  updated_at: string; // ISO date string
  created_at: string; // ISO date string
  language_id: string | null;
  parent_table_id: string | null;
  deleted_at: string | null;
}

export interface QuizFieldArrayProps {
  data: QuestionData[];
  setFieldValue: SetFieldValue;
  isEditable: boolean;
  isEdit: boolean;
  remove: <X = any>(index: number) => X | undefined;
  push: <X = any>(obj: X) => void;
}
