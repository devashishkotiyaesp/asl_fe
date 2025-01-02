import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import TabComponent from 'components/Tabs';
import { TabColumnProps } from 'components/Tabs/types';
import { useDebounce } from 'utils';
import SupportRequest from './Component/SupportRequest';
import SupportRequestFilter from './Component/SupportRequestFilter';

import InterComAuth from 'modules/Auth/components/InterComAuth';
import { useSearchParams } from 'react-router-dom';
import FeedbackPage from './Component/FeedbackPage';
import './style/index.css';
import { FilterApplyProps } from './types';

const Feedback = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('SupportRequest') ?? 'SupportRequest';
  const [activeTab, setActiveTab] = useState(currentTab ?? 'SupportRequest');
  const [filterModal, setFilterModal] = useState(false);
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [filterApply, setFilterApply] = useState<FilterApplyProps>({
    status: [],
    startDate: '',
    endDate: '',
  });

  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);

  // FOR TAB COMPONENT
  const tabs: TabColumnProps[] = [
    {
      uniqueKey: 'Feedback',
      title: t('FeedbackLabel'),
      component: <FeedbackPage search={debouncedSearch} />,
    },
    {
      uniqueKey: 'SupportRequest',
      title: t('SupportRequest'),
      component: (
        <SupportRequest search={debouncedSearch} filterApply={filterApply} />
      ),
    },
  ];
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

  return (
    <div>
      <PageHeader title={t('FeedbackLabel')}>
        <div className="flex gap-2">
          <SearchComponent
            parentClass="min-w-[300px]"
            placeholder={t('InputSearchPlaceholder')}
            onSearch={(e) => setSearch(e.target.value)}
            value={search}
            onClear={() => {
              setSearch('');
            }}
          />
          {activeTab === currentTab && (
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
                        <SupportRequestFilter
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
          )}
        </div>
      </PageHeader>
      <div className="content-base relative">
        {activeTab === currentTab && <InterComAuth />}
        <TabComponent
          current={activeTab}
          onTabChange={(status: string) => {
            setActiveTab(status);
            searchParams.set('feedback', status);
            setSearchParams(searchParams);
          }}
        >
          {tabs?.map(
            (
              { icon, component, title, uniqueKey }: TabColumnProps,
              index: number
            ) => (
              <TabComponent.Tab
                key={`TAB_${index + 1}`}
                icon={icon}
                title={t(title)}
                uniqueKey={uniqueKey}
              >
                {activeTab === uniqueKey && component}
              </TabComponent.Tab>
            )
          )}
        </TabComponent>
      </div>
    </div>
  );
};

export default Feedback;
