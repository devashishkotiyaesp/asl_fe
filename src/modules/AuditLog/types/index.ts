import { TFunction } from 'i18next';
import { Dispatch, SetStateAction } from 'react';

export type AuditLogType = {
  created_at: string;
  user: {
    full_name: string;
    role: {
      role: string;
    };
  };
  title: string;
  description: string;
};
export interface FilterNoteProps {
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  setFilterApply: Dispatch<SetStateAction<FilterApplyProps>>;
  t: TFunction<'translation', undefined>;
  filterApply: FilterApplyProps;
}

export interface FilterApplyProps {
  startDate?: string | Date;
  endDate?: string | Date;
}
