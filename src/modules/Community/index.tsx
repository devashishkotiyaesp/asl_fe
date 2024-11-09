import Button from 'components/Button/Button';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import TabComponent from 'components/Tabs';
import { TabColumnProps } from 'components/Tabs/types';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'utils';
import { CommunityType } from './constants';
import CommunityTable from './pages/CommunityTable';

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState<string>('');
  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);
  const { t } = useTranslation();
  const tabs: TabColumnProps[] = [
    {
      uniqueKey: 'communityFeed',
      title: 'Community.Feed',
      component: <h1>{t('Community.Feed')}</h1>,
    },
    {
      uniqueKey: 'communityTopic',
      title: 'Community.Topic',
      component: (
        <CommunityTable
          communityType={CommunityType.TOPIC}
          search={debouncedSearch}
        />
      ),
    },
    {
      uniqueKey: 'communityDiscussion',
      title: 'Community.Discussion',
      component: (
        <CommunityTable
          communityType={CommunityType.DISCUSSION}
          search={debouncedSearch}
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
            onClickHandler={() => navigate('/admin/reported-comments')}
          >
            <Image iconName="infoIcon" iconClassName="" />
            {t('ReportedComments.Title')}
          </Button>
        </div>
      </PageHeader>
      <div className="content-base">
        <TabComponent
          current={activeTab}
          onTabChange={(status: SetStateAction<number>) => {
            setActiveTab(status);
          }}
        >
          {tabs?.map(({ title, component, icon }: TabColumnProps, index: number) => (
            <TabComponent.Tab key={`TAB_${index + 1}`} title={t(title)} icon={icon}>
              {activeTab === index && component}
            </TabComponent.Tab>
          ))}
        </TabComponent>
      </div>
    </>
  );
};

export default Community;
