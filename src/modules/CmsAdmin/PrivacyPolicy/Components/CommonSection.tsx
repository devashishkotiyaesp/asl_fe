import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPut } from 'hooks/useAxios';
import _ from 'lodash';
import { ActionNameEnum } from 'modules/CmsAdmin/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  BodyDataAccumulator,
  CommonSectionProps,
  ImageProps,
  InitValuesProps,
} from '../types';
import { PrivacyPolicyValidationSchema } from '../validationSchema';
import EditPrivacyPolicy from './EditPrivacyPolicy';

const CommonSection = ({
  initialValues,
  setInitialValues,
  activeLanguage,
  nextFormLanguage,
  prevFormLanguage,
  formLanguage,
  setFormLanguage,
  setActionName,
  actionName,
  responseData,
  setActiveLanguage,
  allLanguages,
  cmsId,
  isLoading,
}: CommonSectionProps) => {
  const [putApi, { isLoading: isUpdateLoading }] = useAxiosPut();
  const navigate = useNavigate();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { t } = useTranslation();
  const onSubmit = async (values: FormikValues) => {
    switch (actionName) {
      case ActionNameEnum.NEXT:
        await OnNext(values);
        break;
      case ActionNameEnum.PREV:
        await OnPrev(values);
        break;
      case ActionNameEnum.SUBMIT:
        await handleSubmit(values);
        break;
      default:
        break;
    }
  };

  const OnNext = async (values: FormikValues) => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values, // Update initial values for the next language
    }));
    const bodyData = {
      ...Object.keys(values).reduce((acc: BodyDataAccumulator, key) => {
        if (key === 'point_data_array') {
          acc[key] = [];
        } else if (values[key]) {
          if (Array.isArray(values[key])) {
            acc[key] = JSON.stringify(values[key]);
          } else {
            acc[key] = values[key];
          }
        } else {
          acc[key] = '';
        }
        acc[`${key}[id]`] =
          responseData?.find(
            (item) => item.field_name === key && item.language === formLanguage
          )?.id ?? '';
        acc[`${key}[language]`] = formLanguage;
        acc[`${key}[cmsId]`] = cmsId ?? '';
        return acc;
      }, {}),
    };
    const formData = new FormData();
    // Append each field directly to formData
    Object.keys(bodyData).forEach((key) => {
      if (key === 'point_data_array') {
        values[key]?.forEach((item: ImageProps, index: number) => {
          formData.append(`${key}[title][${index}]`, item.title ?? '');
          formData.append(`${key}[description][${index}]`, item.description ?? '');
        });
      } else {
        formData.append(key, bodyData[key] as string);
      }
    });
    await putApi(`${REACT_APP_API_URL}/cms-page-section`, formData);
    setFormLanguage(nextFormLanguage);
    setActiveLanguage(activeLanguage + 1);
  };

  const OnPrev = (values: FormikValues) => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values, // Update initial values for the previous language
    }));
    setFormLanguage(prevFormLanguage);
    setActiveLanguage(activeLanguage - 1);
  };

  const handleSubmit = async (values: FormikValues) => {
    setIsLoadingButton(true);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));
    const bodyData = {
      ...Object.keys(values).reduce((acc: BodyDataAccumulator, key) => {
        if (key === 'point_data_array') {
          acc[key] = [];
        } else if (values[key]) {
          if (Array.isArray(values[key])) {
            acc[key] = JSON.stringify(values[key]);
          } else {
            acc[key] = values[key];
          }
        } else {
          acc[key] = '';
        }
        acc[`${key}[id]`] =
          responseData?.find(
            (item) => item.field_name === key && item.language === formLanguage
          )?.id ?? '';
        acc[`${key}[language]`] = formLanguage;
        acc[`${key}[cmsId]`] = cmsId ?? '';
        return acc;
      }, {}),
    };
    const formData = new FormData();
    // Append each field directly to formData
    Object.keys(bodyData).forEach((key) => {
      if (key === 'point_data_array') {
        values[key]?.forEach((item: ImageProps, index: number) => {
          formData.append(`${key}[title][${index}]`, item.title ?? '');
          formData.append(`${key}[description][${index}]`, item.description ?? '');
        });
      } else {
        formData.append(key, bodyData[key] as string);
      }
    });
    const { error } = await putApi(
      `${REACT_APP_API_URL}/cms-page-section`,
      formData
    );
    if (_.isNil(error)) {
      setIsLoadingButton(false);
      navigate('/page-list');
    }
  };
  return (
    <Formik
      initialValues={
        initialValues?.[formLanguage] ?? {
          title: '',
          description: '',
          summary_keyPoints: '',
          point_data_array: [],
        }
      }
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={PrivacyPolicyValidationSchema({ t })}
    >
      {({ values, setFieldValue }) => {
        return (
          <>
            {isLoading ? (
              <Image loaderType="Spin" />
            ) : (
              <Form className="">
                <div className="cms-form-card-wrap">
                  <EditPrivacyPolicy
                    values={values as unknown as InitValuesProps}
                    setFieldValue={setFieldValue}
                    isLoading={isLoading}
                  />
                </div>
                <div className="btn-wrap">
                  {activeLanguage > 0 && (
                    <div className="csm-form-button">
                      <Button
                        variants="black"
                        className="w-fit"
                        type="submit"
                        onClickHandler={() => {
                          setActionName(ActionNameEnum.PREV);
                        }}
                        disabled={isLoadingButton}
                      >
                        {t('Auth.RegisterCommon.prevButtonText')}
                      </Button>
                    </div>
                  )}
                  {activeLanguage < (allLanguages ?? []).length - 1 ? (
                    <div className="csm-form-button btn-wrap">
                      <Button
                        className="min-w-[90px]"
                        variants="black"
                        onClickHandler={() => {
                          navigate(-1);
                        }}
                        disabled={isUpdateLoading}
                      >
                        {t('Dictionary.EditForm.CancelButton')}
                      </Button>
                      <Button
                        variants="black"
                        className="w-fit"
                        type="submit"
                        onClickHandler={() => {
                          setActionName(ActionNameEnum.NEXT);
                        }}
                        disabled={isUpdateLoading}
                        isLoading={isUpdateLoading}
                      >
                        {t('Auth.RegisterCommon.nextButtonText')}
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                  {nextFormLanguage === '' ? (
                    <div className="csm-form-button">
                      <Button
                        variants="black"
                        className="w-fit"
                        type="submit"
                        onClickHandler={() => {
                          setActionName(ActionNameEnum.SUBMIT);
                        }}
                        disabled={isLoading}
                        isLoading={isLoadingButton}
                      >
                        {t('Auth.RegisterCommon.submitButtonText')}
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Form>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default CommonSection;
