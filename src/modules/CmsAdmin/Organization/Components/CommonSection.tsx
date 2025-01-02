import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPut } from 'hooks/useAxios';
import _ from 'lodash';
import { ActionNameEnum, KeysEnum } from 'modules/CmsAdmin/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  BodyDataAccumulator,
  CommonSectionProps,
  FieldsFuncParams,
  ImageProps,
  KeyValueProps,
} from '../types';
import { OrganizationValidationSchema } from '../validationSchema';
import BenefitsForm from './BenefitsForm';
import CollaboratingForm from './CollaboratingForm';
import CtaOneForm from './CtaOneForm';
import CtaTwoForm from './CtaTwoForm';
import ServiceForm from './ServiceForm';
import TestimonialForm from './TestimonialForm';

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
  activeSection,
  isLoading,
  getEditId,
  setAddButtonClick,
}: CommonSectionProps) => {
  const [putApi, { isLoading: isUpdateLoading }] = useAxiosPut();
  const navigate = useNavigate();
  const [isLoadingButton, setIsLoadingButton] = useState(false); // Single loading state
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

  const fieldsFunc = ({ key, item, index, formData }: FieldsFuncParams) => {
    switch (key) {
      case 'point_data_array':
        formData.append(`${key}[title][${index}]`, item.title ?? '');
        // Append fields based on activeSection
        formData.append(`${key}[description][${index}]`, item.description ?? '');
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
        if (
          key === 'collaboration_logos' ||
          key === 'point_data_array' ||
          key === 'multiple_banner_images'
        ) {
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
      if (
        key === 'collaboration_logos' ||
        key === 'point_data_array' ||
        key === 'multiple_banner_images'
      ) {
        values[key]?.forEach((item: ImageProps, index: number) => {
          fieldsFunc({ key, item, index, formData }); // Pass key as an argument
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
      [formLanguage]: values, // Update initial values for the next language
    }));
    const bodyData = {
      ...Object.keys(values).reduce((acc: BodyDataAccumulator, key) => {
        if (
          key === 'collaboration_logos' ||
          key === 'point_data_array' ||
          key === 'multiple_banner_images'
        ) {
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
      if (
        key === 'collaboration_logos' ||
        key === 'point_data_array' ||
        key === 'multiple_banner_images'
      ) {
        // Check if the value is an array before calling forEach
        if (Array.isArray(values[key])) {
          values[key].forEach((item: ImageProps, index: number) => {
            fieldsFunc({ key, item, index, formData }); // Pass key as an argument
          });
        }
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
      initialValues={initialValues?.[formLanguage] ?? {}}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={OrganizationValidationSchema(activeSection)}
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        return (
          <>
            {isLoading ? (
              <Image loaderType="Spin" />
            ) : (
              <Form className="">
                <div className="cms-form-card-wrap">
                  {activeSection === KeysEnum.OrgCollaborating && (
                    <CollaboratingForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.OrgWork && (
                    <ServiceForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.OrgCta1 && (
                    <CtaOneForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.OrgCta2 && (
                    <CtaTwoForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.OrgBenefits && (
                    <BenefitsForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      isLoading={isLoading}
                      getEditId={getEditId}
                      formLanguage={formLanguage}
                      setAddButtonClick={setAddButtonClick}
                    />
                  )}
                  {activeSection === KeysEnum.OrgTestimonials && (
                    <TestimonialForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      isLoading={isLoading}
                      getEditId={getEditId}
                      formLanguage={formLanguage}
                      setAddButtonClick={setAddButtonClick}
                    />
                  )}
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
                        isLoading={isUpdateLoading}
                        disabled={isUpdateLoading}
                      >
                        {t('Auth.RegisterCommon.nextButtonText')}
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                  {activeSection !== KeysEnum.Crew && nextFormLanguage === '' ? (
                    <div className="csm-form-button">
                      <Button
                        variants="black"
                        className="w-fit"
                        type="submit"
                        isLoading={isLoadingButton}
                        onClickHandler={() => {
                          setActionName(ActionNameEnum.SUBMIT);
                        }}
                        disabled={isLoadingButton}
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
