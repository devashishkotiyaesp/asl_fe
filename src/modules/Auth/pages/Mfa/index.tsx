import { AuthError, Session } from '@supabase/supabase-js';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { OTPInput } from 'components/OtpInput';
import { REACT_APP_NODE_ENV } from 'config';
import {
  LanguagesEnum,
  ProvidersEnum,
  ToastVarient,
} from 'constants/common.constant';
import { PrivateNavigation, PublicNavigation } from 'constants/navigation.constant';
import { useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setToast } from 'reduxStore/slices/toastSlice';
import { setToken } from 'reduxStore/slices/tokenSlice';
import supabase from 'supabase';

export default function Mfa() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [callApi] = useAxiosPost();
  const [showQR, setShowQR] = useState<boolean>(false);
  const [qrCode, setQRCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [factorId, setFactorId] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const isReset = queryParams.get('is_reset')?.toLowerCase() === 'true';
  const [userSession, setUserSession] = useState<
    | {
        data: {
          session: Session;
        };
        error: null;
      }
    | {
        data: {
          session: null;
        };
        error: AuthError;
      }
    | {
        data: {
          session: null;
        };
        error: null;
      }
  >();
  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setOtpError(t('Auth.OtpScreen.otpError'));
      return;
    }
    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.data) {
      if (REACT_APP_NODE_ENV === 'development' && !qrCode) {
        const { data } = await supabase.auth.getSession();
        if (data) {
          const toastId = new Date().getTime();
          dispatch(
            setToken({
              token: data.session?.access_token,
            })
          );
          dispatch(
            setToast({
              variant: ToastVarient.SUCCESS,
              message: t('Auth.MFA.Success'),
              type: 'success',
              id: toastId,
            })
          );
          if (isReset) {
            navigate(PublicNavigation.resetPassword);
          } else {
            navigate(PrivateNavigation.dashboard.view.path);
          }
        }
      } else {
        const { data, error } = await supabase.auth.mfa.verify({
          factorId,
          challengeId: challenge.data?.id,
          code: otp,
        });
        const toastId = new Date().getTime();
        if (data) {
          if (qrCode) {
            await callApi('/auth/enroll-mfa', {
              email: userSession?.data.session?.user.email,
              factorId,
              secret,
            });
          }
          dispatch(
            setToken({
              token: data.access_token,
            })
          );
          dispatch(
            setToast({
              variant: ToastVarient.SUCCESS,
              message: t('Auth.MFA.Success'),
              type: 'success',
              id: toastId,
            })
          );
          if (isReset) {
            navigate(PublicNavigation.resetPassword);
          } else {
            navigate(PrivateNavigation.dashboard.view.path);
          }
        } else {
          dispatch(
            setToast({
              variant: ToastVarient.WARNING,
              message: error?.message ?? t('Comman.ToastMessage.Success.Error'),
              type: 'error',
              id: toastId,
            })
          );
        }
      }
    }
  };
  useEffect(() => {
    const getData = async () => {
      const userDetails = await supabase.auth.getSession();
      setUserSession(userDetails);
      if (
        userDetails.data.session?.user.app_metadata.provider !== ProvidersEnum.EMAIL
      ) {
        // REVIEW: not sure about the name logic
        const registerData = {
          first_name:
            userDetails.data?.session?.user.identities?.[0].identity_data?.name?.split(
              ' '
            )[0],
          last_name:
            userDetails.data?.session?.user.identities?.[0].identity_data?.name?.split(
              ' '
            )[1],
          email: userDetails.data.session?.user.email,
          sub: userDetails.data.session?.user.id,
          provider_type: userDetails.data.session?.user.app_metadata
            .provider as ProvidersEnum,
          language: LanguagesEnum.ENGLISH,
        };
        await callApi('/auth/register', registerData).catch();
      }
      const res = await callApi('/auth/login', {
        email: userDetails.data.session?.user.email,
      });
      if (!res.data.factorId) {
        setShowQR(true);
        const { data } = await supabase.auth.mfa.enroll({
          factorType: 'totp',
        });
        if (data?.type === 'totp') {
          setFactorId(data.id);
          setSecret(data.totp?.secret);
          setQRCode(data.totp?.qr_code);
        }
      } else {
        setFactorId(res.data.factorId);
      }
    };

    getData();
  }, []);

  // TODO: Page protection
  return (
    <>
      <div className="form-wrap">
        <div className="form-title-text">
          <h2>
            {t('Auth.MFA.Title.1')}
            <span>{t('Auth.MFA.Title.2')}</span>
          </h2>

          <p> {t('Auth.MFA.Title.Tag')}</p>
        </div>
        <div className="form-card">
          {showQR && (
            <>
              <div className="form-qr-wrap">
                <img src={qrCode} alt="QR Code" className="max-w-full h-auto mb-4" />
              </div>
              <span>{secret}</span>
            </>
          )}
          <div className="" />

          <div className="form-qr-step ">
            <div className="form-qr-step__item ">
              <span className="form-qr-step__item-count ">1</span>
              <span className="form-qr-step__item-text ">
                {t('Auth.MFA.Step.1')}
              </span>
            </div>
            <div className="form-qr-step__item">
              <span className="form-qr-step__item-count">2</span>
              <span className="form-qr-step__item-text">{t('Auth.MFA.Step.2')}</span>
            </div>
          </div>
          <OTPInput
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleSubmit}
            otpError={otpError}
          />

          <Button
            parentClass="mt-5"
            // isLoading
            variants="black"
            type="submit"
            value={t('Auth.MFA.VerifyNow')}
            onClickHandler={handleSubmit}
            // onClickHandler={Two_FA?.openModal}
          />
          <span className="form-switch-type">
            <Image iconName="arrowRight" iconClassName="rotate-180 w-5 h-5" />
            {t('Auth.MFA.Back')}
            <Link
              to="/auth/login"
              className="font-medium text-black hover:underline underline-offset-2"
            >
              {t('Auth.MFA.Login')}
            </Link>
          </span>
        </div>
      </div>
      {/* <div className="form-wrap">
        <div className="form-title-text">
          <h2 className="">
            Type a 2FA code for <span>The ASL Shop</span>
          </h2>
          <p>Verification Code</p>
        </div>
        <div className="form-card">
          {showQR && (
            <>
              <div className="flex justify-center">
                <img src={qrCode} alt="QR Code" className="max-w-full h-auto mb-4" />
              </div>
              <span>{secret}</span>
            </>
          )}
          <div className="flex flex-col gap-4">
            <OTPInput otp={otp} setOtp={setOtp} onSubmit={handleSubmit} />
            <Button variants="black" onClickHandler={handleSubmit} className="">
              Submit
            </Button>

            <div className="form-forgot-text !justify-center">
              <Link to={PublicNavigation.login} className="flex items-center gap-4">
                <Image iconName="arrowRight" iconClassName="rotate-180" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <span>Verification Code</span>
          {showQR && (
            <>
              <div className="flex justify-center">
                <img src={qrCode} alt="QR Code" className="max-w-full h-auto mb-4" />
              </div>
              <span>{secret}</span>
            </>
          )}
          <div className="flex flex-col gap-4">
            <OTPInput otp={otp} setOtp={setOtp} onSubmit={handleSubmit} />
            <button
              onClick={handleSubmit}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}
