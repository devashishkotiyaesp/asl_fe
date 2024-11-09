import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Icon from 'components/Icon';
import { ToastVarient } from 'constants/common.constant';
import { PublicNavigation } from 'constants/navigation.constant';
import { Form, Formik, FormikValues } from 'formik';
import { ResetPasswordValidationSchema } from 'modules/Auth/validationSchema';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToast } from 'reduxStore/slices/toastSlice';
import supabase from 'supabase';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const resetPasswordInitialValue = { password: '', confirmPassword: '' };

  const OnSubmit = async (userData: FormikValues) => {
    if (userData) {
      const response = await supabase.auth.updateUser({
        password: userData.password,
      });
      const toastId = new Date().getTime();
      if (response.data.user) {
        dispatch(
          setToast({
            variant: ToastVarient.SUCCESS,
            message: t('Auth.ResetPassword.Success'),
            type: 'success',
            id: toastId,
          })
        );
        navigate(PublicNavigation.login);
      } else {
        dispatch(
          setToast({
            variant: ToastVarient.WARNING,
            message:
              response.error?.message ?? t('Comman.ToastMessage.Success.Error'),
            type: 'error',
            id: toastId,
          })
        );
      }
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-title-text">
        <h2 className="">
          {t('Auth.ResetPassword.Title')}
          {/* <span className="text-PrimaryWood">The ASL Shop</span> */}
        </h2>
        <p>{t('Auth.ResetPassword.SubTitle')}</p>
      </div>
      <div className="form-card">
        <Formik
          initialValues={resetPasswordInitialValue}
          validationSchema={ResetPasswordValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          <Form>
            <InputField
              name="password"
              label={t('Auth.ResetPassword.Label.Password')}
              parentClass="mb-5"
              placeholder={t('Auth.ResetPassword.Placeholder.Password')}
              type={showPassword ? 'text' : 'password'}
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
            />
            <InputField
              name="confirmPassword"
              label={t('Auth.ResetPassword.Label.ConfirmPassword')}
              parentClass="mb-5"
              placeholder={t('Auth.ResetPassword.Placeholder.ConfirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              icon={
                <Button
                  className="cursor-pointer w-5 h-5 text-grayText"
                  onClickHandler={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    className="w-full h-full"
                    name={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                  />
                </Button>
              }
            />
            <Button
              variants="black"
              type="submit"
              value={t('Auth.ResetPassword.Button.Submit')}
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
