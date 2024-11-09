import { UserModalType } from 'hooks/useModal';

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
    profile_image: string;
    role: {
      role: string;
    };
  };
  comments: Comment[];
}
interface Attachment {
  url: string;
}

export interface ICommunityResponse {
  data: ICommunityItem[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IProps {
  communityType: string;
  search: string;
}

export interface IConversationProps {
  communityData: ICommunityItem | undefined;
  refetch: () => Promise<void>;
}

export interface IAddPostProps {
  modal: UserModalType;
  refetch?: () => void;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  role?: {
    role: string;
  };
}

export interface Reply {
  id: string;
  description: string;
  created_at: string;
  user_id: string;
  likeReplyCount: number;
  isReplyLikedByUser: number;
  attachments: [
    {
      url: string;
    },
  ];

  user: User;
}

export interface Comment {
  id: string;
  user_id: string;
  description: string;
  created_at: string;
  likeCommentCount: number;
  isCommentLikedByUser: number;
  user: User;
  attachments: [
    {
      url: string;
    },
  ];
  replies: Reply[];
}
