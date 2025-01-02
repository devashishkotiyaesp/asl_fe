import { RoleType } from 'types/comman';

export interface Organization {
  id?: string;
  organization_type?: string;
  organizationInfo: User;
}

export interface User {
  full_name: string;
  id: string;
  email: string;
  profile_image: string | null;
  status: boolean | null;
  is_show_profile: boolean | null;
  is_user_banned: boolean;
  last_logged_in: string;
  role: {
    role: RoleType;
  };
  organization: Organization | null;
  created_at?: string;

  member_of_organizations: Organization[];
}

export interface IUserListResponse {
  data?: User[];
  count?: number;
  currentPage?: number;
  limit?: number;
  lastPage?: number;
}

export interface UserListProps {
  search?: string;
  isDeletedUser?: boolean;
  searchOn?: Array<string>;
  isTeacher?: boolean;
}
