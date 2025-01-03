import { Provider } from '@supabase/supabase-js';
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Icon from 'components/Icon';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { ProvidersEnum, ToastVariant } from 'constants/common.constant';
import { PublicNavigation } from 'constants/navigation.constant';
import { Form, Formik, FormikValues } from 'formik';
import { useModal } from 'hooks/useModal';
import { LoginValidationSchema } from 'modules/Auth/validationSchema';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToast } from 'reduxStore/slices/toastSlice';
import supabase from 'supabase';

import '../style/index.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginInitialValue = { email: '', password: '' };
  const EmailSent = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const OnSubmit = async (userData: FormikValues) => {
    setIsLoading(true);
    if (userData) {
      const response = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      const toastId = new Date().getTime();
      if (response.data.session) {
        const { error } = await supabase.auth.signInWithOtp({
          email: userData.email,
        });

        if (error) {
          dispatch(
            setToast({
              variant: ToastVariant.ERROR,
              message: error.message,
              type: 'error',
              id: toastId,
            })
          );
        } else {
          dispatch(
            setToast({
              variant: ToastVariant.SUCCESS,
              message: t('Auth.Login.Success'),
              type: 'success',
              id: toastId,
            })
          );
          navigate(PublicNavigation.mfa, {
            state: { access_token: response.data.session.access_token },
          });
        }
      } else {
        dispatch(
          setToast({
            variant: ToastVariant.WARNING,
            message:
              response.error?.message ?? t('Common.ToastMessage.Success.Error'),
            type: 'error',
            id: toastId,
          })
        );
      }
    }
    setIsLoading(false);
  };

  const signInWithOauth = async (providerType: ProvidersEnum) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: providerType as Provider,
      options: {
        redirectTo: window.location.origin + PublicNavigation.mfa,
        ...(providerType === ProvidersEnum.MICROSOFT
          ? { scopes: 'openid profile email User.Read' }
          : {}),
        ...(providerType === ProvidersEnum.APPLE ? { scopes: 'name email' } : {}),
      },
    });
    if (error) {
      const toastId = new Date().getTime();
      setToast({
        variant: 'Warning',
        message: error?.message ?? 'Something went wrong',
        type: 'error',
        id: toastId,
      });
    }
  };

  return (
    <>
      <Modal
        width="max-w-[450px]"
        modal={EmailSent}
        closeOnEscape
        showCloseIcon
        headerTitle="Two Factor Authentication Is on"
      >
        <div className="twofa-modal ">
          <div className="twofa-modal__icon">
            <Image iconName="sendIcon" iconClassName="w-full h-full" />
          </div>
          <div className="twofa-modal__content">
            {/* onClickHandler={Two_FA?.openModal} */}
            <h2 className="">Email Sent</h2>
            <p className="twofa-modal__text-sub">
              We shared you the reset password link on your email
            </p>
            <p className="twofa-modal__text-link">asl.origination@gmail.com</p>
            <Button
              variants="PrimaryWoodBorder"
              className="inline-block !w-fit mt-5"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </Modal>

      <div className="form-wrap">
        <div className="form-title-text">
          <h2 className="">
            {t(`Auth.Login.Title.1`)} <span> {t(`Auth.Login.Title.2`)}</span>
          </h2>
          <p>{t(`Auth.Login.SubTitle`)} </p>
        </div>
        <div className="form-card">
          <Formik
            initialValues={loginInitialValue}
            validationSchema={LoginValidationSchema()}
            onSubmit={(values) => OnSubmit(values)}
            enableReinitialize
          >
            {({ values }) => (
              <Form autoComplete="off">
                <InputField
                  parentClass="mb-5"
                  name="email"
                  label={t('Auth.Login.Label.Email')}
                  placeholder={t('Auth.Login.Placeholder.Email')}
                  type="text"
                  value={values.email}
                />
                <InputField
                  parentClass="mb-2.5"
                  name="password"
                  label={t('Auth.Login.Label.EnterPassword')}
                  placeholder={t('Auth.Login.Placeholder.EnterPassword')}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
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
                <div className="form-forgot-text">
                  <Link to={PublicNavigation.forgotPassword} className="">
                    {t('Auth.Login.forgotPasswordText')}
                  </Link>
                </div>
                <Button
                  variants="black"
                  type="submit"
                  isLoading={isLoading}
                  value={t('Auth.Login.Button.Login')}
                  // onClickHandler={EmailSent?.openModal}
                />

                <div className="login-with-app">
                  <div className="login-with-app-title">
                    <span>Or Continue with</span>
                  </div>
                  <div className="login-app-wrap">
                    <div>
                      <Button
                        className="login-app-icon"
                        onClickHandler={() => signInWithOauth(ProvidersEnum.GOOGLE)}
                      >
                        <Image iconName="google" />
                      </Button>
                    </div>
                    <div>
                      <Button
                        className="login-app-icon"
                        onClickHandler={() =>
                          signInWithOauth(ProvidersEnum.MICROSOFT)
                        }
                      >
                        <Image iconName="microsoft" />
                      </Button>
                    </div>
                    <div>
                      <Button
                        className="login-app-icon"
                        onClickHandler={() => signInWithOauth(ProvidersEnum.APPLE)}
                      >
                        <Image iconName="apple" />
                      </Button>
                    </div>
                  </div>
                </div>

                <span className="form-switch-type">
                  {t(`Auth.Login.AskExists`)}
                  <Link to="/auth/register" className="">
                    {t(`Auth.Login.AskExists.SignUp`)}
                  </Link>
                </span>
              </Form>
            )}
          </Formik>
        </div>
        {/* <div className="flex my-4 w-full gap-2 justify-center col-span-2">
          <Button
            variants="White"
            className="w-full min-w-[150px] justify-center"
            onClickHandler={() => signInWithOauth(ProvidersEnum.GOOGLE)}
          >
            <Image iconName="google" />
            {t(`Auth.Login.Provider.Google`)}
          </Button>
        </div> */}
      </div>
    </>
  );
};

export default Login;
