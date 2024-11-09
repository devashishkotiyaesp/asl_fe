import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPut } from 'hooks/useAxios';
import { ActionNameEnum, KeysEnum } from 'modules/CmsAdmin/constants';
import { useTranslation } from 'react-i18next';
import { BodyDataAccumulator, CommonSectionProps, FieldsFuncParams } from '../types';
import { HomeValidationSchema } from '../validationSchema';

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
  BannerFormWithDynamicProps,
  cmsId,
  activeSection,
  isLoading,
}: CommonSectionProps) => {
  const [putApi] = useAxiosPut();
  const { t } = useTranslation();
  const onSubmit = (values: FormikValues) => {
    if (values) {
      switch (actionName) {
        case ActionNameEnum.NEXT:
          OnNext(values);
          break;
        case ActionNameEnum.PREV:
          OnPrev(values);
          break;
        case ActionNameEnum.SUBMIT:
          handleSubmit(values);
          break;
        default:
          break;
      }
    }
  };

  const fieldsFunc = ({ key, item, index, formData }: FieldsFuncParams) => {
    switch (key) {
      case 'collaboration_logos':
        formData.append(`collaboration_logos[${index}]`, item as string | Blob); // Assuming item is a string
        break;
      case 'point_data_array':
        formData.append(`${key}[title][${index}]`, item.title ?? '');
        formData.append(`${key}[description][${index}]`, item.description ?? '');
        // Append fields based on activeSection
        if (
          activeSection === KeysEnum.AslCourses ||
          activeSection === KeysEnum.Services ||
          activeSection === KeysEnum.Testimonials
        ) {
          formData.append(`${key}[button_text][${index}]`, item.button_text ?? '');
          formData.append(`${key}[button_url][${index}]`, item.button_url ?? '');
        }
        if (
          activeSection === KeysEnum.UserInsight ||
          activeSection === KeysEnum.AslCourses ||
          activeSection === KeysEnum.Testimonials
        ) {
          formData.append(`${key}[banner_image][${index}]`, item.banner_image ?? '');
        }
        if (activeSection === KeysEnum.Testimonials) {
          formData.append(`${key}[username][${index}]`, item.username ?? '');
          formData.append(`${key}[role][${index}]`, item.role ?? '');
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
        if (key === 'collaboration_logos' || key === 'point_data_array') {
          acc[key] = [];
        } else {
          acc[key] = values[key]
            ? Array.isArray(values[key])
              ? JSON.stringify(values[key])
              : values[key]
            : '';
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
      if (key === 'collaboration_logos' || key === 'point_data_array') {
        values[key]?.forEach((item: any, index: number) => {
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
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values, // Update initial values for the next language
    }));
    const bodyData = {
      ...Object.keys(values).reduce((acc: BodyDataAccumulator, key) => {
        if (key === 'collaboration_logos' || key === 'point_data_array') {
          acc[key] = [];
        } else {
          acc[key] = values[key]
            ? Array.isArray(values[key])
              ? JSON.stringify(values[key])
              : values[key]
            : '';
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
      if (key === 'collaboration_logos' || key === 'point_data_array') {
        values[key]?.forEach((item: any, index: number) => {
          fieldsFunc({ key, item, index, formData }); // Pass key as an argument
        });
      } else {
        formData.append(key, bodyData[key] as string);
      }
    });
    await putApi(`${REACT_APP_API_URL}/cms-page-section`, formData);
  };
  return (
    <Formik
      initialValues={initialValues?.[formLanguage] ?? {}}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={HomeValidationSchema(activeSection)}
    >
      {({ values, setFieldValue }) => {
        return isLoading ? (
          <Image loaderType="Spin" />
        ) : (
          <Form className="">
            <div className="cms-form-card-wrap">
              <BannerFormWithDynamicProps
                values={values}
                setFieldValue={setFieldValue}
              />
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
                  >
                    {t('Auth.RegisterCommon.submitButtonText')}
                  </Button>
                </div>
              ) : (
                ''
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CommonSection;
