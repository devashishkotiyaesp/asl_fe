import Button from 'components/Button/Button';
import ProfilePictureUpload from 'components/FormElement/components/ProfilePictureUpload';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { ToastVarient } from 'constants/common.constant';
import { Form, Formik } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { StudentUserValidationSchema } from 'modules/Profile/validation';
import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser, setUserData } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { StudentLearningInterest } from '../../constants';
import { FormValues, UserProfileProps } from '../../types';

import './index.css';

const UserProfile: FC<UserProfileProps> = ({ isSidebar, setSidebar }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectModal = useModal();
  const [callApi, { isLoading }] = useAxiosPost();
  const user = useSelector(getCurrentUser);

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || []
  );

  const initialValues: FormValues = {
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    profile_image: user?.profile_image || null,
    email: user?.email || '',
    bio: user?.bio || '',
  };

  const handleInterestToggle = useCallback((interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  }, []);

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && key !== 'profile_image') {
        formData.append(key, value);
      }
    });

    formData.append('interests', JSON.stringify(selectedInterests));

    if (values.profile_image) {
      formData.append('profile_image', values.profile_image);
    }

    try {
      const response = await callApi('/users/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data) {
        dispatch(
          setToast({
            variant: ToastVarient.SUCCESS,
            message: t('Comman.ToastMessage.Success.Update'),
            type: 'success',
            id: Date.now(),
          })
        );
        dispatch(
          setUserData({
            user: response.data,
          })
        );
      }
    } catch (error) {
      dispatch(
        setToast({
          variant: ToastVarient.ERROR,
          message: t('Comman.ToastMessage.Error.Generic'),
          type: 'error',
          id: Date.now(),
        })
      );
    }
  };

  const selectedInterestTags = useMemo(
    () =>
      selectedInterests.map((interest) => (
        <>
          <div key={interest} className="selected-interest-tag">
            <span>{interest}</span>
            <button
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className="remove-icon"
              aria-label={`Remove ${interest}`}
            >
              <Image iconName="plus" />
            </button>
          </div>
        </>
      )),
    [selectedInterests, handleInterestToggle]
  );

  if (isSidebar !== 'edit') return null;

  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <h2 className="sidebar-content-title">
          <span>{t('Profile.Edit.Title')}</span>
        </h2>
      </div>

      <div className="sidebar-content-left">
        <Formik
          initialValues={initialValues}
          validationSchema={StudentUserValidationSchema()}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="student-profile-form">
              <ProfilePictureUpload
                setValue={setFieldValue}
                name="profile_image"
                value={values?.profile_image}
                acceptTypes="image/*"
              />
              <InputField
                label={t('Profile.Auth.Label.FirstName')}
                placeholder={t('Profile.Auth.Placeholder.FirstName')}
                name="first_name"
              />

              <InputField
                label={t('Profile.Auth.Label.LastName')}
                placeholder={t('Profile.Auth.Placeholder.LastName')}
                name="last_name"
              />

              <InputField
                label={t('Profile.Auth.Label.Email')}
                placeholder={t('Profile.Auth.Placeholder.Email')}
                type="email"
                name="email"
                isDisabled
              />

              {/* <ReactSelect
                width="100%"
                options={aslLevels}
                label={t('Profile.Auth.Label.ASLLevel')}
                name="asl_level_id"
                isCompulsory
                onChange={(selectedOption) =>
                  setFieldValue(`asl_level_id`, (selectedOption as IOptions).value)
                }
                placeholder={t('Profile.Auth.Placeholder.ASLLevel')}
                selectedValue={values.asl_level_id}
              /> */}

              <TextArea
                name="bio"
                label={t('Profile.Auth.Label.Bio')}
                placeholder={t('Profile.Auth.Placeholder.Bio')}
                rows={8}
              />

              <Link
                className="reset-text"
                to=""
                onClick={() => setSidebar('password')}
              >
                {t('Profile.Action.ResetPassword')}
              </Link>

              <div className="select-interest-box">
                <Button
                  onClickHandler={selectModal.openModal}
                  type="button"
                  variants="PrimaryWood"
                  className="w-fit"
                >
                  {t('Profile.Action.AddInterest')}
                </Button>

                <div className="selected-interest-wrap">
                  {selectedInterests.length > 0 && selectedInterestTags}
                </div>
              </div>
              <Button
                isLoading={isLoading}
                variants="black"
                type="submit"
                className="w-fit"
              >
                {t('Comman.Button.Update')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <Modal
        width="max-w-[600px]"
        headerTitle={t('Profile.Interest.ModalTitle')}
        modal={selectModal}
        closeOnOutsideClick
        closeOnEscape
        modalClassName="learn-asl-modal"
      >
        <>
          <div className="learn-asl-text">
            <p>{t('Profile.Interest.ModalDescription')}</p>
          </div>
          <div className="learn-asl-select-wrap">
            {StudentLearningInterest.map((interest) => (
              <button
                key={interest.value}
                type="button"
                className={`learn-asl-select-item ${
                  selectedInterests.includes(interest.value) ? 'active' : ''
                }`}
                onClick={() => handleInterestToggle(interest.value)}
              >
                <span className="check-name">{interest.value}</span>
                {selectedInterests.includes(interest.value) && (
                  <span className="check-icon">
                    <Image iconName="checkIcon" iconClassName="w-full h-full" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      </Modal>
    </div>
  );
};

export default UserProfile;
