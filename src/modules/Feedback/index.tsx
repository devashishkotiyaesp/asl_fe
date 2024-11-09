import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TabComponent from 'components/Tabs';
import { TabColumnProps } from 'components/Tabs/types';
import { useDebounce } from 'utils';
import FeedbackPage from './Component/FeedbackPage';
import SupportRequest from './Component/SupportRequest';
import './style/index.css';

const Feedback = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const [search, setSearch] = useState('');

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
      component: <SupportRequest search={debouncedSearch} />,
    },
  ];

  return (
    <>
      <>
        <PageHeader title={t('FeedbackLabel')}>
          <SearchComponent
            parentClass="min-w-[300px]"
            placeholder={t('InputSearchPlaceholder')}
            onSearch={(e) => setSearch(e.target.value)}
          />
        </PageHeader>
        <div className="content-base">
          <TabComponent
            current={activeTab}
            onTabChange={(e: SetStateAction<number>) => setActiveTab(e)}
          >
            {tabs?.map(
              ({ icon, component, title }: TabColumnProps, index: number) => (
                <TabComponent.Tab key={`TAB_${index + 1}`} icon={icon} title={title}>
                  {activeTab === index && component}
                </TabComponent.Tab>
              )
            )}
          </TabComponent>
        </div>
      </>
    </>
  );
};

export default Feedback;
