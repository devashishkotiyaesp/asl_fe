export interface DictionaryResponse {
  title_hashTag: string;
  title_of_hashTag: string;
  hashTag_description: string;
  banner_image: string;
  button_title: string;
  button_text: string;
  button_url: string;
}

export interface DictionaryBannerProps {
  hashTag: string;
  title: string;
  description: string;
}
