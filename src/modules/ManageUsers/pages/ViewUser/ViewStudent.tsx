import TabComponent from 'components/Tabs';
import { TabColumnProps } from 'components/Tabs/types';
import { t } from 'i18next';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import StudentPersonalDetails from './StudentPersonalDetails';

const ViewStudent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('student') ?? 'personalDetails';
  const [activeTab, setActiveTab] = useState(currentTab ?? 'personalDetails');

  const tabs: TabColumnProps[] = [
    {
      uniqueKey: 'personalDetails',
      title: 'Personal Details',
      component: <StudentPersonalDetails />,
    },
    {
      uniqueKey: 'subscription',
      title: 'Subscriptions',
      component: <h1>Subscriptions</h1>,
    },
    {
      uniqueKey: 'courses',
      title: 'Courses',
      component: <h1>Courses</h1>,
    },
    {
      uniqueKey: 'assessments',
      title: 'Assessments',
      component: <h1>Assessments</h1>,
    },
    {
      uniqueKey: 'Settings',
      title: 'Settings',
      component: <h1>Settings</h1>,
    },
  ];

  return (
    <div className="content-base">
      <TabComponent
        current={activeTab}
        onTabChange={(status: string) => {
          setActiveTab(status);
          searchParams.set('student', status);
          setSearchParams(searchParams);
        }}
      >
        {tabs?.map(
          ({ title, component, icon, uniqueKey }: TabColumnProps, index: number) => (
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
  );
};

export default ViewStudent;
