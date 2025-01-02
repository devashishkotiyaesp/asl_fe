// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import ConversationList from '../components/ConversationList';
import TextToLink from '../components/TextToLink';

// ** Hooks **
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ** Redux **
import { getCurrentUser } from 'reduxStore/slices/authSlice';

// ** Types **
import { ICommunityItem } from '../types';

// ** Utilities **
import Card from 'components/Card';
import { Roles } from 'constants/common.constant';
import { capitalizeFirstLetter } from 'utils';
import '../index.css';

const ViewCommunityFeed = ({ search }: { search: string }) => {
  const user = useSelector(getCurrentUser);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const deleteCommunity = useModal();
  const [deleteCommunityApi] = useAxiosDelete();
  const [getDiscussion] = useAxiosGet();
  const [communityFeedData, setCommunityFeedData] = useState<ICommunityItem[]>();
  const [postData, setPostData] = useState<string | undefined>();

  const handleCommunityDetail = async () => {
    const data = await getDiscussion(`/community`, {
      params: { search, view: true },
    });
    setCommunityFeedData(data.data.data);
  };

  useEffect(() => {
    handleCommunityDetail();
  }, [search]);

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
    <div className={user?.role?.role === Roles.Admin ? '' : 'container'}>
      {communityFeedData &&
        communityFeedData.length > 0 &&
        communityFeedData.map((communityData, index) => {
          return (
            <Card
              className={`!shadow-none mb-5 last:mb-0 ${user?.role?.role === Roles.Admin ? '!bg-LightGray' : ''}`}
              key={`feed_${index + 1}`}
            >
              {user?.role?.role !== Roles.Admin && communityData?.media !== null && (
                <span className="text-2xl font-bold p-2">{communityData?.name}</span>
              )}
              {communityData?.media ? (
                <>
                  {user?.role?.role === Roles.Admin && (
                    <div className="topic-banner__title">{communityData?.name}</div>
                  )}

                  <div
                    className="course-preview-banner"
                    id={postData === communityData?.id ? 'messagesEnd' : ''}
                  >
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
              <div className="mb-10">
                {user?.is_user_banned && (
                  <div className="no-rights-comment">
                    <p>{t('cantRespondcomments')}</p>
                  </div>
                )}

                <ConversationList
                  id={communityData?.id}
                  list_index={index}
                  setPostData={setPostData}
                  communityData={communityData?.posts}
                />
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
            </Card>
          );
        })}
    </div>
  );
};

export default ViewCommunityFeed;
