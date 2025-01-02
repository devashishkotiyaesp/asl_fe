export type FilterOption = {
  label: string;
  value: string | number;
};

export type FilterConfig = {
  label: string;
  key: string;
  type: 'checkbox' | 'radio' | 'select';
  options: FilterOption[];
  multiple?: boolean;
  isCompulsory?: boolean;
  isSearchable?: boolean;
};

export type FilterValues = {
  [key: string]: string | (string | number)[];
};

export interface FilterProps {
  configs: FilterConfig[];
  initialValues?: FilterValues;
  onChange: (values: FilterValues) => void;
  className?: string;
  showApplyButton?: boolean;
}
