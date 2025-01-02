import { IconTypes } from 'components/Icon/types';

export interface CmsSectionProps {
  field_name: string;
  field_type: string;
  field_value: string;
}

export interface SectionListingProps {
  iconName: string;
  title: string;
  description: string;
}

export interface pointDataArrayProps {
  description: string;
  title: string;
  button_url?: string;
  button_text?: string;
  icon?: IconTypes;
  imagePath?: string;
  username?: string;
  role?: string;
  banner_img?: string;
  banner_image?: string;
  price?: number | string;
  link_name?: string;
  link_url?: string;
  company_name?: string;
  city?: string;
}

export interface CMSCTAProps {
  leftImagePath?: string;
  title?: string;
  className?: string;
  linkText?: string;
  linkURL?: string;
  isFormDataBase?: boolean;
  rightImagePath?: string;
  variant?: '1' | '2' | '3' | '';
  ctaOne?: CmsSectionProps[];
  isSpanish?: boolean;
}

export interface CmsSectionDataProps {
  [field_name: string]: CmsSectionProps[];
}
