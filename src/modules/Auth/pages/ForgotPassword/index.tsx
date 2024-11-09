import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import { REACT_APP_FRONTEND_URL } from 'config';
import { ToastVarient } from 'constants/common.constant';
import { PublicNavigation } from 'constants/navigation.constant';
import { Form, Formik, FormikValues } from 'formik';
import { ForgotPasswordValidationSchema } from 'modules/Auth/validationSchema';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToast } from 'reduxStore/slices/toastSlice';
import supabase from 'supabase';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const forgotPasswordInitialValue = { email: '' };

  const OnSubmit = async (userData: FormikValues) => {
    if (userData) {
      const response = await supabase.auth.resetPasswordForEmail(userData.email, {
        redirectTo: `${REACT_APP_FRONTEND_URL}${PublicNavigation.mfa}?is_reset=true`,
      });
      if (response.data) {
        const toastId = new Date().getTime();
        dispatch(
          setToast({
            variant: ToastVarient.SUCCESS,
            message: t('Auth.ResetPassword.ResetLink.Sent'),
            type: 'success',
            id: toastId,
          })
        );
        navigate(PublicNavigation.login);
      }
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-title-text">
        <h2 className="">
          {t('Auth.ForgotPassword.forgotPasswordTitle')}
          {/* <span className="text-PrimaryWood">The ASL Shop</span> */}
        </h2>
        <p>{t('Auth.ForgotPassword.description')}</p>
      </div>
      <div className="form-card">
        <Formik
          initialValues={forgotPasswordInitialValue}
          validationSchema={ForgotPasswordValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          <Form>
            <InputField
              name="email"
              label={t('Auth.Login.Label.Email')}
              placeholder={t('Auth.Login.Placeholder.Email')}
              type="text"
              parentClass="mb-5"
            />
            <Button
              variants="black"
              type="submit"
              value={t('Auth.ForgotPassword.Button.Submit')}
            />
            <div className="form-forgot-text !justify-center">
              <Link to={PublicNavigation.login} className="flex items-center gap-4">
                <Image iconName="arrowRight" iconClassName="rotate-180" />
                {t('Auth.ForgotPassword.BackLogin')}
              </Link>
            </div>
            {/* <span className="mt-10 text-base font-light text-PrimaryWood transition-all duration-300 text-center flex items-center justify-center gap-2">
              <Image iconName="arrowRight" iconClassName="rotate-180 w-5 h-5" />
              Back to
              <Link
                to="/auth/login"
                className="font-medium text-black hover:underline underline-offset-2"
              >
                Login
              </Link>
            </span> */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
