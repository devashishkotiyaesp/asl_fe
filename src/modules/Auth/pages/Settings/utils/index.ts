import { SettingListProps } from '../types';

interface Item {
  id: string;
  level: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ASLLevelData {
  data: Item[];
  count: number;
  currentPage: number;
  limit: number;
  lastPage: number;
}

export const SettingList: SettingListProps[] = [
  {
    id: 0,
    icon: 'aSLLevel',
    name: 'ASL Levels',
    navigate: '/settings/asl-level',
  },
  {
    id: 1,
    icon: 'courseCategory',
    name: 'Course Categories',
    navigate: '/settings/course-category',
  },
  {
    id: 2,
    icon: 'organizationType',
    name: 'Organization Types',
    navigate: '/settings/organization-types',
  },
  {
    id: 3,
    icon: 'supportFaq',
    name: 'Support FAQs',
    navigate: '/settings/support-faqs',
  },
  {
    id: 3,
    icon: 'tags',
    name: 'Feedback Tags',
    navigate: '/settings/tags',
  },
];
