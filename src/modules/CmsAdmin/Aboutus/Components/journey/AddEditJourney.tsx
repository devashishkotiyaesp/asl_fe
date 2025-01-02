import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPost, useAxiosPut } from 'hooks/useAxios';
import { ActionNameEnum, KeysEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JourneyTableProps, KeyValueProps, LangueKeyValueProps } from '../../types';
import { JourneyValidation } from '../../validationSchema';

const AddEditJourney = (props: JourneyTableProps) => {
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
  const [getApi, { isLoading: isFetchLoading }] = useAxiosGet();
  const [putApi, { isLoading: isUpdateLoading }] = useAxiosPut();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isUpdateButton, setIsUpdateButton] = useState(false);
  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);
  const currentYear = new Date().getFullYear(); // Get current year
  const yearsList = Array.from({ length: 11 }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
  });
  const editResponseGet = async () => {
    const response = await getApi(`/cms-page-section/${KeysEnum.Journey}/${editId}`);
    const initialValues: LangueKeyValueProps = {};
    response.data[KeysEnum.Journey]?.forEach(
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

  const onUpdate = async (values: FormikValues) => {
    setIsUpdateButton(true);
    await UpdateCrew(values);
    setIsUpdateButton(false);
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
    await putApi(`/cms-page-section/${KeysEnum.Journey}/`, formData);
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
        formData.append('field_name', 'journey_years');
        formData.append('language', formLanguage);
        formData.append('cms_page_id', cmsId as string);
        formData.append('section_name', KeysEnum.Journey);
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
          banner_title: '',
          description: '',
          year: '',
        }
      }
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={JourneyValidation()}
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="">
            <div className="cms-form-card-wrap">
              <div className="left-small-column" />
              <div className="right-big-column">
                <DropZone
                  dropdownInnerClass="two-clm"
                  // className="xl:max-w-[330px]"
                  label={t('Community.UploadImage.Label')}
                  name="banner_image"
                  SubTitle={t('Community.UploadImage.Label')}
                  setValue={setFieldValue}
                  value={values?.banner_image ?? ''}
                  acceptTypes={'image/*'}
                  fileType={[EnumFileType.Image]}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
                <InputField
                  name="banner_title"
                  label={t('Cms.homepage.story.whyChooseTitle')}
                  placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
                <ReactEditor
                  label={t('Cms.homepage.banner.description')}
                  parentClass="h-unset"
                  name="description"
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  value={values?.description as string}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
                <ReactSelect
                  parentClass="w-full"
                  className="w-full [&>*]:w-full"
                  name="year"
                  options={yearsList}
                  label={t('Cms.aboutUs.journey.yearLabel')}
                  placeholder={t('Cms.aboutUs.journey.yearPlaceholder')}
                  isCompulsory
                  isLoading={isFetchLoading}
                />
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
                        disabled={isUpdateLoading}
                      >
                        {t('Auth.RegisterCommon.submitButtonText')}
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEditJourney;
