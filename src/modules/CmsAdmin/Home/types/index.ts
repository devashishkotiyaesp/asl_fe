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
  BannerFormWithDynamicProps: (props: any) => JSX.Element;
  cmsId: string | undefined;
  activeSection: string | undefined;
  isLoading: boolean;
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
  };
  index: number;
  formData: FormData;
}

export interface BodyDataAccumulator {
  [key: string]: string | string[]; // Adjust this type based on your actual data structure
}
