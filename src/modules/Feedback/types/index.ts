// FEEDBACK TYPES

interface Role {
  role: string;
}

interface User {
  first_name: string;
  last_name: string;
  role_id: string;
  email: string;
  profile_image: string | null;
  role: Role;
}

export interface FeedbackItemProps {
  id: string;
  feedback?: string;
  user_id: string;
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
  is_resolved: boolean;
  supportRequestReplies?: {
    message: string;
  };
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
  user: SupportRequestUser;
}

export interface SupportRequestList {
  data: SupportRequestItem[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export interface GetFeedbackJSON {
  data: [
    {
      id: string;
      user_id: string;
      feedback: string;
      overall_rating: number;
      ease_of_use_rating: number;
      content_quality_rating: number;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      user: {
        first_name: string;
        last_name: string;
        role_id: string;
        profile_image: string;
        email: string;
        role: {
          role: string;
        };
        organizations: any[];
      };
    },
  ];
}
