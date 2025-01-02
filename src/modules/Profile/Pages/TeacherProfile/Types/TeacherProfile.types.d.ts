export interface EditInitialValues {
  first_name: string;
  last_name: string;
  profile_image: string | null;
  email: string;
  organization?: string;
  bio: string;
  video_link?: string;
}

export interface AxiosResponse {
  data?: Record<string, any>;
  error?: string;
}

export interface UserProfileProps {
  setSidebar: (value: string) => void;
}
