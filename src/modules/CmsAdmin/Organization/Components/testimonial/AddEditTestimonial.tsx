import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPost, useAxiosPut } from 'hooks/useAxios';
import { ActionNameEnum, KeysEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JourneyTableProps, KeyValueProps, LangueKeyValueProps } from '../../types';
import { TestimonialValidation } from '../../validationSchema';

const AddEditTestimonial = (props: JourneyTableProps) => {
  const {
    activeLanguage,
    setActiveLanguage,
    allLanguages,
    nextFormLanguage,
    prevFormLanguage,
    formLanguage,
    setFormLanguage,
    cmsId,
    editId,
  } = props;
  const [initialValues, setInitialValues] = useState<LangueKeyValueProps>();
  const [isUpdateButton, setIsUpdateButton] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [getApi, { isLoading: isFetchLoading }] = useAxiosGet();
  const [putApi, { isLoading: isUpdateLoading }] = useAxiosPut();
  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);
  const editResponseGet = async () => {
    const response = await getApi(
      `/cms-page-section/${KeysEnum.OrgTestimonials}/${editId}`
    );
    const initialValues: LangueKeyValueProps = {};
    response.data[KeysEnum.OrgTestimonials]?.forEach(
      ({
        language,
        field_name,
        field_value,
        id,
        slug,
      }: {
        language: string;
        field_name: string;
        field_value: string;
        id: string;
        slug: string;
      }) => {
        if (!initialValues[language]) {
          initialValues[language] = { id, slug };
        }

        // Parse the field_value if it's a valid JSON string
        if (typeof field_value === 'string') {
          try {
            const parsedValue = JSON.parse(field_value);

            // Flatten the parsed value directly into initialValues
            initialValues[language] = {
              ...initialValues[language],
              ...parsedValue,
            };
          } catch {
            // If JSON parsing fails, assign the original field_value as needed
            initialValues[language][field_name] = field_value;
          }
        } else {
          // Directly assign field_value if it's not a string
          initialValues[language][field_name] = field_value;
        }
      }
    );

    setInitialValues(initialValues);
  };

  const onUpdate = async (values: FormikValues) => {
    setIsUpdateButton(true);
    await UpdateCrew(values);
    setIsUpdateButton(false);
  };

  useEffect(() => {
    if (editId) {
      editResponseGet();
    }
  }, [editId]);
  const [createApi] = useAxiosPost();
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
        case ActionNameEnum.UPDATE:
          onUpdate(values);
          break;
        default:
          break;
      }
    }
  };

  const UpdateCrew = async (values: FormikValues) => {
    const formData = new FormData();
    const fieldValue = {} as KeyValueProps;
    const appendField = (key: string, value: string | File) => {
      if (key === 'id') return; // Skip appending the id field

      if (value instanceof File && value.size > 0) {
        formData.append(key, value);
      } else {
        fieldValue[key] = value as string;
      }
    };

    Object.keys(values).forEach((key) => {
      const value = values[key];
      appendField(key, value);
    });
    formData.append('field_value', JSON.stringify(fieldValue));
    formData.append('id', values.id ?? editId);
    await putApi(`/cms-page-section/${KeysEnum.OrgBenefits}/`, formData);
  };
  const OnNext = async (values: FormikValues) => {
    // Set loading state to true
    setIsLoadingButton(true);
    try {
      // Handle editing if editId exists
      if (editId) {
        await UpdateCrew(values); // Wait for the async function to complete
      } else {
        // Handle creating a new benefit
        const formData = new FormData();
        const fieldValue = {} as KeyValueProps;
        Object.keys(values).forEach((key) => {
          const value = values[key];
          const fieldType = value instanceof File ? 'media' : 'text';
          if (fieldType === 'media' && value.size > 0) {
            formData.append(key, value);
            fieldValue[key] = value;
          } else {
            fieldValue[key] = value;
          }
        });
        formData.append('field_value', JSON.stringify(fieldValue));
        formData.append('field_name', 'testimonial_add');
        formData.append('language', formLanguage);
        formData.append('cms_page_id', cmsId as string);
        formData.append('section_name', KeysEnum.OrgTestimonials);
        formData.append('field_type', 'text');

        const response = await createApi(`/cms-page-section`, formData);
        // Update initialValues with the new data
        setInitialValues((prevValues) => ({
          ...prevValues,
          [formLanguage]: {
            ...values,
            id: response.data[activeLanguage + 1].id,
            slug: response.data[activeLanguage + 1].slug,
          },
        }));
      }
      // Move to the next language form
      setFormLanguage(nextFormLanguage);
      setActiveLanguage(activeLanguage + 1);
    } catch {
      // You can show a generic error message to the user, if needed
    } finally {
      // Set loading state to false when done
      setIsLoadingButton(false);
    }
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
    const newValues = { ...values, id: initialValues?.[prevFormLanguage]?.id };
    if (editId) {
      UpdateCrew(values);
    } else {
      UpdateCrew(newValues);
      setInitialValues((prevValues) => ({
        ...prevValues,
        [formLanguage]: values, // Update initial values for the next language
      }));
    }
  };

  return (
    <Formik
      initialValues={
        initialValues?.[formLanguage] ?? {
          banner_image: '',
          title: '',
          description: '',
          city: '',
          company_name: '',
        }
      }
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={TestimonialValidation()}
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="">
            <div className="cms-form-card-wrap">
              <div className="left-small-column" />
              <div className="right-big-column">
                <InputField
                  name="title"
                  label={t('Cms.homepage.story.whyChooseTitle')}
                  placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
                <ReactEditor
                  label={t('Cms.Organization.Testimonial.descLabel')}
                  parentClass="h-unset"
                  name="description"
                  placeholder={t(
                    'Cms.homepage.services.serviceDescriptionPlaceholder'
                  )}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  value={values?.description as string}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
                <InputField
                  name="company_name"
                  label={t('Cms.Organization.Testimonial.companyName')}
                  placeholder={t('Cms.Organization.Testimonial.companyPlaceholder')}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
                <InputField
                  name="city"
                  label={t('Cms.Organization.Testimonial.cityName')}
                  placeholder={t('Cms.Organization.Testimonial.cityPlaceholder')}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
                <DropZone
                  className="xl:max-w-[330px]"
                  // label={t('Cms.homepage.cta.imageTitle')}
                  name="banner_image"
                  SubTitle={t('Cms.homepage.footer.logoTitle')}
                  setValue={setFieldValue}
                  value={values?.banner_image ?? ''}
                  acceptTypes={'image/*'}
                  fileType={[EnumFileType.Image]}
                  isCompulsory
                  dropdownInnerClass="two-clm"
                  isLoading={isFetchLoading}
                />
              </div>
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
                    disabled={isUpdateLoading}
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
                    isLoading={isLoadingButton}
                    disabled={isUpdateButton}
                  >
                    {t('Auth.RegisterCommon.nextButtonText')}
                  </Button>
                </div>
              ) : (
                ''
              )}
              {editId && activeLanguage < (allLanguages ?? []).length - 1 ? (
                <div className="csm-form-button">
                  <Button
                    variants="black"
                    className="w-fit"
                    type="submit"
                    onClickHandler={() => {
                      setActionName(ActionNameEnum.UPDATE);
                    }}
                    isLoading={isUpdateButton}
                    disabled={isLoadingButton}
                  >
                    {t('Settings.update')}
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
                    isLoading={isUpdateLoading}
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

export default AddEditTestimonial;
