import Button from 'components/Button/Button';
import ProfilePictureUpload from 'components/FormElement/components/ProfilePictureUpload';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import { ToastVarient } from 'constants/common.constant';
import { Formik } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { AdminUserValidationSchema } from 'modules/Profile/validation';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link } from 'react-router-dom';
import { getCurrentUser, setUserData } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { EditInitialValues, OnSubmitProps } from '../../Types/AdminProfile.types';

const AdminUserProfile = ({ isSidebar }: { isSidebar: string }) => {
  const dispatch = useDispatch();
  const [callApi, { isLoading }] = useAxiosPost();
  const { t } = useTranslation();

  const user = useSelector(getCurrentUser);

  const editInitialValue: EditInitialValues = {
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    profile_image: user?.profile_image || null,
  };

  const onSubmit = async (userData: OnSubmitProps) => {
    if (userData && user?.id) {
      const formData: FormData = new FormData();
      formData.append('first_name', userData.first_name);
      formData.append('last_name', userData.last_name);

      if (userData.profile_image) {
        formData.append('profile_image', userData.profile_image as Blob);
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
          <span>{t('Profile.Sidebar.EditProfile')}</span>
        </div>
      </div>
      <div className="sidebar-content-left">
        <Formik
          initialValues={editInitialValue}
          enableReinitialize
          validationSchema={AdminUserValidationSchema()}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              <Form className="admin-profile-form" onSubmit={handleSubmit}>
                <ProfilePictureUpload
                  setValue={setFieldValue}
                  name="profile_image"
                  value={values?.profile_image ? values?.profile_image : null}
                  acceptTypes="image/*"
                />

                <InputField
                  label={t('Profile.Auth.Label.FirstName')}
                  placeholder={t('Profile.Auth.Placeholder.FirstName')}
                  name="first_name"
                  value={values.first_name}
                />
                <InputField
                  label={t('Profile.Auth.Label.LastName')}
                  placeholder={t('Profile.Auth.Placeholder.LastName')}
                  name="last_name"
                  value={values.last_name}
                />
                <InputField
                  label={t('Profile.Auth.Label.Email')}
                  placeholder={t('Profile.Auth.Placeholder.Email')}
                  type="email"
                  name="email"
                  value={values.email}
                  isDisabled
                />

                <Button
                  isLoading={isLoading}
                  variants="black"
                  type="submit"
                  className="w-fit"
                  value="Update"
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
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;
