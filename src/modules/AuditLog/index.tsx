import Button from 'components/Button/Button';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { capitalizeFirstCharacter, useDebounce } from 'utils';
import { getDateFormate } from 'utils/date';
import AuditLogFilter from './components/auditLogFilter';
import { AuditLogType, FilterApplyProps } from './types';

const AuditLog = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const { currentPage } = useSelector(currentPageSelector);
  // const navigate = useNavigate();
  const [getApi, { isLoading }] = useAxiosGet();
  // const [deleteApi] = useAxiosDelete();
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 300);
  const [filterModal, setFilterModal] = useState(false);
  const [limit, setLimit] = useState<number>(10);
  const [filterApply, setFilterApply] = useState<FilterApplyProps>({
    startDate: '',
    endDate: '',
  });
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null);

  const { t } = useTranslation();

  const storeLang = useSelector(useLanguage);

  const [auditLogs, setAuditLogs] = useState<{
    count: number;
    currentPage: number;
    data: string[];
    lastPage: number;
    limit: number;
  }>();
  const dateRender = ({ created_at }: AuditLogType) => (
    <div>{getDateFormate(created_at)}</div>
  );

  const getAuditLogs = async () => {
    const response = await getApi('/audit_log', {
      params: {
        page: currentPage,
        limit,
        search: capitalizeFirstCharacter(debounceSearch),
        ...filterApply,
      },
    });
    setTotalPages(response.data.lastPage);
    setAuditLogs(response.data);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setFilterModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    getAuditLogs();
  }, [currentPage, storeLang, debounceSearch, filterApply, limit]);
  return (
    <>
      <PageHeader title={t('Sidebar.AuditLog')}>
        <div className="blog-search flex gap-2">
          <SearchComponent
            parentClass="min-w-[300px]"
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e?.target?.value);
            }}
            isSearchIcon={false}
            value={search}
            placeholder={t('InputSearchPlaceholder')}
            onClear={() => {
              setSearch('');
            }}
          />
          <div className="relative flex">
            <Button
              onClickHandler={() => {
                setFilterModal(!filterModal);
              }}
              variants="black"
              className="gap-1 !flex !py-2.5 !px-3.5"
            >
              {t('AuditLog.Filter.Title.Filter')}
            </Button>
            {filterModal && (
              <div
                ref={modalRef}
                className={`${
                  filterModal && 'z-1'
                } absolute right-0 top-full before:absolute transition-all duration-300`}
              >
                <div className="bg-white rounded-xl shadow-xl w-[340px]">
                  <div className="px-5 py-3.5 border-b border-solid border-offWhite">
                    <h5 className="text-base leading-5 font-semibold text-dark">
                      {t('AuditLog.Filter.Title.Filter')}
                    </h5>
                  </div>
                  <div className="px-5 py-3">
                    <div className="flex flex-col gap-y-3">
                      <AuditLogFilter
                        setFilterModal={setFilterModal}
                        setFilterApply={setFilterApply}
                        filterApply={filterApply}
                        t={t}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageHeader>
      <div className="content-base">
        <Table
          headerData={[
            {
              header: `${t('Table.Number')}`,
              option: { isIndex: true },
            },
            {
              header: `${t('AuditLog.Table.LastUpdated')}`,
              cell: (props) => dateRender(props as unknown as AuditLogType),
              name: 'created_at',
            },
            {
              header: `${t('AuditLog.Table.User')}`,
              name: 'user.full_name',
            },
            {
              header: `${t('AuditLog.Table.UserType')}`,
              name: 'user.role.role',
            },
            {
              header: `${t('AuditLog.Table.UserEvent')}`,
              name: 'title',
            },
            {
              header: `${t('AuditLog.Table.Description')}`,
              name: 'description',
            },
            // {
            //   header: t('Community.Table.Action'),
            //   // className: '[&>span]:justify-center',
            //   // cell: (props: any) => actionRender(props),
            // },
          ]}
          islastRowOnRight={false}
          bodyData={auditLogs?.data}
          pagination
          totalPage={totalPages}
          dataCount={auditLogs?.count}
          dataPerPage={limit}
          setLimit={setLimit}
          loader={isLoading}
        />
      </div>
    </>
  );
};

export default AuditLog;
