import { UserModalType } from 'hooks/useModal';
import { ILessonsItem, IModulesItem } from 'modules/Course/types/course.type';

export interface ModuleFormValues {
  title: string;
  cover_image: File | string;
}

export interface AddEditModuleProps {
  modal: UserModalType;
  selectedModule?: IModulesItem;
  refetch: () => void;
  sortOrder: number;
}
export interface AddEditLessonProps {
  modal: UserModalType;
  selectedLesson?: ILessonsItem;
  refetch: () => void;
  course_module_id?: string | null;
  module_common_id?: string | null;
  lessonSortOrder: number;
}
