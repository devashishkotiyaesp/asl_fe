import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPut } from 'hooks/useAxios';
import _ from 'lodash';
import { ActionNameEnum, KeysEnum } from 'modules/CmsAdmin/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BodyDataAccumulator,
  CommonSectionProps,
  FieldsFuncParams,
  ImageProps,
  KeyValueProps,
} from '../types';
import { HomeValidationSchema } from '../validationSchema';
import AboutUser from './AboutUser';
import Crew from './Crew';
import CtaForm from './CtaForm';
import Journey from './Journery';
import LocalStoriesForm from './LocalStoriesForm';
import StoryForm from './StoryForm';
import VisionForm from './VisionForm';

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
  setShowAddEditCrew,
  handleAddEditJourneyClick,
}: CommonSectionProps) => {
  const [putApi, { isLoading: isUpdateLoading }] = useAxiosPut();
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
      case 'collaboration_logos':
        formData.append(`collaboration_logos[${index}]`, item as string | Blob); // Assuming item is a string
        break;
      case 'multiple_banner_images':
        formData.append(`multiple_banner_images[${index}]`, item as string | Blob); // Assuming item is a string
        break;

      case 'point_data_array':
        formData.append(`${key}[title][${index}]`, item.title ?? '');
        // Append fields based on activeSection
        if (
          activeSection === KeysEnum.AslCourses ||
          activeSection === KeysEnum.Services ||
          activeSection === KeysEnum.Testimonials
        ) {
          formData.append(`${key}[description][${index}]`, item.description ?? '');
          formData.append(`${key}[button_text][${index}]`, item.button_text ?? '');
          formData.append(`${key}[button_url][${index}]`, item.button_url ?? '');
        }
        if (
          activeSection === KeysEnum.UserInsight ||
          activeSection === KeysEnum.AslCourses ||
          activeSection === KeysEnum.Testimonials
        ) {
          formData.append(`${key}[description][${index}]`, item.description ?? '');
          formData.append(`${key}[banner_image][${index}]`, item.banner_image ?? '');
        }
        if (activeSection === KeysEnum.Testimonials) {
          formData.append(`${key}[description][${index}]`, item.description ?? '');
          formData.append(`${key}[username][${index}]`, item.username ?? '');
          formData.append(`${key}[role][${index}]`, item.role ?? '');
        }
        if (activeSection === KeysEnum.LocalStories) {
          formData.append(`${key}[story_link][${index}]`, item.story_link ?? '');
          formData.append(`${key}[date][${index}]`, item.date ?? '');
          formData.append(`${key}[banner_image][${index}]`, item.banner_image ?? '');
        }
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
    setFormLanguage(nextFormLanguage);
    setActiveLanguage(activeLanguage + 1);
    await putApi(`${REACT_APP_API_URL}/cms-page-section`, formData);
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
    }
  };

  return (
    <Formik
      initialValues={initialValues?.[formLanguage] ?? {}}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={HomeValidationSchema(activeSection)}
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        return (
          <>
            {isLoading ? (
              <Image loaderType="Spin" />
            ) : (
              <Form className="">
                <div className="cms-form-card-wrap">
                  {activeSection === KeysEnum.AboutStory && (
                    <StoryForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.Vision && (
                    <VisionForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.AboutUsers && (
                    <AboutUser
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.LocalStories && (
                    <LocalStoriesForm
                      values={values as KeyValueProps}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isLoading={isLoading}
                    />
                  )}
                  {activeSection === KeysEnum.Journey && (
                    <Journey
                      handleAddEditJourneyClick={handleAddEditJourneyClick}
                      getEditId={getEditId}
                      formLanguage={formLanguage}
                    />
                  )}
                  {activeSection === KeysEnum.aboutCta && <CtaForm />}
                  {activeSection === KeysEnum.Crew && (
                    <Crew
                      setShowAddEditCrew={setShowAddEditCrew}
                      getEditId={getEditId}
                      formLanguage={formLanguage}
                    />
                  )}
                </div>
                <div>
                  {activeLanguage > 0 && (
                    <div className="csm-form-button">
                      <Button
                        variants="black"
                        className="w-fit"
                        type="submit"
                        onClickHandler={() => {
                          setActionName(ActionNameEnum.PREV);
                        }}
                      >
                        {t('Auth.RegisterCommon.prevButtonText')}
                      </Button>
                    </div>
                  )}
                  {activeLanguage < (allLanguages ?? []).length - 1 ? (
                    <div className="csm-form-button">
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
