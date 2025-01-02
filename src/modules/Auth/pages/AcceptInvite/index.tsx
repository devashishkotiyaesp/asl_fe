import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Icon from 'components/Icon';
import { PublicNavigation } from 'constants/navigation.constant';
import { Form, Formik } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { SetupProfileValidationSchema } from 'modules/Auth/validationSchema';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import supabase from 'supabase';

import '../style/index.css';

const AcceptInvite = () => {
  const [user, setUser] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [callApi, { isLoading }] = useAxiosPost();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    password: '',
    confirm_password: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await callApi(
      'users/accept-invite',
      {
        access_token: user.access_token,
        password: values.password,
      },
      {
        headers: {
          Authorization: user.access_token,
        },
      }
    );
    navigate(PublicNavigation.login);
  };

  const getUserSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setUser({
        email: session.user.email,
        access_token: session.access_token,
        ...session.user.user_metadata,
      });
    }
  };
  useEffect(() => {
    getUserSession();
  }, []);
  return (
    <div className="site-content  bg-LightGray auth-layout">
      <div className="form-wrap">
        <div className="form-title-text">
          <h2 className="">
            {t('Auth.AcceptInvite.Title1')}&nbsp;
            <span className="text-gray-500">{t('Auth.AcceptInvite.Title2')}</span>
          </h2>
          <p className="text-gray-600 mt-2">{t('Auth.AcceptInvite.Description')}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="">
            <Formik
              initialValues={initialValues}
              validationSchema={SetupProfileValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, handleChange }) => (
                <Form className="form-card">
                  <p className="twofa-email !mb-2">{user?.email}</p>
                  {user?.organizations?.length > 0 && (
                    <>
                      <p className="twofa-instruction !mb-3">
                        {t('Auth.AcceptInvite.Label.Organization')}
                      </p>
                      <div className="twofa-org-tag-wrap">
                        {user.organizations.map(
                          (organization: { full_name: string }) => (
                            <span
                              key={organization.full_name}
                              className="twofa-org-tag"
                            >
                              {organization.full_name}
                            </span>
                          )
                        )}
                      </div>
                    </>
                  )}

                  <InputField
                    parentClass="mb-5"
                    name="password"
                    label={t('Auth.AcceptInvite.Label.Password')}
                    placeholder={t('Auth.AcceptInvite.Placeholder.Password')}
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
                    onChange={handleChange}
                  />

                  <InputField
                    parentClass="mb-5"
                    name="confirm_password"
                    label={t('Auth.AcceptInvite.Label.ConfirmPassword')}
                    placeholder={t('Auth.AcceptInvite.Placeholder.ConfirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.confirm_password}
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
                    onChange={handleChange}
                  />

                  <div className="flex items-center justify-between mt-6">
                    <Button
                      type="submit"
                      className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {t('Auth.AcceptInvite.Button.SetupNow')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptInvite;
