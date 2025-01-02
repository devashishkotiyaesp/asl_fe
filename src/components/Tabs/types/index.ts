import { IconTypes } from 'components/Icon/types';
import { ReactNode } from 'react';

export interface TabComponentProps {
  current: string;
  children: ReactNode;
  searchable?: boolean;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTabChange?: (tabIndex: string) => void;
  sideComponent?: JSX.Element | null;
}
export interface TabProps {
  title?: string;
  icon?: IconTypes;
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  variant?: 'fill' | null;
  uniqueKey: string;
}

export type TabColumnProps = {
  title: string;
  component: JSX.Element;
  icon?: IconTypes;
  uniqueKey: string;
};
