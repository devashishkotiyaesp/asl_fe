// ** Components **
import Button from 'components/Button/Button';
import TextArea from 'components/FormElement/TextArea';

// ** Form  **
import { Form, Formik, FormikValues } from 'formik';

// ** Validation **
import { ConversationValidation } from '../validations';

// ** Hooks **
import InputFileField from 'components/FormElement/InputFileField';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { useAxiosPatch, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentUser, setUserData } from 'reduxStore/slices/authSlice';
import '../index.css';
import { Conversations, IAddPostProps } from '../types';

const AddEditFeedConversation = ({
  // isEdit,
  id,
  initialValue,
  setPostInitialValue,
  setPosts,
  list_index,
}: IAddPostProps) => {
  // ** Hooks  **
  const { t } = useTranslation();

  // ** Params **
  const params = useParams();

  // ** Axios  **
  const [createPost, { isLoading }] = useAxiosPost();
  const [updatePost, { isLoading: isUpdating }] = useAxiosPatch();
  const [pendingData, setPendingData] = useState<FormikValues | null>(null);
  const [updateUserProperty, { isLoading: isUpdatingUser }] = useAxiosPost();
  const [isDisplayProfile, setIsDisplayProfile] = useState(false);

  const user = useSelector(getCurrentUser);
  const displayPermissionModal = useModal();
  const dispatch = useDispatch();

  const [localInitialValues, setLocalInitialValues] = useState<{
    description: string;
    [key: string]: string | string[] | undefined;
    community_id: string | undefined;
  }>({
    description: '',
    [`media${list_index}`]: [],
    community_id: params.id ?? id,
  });

  useEffect(() => {
    if (initialValue) {
      const attachmentUrl = initialValue?.media?.map((item) => item.url) || [];
      setLocalInitialValues({
        description: initialValue.description || '',
        [`media${list_index}`]: attachmentUrl ?? [],
        community_id: params.id ?? id,
      });
    }
  }, [initialValue, params.id, id]);

  const OnSubmit = async (communityData: FormikValues, { resetForm }: any) => {
    if (user?.is_show_profile === null) {
      setPendingData(communityData);
      displayPermissionModal?.openModal();
    } else {
      await handleFormSubmission(communityData, resetForm);
    }
  };

  const handleFormSubmission = async (
    communityData: FormikValues,
    resetForm: any
  ) => {
    const formData = new FormData();
    if (
      communityData?.description ||
      communityData?.[`media${list_index}`]?.length > 0
    ) {
      Object.entries(communityData).forEach(([key, value]) => {
        if (key === `media${list_index}`) {
          if (Array.isArray(value)) {
            value.forEach((file) => {
              formData.append('media', file);
            });
          }
        } else if (key === 'description') {
          if (value?.trim()) {
            // Append only if the description has a non-empty value
            formData.append(key, value);
          }
        } else {
          formData.append(key, value as string);
        }
      });

      if (initialValue?.post_id) {
        formData.append('post_id', initialValue.post_id);
        const { error, data } = await updatePost('/post', formData);
        if (!error) {
          setPostInitialValue?.(undefined);
          setLocalInitialValues({
            description: '',
            // [`media${list_index}`]: [],
            community_id: params.id,
          });
          updatePostResponse(data);
        }
      } else {
        const { error } = await createPost('/post', formData);
        if (!error) {
          resetForm();
        }
      }
    }
  };

  const updatePostResponse = (updatedPost: Conversations) => {
    setPosts?.((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handleDisplayProfile = async (resetForm: () => void) => {
    dispatch(setUserData({ user: { ...user, is_show_profile: isDisplayProfile } }));
    const formData = new FormData();
    formData.append('is_show_profile', String(isDisplayProfile));
    await updateUserProperty('/users/update-profile', formData);
    if (!isUpdatingUser) {
      displayPermissionModal.closeModal();
    }
    if (isDisplayProfile && pendingData) {
      await handleFormSubmission(pendingData, resetForm);
      setPendingData(null);
      displayPermissionModal?.closeModal();
    }
  };
  return (
    <div className="sticky-post-input-wrap">
      <Formik
        initialValues={localInitialValues}
        validationSchema={ConversationValidation()}
        onSubmit={(values, actions) => OnSubmit(values, actions)}
        enableReinitialize
      >
        {({ values, setFieldValue, resetForm }) => {
          const media = `values.media${list_index}`;
          const isButtonDisabled =
            (!values?.description?.trim() && media?.length === 0) ||
            user?.is_user_banned;

          const handleDescriptionChange = (
            e: React.ChangeEvent<HTMLTextAreaElement>
          ) => {
            const inputValue = e.target.value;
            if (inputValue.length <= 1000) {
              setFieldValue('description', inputValue);
            }
          };
          return (
            <Form className="">
              <div
                className={`${values.description ? 'isDataAvailable' : ''} sticky-post-input-inner`}
              >
                <InputFileField
                  value={values?.[`media${list_index}`] || []}
                  isMulti
                  setValue={setFieldValue}
                  name={`media${list_index}`}
                  isControls={false}
                  id={`media${list_index}`}
                />
                <TextArea
                  isCompulsory
                  rows={1}
                  name="description"
                  parentClass="h-fit  my-auto sticky-post-input"
                  placeholder={t('Community.PostDescription.Placeholder')}
                  onChange={handleDescriptionChange}
                />
                <div className="character-counter">
                  {values.description.length}/1000
                </div>

                <Button
                  type="submit"
                  disabled={isButtonDisabled}
                  className="sticky-post-send"
                  isLoading={isLoading ?? isUpdating}
                >
                  {!isLoading && <Image iconName="send" />}
                </Button>
              </div>
              <ConfirmationPopup
                showCloseIcon
                isLoading={isUpdatingUser}
                modal={displayPermissionModal}
                deleteTitle={t('Conversation.permissionTitle')}
                bodyText={t('Conversation.permissionBodyText')}
                cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
                confirmButtonText={t('Community.ConfirmationPopup.Continue')}
                cancelButtonFunction={() => displayPermissionModal.closeModal()}
                confirmButtonFunction={() => {
                  if (isDisplayProfile) {
                    handleDisplayProfile(resetForm);
                  }
                }}
                popUpType="info"
                isCheckBox
                setProfile={setIsDisplayProfile}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEditFeedConversation;
