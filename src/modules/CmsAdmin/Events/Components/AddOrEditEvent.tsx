// ** Components **
import Button from 'components/Button/Button';
import DatePicker from 'components/FormElement/datePicker';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';

// ** Constants **
import { LanguagesEnum } from 'constants/common.constant';
import { ActionNameEnum } from 'modules/CmsAdmin/constants';
import { FileAcceptType } from 'modules/Dictionary/constant';

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
import {
  EditDataType,
  EventTypes,
  EventValueProps,
} from 'modules/CmsAdmin/Events/types/index';

// ** Helper Functions **
import { scrollFormToTop } from 'modules/Dictionary/helper';
import {
  capitalizeFirstCharacter,
  customRandomNumberGenerator,
  shouldDisableField,
} from 'utils';

// ** Validation **
import { EventValidationSchema } from '../validation';

// ** Slice **
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { setToast } from 'reduxStore/slices/toastSlice';

// ** Style **
import 'modules/Dictionary/styles/index.css';

// ** Constants **
import { fieldsToTranslate, initialEventValue } from '../constants';

const AddOrEditEvent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();

  // **Validation**
  const validation = EventValidationSchema();

  // ** Redux **
  const dispatch = useDispatch();
  const { allLanguages, defaultLanguage } = useSelector(useLanguage);

  // ** APIs **
  const [getApi, { isLoading }] = useAxiosGet();
  const [postApi, { isLoading: createEventLoading }] = useAxiosPost();
  const [putApi, { isLoading: updateLoading }] = useAxiosPut();

  // ** useState **
  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);
  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [initialValues, setInitialValues] = useState<LangueKeyValueProps>();

  // ** Constants **
  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => ({
    name: lang.name,
    id: lang.id,
    short_name: lang.short_name,
  }));

  const nextFormLanguage = formLanguages[activeLanguage + 1]?.name || '';
  const prevFormLanguage = formLanguages[activeLanguage - 1]?.name || '';

  // ** useEffects **
  useEffect(() => {
    if (slug) {
      fetchEvent();
    }
  }, []);

  const fetchEvent = async () => {
    const { data } = await getApi(`/events/${slug}`, {
      params: { view: true },
    });
    const groupedEvents = data?.data?.reduce(
      (acc: EventValueProps, event: EventTypes) => {
        const { event_language, ...rest } = event;
        const language = event_language?.name;
        acc[language] = { ...rest };
        return acc;
      },
      {}
    );
    setInitialValues(groupedEvents);
  };

  const getClassNames = (index: number, activeLanguage: number) => {
    if (index === activeLanguage) return 'bg-primary text-white';
    if (index > activeLanguage) return 'bg-white text-primary';
    return 'bg-primary text-white';
  };

  const onSubmit = (values: EditDataType) => {
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

  const createSubmitData = (values: EditDataType) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key] as File);
    });
    return formData;
  };

  const OnNext = async (values: EditDataType) => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: values,
    }));
    setFormLanguage(nextFormLanguage);
    const formData = createSubmitData(values);
    let err;
    if (slug || values?.id) {
      const { data, error } = await putApi('/events', formData);
      setInitialValues((prevValues) => ({
        ...prevValues,
        [`${formLanguages[activeLanguage + 1].name}`]: {
          ...data,
          id: prevValues?.[`${formLanguages[activeLanguage + 1].name}`]?.id,
          title: data?.title,
          date: data?.date,
          start_time: data?.start_time,
          end_time: data?.end_time,
          description:
            prevValues?.[`${formLanguages[activeLanguage + 1].name}`]?.description,
        },
      }));
      err = error;
    } else {
      const { data, error } = await postApi('/events', formData);
      setInitialValues((prevValues) => ({
        ...prevValues,
        [formLanguage]: {
          ...data,
          id: data?.parent_table_id,
        },
        [`${formLanguages[activeLanguage + 1].name}`]: {
          ...data,
        },
      }));
      err = error;
    }
    if (!err) {
      setActiveLanguage(activeLanguage + 1);
    }
  };

  const OnPrev = (values: EditDataType) => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      [formLanguage]: { ...values },
    }));
    setFormLanguage(prevFormLanguage);
    setActiveLanguage(activeLanguage - 1);
    scrollFormToTop();
  };

  const handleSubmit = async (values: EditDataType) => {
    const formData = createSubmitData(values);
    const { error } = await putApi('/events', formData);
    if (!error) {
      navigate(-1);
    }
  };

  const isDisabled = (val: string) =>
    shouldDisableField(
      val,
      fieldsToTranslate,
      formLanguages[activeLanguage].short_name,
      defaultLanguage
    );

  return isLoading && slug ? (
    <Image loaderType="Spin" />
  ) : (
    <div className="relative">
      <div className="p-2 rounded-xl bg-white">
        <div className="py-10 border-solid border-borderColor">
          <ul className="flex items-center gap-28 justify-center mx-auto new-design-steps">
            {formLanguages.map((lang, index) => (
              <li
                key={lang.id}
                className="relative group z-1 justify-center items-center flex flex-col"
              >
                <label className="text-primary text-sm leading-4 block mb-3.5">
                  {capitalizeFirstCharacter(lang.name)}
                </label>
                <Button
                  className={`border border-solid rounded-full border-PrimaryWood ${getClassNames(index, activeLanguage)} current-form`}
                >
                  {index >= activeLanguage ? (
                    <>{index + 1}</>
                  ) : (
                    <Image iconClassName="w-10 h-10" iconName="checkIcon" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-LightGray rounded-xl relative flex m-5 flex-col">
          <div className="flex flex-wrap 1024:px-9 px-4 1024:py-8 py-5 border-b">
            <Button onClickHandler={() => navigate(-1)}>
              <Image
                iconName="chevronLeft"
                iconClassName="bg-PrimaryWood rounded-full p-1 text-white mr-3"
              />
            </Button>
            <p className="text-xl leading-6 font-semibold text-dark">
              {slug
                ? t('Events.CreateOrEditForm.PageHeader.EditEventTitle')
                : t('Events.CreateOrEditForm.PageHeader.AddEventTitle')}
            </p>
          </div>
          <div>
            <Formik
              validationSchema={validation}
              initialValues={initialValues?.[formLanguage] ?? initialEventValue}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ values, setFieldValue, submitForm, setFieldTouched }) => {
                const startTime = values?.start_time
                  ? new Date(values?.start_time as string)
                  : null;
                const endTime = values?.end_time
                  ? new Date(values?.end_time as string)
                  : null;

                return (
                  <Form id="scrollable-form">
                    <div className="m-8 p-10 rounded-xl">
                      <div className="flex w-1/2 mb-10">
                        <DropZone
                          name="image_path"
                          SubTitle={t('Events.CreateOrEditForm.UploadPhoto')}
                          setValue={setFieldValue}
                          acceptTypes={FileAcceptType[EnumFileType.Image].toString()}
                          value={values.image_path ?? null}
                          fileType={EnumFileType.Image}
                          fileInputIcon="imageIcon2"
                          isCompulsory
                          isLoading={isLoading}
                        />
                      </div>
                      <InputField
                        name="title"
                        label={t('Events.CreateOrEditForm.Title')}
                        placeholder={t('Events.CreateOrEditForm.TitlePlaceHolder')}
                        type="text"
                        parentClass="mb-5"
                        isDisabled={isDisabled('title')}
                        isLoading={createEventLoading || updateLoading}
                        isCompulsory
                      />
                      <div className="bg-LightGray flex rounded-xl w-full gap-4 ">
                        <DatePicker
                          parentClass="w-1/4 [&_.input-icon]:left-2"
                          name="date"
                          className="text-center w-full"
                          labelClass="text-[15px]"
                          label={t('Events.CreateOrEditForm.Date')}
                          disabled={isDisabled('date')}
                          isCompulsory
                          icon
                          selectedDate={
                            values?.date ? new Date(values?.date as string) : null
                          }
                          onChange={(date) =>
                            setFieldValue('date', date?.toISOString())
                          }
                          placeholder={t('Cms.date.titlePlaceholder')}
                          isLoading={createEventLoading || updateLoading}
                        />
                        <DatePicker
                          startDateName="start_time"
                          endDateName="end_time"
                          parentClass="w-3/4"
                          className="bg-white"
                          label={t('Events.CreateOrEditForm.Time')}
                          isCompulsory
                          range
                          selectedDate={startTime}
                          endingDate={endTime}
                          onRangeChange={(startDate, endDate) => {
                            if (setFieldValue) {
                              if (startDate)
                                setFieldValue('start_time', startDate.toISOString());
                              if (endDate)
                                setFieldValue('end_time', endDate.toISOString());
                            }
                          }}
                          isTimePicker
                          showTimeSelectOnly
                          startDatePlaceholder={t(
                            'Events.CreateOrEditForm.StartTime'
                          )}
                          endDatePlaceholder={t('Events.CreateOrEditForm.EndTime')}
                          dateFormat="h:mm aa"
                          disabled={isDisabled('start_time')}
                          startDateMinTime={new Date(new Date().setHours(0, 0, 0))}
                          endDateMinTime={
                            startTime
                              ? new Date(startTime.getTime() + 60 * 60 * 1000)
                              : undefined
                          }
                          endDateMaxTime={new Date(new Date().setHours(23, 59, 59))}
                          isLoading={createEventLoading || updateLoading}
                        />
                      </div>
                      <div className="mt-8">
                        <ReactEditor
                          label={t('Cms.homepage.banner.description')}
                          parentClass="h-unset"
                          placeholder={t(
                            'Events.CreateOrEditForm.DescriptionPlaceHolder'
                          )}
                          name="description"
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          value={values?.description as string}
                          isCompulsory
                        />
                      </div>
                      <div className="mt-5">
                        <InputField
                          name="location"
                          label={t('Events.CreateOrEditForm.Location')}
                          placeholder={t(
                            'Events.CreateOrEditForm.LocationPlaceHolder'
                          )}
                          type="text"
                          parentClass="mb-5"
                          isDisabled={isDisabled('location')}
                          isCompulsory
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 m-10">
                      {activeLanguage > 0 && (
                        <Button
                          variants="black"
                          type="submit"
                          className="addButton min-w-[90px]"
                          onClickHandler={() => {
                            setActionName(ActionNameEnum.PREV);
                          }}
                          disabled={updateLoading || createEventLoading}
                        >
                          {t('Dictionary.EditForm.PrevButton')}
                        </Button>
                      )}

                      {activeLanguage < (allLanguages ?? []).length - 1 && (
                        <div className="flex justify-end gap-4">
                          <Button
                            className="min-w-[90px]"
                            variants="black"
                            onClickHandler={() => navigate(-1)}
                            disabled={updateLoading || createEventLoading}
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
                            isLoading={updateLoading || createEventLoading}
                            disabled={updateLoading || createEventLoading}
                          >
                            {t('Dictionary.EditForm.NextButton')}
                          </Button>
                        </div>
                      )}

                      {nextFormLanguage === '' && (
                        <Button
                          variants="black"
                          type="button"
                          className="addButton min-w-[90px]"
                          isLoading={updateLoading || createEventLoading}
                          disabled={updateLoading || createEventLoading}
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
                          {slug
                            ? t('Dictionary.EditForm.SubmitButton')
                            : t('Event.EditForm.SubmitButton')}
                        </Button>
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
  );
};

export default AddOrEditEvent;
