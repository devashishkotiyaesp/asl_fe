import { Dispatch, SetStateAction } from 'react';

export interface TeacherCalendarProps {
  setFilterRange: Dispatch<
    SetStateAction<{ start_date?: string | Date; end_date?: string | Date }>
  >;
  events?: any;
  loadingAllAvailabilities?: boolean;
}

export interface AllSlotsProps {
  date: string;
  start_time: string;
  end_time: string;
  id: string;
}

export interface CustomToolbarProps {
  label: string;
  onView: (view: string) => void;
  views: string[];
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT') => void;
  view: string;
}

export interface EditAvailabilityProps {
  startDate: string;
  endDate: string;
  time_ranges: [{ start_time: string; end_time: string }];
  week_days: [];
}

export interface validationProps {
  start_time: Date;
  end_time: Date;
}

export interface ErrorType {
  time_ranges: {
    start_time: string;
    end_time: string;
  }[];
  week_days: number[];
}
