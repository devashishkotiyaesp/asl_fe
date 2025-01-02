// ** Components **
import Button from 'components/Button/Button';
import FancyBox from 'components/FancyBox';
import CommentInput from 'components/FormElement/CommentInput';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import AddEditConversation from './AddEditConversation';
import ContextMenuModal from './ContextMenuModal';
import TextToLink from './TextToLink';

import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../pages/style/index.css';

// ** Hooks **
import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPatch,
  useAxiosPost,
} from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// ** Config and Utilities **
import { REACT_APP_API_URL, REACT_APP_BACKEND_URL } from 'config';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { t } from 'i18next';
import { capitalizeFirstCharacter, getFullName } from 'utils';
import '../../Static/index.css';
import '../index.css';

// ** Types **
import { Roles } from 'constants/common.constant';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { socketSelector } from 'reduxStore/slices/socketSlice';
import { FreeMode, Navigation } from 'swiper/modules';
import {
  Comment,
  Conversations,
  EditCommentFlag,
  PostInitialValues,
  Reply,
} from '../types';
import AddEditFeedConversation from './AddEditFeedConversation';

export type IRenderCommentProps = {
  item: Conversations;
  content: Comment | Reply;
  type: string;
  editComment: EditCommentFlag | undefined;
  toggleCommentsVisibility: (postId: string) => void;
  handleGetCommentByPost: (postId: string) => Promise<void>;
  refetch: (page: number) => Promise<void>;
  setEditComment: Dispatch<SetStateAction<EditCommentFlag | undefined>>;
};

interface ICommentsData {
  [postId: string]: Comment[];
}

