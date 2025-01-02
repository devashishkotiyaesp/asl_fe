import { UserModalType } from 'hooks/useModal';
import { MouseEventHandler } from 'react';

export interface EventListResponse {
  id: string;
  slug: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  language: string;
  image_path: string;
  location: string;
  description: string;
}

export interface EventBannerResponse {
  button_url: string;
  button_text: string;
  button_title: string;
  banner_image: string;
  description: string;
  title_event: string;
  hashTag: string;
}

export interface EventCardProps {
  imagePath?: string;
  date?: string;
  month?: string;
  title?: string;
  time?: string;
  onClickHandler?: MouseEventHandler<HTMLElement>;
}

export interface EventBannerProps {
  title_tag: string;
  tag_title: string;
  tag_description: string;
  eventData: EventListResponse[];
  setEventCardState: React.Dispatch<React.SetStateAction<string | null>>;
  eventInfo: UserModalType;
}
