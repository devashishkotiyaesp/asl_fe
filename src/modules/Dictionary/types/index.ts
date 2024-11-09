export type IAllLanguages = {
  id: number;
  name: string;
  short_name: string;
  slug?: string;
  is_default?: boolean;
};

export interface DictionaryInitialValues {}

export interface DictionarySubmitDataType {
  [fieldName: string]: string | string[] | File;
}
