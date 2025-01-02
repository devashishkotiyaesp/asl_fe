import { SetFieldValue } from 'types';

export interface CourseVisibilityField {
  is_public?: string;
  can_teacher_view: string;
  visibility_to: string;
  user_ids: string[];
  category_id?: string;
}

export interface SetCourseVisibilityProps {
  onSubmit: (data: CourseVisibilityField) => void;
  isLoading?: boolean;
}

export interface PrivacyCardProps {
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
  setIsAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  values: CourseVisibilityField;
  setFieldValue: SetFieldValue;
  isEdit: boolean;
}
