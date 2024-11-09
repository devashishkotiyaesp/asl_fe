export interface TeacherUserProfileProps {
  isSidebar: string;
}

export interface EditInitialValues {
  first_name: string;
  last_name: string;
  profile_image: string | null;
  email: string;
  organization?: string;
  bio: string;
}

export interface AxiosResponse {
  data?: Record<string, any>;
  error?: string;
}
