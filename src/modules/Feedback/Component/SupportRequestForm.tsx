import Button from 'components/Button/Button';
import Card from 'components/Card';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import { LanguagesEnum, ToastVariant } from 'constants/common.constant';
import { isValid } from 'date-fns';
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikErrors,
} from 'formik';
import { useAxiosGet, useAxiosPost, useAxiosPut } from 'hooks/useAxios';
import { scrollFormToTop } from 'modules/Blog/helper';
import { ActionNameEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { capitalizeFirstCharacter, customRandomNumberGenerator } from 'utils';
import {
  FormValues,
  LangueKeyValueProps,
  Resource,
  SupportRequestSubmitDataType,
} from '../types';

import PageHeader from 'components/PageHeader';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import '../index.css';
import { SupportRequestValidationSchema } from '../validation';

const SupportRequestForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);

  // ** Redux
  const dispatch = useDispatch();
  const { allLanguages } = useSelector(useLanguage);

  const [activeLanguage, setActiveLanguage] = useState(0);
  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);
  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);
  const [initialValues, setInitialValues] = useState<LangueKeyValueProps>({
    english: { query: [{ question: '', answer: '' }] },
    spanish: { query: [{ question: '', answer: '' }] },
  });
  const [slug, setSlug] = useState<string>();
  const [indexData, setIndexData] = useState<number[]>([]);

  // ** CONSTs
  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => {
    return { name: lang.name, id: lang.id };
  });
  const nextFormLanguage = formLanguages[activeLanguage + 1]?.name || '';
  const prevFormLanguage = formLanguages[activeLanguage - 1]?.name || '';

  // ** APIs
  const [getApi, { isLoading }] = useAxiosGet();
  const [putApi, { isLoading: updateLoading }] = useAxiosPut();
  const [postApi] = useAxiosPost();

  const onSubmit = (values: SupportRequestSubmitDataType) => {
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

  const OnNext = async (values: SupportRequestSubmitDataType) => {
    setFormLanguage(nextFormLanguage);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));

    const formData = new FormData();
    if (slug) {
      formData.append('slug', slug as string);
      formData.append('language', formLanguage);

      // Add query array
      values.query.forEach((item, index) => {
        formData.append(`query[${index}][answer]`, item.answer);
        formData.append(`query[${index}][question]`, item.question);
      });
      const { error } = await putApi(`support-request/query`, formData);
      if (!error) {
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Common.ToastMessage.Success.Update'),
            type: 'success',
            id: Date.now(),
          })
        );
        setActiveLanguage(activeLanguage + 1);
      }
    } else {
      values.query.forEach((item, index) => {
        formData.append(`query[${index}][answer]`, item.answer);
        formData.append(`query[${index}][question]`, item.question);
      });
      const { error, data } = await postApi(`support-request/query`, formData);
      if (!error) {
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Common.ToastMessage.Success.Create'),
            type: 'success',
            id: Date.now(),
          })
        );
        setSlug(data?.slug);
        setActiveLanguage(activeLanguage + 1);
      }
    }
  };

  const OnPrev = (values: SupportRequestSubmitDataType) => {
    setFormLanguage(prevFormLanguage);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));
    setActiveLanguage(activeLanguage - 1);
    scrollFormToTop();
  };

  const handleSubmit = async (values: SupportRequestSubmitDataType) => {
    const formData = new FormData();

    formData.append('slug', slug as string);
    formData.append('language', formLanguage);
    // Add query array
    values.query.forEach((item, index) => {
      formData.append(`query[${index}][answer]`, item.answer);
      formData.append(`query[${index}][question]`, item.question);
    });
    const { error } = await putApi(`support-request/query`, formData);
    if (!error) {
      dispatch(
        setToast({
          variant: ToastVariant.SUCCESS,
          message: t('Common.ToastMessage.Success.Create'),
          type: 'success',
          id: Date.now(),
        })
      );
      navigate('/settings');
    }
  };

  const fetchSupportRequest = async () => {
    const { data } = await getApi(`support-request/query`, {
      params: { id: user?.id },
    });

    const initialValues = {} as LangueKeyValueProps;

    if (data?.length > 0) {
      data?.forEach((value: FormValues) => {
        const language = value?.language?.name;

        if (language) {
          // Initialize the language entry if it doesn't exist
          if (!initialValues[language]) {
            initialValues[language] = { query: value?.query }; // Ensure `query` is initialized
          }
        }
      });
      setSlug(data[0]?.slug);
      setInitialValues(initialValues);
    }
  };

  useEffect(() => {
    fetchSupportRequest();
  }, []);

  const renderResources = (
    index: number,
    arrayHelpers: FieldArrayRenderProps,
    resource: Resource,
    queryData: Resource[],
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{
      [fieldName: string]: Resource[];
    }>>,
    setFieldTouched: (
      field: string,
      isTouched?: boolean | undefined,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{
      [fieldName: string]: Resource[];
    }>>
  ) => {
    return (
      resource && (
        <div className="support-request-query-input">
          {/* Question Field */}

          <InputField
            parentClass="flex-[1_0_0%]"
            type="text"
            name={`query[${index}].question`} // Corrected name field
            label={t('SupportRequest.Label.Question')}
            placeholder={t('SupportRequest.Placeholder.Question')}
          />
          {/* Remove Button */}
          {index + 1 !== queryData?.length ? (
            <Button
              className="action-button red"
              onClickHandler={() => {
                setIndexData([...indexData, index]);
                arrayHelpers.remove(index);
              }} // Correctly remove the index
              disabled={activeLanguage > 0}
            >
              <Image iconName="trashIcon" iconClassName="w-6 h-6" />
            </Button>
          ) : (
            <Button
              onClickHandler={() => handleAddResource(arrayHelpers)}
              variants="black"
              className="action-button black"
              disabled={activeLanguage > 0}
            >
              <Image iconName="plus" iconClassName="w-6 h-6" />
            </Button>
          )}

          <ReactEditor
            label={t('SupportRequest.Label.Answer')}
            parentClass="h-unset"
            name={`query[${index}].answer`}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            value={queryData[index].answer as string}
            isLoading={isLoading}
            imageField
          />
        </div>
      )
    );
  };

  const handleAddResource = (arrayHelpers: FieldArrayRenderProps): void => {
    arrayHelpers.push({ question: '', answer: '' }); // Add new resource
  };

  return (
    <>
      <PageHeader title={t('supportFAQs')} url="/settings" />
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
              onSubmit={(values) => {
                onSubmit(values);
              }}
              validationSchema={SupportRequestValidationSchema()}
              enableReinitialize
            >
              {({
                values,
                errors: _e,
                submitForm,
                setFieldValue,
                setFieldTouched,
              }) => (
                <Form>
                  <FieldArray
                    name="query"
                    render={(arrayHelpers) => (
                      <>
                        {values?.query?.map((resource, index) =>
                          renderResources(
                            index,
                            arrayHelpers,
                            resource,
                            values?.query,
                            setFieldValue,
                            setFieldTouched
                          )
                        )}
                      </>
                    )}
                  />
                  <div className="btn-wrap">
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
                      <>
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
                      </>
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
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SupportRequestForm;
