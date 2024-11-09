import Button from 'components/Button/Button';
import CommentInput from 'components/FormElement/CommentInput';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useAxiosDelete, useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { getFullName } from 'utils';
import { Comment, IConversationProps } from '../types';
import AddEditConversation from './AddEditConversation';

const ConversationList = ({ communityData, refetch }: IConversationProps) => {
  const NewConversation = useModal();
  const deletePostModal = useModal();
  const deleteCommentModal = useModal();
  const [deletePost] = useAxiosDelete();
  const [deleteComment] = useAxiosDelete();
  const [manageLikes] = useAxiosPost();
  const [getComments] = useAxiosGet();
  const [selectedId, setSelectedId] = useState('');
  const [likeItems, setLikeItems] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [visibleComments, setVisibleComments] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [commentsData, setCommentsData] = useState<{ [key: string]: Comment[] }>({});

  useEffect(() => {
    if (communityData?.posts) {
      const initialLikes: Record<string, boolean> = {};
      const initialLikeCounts: Record<string, number> = {};

      communityData.posts.forEach((post) => {
        initialLikes[post.id] = !!Number(post.isLikedByUser);
        initialLikeCounts[post.id] = Number(post.likeCount);
      });

      setLikeItems(initialLikes);
      setLikeCounts(initialLikeCounts);
    }
  }, [communityData]);

  const handleLikeToggle = async (id: string, type: string) => {
    const previousLikedState = likeItems[id];

    try {
      const newLikedState = !previousLikedState;
      setLikeItems((prevLikes) => ({
        ...prevLikes,
        [id]: newLikedState,
      }));
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] + (newLikedState ? 1 : -1),
      }));

      await manageLikes(
        `/like`,
        type === 'post' ? { post_id: id } : { comment_id: id }
      );
    } catch (error) {
      setLikeItems((prevLikes) => ({
        ...prevLikes,
        [id]: previousLikedState,
      }));
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] + (previousLikedState ? -1 : 1),
      }));
    }
  };

  const handlePostDelete = async () => {
    const { error } = await deletePost(`/post/${selectedId}`);
    if (!error) {
      setSelectedId('');
      refetch?.();
      deletePostModal.closeModal();
    }
  };
  const handleCommentDelete = async () => {
    const { error } = await deleteComment(`/comment/${selectedId}`);
    if (!error) {
      setCommentsData((prevCommentsData) => {
        const newCommentsData = { ...prevCommentsData };
        Object.keys(newCommentsData).forEach((postId) => {
          const commentIndex = newCommentsData[postId].findIndex(
            (comment) => comment.id === selectedId
          );

          if (commentIndex !== -1) {
            newCommentsData[postId] = newCommentsData[postId].filter(
              (comment) => comment.id !== selectedId
            );
            return;
          }

          newCommentsData[postId] = newCommentsData[postId].map((comment) => {
            if (
              comment.replies &&
              comment.replies.some((reply) => reply.id === selectedId)
            ) {
              return {
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== selectedId),
              };
            }
            return comment;
          });
        });

        return newCommentsData;
      });

      deleteCommentModal.closeModal();
      setSelectedId('');
    }
  };

  const toggleCommentsVisibility = (postId: string) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    handleGetCommentByPost(postId);
  };

  const handleGetCommentByPost = async (postId: string) => {
    try {
      const { data } = await getComments(`/post/${postId}`);
      setCommentsData((prev) => ({
        ...prev,
        [postId]: data.comments,
      }));

      const initialLikes: Record<string, boolean> = {};
      const initialLikeCounts: Record<string, number> = {};
      data.comments.forEach((comment: Comment) => {
        initialLikes[comment.id] = !!Number(comment.isCommentLikedByUser);
        initialLikeCounts[comment.id] = Number(comment.likeCommentCount);

        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach((reply) => {
            initialLikes[reply.id] = !!Number(reply.isReplyLikedByUser);
            initialLikeCounts[reply.id] = Number(reply.likeReplyCount);
          });
        }
      });

      setLikeItems((prev) => ({ ...prev, ...initialLikes }));
      setLikeCounts((prev) => ({ ...prev, ...initialLikeCounts }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  return (
    <>
      <div className="topic-discuss">
        <div className="topic-discuss__title">
          <span className="text">
            {t('Community.Table.Conversation')} (
            {Number(communityData?.postCount ?? 0)})
          </span>
          <Button
            variants="PrimaryWood"
            onClickHandler={() => NewConversation.openModal()}
            className="w-fit"
          >
            {t('Conversation.Start')}
          </Button>
        </div>

        {communityData?.posts?.map((item, index) => {
          const isPostLiked = likeItems[item.id] || false;
          const postLikeCount = likeCounts[item.id] || 0;
          const commentsVisible = visibleComments[item.id];
          return (
            <div className="topic-item" key={`post_${index + 1}`}>
              <div className="topic-user-profile">
                <Image src={communityData?.createdBy?.profile_image} />
              </div>
              <div className="topic-box">
                <div className="topic-name-time">
                  <span className="topic-user-name">
                    {communityData?.createdBy?.first_name}{' '}
                    {communityData?.createdBy?.last_name}
                  </span>
                  <span className="topic-time">
                    {formatDistanceToNow(parseISO(item?.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                  <div className="topic-option group">
                    <span className="icon">
                      <Image iconName="threeMoreDots" />
                    </span>
                    <ul>
                      <li>
                        <Button
                          onClickHandler={() => {
                            deletePostModal.openModal();
                            setSelectedId(item.id);
                          }}
                        >
                          <Image iconName="trashIcon" />
                          <span>{t('Conversation.Delete')}</span>
                        </Button>
                      </li>
                      <li>
                        <Button onClickHandler={() => deletePostModal.openModal()}>
                          <Image iconName="blockIcon" />
                          <span>{t('Conversation.BlockUserPosting')}</span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="topic-user-role">
                  <span>{item?.user?.role?.role}</span>
                </div>
                <div className="topic-content">
                  {item?.attachments?.map((image, index) => {
                    return (
                      <div
                        className="topic-content__image"
                        key={`image_${index + 1}`}
                      >
                        {image?.url && <Image src={image?.url} />}
                      </div>
                    );
                  })}

                  <div className="topic-content__text">{item?.description}</div>
                </div>

                <CommentInput
                  className=""
                  postData={item}
                  toggleComments={() => toggleCommentsVisibility(item.id)}
                  refetch={handleGetCommentByPost}
                  countRefetch={refetch}
                />

                <div className="topic-action">
                  <div className="topic-action-like">
                    <Button onClickHandler={() => handleLikeToggle(item.id, 'post')}>
                      <Image iconName={isPostLiked ? 'palmFill' : 'palm2'} />
                    </Button>
                    <span>{postLikeCount}</span>
                  </div>
                  <div className="topic-action-comment">
                    <Image iconName="message2" />
                    <span>{item?.parentCommentCount}</span>
                  </div>
                </div>
                {commentsVisible &&
                  commentsData[item?.id]?.map((comment, index) => {
                    const isCommentLiked = likeItems[comment.id] || false;
                    const commentLikeCount = likeCounts[comment.id] || 0;
                    return (
                      <div className="topic-comment" key={`${index + 1}_comment`}>
                        <div className="topic-item">
                          <div className="topic-user-profile">
                            <Image src={comment.user.profile_image} />
                          </div>
                          <div className="topic-box">
                            <div className="topic-name-time">
                              <span className="topic-user-name">
                                {getFullName(
                                  comment?.user?.first_name,
                                  comment?.user?.last_name
                                )}
                              </span>
                              <span className="topic-time">
                                {formatDistanceToNow(parseISO(comment.created_at), {
                                  addSuffix: true,
                                })}
                              </span>
                              <div className="topic-option group">
                                <span className="icon">
                                  <Image iconName="threeMoreDots" />
                                </span>
                                <ul>
                                  <li>
                                    <Button
                                      onClickHandler={() => {
                                        deleteCommentModal.openModal();
                                        setSelectedId(comment.id);
                                      }}
                                    >
                                      <Image iconName="trashIcon" />
                                      <span>{t('Comment.Delete')}</span>
                                    </Button>
                                  </li>
                                  <li>
                                    <Button
                                      onClickHandler={() =>
                                        deleteCommentModal.openModal()
                                      }
                                    >
                                      <Image iconName="blockIcon" />
                                      <span>
                                        {t('Conversation.BlockUserPosting')}
                                      </span>
                                    </Button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="topic-user-role">
                              <span>{comment?.user?.role?.role}</span>
                            </div>
                            <div className="topic-content">
                              <div className="topic-content__text">
                                {comment?.description}
                              </div>
                            </div>
                            <div className="topic-media-list">
                              {comment?.attachments?.map((image, index) => {
                                return (
                                  <div
                                    className="topic-media-item"
                                    key={`${index + 1}_media`}
                                  >
                                    <Image src={image?.url} />
                                  </div>
                                );
                              })}
                            </div>

                            <div className="topic-action">
                              <div className="topic-action-like">
                                <Button
                                  onClickHandler={() =>
                                    handleLikeToggle(comment.id, 'comment')
                                  }
                                >
                                  <Image
                                    iconName={isCommentLiked ? 'palmFill' : 'palm2'}
                                  />
                                </Button>
                                <span>{commentLikeCount}</span>
                              </div>
                              <div className="topic-action-comment">
                                <Image iconName="reply" />
                                <span>{comment?.replies?.length}</span>
                              </div>
                            </div>

                            <CommentInput
                              isReply
                              placeHolder="Reply"
                              parentId={comment?.id}
                              postData={item}
                              refetch={handleGetCommentByPost}
                              countRefetch={refetch}
                            />

                            {comment?.replies?.map((reply, index) => {
                              const isReplyLiked = likeItems[reply.id] || false;
                              const replyLikeCount = likeCounts[reply.id] || 0;
                              return (
                                <div
                                  className="reply-list"
                                  key={`${index + 1}_reply`}
                                >
                                  <div className="reply-item">
                                    <div className="reply-user-profile">
                                      <Image src={reply?.user?.profile_image} />
                                    </div>
                                    <div className="reply-box">
                                      <div className="reply-name-time">
                                        <span className="reply-user-name">
                                          {getFullName(
                                            reply?.user?.first_name,
                                            reply?.user?.last_name
                                          )}
                                        </span>
                                        <span className="reply-time">
                                          {formatDistanceToNow(
                                            parseISO(reply.created_at),
                                            {
                                              addSuffix: true,
                                            }
                                          )}
                                        </span>
                                        <div className="topic-option group">
                                          <span className="icon">
                                            <Image iconName="threeMoreDots" />
                                          </span>
                                          <ul>
                                            <li>
                                              <Button
                                                onClickHandler={() => {
                                                  deleteCommentModal.openModal();
                                                  setSelectedId(reply.id);
                                                }}
                                              >
                                                <Image iconName="trashIcon" />
                                                <span>{t('Comment.Delete')}</span>
                                              </Button>
                                            </li>
                                            <li>
                                              <Button
                                                onClickHandler={() =>
                                                  deleteCommentModal.openModal()
                                                }
                                              >
                                                <Image iconName="blockIcon" />
                                                <span>
                                                  {t(
                                                    'Conversation.BlockUserPosting'
                                                  )}
                                                </span>
                                              </Button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="reply-content">
                                        <div className="reply-content__text">
                                          {reply?.description}
                                        </div>
                                      </div>
                                      <div className="topic-media-list">
                                        {reply?.attachments?.map((image, index) => {
                                          return (
                                            <div
                                              className="topic-media-item"
                                              key={`${index + 1}_media`}
                                            >
                                              <Image src={image?.url} />
                                            </div>
                                          );
                                        })}
                                      </div>
                                      <div className="topic-action reply-action mt-5">
                                        <div className="topic-action-like">
                                          <Button
                                            onClickHandler={() =>
                                              handleLikeToggle(reply.id, 'reply')
                                            }
                                            className={
                                              isReplyLiked
                                                ? 'text-PrimaryWood'
                                                : 'text-black'
                                            }
                                          >
                                            <Image
                                              iconName={
                                                isReplyLiked ? 'palmFill' : 'palm2'
                                              }
                                            />
                                          </Button>
                                          <span>{replyLikeCount}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      {NewConversation.isOpen && (
        <AddEditConversation modal={NewConversation} refetch={refetch} />
      )}
      <ConfirmationPopup
        showCloseIcon
        modal={deletePostModal}
        deleteTitle={t('Conversation.DeletePostTitle')}
        bodyText={t('Conversation.DeleteBodyText')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deletePostModal.closeModal()}
        confirmButtonFunction={() => handlePostDelete()}
        popUpType="danger"
      />

      <ConfirmationPopup
        showCloseIcon
        modal={deleteCommentModal}
        deleteTitle={t('Conversation.DeleteCommentTitle')}
        bodyText={t('Conversation.DeleteBodyText')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deleteCommentModal.closeModal()}
        confirmButtonFunction={() => handleCommentDelete()}
        popUpType="danger"
      />
    </>
  );
};

export default ConversationList;
