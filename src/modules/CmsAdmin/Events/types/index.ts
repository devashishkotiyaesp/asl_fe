export type EventTypes = {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  slug: string;
  location: string;
  image_path: string;
  event_language: {
    name: string;
  };
};

export interface IEventItem {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  slug: string;
  location: string;
  language: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EventDataTypes {
  data: IEventItem[];
  lastPage: number;
  count: number;
}

export interface EditDataType {
  [fieldName: string]: string | string[] | File;
}

export interface EventValueProps {
  [x: string]: {
    id: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    description: string;
    slug: string;
    location: string;
    image_path: string;
  };
}
