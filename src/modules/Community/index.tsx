import Button from 'components/Button/Button';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import TabComponent from 'components/Tabs';
import { TabColumnProps } from 'components/Tabs/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'utils';
import { CommunityType } from './constants';
import './index.css';
import CommunityTable from './pages/CommunityTable';
import ViewCommunityFeed from './pages/ViewCommunityFeed';

const Community = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('community') ?? 'feed';
  const communityUrlType =
    new URLSearchParams(location.search).get('community') || currentTab;
  const [activeTab, setActiveTab] = useState(currentTab ?? 'feed');
  const [search, setSearch] = useState<string>('');
  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);
  const { t } = useTranslation();
  const tabs: TabColumnProps[] = [
    {
      uniqueKey: 'feed',
      title: 'Community.Feed',
      component: <ViewCommunityFeed search={debouncedSearch} />,
    },
    {
      uniqueKey: 'topic',
      title: 'Community.Topics',
      component: (
        <CommunityTable
          communityType={CommunityType.TOPIC}
          search={debouncedSearch}
          searchParams={searchParams}
        />
      ),
    },
    {
      uniqueKey: 'discussion',
      title: 'Community.Discussions',
      component: (
        <CommunityTable
          communityType={CommunityType.DISCUSSION}
          search={debouncedSearch}
          searchParams={searchParams}
        />
      ),
    },
  ];
  return (
    <>
      <PageHeader title={t('Community.Title')}>
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
          <Button
            variants="PrimaryWoodLight"
            className="whitespace-nowrap text-PrimaryWood"
            onClickHandler={() =>
              navigate(`/reported-comments?community=${communityUrlType}`)
            }
          >
            <Image iconName="infoIcon" iconClassName="" />
            {t('ReportedComments.ManageTitle')}
          </Button>
        </div>
      </PageHeader>
      <div className="content-base">
        <TabComponent
          current={activeTab}
          onTabChange={(status: string) => {
            setActiveTab(status);
            searchParams.set('community', status);
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

export default Community;
