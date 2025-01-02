import Button from 'components/Button/Button';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { Formik } from 'formik';
import { useAxiosGet, useAxiosPut } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { getDateFormate } from 'utils/date';
import { FeedbackItemProps, FeedbackResponse } from '../types';

interface FeedbackProps {
  search?: string;
}

const FeedbackPage = ({ search }: FeedbackProps) => {
  const { t } = useTranslation();
  const ViewFeedbackModal = useModal();
  const { language } = useSelector(useLanguage);
  const { currentPage } = useSelector(currentPageSelector);

  // For Get API
  const [getFeedbacks, { isLoading }] = useAxiosGet();
  const [getTags] = useAxiosGet();

  const [updateFeedbacks] = useAxiosPut();
  const [getFeedbacksUserID] = useAxiosGet();
  const [limit, setLimit] = useState<number>(10);

  // For a store data on click to view details of clicked row
  const [viewFeedBack, setViewFeedBack] = useState<FeedbackItemProps | null>();

  // For store API data into a state
  const [feedbackItemData, setFeedbackItemData] = useState<FeedbackResponse>();
  const [tagItemData, setTagItemData] =
    useState<{ label: string; value: string }[]>();
  const [feedbackId, setFeedbackId] = useState<string>();

  // Fetch API for Feedback
  const handleGetFeedback = async () => {
    const data = await getFeedbacks('/feedback', {
      params: {
        page: currentPage,
        search,
        limit,
      },
    });
    const tag = await getTags('/tags', {
      params: {
        dropdown: true,
        label: 'tag',
        value: 'id',
      },
    });
    setTagItemData(tag?.data);
    setFeedbackItemData(data?.data);
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
  const handleProfile = (feedbackData: FeedbackItemProps) => {
    return (
      <div className="user-profile-data">
        <div className="user-profile-image">
          <Image src={feedbackData?.user?.profile_image} />
        </div>
        <div className="user-profile-name">
          <span>
            {feedbackData?.user?.first_name} {feedbackData?.user?.last_name}
          </span>
        </div>
      </div>
    );
  };

  const onHandleSubmit = async (values: { tag: string }) => {
    await updateFeedbacks(`/feedback`, {
      id: feedbackId,
      tag_id: values?.tag,
    });
  };

  const handleTags = (feedbackData: FeedbackItemProps) => {
    return (
      <div className="w-[150px]">
        <Formik
          initialValues={{
            tag: feedbackData?.tag_id,
          }}
          onSubmit={onHandleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <Form>
                <ReactSelect
                  name="tag"
                  options={tagItemData ?? []}
                  onChange={async (val) => {
                    const data = val as IOptions;
                    if (data) {
                      setFieldValue('tag', data.value);
                      setFeedbackId(feedbackData?.id);
                    }
                    handleSubmit();
                  }}
                  selectedValue={values?.tag}
                  placeholder={t('Profile.Common.Feedback.PlaceHolder.Tags')}
                />
              </Form>
            );
          }}
        </Formik>
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
        sort: false,
        hasFilter: false,
      },
    },
    {
      header: t('Profile.Common.Feedback.Table.Tags'),
      name: 'name',
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props) => handleTags(props as unknown as FeedbackItemProps),
    },
    {
      header: t('Events.CreateOrEditForm.Date'),
      name: 'created_at',
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props) => RequestDate(props as unknown as FeedbackItemProps),
    },
    {
      header: t('Settings.table.action'),
      cell: (props) => actionRender(props as unknown as FeedbackItemProps),
    },
  ];

  const RequestDate = (item: FeedbackItemProps) => {
    return <div>{getDateFormate(item?.created_at)}</div>;
  };

  const selectEmoji = [
    { id: 1, emoji: '\uD83D\uDE24', value: 1 },
    { id: 2, emoji: '\uD83D\uDE21', value: 2 },
    { id: 3, emoji: '\uD83D\uDE10', value: 3 },
    { id: 4, emoji: '\uD83D\uDE0A', value: 4 },
    { id: 5, emoji: '\uD83E\uDD73', value: 5 },
  ];

  useEffect(() => {
    handleGetFeedback();
  }, [search, limit, language, currentPage]);

  return (
    <>
      <Table
        parentClassName=""
        islastRowOnRight={false}
        loader={isLoading}
        headerData={columnData}
        totalPage={feedbackItemData?.lastPage}
        dataCount={feedbackItemData?.count}
        bodyData={feedbackItemData?.data}
        dataPerPage={limit}
        setLimit={setLimit}
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
            <Image src={viewFeedBack?.user?.profile_image} />
          </div>
          <div className="view-feedback-info">
            <div className="feedback-filed-item">
              <span>{t('Cms.homepage.testimonial.usernameTitle')}</span>
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
              <p>{viewFeedBack?.user?.organization?.organization_type?.type}</p>
            </div>

            <div className="feedback-filed-item">
              <span>{t('Profile.Common.Feedback.Feedback.Level1')}</span>
              <div className="text-3xl">
                {viewFeedBack?.overall_rating &&
                  selectEmoji[Number(viewFeedBack?.overall_rating) - 1]?.emoji}
              </div>
            </div>
            <div className="feedback-filed-item">
              <span>{t('Profile.Common.Feedback.Feedback.Level2')}</span>
              <div className="text-3xl">
                {viewFeedBack?.ease_of_use_rating &&
                  selectEmoji[Number(viewFeedBack?.ease_of_use_rating) - 1]?.emoji}
              </div>
            </div>
            <div className="feedback-filed-item">
              <span>{t('Profile.Common.Feedback.Feedback.Level3')}</span>
              <div className="text-3xl">
                {viewFeedBack?.content_quality_rating &&
                  selectEmoji[Number(viewFeedBack?.content_quality_rating) - 1]
                    ?.emoji}
              </div>
            </div>
            <div className="feedback-filed-item">
              <span>{t('FeedbackLabel')}</span>
              <p>
                <em>{viewFeedBack?.feedback}</em>
              </p>
            </div>
            <div className="feedback-filed-item">
              <span>{t('Profile.Common.Feedback.Table.Tags')}</span>
              <p>
                <em>{viewFeedBack?.tag?.tag}</em>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackPage;
