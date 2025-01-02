// ** Components **
import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import ConversationList from '../components/ConversationList';
import TextToLink from '../components/TextToLink';

// ** Hooks **
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// ** Redux **
import { getCurrentUser } from 'reduxStore/slices/authSlice';

// ** Types **
import { CommunityType, ICommunityItem } from '../types';

// ** Utilities **
import { Roles } from 'constants/common.constant';
import { capitalizeFirstLetter } from 'utils';
import '../index.css';

const ViewCommunityDetail = () => {
  const user = useSelector(getCurrentUser);
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const deleteCommunity = useModal();
  const [deleteCommunityApi] = useAxiosDelete();
  const [getDiscussion] = useAxiosGet();
  const [communityData, setCommunityData] = useState<ICommunityItem>();
  const [postData, setPostData] = useState<string | undefined>();

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

  const scrollToBottom = () => {
    const element = document.getElementById('messagesEnd');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setPostData('');
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [postData]);

  return (
    <div
      className={user?.role?.role === Roles.Admin ? '' : 'container'}
      id="messagesEnd"
    >
      {user?.role?.role === Roles.Admin ? (
        <PageHeader
          title={
            communityData?.type === CommunityType.DISCUSSION
              ? t('Community.Discussion')
              : t('Community.Topic')
          }
          url={`/community?community=${communityData?.type}`}
        >
          <Button variants="Red" onClickHandler={() => deleteCommunity.openModal()}>
            {t('Community.Detail.DeletePost', {
              TYPE:
                communityData?.type === CommunityType.DISCUSSION
                  ? t('Community.Discussion')
                  : t('Community.Topic'),
            })}
          </Button>
        </PageHeader>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <Breadcrumbs
              className="mt-5"
              items={[
                {
                  label: t('Header.CMS.Home'),
                  url: '/',
                },
                {
                  label: t('Community.Title'),
                  url: `/community?community=${communityData?.type}`,
                },
                {
                  label: communityData?.name ?? t('Community.TopicDetail'),
                  url: `/community/${communityData?.id}`,
                },
              ]}
            />
            {user?.role?.role !== Roles.Admin && communityData?.media !== null && (
              <PageHeader title={communityData?.name} />
            )}
          </div>
          {user?.role?.role === Roles.Teacher &&
            communityData?.createdBy?.id === user?.id && (
              <div>
                <Button
                  variants="Red"
                  onClickHandler={() => deleteCommunity.openModal()}
                >
                  {t('Community.Detail.DeletePost', {
                    TYPE:
                      communityData?.type === CommunityType.DISCUSSION
                        ? t('Community.Discussion')
                        : t('Community.Topic'),
                  })}
                </Button>
              </div>
            )}
        </div>
      )}

      {communityData?.media ? (
        <>
          {user?.role?.role === Roles.Admin && (
            <div className="topic-banner__title">{communityData?.name}</div>
          )}

          <div className="course-preview-banner">
            <Image src={communityData?.media} />
            <div className="course-preview-banner-other">
              <div className="comment-count">
                <span className="icon">
                  <Image iconName="message" />
                </span>
                <span className="text-white">
                  {Number(communityData?.postCount ?? 0)}{' '}
                  {t('Community.Table.Conversation')}
                </span>
              </div>
            </div>
          </div>

          <div className="topic-banner__desc mt-3">
            <TextToLink text={communityData?.description} />
          </div>
        </>
      ) : (
        <div className="topic-banner">
          <div className="topic-banner__title">{communityData?.name}</div>
          <div className="topic-banner__desc">
            <TextToLink text={communityData?.description ?? ''} />
          </div>

          <div className="comment-count">
            <span className="icon">
              <Image iconName="message" />
            </span>
            <span className="text">
              {Number(communityData?.postCount ?? 0)}{' '}
              {t('Community.Table.Conversation')}
            </span>
          </div>
        </div>
      )}
      <div className="topic-discuss__title">
        <span className="text">
          {t('Community.Table.Conversation')}&nbsp; &#10647;
          {Number(communityData?.postCount ?? 0)}&#10648;
        </span>

        {user?.is_user_banned && (
          <Button
            variants="PrimaryWood"
            className="w-fit pointer-events-none select-none"
            disabled={user?.is_user_banned}
          >
            {user?.is_user_banned && t('Conversation.userIsBlocked')}
          </Button>
        )}
      </div>
      <div className="content-base mb-24">
        {user?.is_user_banned && (
          <div className="no-rights-comment">
            <p>{t('cantRespondcomments')}</p>
          </div>
        )}

        <ConversationList setPostData={setPostData} />
      </div>

      <ConfirmationPopup
        showCloseIcon
        modal={deleteCommunity}
        deleteTitle={t('Community.ConfirmationPopup.DeleteTitle', {
          TYPE: capitalizeFirstLetter(communityData?.type ?? ''),
        })}
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
    </div>
  );
};

export default ViewCommunityDetail;
