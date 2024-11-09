import { IconTypes } from 'components/Icon/types';
import { ReactNode } from 'react';

export interface TabComponentProps {
  current: number;
  children: ReactNode;
  searchable?: boolean;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTabChange?: (tabIndex: number) => void;
  sideComponent?: JSX.Element | null;
}
export interface TabProps {
  title?: string;
  icon?: IconTypes;
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export type TabColumnProps = {
  title: string;
  component: JSX.Element;
  icon?: IconTypes;
  uniqueKey: string;
};
