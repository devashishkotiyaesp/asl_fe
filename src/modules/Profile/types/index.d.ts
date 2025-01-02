import { StatusTypeEnum } from 'constants/common.constant';

interface UserFeedbackResponseItem {
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
}

export interface UserFeedbackResponse {
  data: UserFeedbackResponseItem[] | [];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export interface ChangePasswordProps {
  modal?: any;
  isSidebar?: string;
  withModal?: boolean;
}

export interface EmojiRating {
  id: string;
  emojiItem: string;
  value: number | null;
  key?: string;
}

export interface SelectEmojiState {
  overallRating: EmojiRating;
  easeUseRating: EmojiRating;
  contentQualityRating: EmojiRating;
}

export interface FeedbackFormValues {
  addFeedback: string;
  emojiRatings: SelectEmojiState;
}

// export interface EmojiData {
//   emoji: string;
//   id: number;
//   value: number;
// }

// export interface FeedbackCategory {
//   name: string;
//   key: keyof SelectEmojiState;
//   selectEmoji: EmojiData[];
// }

export interface FeedbackPayload {
  user_id: string;
  feedback: string;
  overall_rating: number | null;
  ease_of_use_rating: number | null;
  content_quality_rating: number | null;
}

// export interface EmojiRating {
//   id: string;
//   emoji: string;
//   value: number;
//   isSelected: boolean;
// }

export interface FeedbackSection {
  id: number;
  name: string;
  key: string;
  selectedRating: string;
  ratings: EmojiRating[];
}

// export interface FeedbackFormValues {
//   sections: FeedbackSection[];
//   addFeedback: string;
// }

export interface Resource {
  question: string;
  answer: string;
}

export interface SupportRequestType {
  id: string;
  user_id: string;
  query_type: string;
  query: string;
  status: StatusTypeEnum;
  supportRequestReplies: {
    message: string;
    type: ReplyTypeEnum;
    id?: string;
    status?: StatusTypeEnum;
  }[];
  created_at: Date | string;
}
