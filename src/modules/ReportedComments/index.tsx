import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { StudentNavigation } from 'constants/navigation.constant';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style/index.css';
import { ReportedCommentItem, ReportedCommentProps } from './types';

const ReportedComments = () => {
  const { t } = useTranslation();
  const ReportCommentItem = useModal();
  const [getReportedComments, { isLoading }] = useAxiosGet();
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [commentItem, setCommentItem] = useState<ReportedCommentItem>();
  const [reportedCommentData, setReportedCommentData] =
    useState<ReportedCommentProps>();
  const [deleteReportedCommentsApi, { isLoading: isLoadingForDelete }] =
    useAxiosDelete();

  const handleGetReportedComments = async () => {
    const data = await getReportedComments('/report-comment', {
      params: {
        limit,
        sort,
      },
    });
    setReportedCommentData(data.data);
  };

  useEffect(() => {
    handleGetReportedComments();
  }, []);

  const handleDeleteReportedComments = async (id: string | undefined) => {
    const { error } = await deleteReportedCommentsApi(`/comment/${id}`);
    if (!error) {
      ReportCommentItem.closeModal();
      handleGetReportedComments();
    }
  };

  const columnData: ITableHeaderProps[] = [
    {
      header: t('Table.Number'),
      name: 'no',
      option: {
        sort: true,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      header: t('Table.Name'),
      name: 'name',
      option: {
        sort: true,
        hasFilter: false,
      },
      cell: (props) => handleProfile(props as unknown as ReportedCommentItem),
    },
    {
      header: t('Table.ReportedComments'),
      name: 'comment.description',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Table.ReportedCommentsCount'),
      name: 'reportCount',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Community.Table.Action'),
      cell: (props) => actionRender(props as unknown as ReportedCommentItem),
    },
  ];

  const actionRender = (props: ReportedCommentItem) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button red"
          onClickHandler={() => {
            ReportCommentItem.openModal();
            setCommentItem(props);
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  const handleProfile = (commentData: ReportedCommentItem) => {
    return (
      <div className="user-profile-data">
        <div className="user-profile-image">
          <Image src={commentData?.user?.profile_image} />
        </div>
        <div className="user-profile-name">
          <span>
            {commentData?.user?.first_name} {commentData?.user?.last_name}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageHeader
        title={t('Table.ReportedComments')}
        url={StudentNavigation.community.view.path}
      >
        <SearchComponent
          parentClass="min-w-[300px]"
          placeholder={t('InputSearchPlaceholder')}
        />
      </PageHeader>

      <Table
        loader={isLoading}
        pagination
        dataPerPage={limit}
        setLimit={setLimit}
        setSort={setSort}
        sort={sort}
        headerData={columnData}
        totalPage={reportedCommentData?.totalPages}
        dataCount={reportedCommentData?.totalCount}
        bodyData={reportedCommentData?.items}
      />

      <ConfirmationPopup
        cancelButtonFunction={() => ReportCommentItem.closeModal()}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        isLoading={isLoadingForDelete}
        isDisabled={isLoadingForDelete}
        confirmButtonFunction={() => {
          handleDeleteReportedComments(commentItem?.id);
        }}
        confirmButtonText={t('Settings.delete')}
        deleteTitle={t('Community.ConfirmationPopup.DeleteBody')}
        bodyText={t('Community.ConfirmationPopup.DeleteBody')}
        modal={ReportCommentItem}
      />
    </>
  );
};

export default ReportedComments;
