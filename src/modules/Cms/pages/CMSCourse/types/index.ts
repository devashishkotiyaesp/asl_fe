export interface PointData {
  title: string;
  description: string;
  button_text: string;
  button_url: string | null;
  banner_image: string;
  banner_video: string;
  isFree: boolean;
  fun_tidbits?: string;
  link_button?: string;
  link_btn_url?: string;
}

export interface CourseDataProps {
  button_text: string;
  button_url: string | null;
  title_hashing: string;
  point_data_array: PointData[];
  eyebrow_title: string;
  banner_image: string;
}
