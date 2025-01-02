export interface AboutVisionProps {
  eyebrow_title: string;
  banner_title: string;
  description: string;
  link_button: string;
  link_url: string | null;
  collaboration_logos: string[];
  multiple_banner_images: string[];
}

export interface IAboutBannerProps {
  button_text?: string;
  button_url?: string | null;
  eyebrow_title: string;
  banner_title: string;
  description: string;
  fun_tidbits?: string;
  banner_image: string;
}

export interface AboutCrewProps {
  banner_image: string;
  banner_video: string;
  description: string;
  designation: string;
  username: string;
  fun_tidbits: string;
}

export interface JourneyProps {
  banner_image: string;
  banner_title: string;
  description: string;
  year: string;
}

interface PointData {
  title: string;
  date: string;
  banner_image: string;
  story_link: string;
}

export interface LocalStoriesProps {
  eyebrow_title: string;
  banner_title: string;
  point_data_array: PointData[];
}

export interface AboutCTAProps {
  button_text: string;
  button_url: string | null;
  eyebrow_title: string;
}
