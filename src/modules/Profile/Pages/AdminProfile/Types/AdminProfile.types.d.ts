import { FormikValues } from 'formik';

export interface AdminUserProfileProps {
  isSidebar: string;
}

export interface EditInitialValues {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string | File | null;
}

export interface OnSubmitProps extends FormikValues {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string | File | null;
}

export interface AxiosResponse {
  data?: Record<string, any>;
  error?: string;
}
