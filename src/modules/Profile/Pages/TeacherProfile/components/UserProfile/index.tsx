import Button from 'components/Button/Button';
import ProfilePictureUpload from 'components/FormElement/components/ProfilePictureUpload';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Icon from 'components/Icon';
import { ToastVariant } from 'constants/common.constant';
import { Formik } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { TeacherUserValidationSchema } from 'modules/Profile/validation';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import {
  getCurrentUser,
  getOrganization,
  setUserData,
} from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { EditInitialValues } from '../../Types/TeacherProfile.types';
import '../TeacherProfileTab/index.css';

const UserProfile: FC = () => {
  const dispatch = useDispatch();
  const [callApi, { isLoading }] = useAxiosPost();

  const { t } = useTranslation();

  const user = useSelector(getCurrentUser);
  const organizations = useSelector(getOrganization);

  const editInitialValue: EditInitialValues = {
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    profile_image: user?.profile_image || null,
    bio: user?.bio || '',
    video_link: user?.video_link,
    organization: organizations?.[0]?.userDetails?.first_name,
  };

  const onSubmit = async ({
    first_name,
    last_name,
    bio,
    video_link,
    profile_image,
  }: EditInitialValues) => {
    if (!user?.id) return;

    const formData = new FormData();
    Object.entries({ first_name, last_name, bio, video_link }).forEach(
      ([key, value]) => formData.append(key, value || '')
    );
    if (profile_image) formData.append('profile_image', profile_image);

    const res = await callApi('/users/update-profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (res.data) {
      dispatch(
        setToast({
          variant: ToastVariant.SUCCESS,
          message: t('Common.ToastMessage.Success.Update'),
          type: 'success',
          id: Date.now(),
        })
      );
      dispatch(setUserData({ user: res.data }));
    }
  };

  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>{t('Profile.Edit.Title')}</span>
        </div>
      </div>
      <div className="sidebar-content-left">
        <Formik
          initialValues={editInitialValue}
          enableReinitialize
          validationSchema={TeacherUserValidationSchema()}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <Form className="teacher-profile-form" onSubmit={handleSubmit}>
                <ProfilePictureUpload
                  setValue={setFieldValue}
                  name="profile_image"
                  value={values?.profile_image}
                  acceptTypes="image/*"
                />
                <div className="flex gap-5">
                  <InputField
                    label={t('Auth.Register.Label.FirstName')}
                    placeholder={t('Auth.Register.Placeholder.FirstName')}
                    name="first_name"
                    value={values.first_name}
                  />
                  <InputField
                    label={t('Auth.Register.Label.LastName')}
                    placeholder={t('Auth.Register.Placeholder.LastName')}
                    name="last_name"
                    value={values.last_name}
                  />
                </div>
                <InputField
                  type="email"
                  label={t('Auth.Register.Label.Email')}
                  placeholder={t('Auth.Register.Placeholder.Email')}
                  name="email"
                  value={values.email}
                  isDisabled
                />

                <InputField
                  type="text"
                  label={t('Profile.Auth.Label.Organization')}
                  placeholder={t('Profile.Auth.Placeholder.Organization')}
                  name="organization"
                  value={values.organization}
                  isDisabled
                />

                <TextArea
                  name="bio"
                  label={t('Profile.Bio.Label')}
                  rows={8}
                  value={values.bio}
                />

                <InputField
                  type="text"
                  label="YouTube Link"
                  name="video_link"
                  icon={<Icon className="w-full h-full" name="linkIcon2" />}
                />

                <Button
                  isLoading={isLoading}
                  variants="black"
                  type="submit"
                  className="w-fit"
                  value={t('Common.Button.Update')}
                />
              </Form>
            );
          }}
        </Formik>
      </div>

      {/* <div className="sidebar-content-right">
        <div className="btn btn-red">
          <Link to="#!">
            <Image iconName="trashIcon" />
            {t('Common.Button.DeleteAccount')}
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default UserProfile;
