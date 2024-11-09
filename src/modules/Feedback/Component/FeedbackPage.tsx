import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { REACT_APP_API_BASE_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedbackItemProps, FeedbackResponse } from '../types';

interface FeedbackProps {
  search?: string;
}

const FeedbackPage = ({ search }: FeedbackProps) => {
  const { t } = useTranslation();
  const ViewFeedbackModal = useModal();

  // For Get API
  const [getFeedbacks, { isLoading }] = useAxiosGet();
  const [getFeedbacksUserID] = useAxiosGet();

  // For a store data on click to view details of clicked row
  const [viewFeedBack, setViewFeedBack] = useState<FeedbackItemProps | null>();

  // For store API data into a state
  const [feedbackItemData, setFeedbackItemData] = useState<FeedbackResponse>();

  // Fetch API for Feedback
  const handleGetFeedback = async () => {
    const data = await getFeedbacks('/feedback', {
      params: {
        search,
      },
    });
    setFeedbackItemData(data.data);
  };

  const handleGetFeedbackModalData = async (e: FeedbackItemProps) => {
    const data = await getFeedbacksUserID(`/feedback`, {
      params: {
        id: e.id,
      },
    });
    setViewFeedBack(data.data);
  };

  // FOR TABLE PROFILE COLUMN
  const handleProfile = (feedbackdata: FeedbackItemProps) => {
    return (
      <div className="user-profile-data">
        <div className="user-profile-image">
          <Image
            src={
              feedbackdata?.user?.profile_image
                ? `${REACT_APP_API_BASE_URL}/${feedbackdata?.user?.profile_image}`
                : '/images/no-image.png'
            }
          />
        </div>
        <div className="user-profile-name">
          <span>
            {feedbackdata?.user?.first_name} {feedbackdata?.user?.last_name}
          </span>
        </div>
      </div>
    );
  };

  const actionRender = (e: FeedbackItemProps) => {
    return (
      <Button
        onClickHandler={() => {
          ViewFeedbackModal.openModal();
          handleGetFeedbackModalData(e);
        }}
        variants="Green"
      >
        {t('ViewMore')}
      </Button>
    );
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
      cell: (props) => handleProfile(props as unknown as FeedbackItemProps),
    },
    {
      header: t('FeedbackLabel'),
      name: 'feedback',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('UserType'),
      name: 'user.role.role',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Settings.table.action'),
      cell: (props) => actionRender(props as unknown as FeedbackItemProps),
    },
  ];

  useEffect(() => {
    handleGetFeedback();
  }, [search]);

  console.log(viewFeedBack, 'viewFeedBack');

  return (
    <>
      <Table
        parentClassName=""
        islastRowOnRight={false}
        loader={isLoading}
        headerData={columnData}
        totalPage={feedbackItemData?.currentPage}
        dataCount={feedbackItemData?.count}
        bodyData={feedbackItemData?.data}
        pagination
      />
      <Modal
        setDataClear={() => setViewFeedBack(null)}
        closeOnEscape
        modal={ViewFeedbackModal}
        headerTitle={t('Feedback.InfoModal.Title')}
      >
        <div className="view-feedback-modal">
          <div className="view-feedback-profile">
            <Image
              src={
                viewFeedBack?.user?.profile_image
                  ? `${REACT_APP_API_BASE_URL}/${viewFeedBack?.user?.profile_image}`
                  : '/images/no-image.png'
              }
            />
          </div>
          <div className="view-feedback-info">
            <div className="feedback-filed-item">
              <span>{t('OrganizationName')}</span>
              <p>
                {viewFeedBack?.user?.first_name} {viewFeedBack?.user?.last_name}
              </p>
            </div>
            <div className="feedback-filed-item">
              <span>{t('Auth.Login.email')}</span>
              <p>{viewFeedBack?.user?.email}</p>
            </div>
            <div className="feedback-filed-item">
              <span>{t('TypeOfOrg')}</span>
              {/* TODO: data from backend */}
              <p>Public School</p>
            </div>
            <div className="feedback-filed-item">
              <span>{t('FeedbackLabel')}</span>
              <p>
                <em>{viewFeedBack?.feedback}</em>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackPage;
