// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import DropZone from './DropZoneField';
import InputField from './InputField';

// ** Styles **
import './style/commentInput.css';

// ** Form and Types **
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { CommentInputProps } from 'modules/Community/types';

// ** Hooks **
import { useAxiosPatch, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// ** Redux Selectors **
import { getCurrentUser, setUserData } from 'reduxStore/slices/authSlice';
import { EnumFileType } from './enum';

const CommentInput = ({
  isReply,
  className,
  placeHolder,
  postData,
  parentId,
  initialValue,
  toggleComments,
  refetch,
  countRefetch,
  setEditComment,
  isEdit,
  openRepliesBox,
}: CommentInputProps) => {
  // ** Axios Hooks **
  const [createComment, { isLoading: isCreating }] = useAxiosPost();
  const [updateComment, { isLoading: isUpdating }] = useAxiosPatch();

  // ** Modals   **
  const displayNamePermissionModal = useModal();

  // ** State **
  const [submitModalData, setSubmitModalData] = useState(false);
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);

  // **  Ref **
  const formikRef = useRef<FormikProps<FormikValues>>();

  // ** Translation and Redux State **
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  // ** State for toggling comment section and icon **
  const [isCommentsToggled, setIsCommentsToggled] = useState(false);
  // ** Attachment URL and Initial Values **
  const attachmentUrl = initialValue
    ? initialValue?.attachments?.map((item) => item.url)
    : [];

  const initialValues = initialValue
    ? {
        post_id: postData?.id,
        description: initialValue.description,
        comment_id: initialValue.id,
        attachments: attachmentUrl,
        parent_thread_id: parentId ?? null,
      }
    : {
        post_id: postData?.id,
        description: '',
        attachments: [],
        parent_thread_id: parentId ?? null,
      };

  const OnSubmit = async (values: FormikValues) => {
    if (
      !values?.attachments &&
      (!values?.description || values?.description?.trim() === '')
    ) {
      return;
    }
    const formData = new FormData();

    // Populate formData
    Object.entries(values ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((item) => {
          formData.append('attachments', item);
        });
      } else if (!Array.isArray(value)) {
        if (
          key === 'description' &&
          (values?.description?.trim() === '' || values?.description === null)
        )
          return;

        formData.append(key, value);
      }
    });

    if (isEdit && setEditComment) {
      setEditComment({ isEdit: false });
      const { error } = await updateComment('/comment', formData);
      if (!error) {
        if (postData?.id) {
          countRefetch?.();
          refetch?.(postData?.id, true);
        }
        if (formikRef.current) {
          formikRef.current.resetForm();
        }
      }
      return;
    }

    if (user?.is_show_profile !== null || submitModalData) {
      if (submitModalData) {
        formData.append('is_display_profile', String(displayProfile));
      }
      const { error, data } = await createComment('/comment', formData);
      if (!error) {
        if (postData?.id) {
          countRefetch?.();
          await refetch?.(postData?.id, true);
        }
        if (formikRef.current) {
          formikRef.current.resetForm();
        }
        if (submitModalData) {
          setSubmitModalData(false);
          displayNamePermissionModal.closeModal();
        }
        if (!isCommentsToggled) {
          handleToggleComments();
        }
      }
      openRepliesBox?.(data.id);
    } else {
      displayNamePermissionModal.openModal();
    }
  };

  const handleSubmitRef = () => {
    if (formikRef.current) {
      setSubmitModalData(true);
      dispatch(setUserData({ user: { ...user, is_show_profile: displayProfile } }));
      formikRef.current.submitForm();
    }
  };

  // ** Toggle Comments and Icon Functionality **
  const handleToggleComments = () => {
    setIsCommentsToggled((prev) => !prev);
    toggleComments?.();
  };

  return (
    <>
      <div className={`comment-input ${className ?? ''}`}>
        <Formik
          initialValues={initialValues}
          innerRef={formikRef as React.Ref<FormikProps<FormikValues>>}
          onSubmit={(values) => {
            OnSubmit(values);
          }}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            const isButtonDisabled =
              (!values?.description?.trim() && values?.attachments?.length === 0) ||
              user?.is_user_banned;

            const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
              const inputValue = e.target.value;
              if (inputValue.length <= 1000) {
                setFieldValue('description', inputValue);
              }
            };

            return (
              <Form>
                <div
                  className={`comment-input-wrap ${isReply ? '' : 'reply-input'}`}
                >
                  <InputField
                    parentClass="input-wrap"
                    placeholder={placeHolder ?? 'Comment here..'}
                    type="text"
                    className="text-input"
                    value={values?.description}
                    name="description"
                    isDisabled={user?.is_user_banned}
                    onChange={handleDescriptionChange}
                  />
                  {!user?.is_user_banned && (
                    <DropZone
                      isCapture
                      isCompulsory
                      name="attachments"
                      setValue={setFieldValue}
                      acceptTypes="image/*,video/*"
                      value={values?.attachments}
                      variant="commentFileInput"
                      isMulti
                      fileInputIcon="linkIcon"
                      fileType={[EnumFileType.Image, EnumFileType.Video]}
                    />
                  )}
                </div>

                {isReply ? (
                  <Button
                    type="submit"
                    className={`comment-input-submit ${isButtonDisabled ? '!cursor-not-allowed' : ''}`}
                    disabled={isButtonDisabled}
                  >
                    <Image iconName="send" />
                  </Button>
                ) : (
                  <div className="comment-submit">
                    <Button
                      variants="black"
                      type="submit"
                      className={`w-fit ${isButtonDisabled ? 'cursor-not-allowed' : ''}`}
                      disabled={isButtonDisabled}
                      isLoading={isEdit ? isUpdating : isCreating}
                    >
                      {isEdit
                        ? t('Conversation.InputComment.edit')
                        : t('Conversation.InputComment.send')}
                    </Button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
        {!isReply && !isEdit && (postData?.parentCommentCount ?? 0) > 0 && (
          <div className="coment-count">
            <Button
              onClickHandler={handleToggleComments}
              className="flex items-center gap-2"
            >
              {postData?.parentCommentCount} {t('Community.Table.Comments')}
              <Image
                iconName="chevronRight"
                iconClassName={`transition-all duration-300 ${isCommentsToggled ? '!-rotate-90' : ''}`}
              />
            </Button>
          </div>
        )}
      </div>
      <ConfirmationPopup
        showCloseIcon
        modal={displayNamePermissionModal}
        deleteTitle={t('Conversation.permissionTitle')}
        bodyText={t('Conversation.permissionBodyText')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Continue')}
        cancelButtonFunction={() => displayNamePermissionModal.closeModal()}
        confirmButtonFunction={() => {
          if (displayProfile) {
            handleSubmitRef();
          }
        }}
        popUpType="info"
        isCheckBox
        setProfile={setDisplayProfile}
      />
    </>
  );
};

export default CommentInput;
