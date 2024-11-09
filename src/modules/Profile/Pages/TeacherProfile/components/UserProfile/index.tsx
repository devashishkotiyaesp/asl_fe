import Button from 'components/Button/Button';
import ProfilePictureUpload from 'components/FormElement/components/ProfilePictureUpload';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Icon from 'components/Icon';
import Image from 'components/Image';
import { ToastVarient } from 'constants/common.constant';
import { Formik } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { TeacherUserValidationSchema } from 'modules/Profile/validation';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link } from 'react-router-dom';
import {
  getCurrentUser,
  getOrganization,
  setUserData,
} from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import {
  EditInitialValues,
  TeacherUserProfileProps,
} from '../../Types/TeacherProfile.types';
import '../TeacherProfileTab/index.css';

const TeacherUserProfile: FC<TeacherUserProfileProps> = ({ isSidebar }) => {
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
    organization: organizations?.[0]?.userDetails?.first_name,
  };

  const onSubmit = async (userData: EditInitialValues) => {
    if (userData && user?.id) {
      const formData: FormData = new FormData();
      formData.append('first_name', userData.first_name);
      formData.append('last_name', userData.last_name);
      formData.append('bio', userData.bio);

      if (userData.profile_image) {
        formData.append('profile_image', userData.profile_image);
      }
      const res = await callApi('/users/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data) {
        dispatch(
          setToast({
            variant: ToastVarient.SUCCESS,
            message: `${t('Comman.ToastMessage.Success.Update')}`,
            type: 'success',
            id: new Date().getTime(),
          })
        );
        dispatch(
          setUserData({
            user: res.data,
          })
        );
      }
    }
  };
  return (
    <div
      className="sidebar-content-wrap"
      style={isSidebar === 'edit' ? { display: '' } : { display: 'none' }}
    >
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
                <div className="teacher-profile-img">
                  <label htmlFor="image" className="profile-update">
                    <ProfilePictureUpload
                      setValue={setFieldValue}
                      name="profile_image"
                      value={values?.profile_image}
                      acceptTypes="image/*"
                    />
                  </label>
                </div>
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
                  name="yt_link"
                  isDisabled
                  icon={<Icon className="w-full h-full" name="linkIcon2" />}
                />

                <Button
                  isLoading={isLoading}
                  variants="black"
                  type="submit"
                  className="w-fit"
                  value={t('Comman.Button.Update')}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="sidebar-content-right">
        <div className="btn btn-red">
          <Link to="#!">
            <Image iconName="trashIcon" />
            {t('Comman.Button.DeleteAccount')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherUserProfile;