const ConversationList = ({
  id,
  list_index,
  setPostData,
  communityData,
}: {
  id?: string;
  list_index?: number;
  setPostData?: Dispatch<SetStateAction<string | undefined>>;
  communityData?: Conversations[];
}) => {
  // ** Modals **
  const deletePostModal = useModal();
  const deleteCommentModal = useModal();
  const reportCommentModal = useModal();
  const blockUserModal = useModal();
  const params = useParams();

  // ** Axios Hooks **
  const [deletePost] = useAxiosDelete();
  const [deleteComment] = useAxiosDelete();
  const [reportComment] = useAxiosPost();
  const [manageLikes] = useAxiosPost();
  const [getComments, { isLoading: gettingComments }] = useAxiosGet();
  const [getNewData, { isLoading: newDataLoading }] = useAxiosGet();
  const [getPosts, { isLoading: isPostLoading }] = useAxiosGet();
  const [updateUserByAdmin, { isLoading: isUpdatingByAdmin }] = useAxiosPatch();

  // ** Redux **
  const user = useSelector(getCurrentUser);

  // ** State Variables **
  const [selectedId, setSelectedId] = useState('');
  const [postInitialValue, setPostInitialValue] = useState<
    PostInitialValues | undefined
  >(undefined);
  const [editComment, setEditComment] = useState<EditCommentFlag>();
  const [likeItems, setLikeItems] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [selectedData, setSelectedData] = useState({
    comment_id: '',
    user_id: '',
  });
  const [visibleComments, setVisibleComments] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [scrolledReplyId, setScrolledReplyId] = useState('');
  const [displayReply, setDisplayReply] = useState<{ [key: string]: boolean }>({});
  const [commentsData, setCommentsData] = useState<ICommentsData>({});
  const [modalHeading, setModalHeading] = useState('');
  const [blockUserId, setBlockUserId] = useState('');
  const [posts, setPosts] = useState<Conversations[]>(communityData ?? []);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [currentPageForComment, setCurrentPageForComment] = useState<{
    [key: string]: number;
  }>({});
  const [isLoadedAllData, setIsLoadedAllData] = useState<{
    [key: string]: boolean;
  }>({});
  const socket = useSelector(socketSelector);

  useEffect(() => {
    const element = document.getElementById(scrolledReplyId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [scrolledReplyId]);

  const fetchPosts = async (page: number, replace = false) => {
    try {
      const { data } = await getPosts(`/post/all/${params.id ? params.id : id}`, {
        params: {
          page,
          limit: 10,
        },
      });
      if (data?.posts?.data?.length > 0) {
        setPosts((prevPosts) => {
          const newPosts = data.posts?.data;

          if (replace) {
            return newPosts;
          }

          const postMap = new Map(prevPosts.map((post) => [post.id, post]));
          newPosts.forEach((post: Conversations) => postMap.set(post.id, post));

          return Array.from(postMap.values());
        });
        setHasMorePosts(data.posts?.currentPage < data.posts?.lastPage);
      } else {
        if (replace) {
          setPosts([]);
        }
        setHasMorePosts(false);
      }
    } catch (error) {
      // Error in fetching posts
    }
  };

  const loadMorePosts = async () => {
    if (hasMorePosts) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      await fetchPosts(nextPage);
    }
  };

  useEffect(() => {
    if (_.isUndefined(id)) {
      fetchPosts(currentPage);
    }
  }, []);

  useEffect(() => {
    if (posts) {
      const initialLikes: Record<string, boolean> = {};
      const initialLikeCounts: Record<string, number> = {};

      posts.forEach((post) => {
        initialLikes[post.id] = !!Number(post.isLikedByUser);
        initialLikeCounts[post.id] = Number(post.likeCount);
      });

      setLikeItems(initialLikes);
      setLikeCounts(initialLikeCounts);
    }
  }, [posts]);

  useEffect(() => {
    if (!socket) return;

    // Handle new comment event
    socket.on('newComment', (newComment) => {
      if (newComment.parent_thread_id === null) {
        setPosts((prev) =>
          prev.map((item) =>
            item.id === newComment.postData.id
              ? {
                  ...item,
                  parentCommentCount: newComment.postData.parentCommentCount,
                }
              : item
          )
        );
      }
      setCommentsData((prevData) => {
        const updatedComments = JSON.parse(JSON.stringify(prevData));
        if (!updatedComments[newComment.post_id]) {
          updatedComments[newComment.post_id] = [];
        }

        const postComments = updatedComments[newComment.post_id];
        if (newComment.parent_thread_id) {
          updatedComments[newComment.post_id] = postComments.map(
            (comment: Comment) => {
              if (comment.id === newComment.parent_thread_id) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), newComment],
                  totalReplyCount: Number(comment.totalReplyCount || 0) + 1,
                };
              }
              return comment;
            }
          );
        } else {
          updatedComments[newComment.post_id] = [newComment, ...postComments];
        }
        return updatedComments;
      });
    });

    socket.on('newPost', (newPost) => {
      setPostData?.(newPost.community_id);
      setPosts((prevPosts) => {
        const postExists = prevPosts.some((post) => post.id === newPost.id);
        if (postExists) return prevPosts;
        const updatedPost =
          newPost.community_id === id || _.isUndefined(id) ? newPost : null;

        return updatedPost ? [updatedPost, ...prevPosts] : prevPosts;
      });

      setLikeItems((prev) => ({
        ...prev,
        [newPost.id]: !!Number(newPost.isLikedByUser),
      }));

      setLikeCounts((prev) => ({
        ...prev,
        [newPost.id]: Number(newPost.likeCount),
      }));
    });

    // Handle like count updates
    socket.on('likeCount', (likeData) => {
      setLikeCounts((prev) => ({
        ...prev,
        [likeData.targetId]: likeData.likeCount,
      }));

      setLikeItems((prev) => {
        if (likeData.userId === user?.id) {
          return {
            ...prev,
            [likeData.targetId]: likeData.isLikedByUser,
          };
        }
        return prev;
      });
    });

    // Cleanup on unmount
    return () => {
      socket.off('newComment');
      socket.off('newPost');
      socket.off('likeCount');
    };
  }, [socket, user?.id]);

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
      fetchPosts(currentPage, true);
      deletePostModal.closeModal();
    }
  };

  const handleCommentDelete = async (deleteId: string) => {
    const { error } = await deleteComment(`/comment/${selectedId}`);
    if (!error) {
      setCommentsData((prevCommentsData) => {
        const newCommentsData = { ...prevCommentsData };

        Object.keys(newCommentsData).forEach((postId) => {
          const commentIndex = findCommentIndex(newCommentsData[postId]);

          if (commentIndex !== -1) {
            newCommentsData[postId][commentIndex].deleted_at =
              new Date().toISOString();
          } else {
            newCommentsData[postId] = updateReplies(newCommentsData[postId]);
          }
        });

        return newCommentsData;
      });

      deleteCommentModal.closeModal();
      setPosts((prev) =>
        prev.map((item) =>
          item.id === deleteId
            ? {
                ...item,
                parentCommentCount: Math.max((item?.parentCommentCount ?? 0) - 1, 0),
              }
            : item
        )
      );
      setSelectedId('');
    }
  };

  const findCommentIndex = (comments: Comment[]) => {
    return comments.findIndex((comment) => comment?.id === selectedId);
  };

  const updateReplies = (comments: Comment[]) => {
    return comments.map((comment) => {
      if (comment?.replies?.some((reply) => reply?.id === selectedId)) {
        return {
          ...comment,
          replies: comment?.replies?.map((reply) => {
            if (reply?.id === selectedId) {
              return {
                ...reply,
                deleted_at: new Date().toISOString(),
              };
            }
            return reply;
          }),
        };
      }
      return comment;
    });
  };

  const handleReportedComment = async () => {
    const payload = {
      comment_id: selectedData?.comment_id,
      reporter_user_id: user?.id,
    };
    const { error } = await reportComment('/report-comment', payload);
    if (!error) {
      reportCommentModal.closeModal();
    }
  };

  const toggleCommentsVisibility = (postId: string) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    handleGetCommentByPost(postId);
  };

  const handleGetCommentByPost = async (postId: string, isRefetch?: boolean) => {
    const limit = isRefetch ? (currentPageForComment[postId] || 1) * 10 : 10;
    try {
      const { data } = await getComments(`/comment/${postId}`, {
        params: {
          limit,
        },
      });

      if (data.currentPage === data.lastPage || data.lastPage === 0) {
        setIsLoadedAllData((prev) => ({ ...prev, [postId]: true }));
      } else {
        setIsLoadedAllData((prev) => ({ ...prev, [postId]: false }));
      }

      setCommentsData((prev) => ({
        ...prev,
        [postId]: data?.commentsData ?? [],
      }));

      const initialLikes: Record<string, boolean> = {};
      const initialLikeCounts: Record<string, number> = {};
      data?.commentsData?.forEach((comment: Comment) => {
        initialLikes[comment.id] = !!Number(comment?.isCommentLikedByUser);
        initialLikeCounts[comment.id] = Number(comment?.likeCommentCount);

        if (comment?.replies && comment?.replies?.length > 0) {
          comment?.replies?.forEach((reply) => {
            initialLikes[reply.id] = !!Number(reply?.isReplyLikedByUser);
            initialLikeCounts[reply.id] = Number(reply?.likeReplyCount);
          });
        }
      });

      setLikeItems((prev) => ({ ...prev, ...initialLikes }));
      setLikeCounts((prev) => ({ ...prev, ...initialLikeCounts }));
    } catch (error) {
      //
    }
  };

  const handleBlockUser = async () => {
    await updateUserByAdmin(`${REACT_APP_API_URL}/admin/update-user`, {
      user_id: blockUserId,
      is_blocked: true,
    });
    if (!isUpdatingByAdmin) {
      setBlockUserId('');
      if (selectedId !== '') {
        handleGetCommentByPost(selectedId);
      }
      fetchPosts(currentPage);

      // refetch();
      setSelectedId('');
      blockUserModal.closeModal();
    }
  };
  const handleLoadMoreData = async (postId: string) => {
    const nextPage = (currentPageForComment[postId] || 1) + 1;

    const { data } = await getNewData(`/comment/${postId}`, {
      params: {
        limit: 10,
        page: nextPage,
      },
    });

    setCommentsData((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), ...(data?.commentsData ?? [])],
    }));

    setCurrentPageForComment((prev) => ({
      ...prev,
      [postId]: nextPage,
    }));

    if (nextPage === data.lastPage) {
      setIsLoadedAllData((prev) => ({ ...prev, [postId]: true }));
    }

    const initialLikes: Record<string, boolean> = {};
    const initialLikeCounts: Record<string, number> = {};
    data?.commentsData?.forEach((comment: Comment) => {
      initialLikes[comment.id] = !!Number(comment?.isCommentLikedByUser);
      initialLikeCounts[comment.id] = Number(comment?.likeCommentCount);

      if (comment?.replies && comment?.replies?.length > 0) {
        comment?.replies?.forEach((reply) => {
          initialLikes[reply.id] = !!Number(reply?.isReplyLikedByUser);
          initialLikeCounts[reply.id] = Number(reply?.likeReplyCount);
        });
      }
    });

    setLikeItems((prev) => ({ ...prev, ...initialLikes }));
    setLikeCounts((prev) => ({ ...prev, ...initialLikeCounts }));
  };

  const renderContent = ({
    item,
    content,
    type,
    editComment,
    toggleCommentsVisibility,
    handleGetCommentByPost,
    refetch,
    setEditComment,
  }: IRenderCommentProps) => {
    if (content?.deleted_at !== null) {
      return (
        <div className="reported-error ">
          <p>
            {capitalizeFirstCharacter(type)} {t('Community.CommentDeleted')}
          </p>
        </div>
      );
    }

    if (
      editComment &&
      editComment?.comment_id === content.id &&
      editComment.isEdit
    ) {
      return (
        <CommentInput
          className=""
          postData={item}
          initialValue={content}
          toggleComments={() => toggleCommentsVisibility(item?.id)}
          refetch={handleGetCommentByPost}
          countRefetch={() => refetch(currentPage)}
          setEditComment={setEditComment}
          isEdit
        />
      );
    }

    // Render the content description and attachments
    return (
      <>
        <div className={`${type}-content`}>
          <div className={`${type}-content__text`}>
            <TextToLink text={content?.description} />
          </div>
        </div>
        {content?.attachments?.length > 0 && (
          <div className="topic-media-list">
            {content.attachments.map((image, index: number) => (
              <div className="topic-media-item" key={`${index + 1}_media`}>
                {image?.url && image?.type === 'Image' ? (
                  <FancyBox>
                    <Link
                      data-fancybox
                      to={`${REACT_APP_BACKEND_URL}${image?.url}`}
                      target="_blank"
                    >
                      <Image src={image?.url} />
                    </Link>
                  </FancyBox>
                ) : (
                  <FancyBox>
                    <Link
                      data-fancybox
                      to={`${REACT_APP_BACKEND_URL}${image?.url}`}
                      target="_blank"
                    >
                      <span className="icon">
                        <Image iconName="playButton" />
                      </span>

                      <video src={`${REACT_APP_BACKEND_URL}${image?.url}`}>
                        <track
                          kind="captions"
                          label="English"
                          srcLang="en"
                          default
                        />
                      </video>
                    </Link>
                  </FancyBox>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="topic-discuss">
        {/* POST RENDER */}
        {posts?.map((item, index) => {
          const isPostLiked = likeItems[item?.id] || false;
          const postLikeCount = likeCounts[item?.id] || 0;
          const commentsVisible = visibleComments[item?.id];
          return (
            <div className="topic-item" key={`post_${index + 1}`}>
              <div className="topic-item-user-info">
                <div className="topic-user-profile">
                  <Image
                    src={`${REACT_APP_BACKEND_URL}${item?.user?.profile_image}`}
                    isFromDataBase={false}
                  />
                </div>
                <div className="topic-item-user-info-content">
                  <div className="inner">
                    <div className="topic-name-time">
                      {item?.user?.role?.role !== Roles.Student ? (
                        <span className="topic-user-name">
                          {item?.user?.first_name} {item?.user?.last_name}
                          <span className="user-role-in">
                            | {t('Community.Profile.Label')}
                          </span>
                        </span>
                      ) : (
                        <span className="topic-user-name">
                          {item?.user?.first_name} {item?.user?.last_name}
                        </span>
                      )}
                      <span className="topic-time">
                        {formatDistanceToNow(parseISO(item?.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                      <ContextMenuModal
                        isUserBanned={item?.user?.is_user_banned}
                        post_user_role={item?.user?.role?.role ?? ''}
                        comment_id={item?.id}
                        comment_user_id={item?.user?.id}
                        deleteCommentModal={deleteCommentModal}
                        deletePostModal={deletePostModal}
                        reportCommentModal={reportCommentModal}
                        setEditComment={setEditComment}
                        setSelectedData={setSelectedData}
                        setSelectedId={setSelectedId}
                        isComment={false}
                        onBlockUserClickHandler={() => {
                          setBlockUserId(item?.user?.id);
                          setSelectedId(item?.id);
                          blockUserModal.openModal();
                        }}
                        onClickHandler={() => {
                          setPostInitialValue({
                            description: item?.description,
                            media: item?.attachments,
                            post_id: item?.id,
                          });
                        }}
                      />
                    </div>
                    <div className="topic-content">
                      <div className="topic-content__text">
                        <TextToLink text={item?.description} />
                      </div>
                      <Swiper
                        slidesPerView={3.5}
                        spaceBetween={10}
                        navigation={{
                          prevEl: '.image-swiper-button-prev',
                          nextEl: '.image-swiper-button-next',
                          disabledClass: 'swiper-button-disabled',
                        }}
                        freeMode
                        modules={[FreeMode, Navigation]}
                        // className="student-course-module-tab-slider"
                      >
                        {item?.attachments?.map((image, index) => {
                          return (
                            <SwiperSlide
                              className="topic-content__image"
                              key={`image_${index + 1}`}
                            >
                              {image?.url && image?.type === 'Image' ? (
                                <FancyBox>
                                  <Link
                                    data-fancybox
                                    to={`${REACT_APP_BACKEND_URL}${image?.url}`}
                                    target="_blank"
                                  >
                                    <Image src={image?.url} />
                                  </Link>
                                </FancyBox>
                              ) : (
                                <FancyBox>
                                  <Link
                                    data-fancybox
                                    to={`${REACT_APP_BACKEND_URL}${image?.url}`}
                                    target="_blank"
                                  >
                                    <span className="icon">
                                      <Image iconName="playButton" />
                                    </span>

                                    <video
                                      className="w-20 h-20"
                                      src={`${REACT_APP_BACKEND_URL}${image?.url}`}
                                    >
                                      <track
                                        kind="captions"
                                        label="English"
                                        srcLang="en"
                                        default
                                      />
                                    </video>
                                  </Link>
                                </FancyBox>
                              )}
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>

                    <CommentInput
                      className=""
                      postData={item}
                      toggleComments={() => toggleCommentsVisibility(item?.id)}
                      refetch={handleGetCommentByPost}
                      countRefetch={() => fetchPosts(currentPage)}
                    />
                    <div className="topic-action">
                      <div className="topic-action-like">
                        <Button
                          onClickHandler={() => handleLikeToggle(item?.id, 'post')}
                          disabled={user?.is_user_banned}
                          className={
                            user?.is_user_banned ? 'cursor-not-allowed' : ''
                          }
                        >
                          <Image
                            iconClassName={`${isPostLiked && 'active'}`}
                            iconName={isPostLiked ? 'palmFill' : 'palm2'}
                          />
                        </Button>
                        <span>{postLikeCount}</span>
                      </div>
                      <div className="topic-action-comment">
                        <Image iconName="message2" />
                        <span>{item?.parentCommentCount ?? 0}</span>
                      </div>
                    </div>
                    {/* COMMENTS */}
                    {commentsVisible &&
                      commentsData[item?.id]?.map((comment, index) => {
                        const isCommentLiked = likeItems[comment?.id] || false;
                        const commentLikeCount = likeCounts[comment?.id] || 0;
                        return (
                          <div
                            className="topic-comment"
                            key={`${index + 1}_comment`}
                          >
                            <div className="topic-item">
                              <div
                                className={`topic-item-user-info ${comment?.deleted_at === null && user?.role?.role === Roles.Admin && Number(comment?.isReported) === 1 ? 'is-reported' : ''}`}
                              >
                                <div className="topic-user-profile">
                                  <Image
                                    src={`${REACT_APP_BACKEND_URL}${comment?.user.profile_image}`}
                                    isFromDataBase={false}
                                  />
                                </div>
                                <div className="topic-item-user-info-content">
                                  <div className="inner">
                                    <div className="topic-name-time">
                                      {comment?.user?.role?.role !==
                                      Roles.Student ? (
                                        <span className="topic-user-name">
                                          {getFullName(
                                            comment?.user?.first_name,
                                            comment?.user?.last_name
                                          )}
                                          <span className="user-role-in">
                                            | {t('Community.Profile.Label')}
                                          </span>
                                        </span>
                                      ) : (
                                        <span className="topic-user-name">
                                          {getFullName(
                                            comment?.user?.first_name,
                                            comment?.user?.last_name
                                          )}
                                        </span>
                                      )}
                                      <span className="topic-time">
                                        {formatDistanceToNow(
                                          parseISO(comment?.created_at),
                                          {
                                            addSuffix: true,
                                          }
                                        )}
                                      </span>
                                      {comment?.deleted_at === null && (
                                        <ContextMenuModal
                                          isUserBanned={
                                            comment?.user?.is_user_banned
                                          }
                                          post_user_role={
                                            comment?.user?.role?.role ?? ''
                                          }
                                          setModalHeading={setModalHeading}
                                          setSelectedData={setSelectedData}
                                          comment_id={comment?.id}
                                          deleteCommentModal={deleteCommentModal}
                                          setSelectedId={setSelectedId}
                                          postIdForDelete={item?.id}
                                          setEditComment={setEditComment}
                                          comment_user_id={comment?.user.id}
                                          deletePostModal={deletePostModal}
                                          onBlockUserClickHandler={() => {
                                            setBlockUserId(comment?.user?.id);
                                            setSelectedId(item?.id);
                                            blockUserModal.openModal();
                                          }}
                                          reportCommentModal={reportCommentModal}
                                        />
                                      )}
                                      {comment?.deleted_at === null &&
                                        user?.role?.role === Roles.Admin &&
                                        Number(comment?.isReported) === 1 && (
                                          <div className="report-comment-wrap">
                                            <Image iconName="infoIcon" />
                                            <span>
                                              {t('ReportedComments.Title2')}
                                            </span>
                                          </div>
                                        )}
                                    </div>
                                    {renderContent({
                                      item,
                                      content: comment,
                                      type: 'comment',
                                      editComment,
                                      toggleCommentsVisibility,
                                      handleGetCommentByPost,
                                      refetch: () => fetchPosts(currentPage),
                                      setEditComment,
                                    })}
                                    {comment?.deleted_at === null && (
                                      <div className="topic-action">
                                        <div className="topic-action-like">
                                          <Button
                                            onClickHandler={() =>
                                              handleLikeToggle(
                                                comment?.id,
                                                'comment'
                                              )
                                            }
                                            className={
                                              user?.is_user_banned
                                                ? 'cursor-not-allowed'
                                                : ''
                                            }
                                            disabled={user?.is_user_banned}
                                          >
                                            <Image
                                              iconClassName={`${isCommentLiked && 'active'}`}
                                              iconName={
                                                isCommentLiked ? 'palmFill' : 'palm2'
                                              }
                                            />
                                          </Button>
                                          <span>{commentLikeCount}</span>
                                        </div>
                                        <Button
                                          onClickHandler={() =>
                                            setDisplayReply((prev) => ({
                                              ...prev,
                                              [comment?.id]:
                                                !displayReply[comment?.id],
                                            }))
                                          }
                                        >
                                          <div className="topic-action-comment">
                                            <Image iconName="reply" />
                                            <span>{comment?.totalReplyCount}</span>
                                          </div>
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* REPLIES */}
                              {comment?.deleted_at === null &&
                                displayReply[comment?.id] &&
                                comment?.replies?.map((reply, index) => {
                                  const isReplyLiked = likeItems[reply.id] || false;
                                  const replyLikeCount = likeCounts[reply.id] || 0;
                                  return (
                                    <div
                                      className="reply-list"
                                      key={`${index + 1}_reply`}
                                      id={reply?.id}
                                    >
                                      <div
                                        className={`reply-item ${reply?.deleted_at === null && user?.role?.role === Roles.Admin && Number(reply?.isReported) === 1 ? 'is-reported' : ''}`}
                                      >
                                        <div className="reply-user-profile">
                                          <Image
                                            src={`${REACT_APP_BACKEND_URL}${reply?.user?.profile_image}`}
                                            isFromDataBase={false}
                                          />
                                        </div>
                                        <div className="reply-box">
                                          <div className="reply-name-time">
                                            {reply?.user?.role?.role !==
                                            Roles.Student ? (
                                              <span className="reply-user-name">
                                                {getFullName(
                                                  reply?.user?.first_name,
                                                  reply?.user?.last_name
                                                )}
                                                <span className="user-role-in">
                                                  | {t('Community.Profile.Label')}
                                                </span>
                                              </span>
                                            ) : (
                                              <span className="reply-user-name">
                                                {getFullName(
                                                  reply?.user?.first_name,
                                                  reply?.user?.last_name
                                                )}
                                              </span>
                                            )}
                                            <span className="reply-time">
                                              {formatDistanceToNow(
                                                parseISO(reply?.created_at),
                                                {
                                                  addSuffix: true,
                                                }
                                              )}
                                            </span>
                                            {reply?.deleted_at === null && (
                                              <ContextMenuModal
                                                isUserBanned={
                                                  reply?.user?.is_user_banned
                                                }
                                                setModalHeading={setModalHeading}
                                                isReply
                                                post_user_role={
                                                  reply?.user?.role?.role
                                                }
                                                setSelectedData={setSelectedData}
                                                comment_id={reply?.id}
                                                deleteCommentModal={
                                                  deleteCommentModal
                                                }
                                                setSelectedId={setSelectedId}
                                                setEditComment={setEditComment}
                                                deletePostModal={deletePostModal}
                                                comment_user_id={reply?.user.id}
                                                onBlockUserClickHandler={() => {
                                                  setBlockUserId(reply?.user?.id);
                                                  setSelectedId(item?.id);
                                                  blockUserModal.openModal();
                                                }}
                                                reportCommentModal={
                                                  reportCommentModal
                                                }
                                              />
                                            )}
                                            {reply?.deleted_at === null &&
                                              user?.role?.role === Roles.Admin &&
                                              Number(reply?.isReported) === 1 && (
                                                <div className="report-comment-wrap">
                                                  <Image iconName="infoIcon" />
                                                  <span>
                                                    {t('ReportedComments.Title2')}
                                                  </span>
                                                </div>
                                              )}
                                          </div>

                                          {renderContent({
                                            item,
                                            content: reply,
                                            type: 'reply',
                                            editComment,
                                            toggleCommentsVisibility,
                                            handleGetCommentByPost,
                                            refetch: () => fetchPosts(currentPage),
                                            setEditComment,
                                          })}
                                          {reply?.deleted_at === null && (
                                            <div className="topic-action reply-action mt-5">
                                              <div className="topic-action-like">
                                                <Button
                                                  onClickHandler={() =>
                                                    handleLikeToggle(
                                                      reply?.id,
                                                      'reply'
                                                    )
                                                  }
                                                  disabled={user?.is_user_banned}
                                                  className={`${
                                                    isReplyLiked
                                                      ? 'text-PrimaryWood'
                                                      : 'text-black'
                                                  }  ${user?.is_user_banned && 'cursor-not-allowed'} `}
                                                >
                                                  <Image
                                                    iconClassName={`${isReplyLiked && 'active'}`}
                                                    iconName={
                                                      isReplyLiked
                                                        ? 'palmFill'
                                                        : 'palm2'
                                                    }
                                                  />
                                                </Button>
                                                <span>{replyLikeCount}</span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              {comment?.deleted_at === null && (
                                <CommentInput
                                  className={
                                    displayReply[comment?.id] &&
                                    comment?.replies?.length
                                      ? 'mt-5'
                                      : ''
                                  }
                                  isReply
                                  openRepliesBox={(replyId) => {
                                    setDisplayReply((prev) => ({
                                      ...prev,
                                      [comment?.id]: true,
                                    }));
                                    setScrolledReplyId(replyId);
                                  }}
                                  placeHolder="Reply"
                                  parentId={comment?.id}
                                  postData={item}
                                  refetch={handleGetCommentByPost}
                                  countRefetch={() => fetchPosts(currentPage)}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    {commentsVisible &&
                      !gettingComments &&
                      !newDataLoading &&
                      !isLoadedAllData[item?.id] && (
                        <div className="load-more-comments">
                          <Button
                            onClickHandler={() => handleLoadMoreData(item?.id)}
                          >
                            {t('Comment.Button.LoadMore')}
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="topic-box" />
            </div>
          );
        })}
        {hasMorePosts && !isPostLoading && (
          <div className="text-center">
            <Button
              className="mx-auto"
              variants="PrimaryWood"
              onClickHandler={() => {
                loadMorePosts();
              }}
            >
              {t('LoadMorePosts')}
            </Button>
          </div>
        )}
      </div>
      <>
        {!user?.is_user_banned &&
          (postInitialValue ? (
            !_.isUndefined(list_index) ? (
              <AddEditFeedConversation
                id={id}
                isEdit
                initialValue={postInitialValue}
                setPostInitialValue={setPostInitialValue}
                setPosts={setPosts}
                list_index={list_index}
              />
            ) : (
              <AddEditConversation
                isEdit
                initialValue={postInitialValue}
                setPostInitialValue={setPostInitialValue}
                setPosts={setPosts}
              />
            )
          ) : !_.isUndefined(list_index) ? (
            <AddEditFeedConversation id={id} list_index={list_index} />
          ) : (
            <AddEditConversation />
          ))}
      </>
      {/* )} */}
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
        modal={blockUserModal}
        deleteTitle={t('Conversation.BlockUserTitle')}
        bodyText={t('Conversation.BlockUserBodyText')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Block')}
        cancelButtonFunction={() => {
          setBlockUserId('');
          setSelectedId('');
          blockUserModal.closeModal();
        }}
        confirmButtonFunction={() => handleBlockUser()}
        popUpType="danger"
      />

      <ConfirmationPopup
        showCloseIcon
        modal={deleteCommentModal}
        deleteTitle={modalHeading}
        bodyText={t('Conversation.DeleteBodyText')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deleteCommentModal.closeModal()}
        confirmButtonFunction={() => {
          const deleteId = deleteCommentModal?.modalData as string;

          handleCommentDelete(deleteId);
        }}
        popUpType="danger"
      />

      <ConfirmationPopup
        showCloseIcon
        modal={reportCommentModal}
        deleteTitle={modalHeading}
        bodyText={t('Community.ReportCommentModal.Body')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ReportCommentModal.ReportButtonText')}
        cancelButtonFunction={() => reportCommentModal.closeModal()}
        confirmButtonFunction={() => {
          handleReportedComment();
        }}
        popUpType="danger"
      />
    </>
  );
};

export default ConversationList;
