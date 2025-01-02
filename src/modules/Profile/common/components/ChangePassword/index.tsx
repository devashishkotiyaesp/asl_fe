import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Icon from 'components/Icon';
import { Modal } from 'components/Modal/Modal';
import { ToastVariant } from 'constants/common.constant';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { ChangePasswordProps } from 'modules/Profile/types';
import { ResetUserPasswordValidationSchema } from 'modules/Profile/validation';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import supabase from 'supabase';
import '../../../index.css';

const ChangePassword: FC<ChangePasswordProps> = ({
  modal,
  isSidebar,
  withModal = false,
}) => {
  const formikRef = useRef<FormikProps<FormikValues>>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const { t } = useTranslation();
  const resetInitialValues = {
    currentpassword: '',
    password: '',
    confirmpassword: '',
  };

  const onResetSubmit = async (
    values: FormikValues,
    { resetForm }: { resetForm: (nextState?: FormikValues) => void }
  ) => {
    const toastId = new Date().getTime();
    setLoading(true);
    try {
      const response = await supabase.rpc('changepassword', {
        current_plain_password: values.currentpassword,
        new_plain_password: values.password,
        current_id: user?.sub,
      });

      if (response.data === 'success') {
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Auth.ResetPassword.Success'),
            type: 'success',
            id: toastId,
          })
        );
        modal?.closeModal();
        resetForm({ values: resetInitialValues });
        setLoading(false);
      } else if (response.data === 'incorrect') {
        dispatch(
          setToast({
            variant: ToastVariant.WARNING,
            message:
              response.error?.message ?? t('Auth.ResetPassword.Error.incorrect'),
            type: 'error',
            id: toastId,
          })
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        setToast({
          variant: ToastVariant.WARNING,
          message: t('Auth.ResetPassword.Error'),
          type: 'error',
          id: toastId,
        })
      );
    }
  };
  const handleSubmitRef = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  return (
    <>
      {withModal ? (
        <Modal
          width="max-w-[450px]"
          headerTitle="Reset Password"
          modal={modal}
          showFooter
          closeOnOutsideClick
          closeOnEscape
          footerSubmit={handleSubmitRef}
        >
          <div className="reset-pswd-wrap">
            <Formik
              initialValues={resetInitialValues}
              validationSchema={ResetUserPasswordValidationSchema()}
              onSubmit={onResetSubmit}
              innerRef={formikRef as React.Ref<FormikProps<FormikValues>>}
              enableReinitialize
            >
              {({ handleSubmit }) => {
                return (
                  <Form className="student-profile-form" onSubmit={handleSubmit}>
                    <InputField
                      icon={
                        <Button
                          className="cursor-pointer w-5 h-5 text-grayText"
                          onClickHandler={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          <Icon
                            className="w-full h-full"
                            name={showCurrentPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                          />
                        </Button>
                      }
                      name="currentpassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      label={t('Common.ChangePassword.Label.CurrentPassword')}
                      placeholder={t(
                        'Common.ChangePassword.Placeholder.CurrentPassword'
                      )}
                    />
                    <InputField
                      icon={
                        <Button
                          className="cursor-pointer w-5 h-5 text-grayText"
                          onClickHandler={() => setShowPassword(!showPassword)}
                        >
                          <Icon
                            className="w-full h-full"
                            name={showPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                          />
                        </Button>
                      }
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label={t('Common.ChangePassword.Label.NewPassword')}
                      placeholder={t(
                        'Common.ChangePassword.Placeholder.EnterNewPassword'
                      )}
                    />
                    <InputField
                      icon={
                        <Button
                          className="cursor-pointer w-5 h-5 text-grayText"
                          onClickHandler={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <Icon
                            className="w-full h-full"
                            name={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                          />
                        </Button>
                      }
                      name="confirmpassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label={t('Common.ChangePassword.Label.ReTypeNewPassword')}
                      placeholder={t(
                        `Common.ChangePassword.Placeholder.ConfirmNewPassword`
                      )}
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Modal>
      ) : (
        <div
          className="sidebar-content-wrap"
          style={
            isSidebar === 'password' ? { display: 'block' } : { display: 'none' }
          }
        >
          <div className="sidebar-content-title-wrap">
            <div className="sidebar-content-title">
              <span>{t('Common.ChangePassword.ResetPassword')}</span>
            </div>
          </div>
          <div className="reset-pswd-wrap">
            <Formik
              initialValues={resetInitialValues}
              validationSchema={ResetUserPasswordValidationSchema()}
              onSubmit={onResetSubmit}
              enableReinitialize
            >
              {({ handleSubmit }) => {
                return (
                  <Form className="student-profile-form" onSubmit={handleSubmit}>
                    <InputField
                      icon={
                        <Button
                          className="cursor-pointer w-5 h-5 text-grayText"
                          onClickHandler={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          <Icon
                            className="w-full h-full"
                            name={showCurrentPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                          />
                        </Button>
                      }
                      name="currentpassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      label={t('Common.ChangePassword.Label.CurrentPassword')}
                      placeholder={t(
                        'Common.ChangePassword.Placeholder.CurrentPassword'
                      )}
                    />
                    <InputField
                      icon={
                        <Button
                          className="cursor-pointer w-5 h-5 text-grayText"
                          onClickHandler={() => setShowPassword(!showPassword)}
                        >
                          <Icon
                            className="w-full h-full"
                            name={showPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                          />
                        </Button>
                      }
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label={t('Common.ChangePassword.Label.NewPassword')}
                      placeholder={t(
                        'Common.ChangePassword.Placeholder.EnterNewPassword'
                      )}
                    />
                    <InputField
                      icon={
                        <Button
                          className="cursor-pointer w-5 h-5 text-grayText"
                          onClickHandler={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <Icon
                            className="w-full h-full"
                            name={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                          />
                        </Button>
                      }
                      name="confirmpassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label={t('Common.ChangePassword.Label.ReTypeNewPassword')}
                      placeholder={t(
                        `Common.ChangePassword.Placeholder.ConfirmNewPassword`
                      )}
                    />
                    <Button
                      type="submit"
                      variants="black"
                      className="w-fit"
                      isLoading={loading}
                    >
                      {t('Common.Button.Update')}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
