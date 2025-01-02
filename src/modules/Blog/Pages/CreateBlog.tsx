// ** Components **
import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';

// ** Constants **
import { LanguagesEnum, ToastVariant } from 'constants/common.constant';
import { ActionNameEnum } from 'modules/CmsAdmin/constants';

// ** Date Functions **
import { isValid } from 'date-fns';

// ** Formik **
import { Form, Formik } from 'formik';

// ** Hooks **
import { useAxiosGet, useAxiosPost, useAxiosPut } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// ** Types **
import { LangueKeyValueProps } from 'modules/CmsAdmin/Aboutus/types';

// ** Helper Functions **
import { capitalizeFirstCharacter, customRandomNumberGenerator } from 'utils';

// ** Validation **

// ** Slice **
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { setToast } from 'reduxStore/slices/toastSlice';

// ** Style **
import Card from 'components/Card';
import Icon from 'components/Icon';
import Image from 'components/Image';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import _ from 'lodash';
import 'modules/Blog/styles/index.css';
import 'modules/CmsAdmin/styles/index.css';
import { scrollFormToTop } from 'modules/Dictionary/helper';
import { FileAcceptType } from '../constant';
import { BlogSubmitDataType } from '../types';
import { CreateBlogSchema } from '../validation';

const CreateBlog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug: paramsSlug } = useParams();

  // ** Redux
  const dispatch = useDispatch();
  const { allLanguages } = useSelector(useLanguage);

  // ** APIs
  const [getApi, { isLoading }] = useAxiosGet();
  const [putApi, { isLoading: updateLoading }] = useAxiosPut();
  const [addApi] = useAxiosPost();

  // ** useStates
  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);
  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [initialValues, setInitialValues] = useState<LangueKeyValueProps>();
  const [slug, setSlug] = useState<string>(paramsSlug ?? '');

  // ** CONSTs
  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => {
    return { name: lang.name, id: lang.id };
  });
  const nextFormLanguage = formLanguages[activeLanguage + 1]?.name || '';
  const prevFormLanguage = formLanguages[activeLanguage - 1]?.name || '';
  // ** useEffects
  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [activeLanguage]);

  const fetchBlog = async () => {
    const { data } = await getApi(`/blog`, {
      params: { slug, language: formLanguage },
    });
    // setResponseData(data?.blog);
    const initialValues = {} as LangueKeyValueProps;
    const language = data?.language?.name;
    const blogData = _.omit(data, [
      'updated_at',
      'social_media_links',
      'slug',
      'created_at',
      'deleted_at',
      'id',
      'parent_table_id',
    ]);
    Object.entries(blogData).forEach((key) => {
      const field_name = key[0] === 'image_path' ? 'banner_image' : key[0];
      const field_value = key[1];
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
    });
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
        if (key !== 'social_media_links' && key !== 'slug') {
          if (key === 'banner_image' || key === 'point_data_array') {
            acc[key] = values[key];
          } else {
            acc[key] = values[key]
              ? Array.isArray(values[key])
                ? JSON.stringify(values[key])
                : values[key]
              : '';
          }
        }
        acc.language = formLanguage;
        return acc;
      }, {}),
    };
    const formData = new FormData();
    formData.append('slug', slug);
    Object.keys(bodyData).forEach((key) => {
      formData.append(key, bodyData[key] as string);
    });
    return formData;
  };
  const OnNext = async (values: BlogSubmitDataType) => {
    const formData = createSubmitData(values);
    setFormLanguage(nextFormLanguage);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));
    if (slug) {
      const { error } = await putApi(`/blog`, formData);
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
      const { error, data } = await addApi(`/blog`, formData);
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
    const { error } = await putApi(`/blog`, formData);
    if (!error) {
      dispatch(
        setToast({
          variant: ToastVariant.SUCCESS,
          message: t('Common.ToastMessage.Success.Update'),
          type: 'success',
          id: Date.now(),
        })
      );
      navigate('/blog');
    }
  };
  const setInitialValue = () => {
    if (formLanguage === LanguagesEnum.ENGLISH) {
      setInitialValues({
        [formLanguage]: {
          banner_image: '',
          tag: '',
          title: '',
          author: '',
          bio: '',
          conclusion: '',
          details: '',
        },
      });
    }
  };

  useEffect(() => {
    setInitialValue();
  }, [formLanguage]);

  return (
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
          backArrow
          onClickData={() => {
            navigate('/blog');
          }}
          headerClass="flex items-center justify-between gap-2 flex-wrap"
          isGray
          title={
            paramsSlug
              ? t('Blog.pageHeader.EditBlog')
              : t('Blog.pageHeader.CreateBlog')
          }
        >
          <Formik
            initialValues={
              initialValues?.[`${formLanguage}`]
                ? initialValues?.[`${formLanguage}`]
                : {}
            }
            validationSchema={CreateBlogSchema()}
            onSubmit={(values) => {
              onSubmit(values);
            }}
            enableReinitialize
          >
            {({
              values,
              setFieldValue,
              setFieldTouched,
              errors: _e,
              submitForm,
            }) => {
              return (
                <Form id="scrollable-form">
                  <div className="cms-form-card-wrap">
                    <div className="left-small-column" />
                    <div className="right-big-column">
                      <DropZone
                        name="banner_image"
                        SubTitle={t('Dictionary.EditForm.UploadPhoto')}
                        setValue={setFieldValue}
                        acceptTypes={FileAcceptType[EnumFileType.Image].toString()}
                        value={values.banner_image ?? null}
                        fileType={EnumFileType.Image}
                        fileInputIcon="imageIcon2"
                        isCompulsory
                        isLoading={isLoading}
                        dropdownInnerClass="two-clm"
                      />
                      <InputField
                        name="tag"
                        label={t('Dictionary.EditForm.TitleHashTag')}
                        placeholder={t(
                          'Dictionary.EditForm.TitleOfHashTag.PlaceHolder'
                        )}
                        type="text"
                        isCompulsory
                      />
                      <InputField
                        name="title"
                        label={t('Blog.Form.TitleOfBlog')}
                        placeholder={t('Blog.Form.TitleOfBlog.PlaceHolder')}
                        type="text"
                        isCompulsory
                      />
                      <div className="point-list-item simple mb-3">
                        <InputField
                          name="author"
                          label={t('Blog.Form.TitleOfAuthor')}
                          placeholder={t('Blog.Form.TitleOfAuthor.PlaceHolder')}
                          type="text"
                          isCompulsory
                        />
                        <InputField
                          name="designation"
                          label={t('Blog.Form.DesignationOfAuthor')}
                          placeholder={t(
                            'Blog.Form.DesignationOfAuthor.PlaceHolder'
                          )}
                          type="text"
                        />
                        <label className="input-label">
                          {t('Blog.Form.TitleOfMedia')}
                        </label>
                        <div className="bg-white flex rounded-xl items-center w-full gap-4">
                          <InputField
                            name="instagram_link"
                            placeholder="http://"
                            icon={
                              <Icon className="w-full h-full " name="instagram" />
                            }
                            type="text"
                          />
                          <InputField
                            name="facebook_link"
                            placeholder="http://"
                            type="text"
                            icon={<Icon className="w-full h-full" name="facebook" />}
                          />
                          <InputField
                            name="twitter_link"
                            placeholder="http://"
                            type="text"
                            icon={<Icon name="x" />}
                          />
                        </div>
                        <TextArea
                          name="bio"
                          label={t('Blog.Form.TitleOfBio')}
                          placeholder={t(
                            'Dictionary.EditForm.TitleDescription.PlaceHolder'
                          )}
                          isCompulsory
                        />
                      </div>
                      <ReactEditor
                        label={t('Blog.Form.TitleOfBlogDetail')}
                        parentClass="h-unset"
                        name="details"
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        value={values?.details as string}
                        isCompulsory
                        isLoading={isLoading}
                        imageField
                      />
                      <InputField
                        label={t('Blog.Form.Title.TitleOfConclusion')}
                        name="conclusion_title"
                        placeholder={t('Blog.Form.TitleOfConclusion.placeHolder')}
                        type="text"
                      />
                      <TextArea
                        name="conclusion"
                        label={t('Blog.Form.TitleOfConclusion')}
                        placeholder={t(
                          'Dictionary.EditForm.TitleDescription.PlaceHolder'
                        )}
                        isCompulsory
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
                            {paramsSlug
                              ? t('Dictionary.EditForm.SubmitButton')
                              : t('Community.Table.Add')}
                          </Button>
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
        </Card>
      </div>
    </div>
  );
};

export default CreateBlog;
