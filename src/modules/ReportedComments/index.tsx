import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import TabComponent from 'components/Tabs';
import { TabColumnProps } from 'components/Tabs/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'utils';
import DeletedComments from './components/DeletedComments';
import ReportedComments from './components/ReportedComments';

const ManageComments = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('reported-comments') ?? 'reported';
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(currentTab ?? 'reported');
  const [search, setSearch] = useState<string>('');
  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);
  const location = useLocation();
  const communityUrlType =
    new URLSearchParams(location.search).get('community') || 'feed';

  const { t } = useTranslation();
  const tabs: TabColumnProps[] = [
    {
      uniqueKey: 'reported',
      title: 'ReportedComments.Title',
      component: <ReportedComments search={debouncedSearch} />,
    },
    {
      uniqueKey: 'deleted',
      title: 'DeletedComments.Title',
      component: <DeletedComments search={debouncedSearch} />,
    },
  ];
  return (
    <>
      <PageHeader
        title={t('ReportedComments.ManageTitle')}
        url={`/community?community=${communityUrlType}`}
      >
        <div className="flex gap-4">
          <SearchComponent
            parentClass="min-w-[300px]"
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e?.target?.value);
            }}
            value={search}
            placeholder={t('InputSearchPlaceholder')}
            onClear={() => {
              setSearch('');
            }}
          />
        </div>
      </PageHeader>
      <div className="content-base">
        <TabComponent
          current={activeTab}
          onTabChange={(status: string) => {
            setActiveTab(status);
            searchParams.set('reported-comments', status);
            setSearchParams(searchParams);
          }}
        >
          {tabs?.map(
            (
              { title, component, icon, uniqueKey }: TabColumnProps,
              index: number
            ) => (
              <TabComponent.Tab
                key={`TAB_${index + 1}`}
                title={t(title)}
                icon={icon}
                uniqueKey={uniqueKey}
              >
                {activeTab === uniqueKey && component}
              </TabComponent.Tab>
            )
          )}
        </TabComponent>
      </div>
    </>
  );
};

export default ManageComments;
