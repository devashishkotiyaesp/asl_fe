import Button from 'components/Button/Button';
import Icon from 'components/Icon';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentPageCount } from 'reduxStore/slices/paginationSlice';
import './index.css';

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  dataPerPage: number;
  dataCount?: number;
  parentClass?: string;
  setLimit?: (number: number) => void;
  disableMassPaginate?: boolean;
}
const Pagination = ({
  parentClass,
  currentPage,
  totalPages,
  dataPerPage,
  dataCount,
  setLimit,
  disableMassPaginate = false,
}: IPaginationProps) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState<number[]>([]);
  const [limitData, setLimitData] = useState<number>();
  function generatePaginationNumbers(
    totalPages: number,
    currentPage: number,
    perPage: number // Limit ( Per Page Data)
  ) {
    const paginationNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(perPage / 2));
    const endPage = Math.min(startPage + perPage - 1, totalPages);

    if (currentPage > endPage) {
      dispatch(currentPageCount({ currentPage: endPage }));
    }
    while (startPage <= endPage) {
      paginationNumbers.push(startPage);
      startPage++;
    }
    return paginationNumbers;
  }

  useEffect(() => {
    setLimitData(dataPerPage);
  }, [limitData]);

  useEffect(() => {
    setPageNumber(generatePaginationNumbers(totalPages, currentPage, dataPerPage));
  }, [currentPage, totalPages]);

  const handlePageChange = (value: number, action?: string) => {
    if (action === 'increment') {
      dispatch(currentPageCount({ currentPage: value + 1 }));
    } else if (action === 'decrement') {
      dispatch(currentPageCount({ currentPage: value - 1 }));
    } else {
      dispatch(currentPageCount({ currentPage: value }));
    }
  };

  return (
    <div className={`pagination-wrap ${parentClass ?? ''}`}>
      <div className="pagination-inner ">
        {totalPages >= 1 && (
          <ul className="pagination-list">
            {!disableMassPaginate && (
              <li className="h-fit">
                <Button
                  className={`pagination-item arrow ${
                    currentPage !== 1 ? 'active' : 'disabled'
                  }`}
                  onClickHandler={() =>
                    currentPage > 1 && handlePageChange(1, 'start')
                  }
                >
                  <span className="icon">
                    <Icon name="leftDoubleArrows" />
                  </span>
                </Button>
              </li>
            )}
            <li className="h-fit">
              <Button
                className={`pagination-item arrow ${
                  currentPage > 1 ? 'active' : 'disabled'
                } `}
                onClickHandler={() =>
                  currentPage > 1 && handlePageChange(currentPage, 'decrement')
                }
              >
                <span className="icon">
                  <Icon name="chevronLeft" />
                </span>
              </Button>
            </li>
            {pageNumber?.map((num: number) => {
              return (
                <li key={num} className="h-fit flex">
                  <Button
                    onClickHandler={() => handlePageChange(num)}
                    className={`pagination-item  font-medium ${
                      num === currentPage ? 'active' : ''
                    } `}
                  >
                    {num}
                  </Button>
                </li>
              );
            })}
            <li className="h-fit">
              <Button
                className={`pagination-item arrow  ${
                  currentPage < totalPages ? 'active' : 'disabled'
                } `}
                onClickHandler={() =>
                  currentPage < totalPages &&
                  handlePageChange(currentPage, 'increment')
                }
              >
                <span className="icon">
                  <Icon name="chevronRight" />
                </span>
              </Button>
            </li>
            {!disableMassPaginate && (
              <li className="h-fit">
                <Button
                  className={`pagination-item arrow ${
                    currentPage !== totalPages ? 'active' : 'disabled'
                  }`}
                  onClickHandler={() =>
                    currentPage < totalPages && handlePageChange(totalPages, 'end')
                  }
                >
                  <span className="icon">
                    <Icon name="rightDoubleArrows" />
                  </span>
                </Button>
              </li>
            )}
          </ul>
        )}
        {dataCount && limitData && (
          <div className="pagination-select">
            <span className="text-sm/4 text-black/50 font-semibold">Show</span>
            <select
              name=""
              id=""
              className="text"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setLimit?.(Number(e.target.value));
                dispatch(currentPageCount({ currentPage: 1 }));
              }}
              defaultValue={dataPerPage}
            >
              {dataCount >= 1 && <option value={5}>5</option>}
              {dataCount >= 5 && <option value={10}>10</option>}
              {dataCount >= 10 && <option value={20}>20</option>}
              {dataCount >= 20 && <option value={50}>50</option>}
              {dataCount >= 50 && <option value={100}>100</option>}
              <option value={dataCount}>All</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
