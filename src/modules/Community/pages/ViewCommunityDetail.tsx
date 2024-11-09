import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationList from '../components/ConversationList';
import { ICommunityItem } from '../types';

const ViewCommunityDetail = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const deleteCommunity = useModal();
  const [getDiscussion] = useAxiosGet();
  const [deleteCommunityApi] = useAxiosDelete();
  const [communityData, setCommunityData] = useState<ICommunityItem>();
  const handleCommunityDetail = async () => {
    const data = await getDiscussion(`/community/${params.id}`);
    setCommunityData(data.data);
  };

  useEffect(() => {
    handleCommunityDetail();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    const { error } = await deleteCommunityApi(`/community/${id}`);
    if (!error) navigate('/community');
  };

  return (
    <>
      <PageHeader title="Topic" url="/community">
        <Button variants="Red" onClickHandler={() => deleteCommunity.openModal()}>
          {t('Community.Detail.DeletePost')}
        </Button>
      </PageHeader>
      <div className="content-base">
        {communityData?.media ? (
          <>
            <div className="topic-banner__title">{communityData?.name}</div>

            <div className="course-preview-banner">
              <Image src={communityData?.media} />
              <div className="course-preview-banner-other">
                <div className="comment-count">
                  <span className="icon">
                    <Image iconName="message" />
                  </span>
                  <span className="text-white">
                    {Number(communityData?.postCount ?? 0)}
                    {t('Community.Table.Conversation')}
                  </span>
                </div>
              </div>
            </div>

            <div className="topic-banner__desc mt-3">
              {communityData?.description}
            </div>
          </>
        ) : (
          <div className="topic-banner">
            <div className="topic-banner__title">{communityData?.name}</div>
            <div className="topic-banner__desc">{communityData?.description}</div>

            <div className="comment-count">
              <span className="icon">
                <Image iconName="message" />
              </span>
              <span className="text">
                {Number(communityData?.postCount ?? 0)}{' '}
                {t('Community.Table.Conversation')}{' '}
              </span>
            </div>
          </div>
        )}

        <ConversationList
          communityData={communityData}
          refetch={handleCommunityDetail}
        />
      </div>

      <ConfirmationPopup
        showCloseIcon
        modal={deleteCommunity}
        deleteTitle={t('Community.ConfirmationPopup.DeleteTitle')}
        bodyText={t('Community.ConfirmationPopup.DeleteBody')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deleteCommunity.closeModal()}
        confirmButtonFunction={() => {
          handleDelete(communityData?.id);
          deleteCommunity.closeModal();
        }}
        popUpType="danger"
      />
    </>
  );
};

export default ViewCommunityDetail;
