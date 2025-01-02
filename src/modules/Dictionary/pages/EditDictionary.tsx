// ** Components **
import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';

// ** Constants **
import { LanguagesEnum, ToastVariant } from 'constants/common.constant';
import { AdminNavigation } from 'constants/navigation.constant';
import { ActionNameEnum, KeysEnum } from 'modules/CmsAdmin/constants';
import { FileAcceptType } from 'modules/Dictionary/constant';

// ** Date Functions **
import { isValid } from 'date-fns';

// ** Formik **
import { Form, Formik } from 'formik';

// ** Hooks **
import { useAxiosGet, useAxiosPut } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// ** Types **
import { LangueKeyValueProps } from 'modules/CmsAdmin/Aboutus/types';
import { DictionarySubmitDataType } from 'modules/Dictionary/types';

// ** Helper Functions **
import { scrollFormToTop } from 'modules/Dictionary/helper';
import { capitalizeFirstCharacter, customRandomNumberGenerator } from 'utils';

// ** Validation **
import { EditDictionarySchema } from 'modules/Dictionary/validation';

// ** Slice **
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { setToast } from 'reduxStore/slices/toastSlice';

// ** Style **
import 'modules/Dictionary/styles/index.css';

const EditDictionary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  // ** Redux
  const dispatch = useDispatch();
  const { allLanguages } = useSelector(useLanguage);

  // ** APIs
  const [getApi, { isLoading }] = useAxiosGet();
  const [putApi, { isLoading: updateLoading }] = useAxiosPut();

  // ** useStates
  const [responseData, setResponseData] = useState<DictionarySubmitDataType>();
  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);
  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [initialValues, setInitialValues] = useState<LangueKeyValueProps>();

  // ** CONSTs
  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => {
    return { name: lang.name, id: lang.id };
  });
  const nextFormLanguage = formLanguages[activeLanguage + 1]?.name || '';
  const prevFormLanguage = formLanguages[activeLanguage - 1]?.name || '';

  // ** useEffects
  useEffect(() => {
    fetchDictionary();
  }, []);

  const fetchDictionary = async () => {
    const { data } = await getApi(`/cms-page-section/${id}`, {
      params: { sectionName: KeysEnum.Dictionary, view: true },
    });
    setResponseData(data?.dictionary);
    const initialValues = {} as LangueKeyValueProps;
    data.dictionary?.forEach(
      ({
        language,
        field_name,
        field_value,
      }: {
        language: string;
        field_name: string;
        field_value: string;
      }) => {
        if (!initialValues[language]) {
          initialValues[language] = {};
        }
        if (typeof field_value === 'string') {
          try {
            const parsedValue = JSON.parse(field_value);
            initialValues[language][field_name] = Array.isArray(parsedValue)
              ? parsedValue
              : field_value;
          } catch {
            initialValues[language][field_name] = field_value;
          }
        } else {
          initialValues[language][field_name] = field_value;
        }
      }
    );
    setInitialValues(initialValues);
  };

  const getClassNames = (index: number, activeLanguage: number) => {
    if (index === activeLanguage) return 'bg-primary text-white';
    if (index > activeLanguage) return 'bg-white text-primary';
    return 'bg-primary text-white';
  };

  const onSubmit = (values: DictionarySubmitDataType) => {
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
  const createSubmitData = (values: DictionarySubmitDataType) => {
    const bodyData = {
      ...Object.keys(values).reduce((acc: DictionarySubmitDataType, key) => {
        if (key === 'banner_image' || key === 'point_data_array') {
          acc[key] = values[key];
        } else {
          acc[key] = values[key]
            ? Array.isArray(values[key])
              ? JSON.stringify(values[key])
              : values[key]
            : '';
        }
        acc[`${key}[id]`] =
          (responseData as unknown as DictionarySubmitDataType[])?.find(
            (item) => item.field_name === key && item.language === formLanguage
          )?.id ?? '';
        acc[`${key}[language]`] = formLanguage;
        acc[`${key}[cmsId]`] = id ?? '';
        return acc;
      }, {}),
    };
    const formData = new FormData();
    Object.keys(bodyData).forEach((key) => {
      formData.append(key, bodyData[key] as string);
    });
    return formData;
  };
  const OnNext = async (values: DictionarySubmitDataType) => {
    setFormLanguage(nextFormLanguage);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));
    const formData = createSubmitData(values);
    const { error } = await putApi(`/cms-page-section`, formData);
    if (!error) {
      setActiveLanguage(activeLanguage + 1);
    }
  };

  const OnPrev = (values: DictionarySubmitDataType) => {
    setFormLanguage(prevFormLanguage);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));
    setActiveLanguage(activeLanguage - 1);
    scrollFormToTop();
  };

  const handleSubmit = async (values: DictionarySubmitDataType) => {
    const formData = createSubmitData(values);
    const { error } = await putApi(`/cms-page-section`, formData);
    if (!error) {
      navigate('/page-list');
    }
  };

  return (
    <div className="relative">
      <PageHeader
        title={t('Dictionary.pageHeader.Title')}
        url={AdminNavigation.cms_management.view.path}
      >
        <Breadcrumbs
          items={[
            {
              label: t('Cms.pageHeader.Management.Title'),
              url: '/page-list',
            },
            {
              label: t('Dictionary.pageHeader.Title'),
              url: '/',
            },
          ]}
          variant="arrow"
        />
      </PageHeader>
      <div className="p-2 rounded-xl bg-white">
        <div className="py-10  border-solid border-borderColor">
          <ul className="flex items-center gap-28 justify-center mx-auto new-design-steps">
            {formLanguages.map((lang, index) => {
              return (
                <li
                  key={lang.id}
                  className="relative group z-1 justify-center items-center flex flex-col"
                >
                  <label className="text-primary text-sm leading-4 block mb-3.5">
                    {capitalizeFirstCharacter(lang.name)}
                  </label>
                  <Button
                    className={`border border-solid rounded-full border-PrimaryWood ${getClassNames(
                      index,
                      activeLanguage
                    )} current-form`}
                  >
                    {index >= activeLanguage ? (
                      <>{index + 1}</>
                    ) : (
                      <Image iconClassName="w-10 h-10" iconName="checkIcon" />
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bg-LightGray rounded-xl relative flex m-5 flex-col">
          <div className="flex flex-wrap justify-between 1024:px-9 px-4 1024:py-8 py-5 border-b">
            <p className="text-xl leading-6 font-semibold text-dark">
              {t('Dictionary.pageHeader.Title')}
            </p>
          </div>
          <div className="">
            <div className="">
              <Formik
                initialValues={
                  initialValues?.[`${formLanguage}`]
                    ? initialValues?.[`${formLanguage}`]
                    : {}
                }
                validationSchema={EditDictionarySchema()}
                onSubmit={(values) => {
                  onSubmit(values);
                }}
                enableReinitialize
              >
                {({ values, setFieldValue, errors: _e, submitForm }) => {
                  return (
                    <Form id="scrollable-form">
                      <div className="bg-white m-10 p-10 rounded-xl">
                        <InputField
                          name="title_hashTag"
                          label={t('Dictionary.EditForm.TitleHashTag')}
                          placeholder={t(
                            'Dictionary.EditForm.TitleHashTag.PlaceHolder'
                          )}
                          type="text"
                          parentClass="mb-5"
                          isCompulsory
                        />
                        <InputField
                          name="title_of_hashTag"
                          label={t('Dictionary.EditForm.TitleOfHashTag')}
                          placeholder={t(
                            'Dictionary.EditForm.TitleOfHashTag.PlaceHolder'
                          )}
                          type="text"
                          parentClass="mb-5"
                          isCompulsory
                        />
                        <TextArea
                          name="hashTag_description"
                          label={t('Dictionary.EditForm.TitleDescription')}
                          placeholder={t(
                            'Dictionary.EditForm.TitleDescription.PlaceHolder'
                          )}
                          parentClass="mb-5"
                          isCompulsory
                        />
                      </div>
                      <div className="bg-white m-10 p-10 rounded-xl">
                        <div className="flex w-1/2 mb-4">
                          <DropZone
                            label={t('Dictionary.EditForm.UploadPhoto')}
                            name="banner_image"
                            SubTitle={t('Dictionary.EditForm.UploadPhoto')}
                            setValue={setFieldValue}
                            acceptTypes={FileAcceptType[
                              EnumFileType.Image
                            ].toString()}
                            value={values.banner_image ?? null}
                            fileType={EnumFileType.Image}
                            fileInputIcon="imageIcon2"
                            isCompulsory
                            isLoading={isLoading}
                          />
                        </div>
                        <InputField
                          name="button_title"
                          label={t('Dictionary.EditForm.ButtonTitle')}
                          placeholder={t(
                            'Dictionary.EditForm.ButtonTitle.PlaceHolder'
                          )}
                          type="text"
                          parentClass="mb-5"
                          isCompulsory
                        />
                        <div className="bg-LightGray p-4 flex rounded-xl items-center w-full gap-4  ">
                          <InputField
                            name="button_text"
                            label={t('Dictionary.EditForm.ButtonText')}
                            placeholder={t(
                              'Dictionary.EditForm.ButtonText.PlaceHolder'
                            )}
                            type="text"
                            parentClass="mb-2 w-1/3"
                            isCompulsory
                          />
                          <InputField
                            name="button_url"
                            label={t('Dictionary.EditForm.ButtonUrl')}
                            placeholder={t(
                              'Dictionary.EditForm.ButtonUrl.PlaceHolder'
                            )}
                            type="text"
                            parentClass="mb-2 w-2/3"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-4 m-10">
                        {activeLanguage > 0 ? (
                          <Button
                            variants="black"
                            type="submit"
                            className="addButton min-w-[90px]"
                            onClickHandler={() => {
                              setActionName(ActionNameEnum.PREV);
                            }}
                            disabled={updateLoading}
                          >
                            {t('Dictionary.EditForm.PrevButton')}
                          </Button>
                        ) : (
                          ''
                        )}

                        {activeLanguage < (allLanguages ?? []).length - 1 ? (
                          <div className="flex justify-end gap-4">
                            <Button
                              className="min-w-[90px]"
                              variants="black"
                              onClickHandler={() => {
                                navigate(-1);
                              }}
                              disabled={updateLoading}
                            >
                              {t('Dictionary.EditForm.CancelButton')}
                            </Button>
                            <Button
                              variants="black"
                              type="button"
                              className="addButton"
                              name="next"
                              onClickHandler={async () => {
                                setActionName(ActionNameEnum.NEXT);
                                await submitForm();
                                if (!isValid) {
                                  dispatch(
                                    setToast({
                                      variant: ToastVariant.ERROR,
                                      message: t(
                                        'ToastMessage.InCompleteFormToastMessage'
                                      ),
                                      type: 'error',
                                      id: customRandomNumberGenerator(),
                                    })
                                  );
                                }
                              }}
                              isLoading={updateLoading}
                              disabled={updateLoading}
                            >
                              {t('Dictionary.EditForm.NextButton')}
                            </Button>
                          </div>
                        ) : (
                          ''
                        )}

                        {nextFormLanguage === '' ? (
                          <Button
                            variants="black"
                            type="button"
                            className="addButton min-w-[90px]"
                            isLoading={updateLoading}
                            disabled={updateLoading}
                            onClickHandler={async () => {
                              setActionName(ActionNameEnum.SUBMIT);
                              await submitForm();
                              if (!isValid) {
                                dispatch(
                                  setToast({
                                    variant: ToastVariant.ERROR,
                                    message: t(
                                      'ToastMessage.InCompleteFormToastMessage'
                                    ),
                                    type: 'error',
                                    id: customRandomNumberGenerator(),
                                  })
                                );
                              }
                            }}
                          >
                            {t('Dictionary.EditForm.SubmitButton')}
                          </Button>
                        ) : (
                          ''
                        )}
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDictionary;
