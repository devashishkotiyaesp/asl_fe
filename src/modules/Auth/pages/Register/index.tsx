import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import Icon from 'components/Icon';
import { ProvidersEnum } from 'constants/common.constant';
import { PublicNavigation } from 'constants/navigation.constant';
import { Form, Formik } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { RegisterValidationSchema } from 'modules/Auth/validationSchema';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToast } from 'reduxStore/slices/toastSlice';
import supabase from 'supabase';
import '../style/index.css';

import Loaders from 'components/Loaders';
import {
  RegisterFormField,
  RegisterFormValues,
  SignUpResponse,
} from './types/register.type';

const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [callApi, { isLoading }] = useAxiosPost();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const registerInitialValue: RegisterFormValues = {
    email: '',
    password: '',
    profile_image: undefined,
    first_name: '',
    last_name: '',
    language: 'english',
  };

  const OnSubmit = async (userData: RegisterFormValues) => {
    setLoading(true);
    const { data, error }: { data: SignUpResponse | null; error: Error | null } =
      await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

    if (error) {
      const toastId = new Date().getTime();
      dispatch(
        setToast({
          variant: 'Warning',
          message: error?.message ?? 'Something went wrong',
          type: 'error',
          id: toastId,
        })
      );
      setLoading(false);
      return; // Prevent further execution if there's an error
    }
    const formData = new FormData();

    const fieldsToAppend: RegisterFormField[] = [
      { key: 'profile_image', value: userData.profile_image },
      { key: 'first_name', value: userData.first_name },
      { key: 'last_name', value: userData.last_name },
      { key: 'email', value: userData.email },
      { key: 'sub', value: data.user?.id },
      { key: 'provider_type', value: ProvidersEnum.EMAIL },
      { key: 'language', value: userData.language },
    ];

    fieldsToAppend.forEach(({ key, value }) => {
      if (key === 'profile_image' && value) {
        formData.append(key, value);
      } else if (key !== 'profile_image' && value !== undefined) {
        formData.append(key, value);
      }
    });

    const res = await callApi('/auth/register', formData);
    if (res.data) {
      setLoading(false);
      navigate(PublicNavigation.login);
    } else {
      setLoading(false);
      const toastId = new Date().getTime();
      dispatch(
        setToast({
          variant: 'Warning',
          message: res.error?.message ?? 'Something went wrong',
          type: 'error',
          id: toastId,
        })
      );
    }
  };

  return (
    <>
      <div className="form-wrap">
        {loading ? (
          <Loaders />
        ) : (
          <div>
            <div className="form-title-text">
              <h2>
                {t('Auth.Register.Title.1')}
                <span> {t('Auth.Register.Title.2')}</span>
              </h2>
              <p>{t('Auth.Register.SubTitle')}</p>
            </div>
            <div className="form-card">
              <Formik
                initialValues={registerInitialValue}
                validationSchema={RegisterValidationSchema()}
                onSubmit={(values) => OnSubmit(values)}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="flex mx-auto my-5">
                      <DropZone
                        name="profile_image"
                        value={values.profile_image as File}
                        setValue={setFieldValue}
                        SubTitle={t('Auth.Register.Label.UploadPhoto')}
                      />
                    </div>
                    <InputField
                      parentClass="mb-5"
                      name="first_name"
                      label={t('Auth.Register.Label.FirstName')}
                      placeholder={t('Auth.Register.Placeholder.FirstName')}
                      type="text"
                      value={values.first_name}
                    />
                    <InputField
                      parentClass="mb-5"
                      name="last_name"
                      label={t('Auth.Register.Label.LastName')}
                      placeholder={t('Auth.Register.Placeholder.LastName')}
                      type="text"
                      value={values.last_name}
                    />
                    <InputField
                      parentClass="mb-5"
                      name="email"
                      label={t('Auth.Register.Label.Email')}
                      placeholder={t('Auth.Register.Placeholder.Email')}
                      type="text"
                      value={values.email}
                    />
                    <InputField
                      parentClass="mb-5"
                      name="password"
                      label={t('Auth.Register.Label.Password')}
                      placeholder={t('Auth.Register.Placeholder.Password')}
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
                    <ReactSelect
                      label={t('Auth.Register.Label.LanguagePreference')}
                      name="language"
                      selectedValue={values.language}
                      options={[
                        { value: 'english', label: 'English' },
                        { value: 'spanish', label: 'Spanish' },
                      ]}
                      onChange={(option) =>
                        setFieldValue(
                          'language',
                          (option as { value: string }).value
                        )
                      }
                      parentClass="mb-5 w-full"
                    />
                    <Button
                      isLoading={isLoading}
                      variants="black"
                      type="submit"
                      value={t('Auth.Register.Button.Signup')}
                      className="cursor-pointer"
                    />
                    {/* <div className="form-forgot-text flex-col items-center">
                      <span>{t('Auth.Register.AskExists.Option')}</span>
                      <div className="flex gap-2 justify-center">
                        <span>G</span>
                        <span>M</span>
                        <span>A</span>
                      </div>
                    </div> */}
                    <span className="form-switch-type">
                      {t(`Auth.Register.AskExists`)}
                      <Link to={PublicNavigation.login}>
                        {t('Auth.Register.AskExists.SignIn')}
                      </Link>
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
