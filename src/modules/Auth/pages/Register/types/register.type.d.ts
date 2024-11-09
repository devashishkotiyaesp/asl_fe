import { Session, User } from '@supabase/supabase-js';
export interface RegisterFormValues {
  email: string;
  password: string;
  profile_image: File | undefined;
  first_name: string;
  last_name: string;
  language: string;
}
export interface RegisterFormField {
  key: string;
  value: string | File | undefined;
}

export interface SignUpResponse {
  user: User | null;
  session: Session | null;
}
