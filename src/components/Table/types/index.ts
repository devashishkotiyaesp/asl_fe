import React, { ReactElement } from 'react';

export interface ITableHeaderProps {
  header?: string;
  image?: string;
  name?: string;
  className?: string;
  cell?: (props: CellProps) => string | ReactElement;
  option?: {
    sort?: boolean;
    hasFilter?: boolean;
    hasImage?: boolean;
    isIndex?: boolean;
  };
  imagePath?: string;
  filterComponent?: ReactElement;
  subString?: boolean;
  date?: Date | string;
}

export type CellProps = { [key: string]: string };

export interface ITableProps<DataType> {
  bodyData?: DataType[];
  headerData?: ITableHeaderProps[];
  loader?: boolean;
  dataPerPage?: number;
  totalPage?: number;
  dataCount?: number;
  pagination?: boolean;
  setLimit?: (number: number) => void;
  setSort?: (string: string) => void;
  sort?: string;
  columnWidth?: string;
  width?: string;
  tableHeightClassName?: string;
  parentClassName?: string;
  tableRoundedRadius?: string;
  rowClass?: string;
  tableHeaderClass?: string;
  renderRowClass?: (props: CellProps) => boolean;
  headerTitle?: string;
  headerExtra?: React.ReactNode;
  islastRowOnRight?: boolean;
}
