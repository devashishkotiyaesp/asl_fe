import { Dispatch, SetStateAction } from 'react';

import { ModalProps } from 'types/comman';

export interface EventProps {
  id: number;
  title?: string;
  start_date?: string;
  end_date?: string;
  start: Date;
  end: Date;
  slug: string;
}

export interface CalendarProps {
  modal: ModalProps;
  events: EventProps[];
  children?: JSX.Element;
  setEventSlug: Dispatch<SetStateAction<EventProps | undefined>>;
  filterModal: ModalProps;
  EventCreateModal: ModalProps;
  setCurrentCalendarView?: Dispatch<SetStateAction<string>>;
  setCurrentMonthView?: Dispatch<SetStateAction<string>>;
  setFilterValue?: Dispatch<
    SetStateAction<{
      start_date?: Date | string;
      end_date?: Date | string;
    }>
  >;
  setInitialValues?: React.Dispatch<
    SetStateAction<{
      trainer_id: string[];
    }>
  >;
  initialValues: { trainer_id: string[] };
  loading?: boolean;
  eventsLoading?: boolean;
  trainerColors: {
    [key: string]: string;
  };
  setTrainerColors: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
}

export interface CustomToolbarProps {
  label: string;
  onView: (view: string) => void;
  views: string[];
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT') => void;
  view: string;
}

export interface TabProps {
  id: string;
  title: string;
  name: string;
  slug: string;
}
export interface PositionState {
  display?: 'none' | 'block'; // Assuming display can only be 'none' or 'block'
  visibility?: string;
  height: number;
  width: number;
  top: string | number;
  left: string | number;
  maxHeight?: string | number;
}
interface User {
  full_name: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  private_mode?: string;
  date: string;
  start_time: string;
  end_time: string;
  user_id: string;
  id: string;
  user: User;
  type: string;
  currentTab?: string;
}

export interface GroupedEvents {
  [userId: string]: CalendarEvent[]; // Array of CalendarEvent objects for each user
}

export interface CustomEventProps {
  event: CalendarEvent;
}

export interface ReactCalendarProps {
  setFilterRange?: Dispatch<
    SetStateAction<{
      start_date?: string | Date | undefined;
      end_date?: string | Date | undefined;
    }>
  >;
  events: CalendarEvent[];
  currentTab?: string;
  onViewChange: any;
  calendarView?: any;
  setCurrentDate?: any;
  currentDate?: any;
}

export interface availabilitySlots {
  start_time?: string;
  end_time?: string;
  user: {
    full_name?: string;
  };
}

export interface TimeSlotsProps {
  start_time: string;
  end_time: string;
  id: string;
}

export interface CourseDetailsProps {
  start_time?: string;
  end_time?: string;
  type?: { type?: string };
  private_mode?: string;
  cover_image?: string;
  title?: string;
  assign_teachers?: { full_name?: string };
}

export enum TabValueProps {
  Courses = 'Courses',
  Teachers = 'Teachers',
}
