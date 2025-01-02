// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';

// ** Utils **

// ** Types **
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { ContextMenuProps } from '../types';

import { Roles } from 'constants/common.constant';
import { useTranslation } from 'react-i18next';
import '../index.css';

const ContextMenuModal = ({
  deleteCommentModal,
  isComment = true,
  deletePostModal,
  reportCommentModal,
  setSelectedId,
  comment_id,
  setEditComment,
  comment_user_id,
  setSelectedData,
  onClickHandler,
  post_user_role,
  isReply,
  setModalHeading,
  isUserBanned,
  onBlockUserClickHandler,
  postIdForDelete,
}: ContextMenuProps) => {
  // ** Redux State **
  const user = useSelector(getCurrentUser);

  const { t } = useTranslation();

  const isAdmin = user?.role?.role === Roles.Admin;
  const isTeacher = user?.role?.role === Roles.Teacher;
  const isStudent = user?.role?.role === Roles.Student;
  const isAuthor = comment_user_id === user?.id;

  // Determine if the report action is allowed
  const canReport =
    (isStudent &&
      user?.id !== comment_user_id &&
      post_user_role === Roles.Student) ||
    (isTeacher && post_user_role === Roles.Student);

  let options;

  switch (true) {
    case isAdmin:
      options = (
        <>
          <li>
            <Button
              onClickHandler={() => {
                if (isComment) {
                  setModalHeading?.(
                    isReply
                      ? t('Conversation.DeleteReplyTitle')
                      : t('Conversation.DeleteCommentTitle')
                  );
                  deleteCommentModal?.openModalWithData?.(postIdForDelete);
                } else {
                  deletePostModal.openModal();
                }
                setSelectedId(comment_id);
              }}
            >
              <Image iconName="trashIcon" />
              <span>
                {isReply ? t('Reply.Delete') : isComment && t('Comment.Delete')}
                {!isReply && !isComment && t('Conversation.Delete')}
              </span>
            </Button>
          </li>
          {isAuthor ? (
            <li>
              {isComment || isReply ? (
                <Button
                  onClickHandler={() => {
                    setEditComment({
                      comment_id,
                      isEdit: true,
                    });
                  }}
                >
                  <Image iconName="editPen" />
                  <span>
                    {isReply
                      ? t('Conversation.editReply')
                      : t('Conversation.editComment')}
                  </span>
                </Button>
              ) : (
                <Button onClickHandler={onClickHandler}>
                  <Image iconName="editPen" />
                  <span>{t('Conversation.editPost')}</span>
                </Button>
              )}
            </li>
          ) : (
            <li>
              {isUserBanned ? (
                <Button
                  disabled
                  onClickHandler={() => {
                    // Empty function
                  }}
                >
                  <Image iconName="blockIcon" />
                  <span>{t('Conversation.UserIsBlocked')}</span>
                </Button>
              ) : (
                <Button onClickHandler={() => onBlockUserClickHandler?.()}>
                  <Image iconName="blockIcon" />
                  <span>{t('Conversation.BlockUserPosting')}</span>
                </Button>
              )}
            </li>
          )}
        </>
      );
      break;

    case isAuthor:
      options = (
        <>
          <li>
            {isComment || isReply ? (
              <Button
                onClickHandler={() => {
                  setEditComment({
                    comment_id,
                    isEdit: true,
                  });
                }}
              >
                <Image iconName="editPen" />
                <span>
                  {isReply
                    ? t('Conversation.editReply')
                    : t('Conversation.editComment')}
                </span>
              </Button>
            ) : (
              <Button onClickHandler={onClickHandler}>
                <Image iconName="editPen" />
                <span>{t('Conversation.editPost')}</span>
              </Button>
            )}
          </li>
          <li>
            {isComment ? (
              <Button
                onClickHandler={() => {
                  setModalHeading?.(
                    isReply
                      ? t('Conversation.DeleteReplyTitle')
                      : t('Conversation.DeleteCommentTitle')
                  );
                  deleteCommentModal?.openModalWithData?.(postIdForDelete);
                  setSelectedId(comment_id);
                }}
              >
                <Image iconName="trashIcon" />
                <span>{isReply ? t('Reply.Delete') : t('Comment.Delete')}</span>
              </Button>
            ) : (
              <Button
                onClickHandler={() => {
                  deletePostModal.openModal();
                  setSelectedId(comment_id);
                }}
              >
                <Image iconName="trashIcon" />
                <span>{t('Conversation.Delete')}</span>
              </Button>
            )}
          </li>
        </>
      );
      break;

    case isComment && canReport:
      options = (
        <li>
          <Button
            onClickHandler={() => {
              setModalHeading?.(
                isReply
                  ? t('Community.ReportReplyModal.Title')
                  : t('Community.ReportCommentModal.Title')
              );
              reportCommentModal?.openModal();
              setSelectedData({
                comment_id,
                user_id: comment_user_id,
              });
            }}
          >
            <Image iconName="exclamationMarkIcon" />
            <span>
              {isReply
                ? t('Conversation.reportReply')
                : t('Conversation.reportComment')}
            </span>
          </Button>
        </li>
      );
      break;

    default:
      options = false;
  }

  return (
    <>
      {(post_user_role === Roles.Admin && !isAdmin) || user?.is_user_banned
        ? ''
        : options && (
            <div className="topic-option group">
              <span className="icon">
                <Image iconName="threeMoreDots" />
              </span>
              <ul>{options}</ul>
            </div>
          )}
    </>
  );
};

export default ContextMenuModal;
