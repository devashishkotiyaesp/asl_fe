export interface ReportedCommentUser {
  id: string;
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
  items: ReportedCommentItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
