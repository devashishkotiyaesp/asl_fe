export interface UserProfileProps {
  setSidebar: (value: string) => void;
}

export interface ASLLevel {
  label: string;
  value: string;
}

export interface FormValues {
  first_name: string;
  last_name: string;
  profile_image: string | null;
  email: string;
  bio: string;
}
