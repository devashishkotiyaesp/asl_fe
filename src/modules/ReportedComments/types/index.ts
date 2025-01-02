export interface ReportedCommentUser {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface ReportedCommentItem {
  id: string;
  post_id: string;
  user_id: string;
  description: string;
  parent_thread_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  reportCount: string;
  user: ReportedCommentUser;
}

export interface ReportedCommentProps {
  data: ReportedCommentItem[];
  count: number;
  lastPage: number;
  currentPage: number;
  limit: number;
}

interface Role {
  id: string;
  role: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface DeletedByUser {
  full_name: string;
  profile_image: string;
  id: string;
  first_name: string;
  last_name: string;
  role: Role;
}

interface User {
  full_name: string;
  id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface DeletedComment {
  id: string;
  post_id: string;
  user_id: string;
  description: string;
  parent_thread_id: string | null;
  deleted_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  deletedByUser: DeletedByUser;
  user: User;
}

export interface DeletedCommentsResponse {
  data: DeletedComment[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}
