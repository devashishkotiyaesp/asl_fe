/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import NoDataFound from 'components/NoDataFound';
import Pagination from 'components/Pagination/Pagination';
import { ITableHeaderProps, ITableProps } from 'components/Table/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { customRandomNumberGenerator } from 'utils';
import './style/table.css';

function Table<DataType>({
  bodyData = [],
  headerData = [],
  loader,
  dataPerPage = 10,
  totalPage,
  dataCount,
  pagination,
  setLimit,
  setSort,
  columnWidth,
  sort,
  width,
  tableHeightClassName,
  parentClassName,
  tableRoundedRadius,
  rowClass,
  tableHeaderClass,
  renderRowClass,
  headerTitle,
  headerExtra,
  islastRowOnRight = true,
  tableRowClick,
  handleSelectAll,
  isAllSelected,
}: Readonly<ITableProps<DataType>>) {
  const [isSortAsc, setIsSortAsc] = useState<boolean>();
  const { currentPage } = useSelector(currentPageSelector);
  const tablLazyCount = [...Array(dataPerPage > 0 ? dataPerPage : 10).keys()];
  const { t } = useTranslation();

  const renderTableHeader = (val: ITableHeaderProps, index: number) => {
    if (Object.keys(val).length) {
      const RenderComponent = val.filterComponent;
      return (
        <th
          key={`${val.header}_${index + 1}`}
          scope="col"
          className={`group/tbl first:w-[70px] ${columnWidth || ''} ${val.className || ''}`}
        >
          {val?.option?.hasFilter ? RenderComponent : renderDefaultHeader(val)}
        </th>
      );
    }
  };

  const renderDefaultHeader = (val: ITableHeaderProps) => (
    <span
      className={`td-child ${islastRowOnRight ? 'group-last/tbl:justify-end' : ''} `}
    >
      {val?.header}
      {val.isCheckBox && (
        <Checkbox check={isAllSelected} onChange={() => handleSelectAll?.()} />
      )}
      {val?.option?.sort ? (
        <Button
          className="w-4 h-4 ms-1 opacity-0 group-hover/tbl:opacity-100"
          onClickHandler={() => handleSorting(val ?? '')}
        >
          {val?.option?.sort && renderSortIcon()}
        </Button>
      ) : (
        ''
      )}
    </span>
  );

  const handleSorting = (val: ITableHeaderProps) => {
    const splitName = val.name?.split('.');
    const sortFieldName = splitName ? splitName[splitName.length - 1] : val.name;

    if (sortFieldName) {
      if (sort?.includes(`-${sortFieldName}`)) {
        setSort?.(sortFieldName);
        setIsSortAsc(true);
      } else {
        setSort?.(`-${sortFieldName}`);
        setIsSortAsc(false);
      }
    }
  };

  const renderSortIcon = () => (
    <Image
      iconClassName={`w-4 h-4 ${isSortAsc ? 'rotate-90' : '-rotate-90'}`}
      iconName="arrowRightIcon"
    />
  );

  const renderColumnCell = (
    row: { [key: string]: string },
    columnCell: ITableHeaderProps
  ) => {
    if (columnCell?.cell && !columnCell.subString) {
      if (typeof columnCell.cell(row) === 'string') {
        const str = columnCell.cell(row) as string;
        if (str.length > 25) return `${str.substring(0, 25)}...`;
      }
    }
    return columnCell.cell?.(row);
  };

  const renderRowCell = (
    row: { [key: string]: string },
    columnCell: ITableHeaderProps,
    index: number
  ) => {
    if (columnCell?.option?.isIndex) {
      return startRecord + index;
    }
    if (columnCell?.name) {
      if (row[columnCell.name]) {
        if (row[columnCell.name].length > 100) {
          return `${row[columnCell.name].substring(0, 25)}...`;
        }
        return row[columnCell.name];
      }
      if (columnCell.name.toString().includes('.')) {
        const allKeys = columnCell.name.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let newData: any = null;
        allKeys.forEach((element: string) => {
          newData = !newData ? row[element] : newData[element];
        });
        return newData ?? '-';
      }
    }
    return '-';
  };

  const renderInnerHtml = (
    columnCell: ITableHeaderProps,
    row: { [key: string]: string },
    index: number
  ) => {
    return `<span>
        ${renderRowCell(row, columnCell, index)}
      </span>`;
  };
  /* Calculate the starting and ending records for the current page, considering the number of records per page. */
  const startRecord = (Number(currentPage || 1) - 1) * Number(dataPerPage) + 1;
  const endRecord =
    Number(currentPage || 1) * Number(dataPerPage) <= Number(dataCount)
      ? Number(currentPage || 1) * Number(dataPerPage)
      : dataCount;

  /* Check if there is data available for the current page. */
  const isDataAvailable = endRecord && startRecord <= endRecord;
  return (
    <div className={parentClassName ?? `main-table`}>
      <div className={`table-wrapper relative ${tableRoundedRadius ?? ''}`}>
        {headerExtra || headerTitle ? (
          <div className="header-title-wrap">
            {headerTitle ? (
              <div className="table-header-title">{headerTitle}</div>
            ) : (
              ''
            )}
            {headerExtra && <div className="header-title-extra">{headerExtra}</div>}
          </div>
        ) : (
          ''
        )}
        <div className={` ${tableHeightClassName ?? ''}`}>
          {/* overflow-auto */}
          <table className={`datatable-main w-full ${width ?? ''}`}>
            {/* sticky top-0 z-1 */}
            <thead className={tableHeaderClass ?? 'custom-table-header'}>
              <tr>
                {headerData.map((val: ITableHeaderProps, index) =>
                  renderTableHeader(val, index)
                )}
              </tr>
            </thead>

            <tbody className="rounded">
              {loader && (
                <>
                  {tablLazyCount.map((_, i) => {
                    return (
                      <tr key={`Key_${i + 1}`}>
                        {headerData.map((_, j) => {
                          return (
                            //  colSpan={headerData?.length}
                            <td key={`Key_${j + 1}`}>
                              <div className="relative w-full flex items-center">
                                <div className="lazy w-full h-10 rounded-lg" />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              )}
              {!loader && bodyData.length === 0 && (
                <tr>
                  <td className="" colSpan={headerData?.length}>
                    <NoDataFound message="No Data Found" />
                  </td>
                </tr>
              )}
              {!loader && bodyData && bodyData.length > 0 && (
                <>
                  {bodyData.map((row: any, index) => {
                    return (
                      <tr
                        role="button"
                        onClick={() => {
                          tableRowClick?.(row);
                        }}
                        key={`tr_${row?.id ?? customRandomNumberGenerator()}`}
                      >
                        {headerData?.map((columnCell) => {
                          if (Object.keys(columnCell).length) {
                            return (
                              <td
                                className={`group/tbl  ${
                                  renderRowClass?.(row) && rowClass ? rowClass : ''
                                }`}
                                key={`td_${
                                  columnCell?.header ??
                                  customRandomNumberGenerator(100000)
                                }`}
                              >
                                <div
                                  className={`td-child ${islastRowOnRight ? 'group-last/tbl:justify-end group-last/tbl:text-right' : ''}`}
                                >
                                  {columnCell?.cell ? (
                                    renderColumnCell(row, columnCell)
                                  ) : (
                                    <span
                                      className="w-full"
                                      // eslint-disable-next-line react/no-danger
                                      dangerouslySetInnerHTML={{
                                        __html: renderInnerHtml(
                                          columnCell,
                                          row,
                                          index
                                        ),
                                      }}
                                    />
                                  )}
                                </div>
                              </td>
                            );
                          }
                          return (
                            <td
                              key={`td_${
                                columnCell?.header ??
                                customRandomNumberGenerator(100000)
                              }`}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dataPerPage ? (
        <div className="table-footer ">
          <div className="pagination-show-count">
            <p className="">
              {isDataAvailable
                ? t('Cms.Pagination.Text', {
                    START: startRecord,
                    END: endRecord,
                    TOTAL: dataCount,
                  })
                : ''}
            </p>
          </div>
          {pagination && totalPage ? (
            <Pagination
              setLimit={setLimit}
              currentPage={currentPage ?? 1}
              dataPerPage={dataPerPage}
              dataCount={dataCount}
              totalPages={totalPage}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Table;
