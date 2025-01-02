import { UserModalType } from 'hooks/useModal';
import { MouseEventHandler } from 'react';

export interface ICommunityItem {
  id: string;
  name: string;
  description: string;
  type: 'topic' | 'discussion';
  course_id: string | null;
  media: string;
  created_by: string;
  createdBy: {
    id?: string;
    first_name?: string;
    last_name?: string;
    profile_image?: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  postCount?: string;
  posts: Conversations[];
  organization_id: string;
  permission_type: string;
}

export interface Conversations {
  attachments: Attachment[];
  id: string;
  user_id: string;
  community_id: string;
  description: string;
  created_at: string;
  isLikedByUser: number;
  likeCount: number;
  commentCount: number;
  parentCommentCount?: number;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    is_user_banned?: boolean;
    profile_image: string;
    role: {
      role: string;
    };
  };
  comments: Comment[];
}
interface Attachment {
  url: string;
  type: 'Image' | 'Video';
}

export interface ICommunityResponse {
  data: ICommunityItem[];
  currentPage: number;
  limit: number;
  count: number;
  lastPage: number;
}

export interface IProps {
  communityType: string;
  searchParams?: URLSearchParams;
  search: string;
}

export interface PostInitialValues {
  description: string;
  media: Attachment[];
  post_id?: string;
}

export interface IAddPostProps {
  refetch?: (value?: any) => void;
  id?: string;
  isEdit?: boolean;
  initialValue?: PostInitialValues;
  setPostInitialValue?: React.Dispatch<
    React.SetStateAction<PostInitialValues | undefined>
  >;
  setPosts?: React.Dispatch<React.SetStateAction<Conversations[]>>;
  displayPermissionModal?: UserModalType;
  list_index?: number;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  is_show_profile?: boolean;
  is_user_banned?: boolean;
  role?: {
    role: string;
  };
}

export interface Reply {
  id: string;
  description: string;
  created_at: string;
  isReported: number;
  deleted_at: string | null;
  user_id: string;
  likeReplyCount: number;
  isReplyLikedByUser: number;
  attachments: [
    {
      url: string;
      type?: 'image' | 'video';
    },
  ];

  user: User;
}

export interface Comment {
  id: string;
  user_id: string;
  description: string;
  created_at: string;
  deleted_at: string | null;
  isReported: number;
  likeCommentCount: number;
  isCommentLikedByUser: number;
  totalReplyCount: number;
  user: User;
  attachments: [
    {
      url: string;
      type?: 'Image' | 'Video';
    },
  ];
  replies: Reply[];
}

export interface EditCommentFlag {
  comment_id?: string;
  isEdit?: boolean;
}

export interface EditCommentProps {
  id?: string;
  attachments: [
    {
      url: string;
    },
  ];
  description: string;
}

export interface ContextMenuProps {
  deleteCommentModal: UserModalType;
  editPostModal?: UserModalType;
  deletePostModal: UserModalType;
  isComment?: boolean;
  reportCommentModal: UserModalType;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  comment_id: string;
  setEditComment: React.Dispatch<React.SetStateAction<EditCommentFlag | undefined>>;
  comment_user_id: string;
  setSelectedData: React.Dispatch<
    React.SetStateAction<{
      comment_id: string;
      user_id: string;
    }>
  >;
  post_user_role?: string;
  isReply?: boolean;
  isUserBanned?: boolean;
  setModalHeading?: React.Dispatch<React.SetStateAction<string>>;
  onClickHandler?: MouseEventHandler<HTMLElement>;
  onBlockUserClickHandler?: () => void;
  postIdForDelete?: string;
}

export interface CommentInputProps {
  className?: string;
  placeHolder?: string;
  isReply?: boolean;
  postData?: Conversations;
  initialValue?: EditCommentProps;
  toggleComments?: () => void;
  parentId?: string;
  refetch?: (postId: string, isRefetch?: boolean) => Promise<void>;
  countRefetch?: (data?: any) => void;
  isEdit?: boolean;
  setEditComment?: React.Dispatch<React.SetStateAction<EditCommentFlag | undefined>>;
  openRepliesBox?: (replyId: string) => void;
}

export enum CommunityType {
  FEED = 'feed',
  TOPIC = 'topic',
  DISCUSSION = 'discussion',
}

export enum PermissionType {
  SPECIFIC_ORGANIZATION = 'Specific Organization',
}
//

export interface Community {
  id: string;
  name: string;
  description: string;
  created_by: string;
  type: string;
  course_id: string | null;
  organization_id: string | null;
  media: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  postCount: string;
  createdBy: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
  };
}

interface Post {
  likeCount: string;
  commentCount: string;
  parentCommentCount: string;
  isLikedByUser: string;
  id: string;
  user_id: string;
  community_id: string;
  description: string;
  created_at: string;
  user: User;
  attachments: Attachment[];
}

// Interface for the posts object
interface Posts {
  data: Post[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

// Combined interface for the entire response
export interface CommunityPostsResponse {
  community: Community;
  posts: Posts;
}
