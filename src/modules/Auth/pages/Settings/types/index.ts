import { IconTypes } from 'components/Icon/types';

export interface SettingListProps {
  id: number;
  icon: IconTypes;
  name: string;
  navigate: string;
}

export interface OrganizationTypeItem {
  id: string;
  user_id: string;
  slug: string;
  type: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
}

export interface OrganizationTypeList {
  data: OrganizationTypeItem[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}
