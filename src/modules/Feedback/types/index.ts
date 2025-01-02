// FEEDBACK TYPES

import { StatusTypeEnum } from 'constants/common.constant';
import { TFunction } from 'i18next';
import { Dispatch, SetStateAction } from 'react';

interface Role {
  role: string;
}

interface User {
  first_name: string;
  last_name: string;
  role_id: string;
  email: string;
  profile_image: string;
  role: Role;
  organization: {
    organization_type: {
      type: string;
    };
  };
}

export interface FeedbackItemProps {
  id: string;
  feedback?: string;
  overall_rating: number;
  ease_of_use_rating: number;
  content_quality_rating: number;
  user_id: string;
  tag_id: string;
  tag: {
    tag: string;
  };
  query_type: 'Inquiry' | 'Error';
  query: string;
  is_resolved: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
  user: User;
}

export interface FeedbackResponse {
  data: FeedbackItemProps[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

// SEND REQUEST TYPES

interface SupportRequestUser {
  first_name: string;
  last_name: string;
  role_id: string;
  email: string;
  profile_image: string | null;
  role: {
    role: string;
  };
}

export interface SupportRequestItem {
  id: string;
  user_id: string;
  query_type: 'Inquiry' | 'Error'; // You can extend this with more types if needed
  query: string;
  status: StatusTypeEnum;
  supportRequestReplies?: {
    message: string;
  };
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
  user: SupportRequestUser;
}

export interface TagItem {
  id: string;
  user_id: string;
  slug: string;
  tag: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
  user: SupportRequestUser;
}

export interface TagList {
  data: TagItem[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export interface SupportRequestList {
  data: SupportRequestItem[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export type IAllLanguages = {
  id: number;
  name: string;
  short_name: string;
  slug?: string;
  is_default?: boolean;
};

export interface SupportRequestInitialValues {}

export interface SupportRequestSubmitDataType {
  [fieldName: string]: Resource[];
}

export interface TagSubmitDataType {
  [fieldName: string]: string | string[] | File;
}

export interface Resource {
  question: string;
  answer: string;
  // id: string;
}

export interface FormValues {
  query: Resource[];
  language: {
    name: string;
  };
}

export interface LangueKeyValueProps {
  [language: string]: {
    [fieldName: string]: Resource[];
  };
}

export interface FilterSupportProps {
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  setFilterApply: Dispatch<SetStateAction<FilterApplyProps>>;
  t: TFunction<'translation', undefined>;
  filterApply: FilterApplyProps;
}

export interface FilterApplyProps {
  startDate?: string | Date;
  endDate?: string | Date;
  status?: string[];
}
