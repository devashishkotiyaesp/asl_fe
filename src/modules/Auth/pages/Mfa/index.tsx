import Button from 'components/Button/Button';
import Image from 'components/Image';
import Loaders from 'components/Loaders';
import { OTPInput } from 'components/OtpInput';
import {
  LanguagesEnum,
  ProvidersEnum,
  ToastVariant,
} from 'constants/common.constant';
import { PrivateNavigation } from 'constants/navigation.constant';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthenticated } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { setToken } from 'reduxStore/slices/tokenSlice';
import supabase from 'supabase';
import '../style/index.css';

export default function Mfa() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [callApi] = useAxiosPost();
  const [getApi] = useAxiosGet();

  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const { t } = useTranslation();

  const handleResend = async () => {
    setIsLoading(true);
    const response = await supabase.auth.getSession();

    const toastId = new Date().getTime();
    if (response.data.session?.user?.email) {
      const { error } = await supabase.auth.signInWithOtp({
        email: response.data.session.user.email,
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
            message: t('Auth.MFA.ResendOTP.success'),
            type: 'success',
            id: toastId,
          })
        );
      }
    } else {
      dispatch(
        setToast({
          variant: ToastVariant.WARNING,
          message: response.error?.message ?? t('Common.ToastMessage.Success.Error'),
          type: 'error',
          id: toastId,
        })
      );
    }
    setSecondsLeft(60);
    setOtp('');
    setIsLoading(false);
  };

  const checkSession = async () => {
    const response = await supabase.auth.getSession();
    const user = response.data.session?.user;
    if (user) {
      const { provider } = user.app_metadata;

      if (provider !== ProvidersEnum.EMAIL) {
        // const toastId = new Date().getTime();
        // dispatch(
        //   setToast({
        //     variant: ToastVariant.SUCCESS,
        //     message: t('Auth.MFA.Success'),
        //     type: 'success',
        //     id: toastId,
        //   })
        // );

        const name = response.data?.session?.user.user_metadata.full_name;
        const profile_image = response.data.session?.user.user_metadata.picture;
        const registerData = {
          first_name: name?.split(' ')[0],
          last_name: name?.split(' ')[1],
          email: response.data.session?.user.email,
          sub: response.data.session?.user.id,
          provider_type: response.data.session?.user.app_metadata
            .provider as ProvidersEnum,
          language: LanguagesEnum.ENGLISH,
          ...(profile_image ? { profile_image } : {}),
        };
        await callApi('/auth/register', registerData).catch();
        dispatch(
          setToken({
            token: response.data.session?.access_token,
          })
        );
        navigate(PrivateNavigation.dashboard.view.path);
      } else if (user.email) {
        setEmail(user.email);
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (otp.length !== 6) {
      setOtpError(t('Auth.OtpScreen.otpError'));
      return;
    }

    const response = await supabase.auth.getSession();
    const email = response.data.session?.user.email;
    if (email) {
      const responseData = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      const { data, error } = responseData;
      const toastId = new Date().getTime();
      if (data.user) {
        dispatch(
          setToken({
            token: data.session?.access_token,
          })
        );
        dispatch(setAuthenticated({ isAuthenticated: true }));
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Auth.MFA.Success'),
            type: 'success',
            id: toastId,
          })
        );
        getApi('auth/login', {
          params: {
            status: 'login',
          },
        });
      } else if (error) {
        dispatch(
          setToast({
            variant: ToastVariant.ERROR,
            message: error.message,
            type: 'error',
            id: toastId,
          })
        );
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  if (!email) return <Loaders />;
  return (
    <div className="form-wrap">
      <div className="form-title-text">
        <h2>{t('VerifyYourEmail')}</h2>
      </div>
      <div className="form-card">
        <p className="twofa-instruction">{t('Enter.6.digit.code')}</p>
        <p className="twofa-email">{email}</p>

        <OTPInput
          otp={otp}
          setOtp={setOtp}
          onSubmit={handleSubmit}
          otpError={otpError}
        />

        <Button
          className="w-full"
          parentClass="mt-5"
          isLoading={isLoading}
          variants="black"
          type="submit"
          value={t('Auth.MFA.VerifyNow')}
          onClickHandler={handleSubmit}
        />
        <div className="resend-code-text">
          {secondsLeft > 0 ? (
            <p>
              {t('Auth.MFA.ResendOTPIn')} <strong>{secondsLeft}s</strong>
            </p>
          ) : (
            <Button onClickHandler={handleResend} className="underline">
              {t('ResendCode')}
            </Button>
          )}
        </div>

        <span className="form-switch-type">
          <Image iconName="arrowRight" iconClassName="rotate-180 w-5 h-5" />
          {t('Auth.MFA.Back')}
          <Link to="/auth/login" className="">
            {t('Auth.MFA.Login')}
          </Link>
        </span>
      </div>
    </div>
  );
}
