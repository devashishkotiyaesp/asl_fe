// ** Components **
import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import ChevronRight from 'components/Icon/assets/ChevronRight';
import PageHeader from 'components/PageHeader';

// ** Constants **
import { LanguagesEnum } from 'constants/common.constant';
import { ActionNameEnum, KeysEnum } from 'modules/CmsAdmin/constants';

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

// ** Helper Functions **
import { capitalizeFirstCharacter, customRandomNumberGenerator } from 'utils';

// ** Validation **
import { EditBlogSchema } from '../validation';

// ** Slice **
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { setToast } from 'reduxStore/slices/toastSlice';

// ** Style **
import Card from 'components/Card';
import Image from 'components/Image';
import { AdminNavigation } from 'constants/navigation.constant';
import 'modules/Blog/styles/index.css';
import { FileAcceptType } from '../constant';
import { scrollFormToTop } from '../helper';
import { BlogSubmitDataType } from '../types';

const EditBlog = () => {
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
  const [responseData, setResponseData] = useState<BlogSubmitDataType>();
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

  const fetchBlog = async () => {
    const { data } = await getApi(`/cms-page-section/${id}`, {
      params: { sectionName: KeysEnum.Blog, view: true },
    });
    setResponseData(data?.blog);
    const initialValues = {} as LangueKeyValueProps;
    data.blog?.forEach(
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

  const onSubmit = (values: BlogSubmitDataType) => {
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
  const createSubmitData = (values: BlogSubmitDataType) => {
    const bodyData = {
      ...Object.keys(values).reduce((acc: BlogSubmitDataType, key) => {
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
          (responseData as unknown as BlogSubmitDataType[])?.find(
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
  const OnNext = async (values: BlogSubmitDataType) => {
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

  const OnPrev = (values: BlogSubmitDataType) => {
    setFormLanguage(prevFormLanguage);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));
    setActiveLanguage(activeLanguage - 1);
    scrollFormToTop();
  };

  const handleSubmit = async (values: BlogSubmitDataType) => {
    const formData = createSubmitData(values);
    const { error } = await putApi(`/cms-page-section`, formData);
    if (!error) {
      navigate('/page-list');
    }
  };

  // ** useEffects
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="relative">
      <PageHeader
        title={t('Blog.pageHeader.Title')}
        url={AdminNavigation.cms_management.view.path}
      >
        <div className="flex items-center gap-3">
          <p>{t('Cms.pageHeader.Management.Title')}</p>
          <ChevronRight />
          <p>{t('Blog.pageHeader.Title')}</p>
        </div>
      </PageHeader>
      <div className="content-base">
        <div className="step-wrapper">
          {allLanguages?.map((lang, index) => {
            return (
              <div
                key={lang.id}
                className={`step-item ${index <= activeLanguage ? 'active' : ''}`}
              >
                {index >= activeLanguage ? (
                  <span className="step-item__number">{index + 1}</span>
                ) : (
                  <span className="step-item__number">
                    <Image iconClassName="w-10 h-10" iconName="checkIcon" />
                  </span>
                )}
                <span className="step-item__languages">
                  {capitalizeFirstCharacter(lang.name)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="cms-page-bar-content-wrap">
          <Card
            minimal
            // backArrow
            // onClickData={() => {
            //   navigate('/blog');
            // }}
            headerClass="flex items-center justify-between gap-2 flex-wrap"
            isGray
            // title={
            //   paramsSlug
            //     ? t('Blog.pageHeader.EditBlog')
            //     : t('Blog.pageHeader.CreateBlog')
            // }
          >
            <Formik
              initialValues={
                initialValues?.[`${formLanguage}`]
                  ? initialValues?.[`${formLanguage}`]
                  : {}
              }
              validationSchema={EditBlogSchema()}
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
                      />
                      <InputField
                        name="title_of_hashTag"
                        label={t('Dictionary.EditForm.TitleOfHashTag')}
                        placeholder={t(
                          'Dictionary.EditForm.TitleOfHashTag.PlaceHolder'
                        )}
                        type="text"
                        parentClass="mb-5"
                      />
                      <TextArea
                        name="hashTag_description"
                        label={t('Dictionary.EditForm.TitleDescription')}
                        placeholder={t(
                          'Dictionary.EditForm.TitleDescription.PlaceHolder'
                        )}
                        parentClass="mb-5"
                      />
                    </div>
                    <div className="bg-white m-10 p-10 rounded-xl">
                      <div className="flex w-1/2 mb-4">
                        <DropZone
                          label={t('Dictionary.EditForm.UploadPhoto')}
                          name="banner_image"
                          SubTitle={t('Dictionary.EditForm.UploadPhoto')}
                          setValue={setFieldValue}
                          acceptTypes={FileAcceptType[EnumFileType.Image].toString()}
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
                                    variant: 'Error',
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
                                  variant: 'Error',
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
