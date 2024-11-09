import { Dispatch, SetStateAction } from 'react';
import { AllLanguages } from 'reduxStore/types';

export interface ResponseDataProps {
  field_name: string;
  button: string;
  field_value: string;
  id: string;
  language: string;
}

export interface LangueKeyValueProps {
  [language: string]: {
    [fieldName: string]: string | string[] | File;
  };
}

export interface KeyValueProps {
  [fieldName: string]: string;
}

export interface SectionProps {
  setFieldValue: SetFieldValue;
  values: KeyValueProps;
  setFieldTouched?: SetFieldTouched;
  isLoading?: boolean;
  handleAddEditJourneyClick?: () => void;
  getEditId?: (data: string | undefined) => void;
  formLanguage?: string;
  setShowAddEditCrew?: Dispatch<SetStateAction<boolean>>;
  prevFormLanguage?: string;
  activeLanguage?: string;
  nextFormLanguage?: string;
  prevLanguage?: string;
  activeSection?: string;
}

export type SetFieldValue<ValueType = any> = (
  field: string,
  value: ValueType,
  shouldValidate?: boolean
) => void;

export type SetFieldTouched = (
  field: string,
  isTouched?: boolean,
  shouldValidate?: boolean
) => void;

export interface CommonSectionProps {
  initialValues: LangueKeyValueProps | undefined;
  setInitialValues: Dispatch<SetStateAction<LangueKeyValueProps | undefined>>;
  activeLanguage: number;
  nextFormLanguage: string;
  prevFormLanguage: string;
  formLanguage: string;
  setFormLanguage: Dispatch<SetStateAction<string>>;
  setActionName: Dispatch<SetStateAction<string | null>>;
  actionName: string;
  responseData: ResponseDataProps[] | undefined;
  setActiveLanguage: Dispatch<SetStateAction<number>>;
  allLanguages: AllLanguages[] | undefined;
  BannerFormWithDynamicProps?: Element;
  cmsId: string | undefined;
  activeSection: string | undefined;
  isLoading?: boolean;
  handleAddEditJourneyClick: (data: boolean) => void;
  getEditId: (data: string | undefined) => void;
  setShowAddEditCrew: Dispatch<SetStateAction<boolean>>;
  showAddEditCrew?: boolean;
  editId?: string;
  showAddEditJourney?: boolean;
}

export interface FieldsFuncParams {
  key: string;
  item: {
    title?: string;
    description?: string;
    button_text?: string;
    button_url?: string;
    banner_image?: string;
    username?: string;
    role?: string;
    story_link?: string;
    date?: string;
  };
  index: number;
  formData: FormData;
}

export interface BodyDataAccumulator {
  [key: string]: string | string[]; // Adjust this type based on your actual data structure
}

export interface ICrewItem {
  field_value?: string;
  field_name?: string;
  id?: string;
  slug?: string;
}

export interface CrewProps {
  cmsId: string | undefined;
  editId: string | undefined;
  activeLanguage: number;
  setActiveLanguage: Dispatch<SetStateAction<number>>;
  allLanguages: AllLanguages[] | undefined;
  nextFormLanguage: string;
  prevFormLanguage: string;
  formLanguage: string;
  setFormLanguage: Dispatch<SetStateAction<string>>;
}

export interface CrewTableProps {
  setShowAddEditCrew: Dispatch<SetStateAction<boolean>>;
  getEditId: (data: string | undefined) => void;
  formLanguage: string | undefined;
}

export interface ImageProps {
  title?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
  banner_image?: string;
  username?: string;
  role?: string;
}

export interface JourneyTableProps {
  activeLanguage: number;
  setActiveLanguage: Dispatch<SetStateAction<number>>;
  allLanguages: AllLanguages[] | undefined;
  nextFormLanguage: string;
  prevFormLanguage: string;
  formLanguage: string;
  setFormLanguage: Dispatch<SetStateAction<string>>;
  cmsId: string | undefined;
  editId: string | undefined;
}

export interface CommonSelectProps {
  field_value?: string;
  field_name?: string;
  id?: string;
  slug?: string;
}
export interface CrewDataProps {
  crew: CommonSelectProps;
  totalPages?: number;
  totalCount?: number;
}

export interface JourneyDataProps {
  ourJourney: CommonSelectProps;
  totalPages?: number;
  totalCount?: number;
}

export interface JourneyProps {
  handleAddEditJourneyClick: (data: boolean) => void;
  getEditId: (data: string | undefined) => void;
  formLanguage: string;
}
