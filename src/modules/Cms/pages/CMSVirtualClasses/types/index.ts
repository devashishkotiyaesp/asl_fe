import { CmsSectionProps, pointDataArrayProps } from '../../HomeCMS/types';

export interface VirtualClassesProps {
  virtualClass: CmsSectionProps[];
}
export interface generalProps {
  [x: string]: string | string[] | pointDataArrayProps[];
}
export interface VirtualClassesDataInterface {
  banner_image: string;
  button_text: string;
  button_url: string;
  cta_description: string;
  banner_title: string;
  short_description: string;
  description: string;
  title: string;
  title_hashing: string;
}
