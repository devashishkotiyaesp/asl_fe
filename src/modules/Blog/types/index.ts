export type IAllLanguages = {
  id: number;
  name: string;
  short_name: string;
  slug?: string;
  is_default?: boolean;
};

export interface BlogInitialValues {}

export interface BlogSubmitDataType {
  [fieldName: string]: string | string[] | File;
}
