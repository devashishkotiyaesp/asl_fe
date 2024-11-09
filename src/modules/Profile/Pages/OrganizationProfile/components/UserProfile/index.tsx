import Button from 'components/Button/Button';
import ProfilePictureUpload from 'components/FormElement/components/ProfilePictureUpload';
import InputField from 'components/FormElement/InputField';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import { OrganizationTypeOption, ToastVarient } from 'constants/common.constant';
import { Form, Formik } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import ChangePassword from 'modules/Profile/common/components/ChangePassword';
import { combineAddress, parseAddress } from 'modules/Profile/helper';
import { OrganizationUserValidationSchema } from 'modules/Profile/validation';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setUserData } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { OrganizationType } from 'reduxStore/types';
import { IEditOrganizationProfie } from '../../types';
import './index.css';

// Interface
interface OrganizationUserProfileProps {
  organizationDetails?: OrganizationType;
}

const OrganizationUserProfile: FC<OrganizationUserProfileProps> = ({
  organizationDetails,
}) => {
  // hooks
  const user = useSelector(getCurrentUser);
  const ResetPasswordModal = useModal();
  const dispatch = useDispatch();
  const [callApi, { isLoading }] = useAxiosPost();

  // constants
  const InitialRecord: IEditOrganizationProfie = {
    name: user?.first_name ?? '',
    email: user?.email ?? '',
    profile_image: user?.profile_image ?? null,
    address: parseAddress(user?.address ?? '').address ?? '',
    city: parseAddress(user?.address ?? '').city ?? '',
    country: parseAddress(user?.address ?? '').country ?? '',
    pin: parseAddress(user?.address ?? '').pin ?? '',
    organizationType: organizationDetails?.organization_type ?? '',
  };
  const [initialValues] = useState(InitialRecord);

  // methods
  const OnSubmit = async (values: IEditOrganizationProfie) => {
    if (values && user?.id) {
      const combinedAddress = combineAddress(
        values.address,
        values.city,
        values.country,
        values.pin
      );
      const payload = {
        ...values,
        address: combinedAddress,
      };

      const formData: FormData = new FormData();
      formData.append('first_name', payload.name);
      formData.append('address', payload.address);
      formData.append('organization_type', payload.organizationType);

      if (typeof payload.profile_image !== 'string') {
        formData.append('profile_image', payload.profile_image as Blob);
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
    <>
      <div className="edit-org-wrap">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => OnSubmit(values)}
          validationSchema={OrganizationUserValidationSchema()}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="row">
                <div className="left-part">
                  <ProfilePictureUpload
                    isBig
                    setValue={setFieldValue}
                    name="profile_image"
                    value={values?.profile_image ? values?.profile_image : null}
                    acceptTypes="image/*"
                  />
                </div>
                <div className="right-part">
                  <InputField
                    name="name"
                    label={t('Organization.EditProfile.Name.Label')}
                    value={values.name}
                    placeholder={t('Organization.EditProfile.Name.Placeholder')}
                    isCompulsory
                  />
                  <InputField
                    name="email"
                    label={t('Organization.EditProfile.Email.Label')}
                    placeholder={t('Organization.EditProfile.Email.Placeholder')}
                    isDisabled
                    value={values.email}
                  />
                  <div className="">
                    {/* <InputField name="ds" type="password" label="Password" /> */}
                    <span
                      className="reset-pswd-text"
                      onClick={() => {
                        ResetPasswordModal?.openModal();
                      }}
                    >
                      {t('Organization.EditProfile.ResetPassword.Label')}
                    </span>
                  </div>

                  <InputField
                    name="address"
                    label={t('Organization.EditProfile.Address.Label')}
                    value={values.address}
                    isCompulsory
                    type="text"
                    placeholder={t('Organization.EditProfile.Address.Placeholder')}
                  />
                  <InputField
                    name="city"
                    label={t('Organization.EditProfile.City.Label')}
                    type="text"
                    isCompulsory
                    value={values.city}
                    placeholder={t('Organization.EditProfile.City.Placeholder')}
                  />
                  <InputField
                    name="country"
                    label={t('Organization.EditProfile.Country.Label')}
                    type="text"
                    value={values.country}
                    isCompulsory
                    placeholder={t('Organization.EditProfile.Country.Placeholder')}
                  />
                  <InputField
                    name="pin"
                    type="text"
                    label={t('Organization.EditProfile.Pin.Label')}
                    value={values.pin}
                    isCompulsory
                    placeholder={t('Organization.EditProfile.Pin.Placeholder')}
                  />

                  <div className="checkbox-list">
                    <RadioButtonGroup
                      isChekckbox
                      name="organizationType"
                      options={OrganizationTypeOption}
                      isCompulsory
                      label={t('Organization.EditProfile.OrganizationType.Label')}
                      selectedValue={values.organizationType}
                    />
                  </div>

                  <div className="btn-wrap">
                    <Button
                      variants="PrimaryWood"
                      className="w-fit"
                      isLoading={isLoading}
                      type="submit"
                    >
                      {t('Organization.EditProfile.Button.Update')}
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {ResetPasswordModal.isOpen && (
          <ChangePassword modal={ResetPasswordModal} withModal />
        )}
      </div>
    </>
  );
};

export default OrganizationUserProfile;
