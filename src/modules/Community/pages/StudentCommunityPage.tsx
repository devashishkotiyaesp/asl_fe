// ** Components **
import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import TabComponent from 'components/Tabs';
import CommunityList from '../components/CommunityList';
import OrganizationModal from '../components/OrganizationModal';

// ** Types  **
import { TabColumnProps } from 'components/Tabs/types';

// ** Constants **

// ** Hooks **
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// ** Redux Selectors **
import { getCurrentUser } from 'reduxStore/slices/authSlice';

// ** Utilities **

// ** Styles **
import { Roles } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'utils';
import { Community, ICommunityResponse } from '../types';
import './style/index.css';
import ViewCommunityFeed from './ViewCommunityFeed';

const StudentCommunityPage = () => {
  // ** State **
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('community') ?? 'feed';
  const [activeTab, setActiveTab] = useState<string>(currentTab ?? 'feed');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState<number>(10);
  const [communityData, setCommunityData] = useState<ICommunityResponse>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [deletedId, setDeletedId] = useState('');
  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);

  // ** Axios **
  const [getCommunityData, { isLoading }] = useAxiosGet();
  const [getNewData, { isLoading: newDataLoading }] = useAxiosGet();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async () => {
    const data = await getCommunityData('/community', {
      params: {
        type: activeTab,
        limit,
        search: debouncedSearch,
      },
    });
    setCommunityData((prevData) => {
      const newData = {
        ...data.data,
        data: prevData?.data
          ? [...prevData.data, ...data.data.data].filter(
              (item) => item.id !== deletedId
            )
          : data.data.data.filter((item: Community) => item.id !== deletedId),
      };
      return newData;
    });
    setTotalCount(data.data.count);
  };

  const refetchData = () => {
    setCommunityData(undefined);
    if (activeTab !== 'feed') fetchData();
  };

  const loadMoreData = async () => {
    const data = await getNewData('/community', {
      params: {
        type: activeTab,
        limit,
        search: debouncedSearch,
        page: currentPage + 1,
      },
    });
    setCurrentPage(currentPage + 1);
    setCommunityData((prev) => {
      const newData: ICommunityResponse = {
        limit: data?.data?.limit,
        count: data?.data?.count,
        lastPage: data?.data?.lastPage,
        currentPage: data.data?.currentPage,
        data: [...(prev?.data ?? []), ...(data?.data?.data ?? [])].filter(
          (item) => item.id !== deletedId
        ),
      };
      return newData;
    });
  };

  // ** Hooks **
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const orgListModal = useModal();

  // ** UseEffect **

  useEffect(() => {
    if (activeTab) {
      setCommunityData(undefined);
      if (activeTab !== 'feed') fetchData();
    }
  }, [limit, debouncedSearch, activeTab, deletedId]);

  useEffect(() => {
    if (activeTab) {
      setCommunityData(undefined);
      setLimit(10);
      setTotalCount(0);
      setCurrentPage(1);
    }
  }, [activeTab]);

  const tabs: TabColumnProps[] = [
    {
      uniqueKey: 'feed',
      title: 'Community.Feed',
      component: <ViewCommunityFeed search={debouncedSearch} />,
    },
    {
      uniqueKey: 'topic',
      title: 'Community.Topics',
      component: !isLoading ? (
        <CommunityList
          isLoading={newDataLoading}
          communityData={communityData}
          loadMore={() => loadMoreData()}
          totalCount={totalCount}
          setDeletedId={setDeletedId}
          searchParams={searchParams}
        />
      ) : (
        <Image loaderType="Spin" />
      ),
    },
    {
      uniqueKey: 'discussion',
      title: 'Community.Discussions',
      component: !isLoading ? (
        <CommunityList
          isLoading={newDataLoading}
          communityData={communityData}
          loadMore={() => loadMoreData()}
          totalCount={totalCount}
          setDeletedId={setDeletedId}
          searchParams={searchParams}
        />
      ) : (
        <Image loaderType="SiteLoader" />
      ),
    },
  ];

  return (
    <div className="container">
      <div className="student-page-header">
        <Breadcrumbs
          items={[
            {
              label: t('Header.CMS.Home'),
              url: '/',
            },
            {
              label: t('Community.Title'),
              url: '/community',
            },
          ]}
        />
      </div>
      <PageHeader title="Community">
        <SearchComponent
          parentClass="1200:min-w-[300px] 1400:min-w-[440px]"
          onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e?.target?.value);
          }}
          value={search}
          placeholder={t('InputSearchPlaceholder')}
          onClear={() => {
            setSearch('');
          }}
        />
      </PageHeader>

      <TabComponent
        current={activeTab}
        onTabChange={(status: string) => {
          setActiveTab(status);
          searchParams.set('community', status);
          setSearchParams(searchParams);
        }}
        sideComponent={
          <>
            {String(user?.role?.role) === Roles.Teacher && activeTab !== 'feed' ? (
              <div className="">
                <Button
                  variants="PrimaryWood"
                  onClickHandler={() => {
                    if (activeTab !== 'feed') orgListModal.openModal();
                  }}
                >
                  {t('Community.Page.CreateCommunity')}{' '}
                  {activeTab !== 'feed'
                    ? t(tabs.find((tab) => tab.uniqueKey === activeTab)?.title || '')
                    : ''}
                </Button>
              </div>
            ) : (
              ''
            )}
          </>
        }
      >
        {tabs.map(
          ({ title, component, icon, uniqueKey }: TabColumnProps, index: number) => (
            <TabComponent.Tab
              key={`TAB_${index + 1}`}
              title={t(title)}
              icon={icon}
              uniqueKey={uniqueKey}
              variant="fill"
            >
              {activeTab === uniqueKey && component}
            </TabComponent.Tab>
          )
        )}
      </TabComponent>

      <OrganizationModal
        refetch={() => refetchData()}
        modal={orgListModal}
        isDiscussion={activeTab === 'discussion'}
      />
    </div>
  );
};

export default StudentCommunityPage;
