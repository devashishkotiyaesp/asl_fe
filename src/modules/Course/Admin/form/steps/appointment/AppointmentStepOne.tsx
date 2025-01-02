import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import CreatableReactSelect from 'components/FormElement/CreatableReactSelect';
import DatePicker from 'components/FormElement/datePicker';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType, fileInputEnum } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { Roles } from 'constants/common.constant';
import { Form, Formik } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { privateCourseModeType, WEEKDAYS } from 'modules/Course/Admin/constants';
import { useCommonAslLevel } from 'modules/Course/common/hooks';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SetFieldValue } from 'types';
import {
  calculateDaysInfo,
  getISOString,
  removeEmptyKeys,
} from '../../helper/form.helper';
import { CourseBasicDetailDataTypes } from '../../types';
import { AppointmentValidations } from '../../validations';

interface AppointmentStepOneProps {
  initialData: { data: CourseBasicDetailDataTypes };
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const AppointmentStepOne: FC<AppointmentStepOneProps> = ({
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [callApi] = useAxiosGet();
  const [invitedEditors, setInvitedEditors] = useState<IOptions[]>();
  const levels = useCommonAslLevel();
  const [aslLevel, setAslLevel] = useState(levels);
  const [createAslLevel, { isLoading: creatingLevel }] = useAxiosPost();

  const initialValues = {
    cover_video: initialData.data.cover_video || null,
    cover_image: initialData.data.cover_image || null,
    srt_file_path: initialData.data.srt_file_path || null,
    description: initialData.data.description || '',
    title: initialData.data.title || '',
    asl_level_id: initialData.data.asl_level_id || '',
    key_learnings: initialData.data.key_learnings || [],
    subscription_type_id: initialData.data.subscription_type_id || '',
    user_teacher_id: initialData.data.user_teacher_id || '',
    address: initialData.data.address || '',
    city: initialData.data.city || '',
    zip_code: initialData.data.zip_code || '',
    country: initialData.data.country || '',
    start_date: initialData.data.start_date || null,
    end_date: initialData.data.end_date || null,
    repeat_interval_days: initialData.data.repeat_interval_days || [],
    start_time: initialData.data.start_time
      ? getISOString(String(initialData.data.start_time))
      : null,
    end_time: initialData.data.end_time
      ? getISOString(String(initialData.data.end_time))
      : null,
    price: initialData.data.price || '',
    max_participants: initialData.data.max_participants || 0,
    min_participants: initialData.data.min_participants || 0,
    private_mode: initialData.data.private_mode || '',
    zoom_link: initialData.data.zoom_link || '',
    is_private: true,
  };

  const getCourseEditors = async () => {
    const response = await callApi('/role/get-all');
    const teacherId = response.data.find(
      (item: { role: string; id: string }) => item.role === Roles.Teacher
    );
    const { data, error } = await callApi('/users', {
      params: {
        dropdown: true,
        role: teacherId.id,
      },
    });
    if (data && !error) {
      setInvitedEditors(data);
    }
  };
  useEffect(() => {
    getCourseEditors();
  }, []);

  const handleAslCreateOption = async (
    value: string,
    setFieldValue: SetFieldValue
  ) => {
    const { error, data } = await createAslLevel(`/asl`, { level: value });
    if (!error) {
      setAslLevel((prev) => [...prev, { label: data?.level, value: data?.id }]);
      setFieldValue(`asl_level_id`, data?.id);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AppointmentValidations()}
      onSubmit={(values) => {
        const updatedData = {
          ...values,
          ...(values.start_time && values.end_time
            ? {
                start_time: new Date(values?.start_time)
                  .toISOString()
                  .substring(11, 19),

                end_time: new Date(values?.end_time).toISOString().substring(11, 19),
              }
            : {}),
        };
        const nonEmptyValue = removeEmptyKeys(updatedData);
        onSubmit(nonEmptyValue);
      }}
    >
      {({ errors, values, setFieldValue, setFieldTouched }) => {
        const { differenceInDays, validDays } = calculateDaysInfo(
          String(values.start_date),
          String(values.end_date)
        );
        return (
          <Card isGray className="course-inner-card">
            <div className="course-card-title">
              {t('CourseManagement.AddEditForm.BasicFormHeader')}
            </div>
            <Form className="">
              <div className="row">
                <div className="left-part">
                  <DropZone
                    fileInputIcon="camera"
                    name="cover_image"
                    setValue={setFieldValue}
                    value={values.cover_image}
                    label={t('CourseManagement.AddEditForm.CoverPhotoLabel')}
                    SubTitle={t('CourseManagement.AddEditForm.CoverPhotoSubTitle')}
                    acceptTypes="image/*"
                    fileType={EnumFileType.Image}
                  />
                  <DropZone
                    fileInputIcon="pause"
                    name="cover_video"
                    setValue={setFieldValue}
                    value={values.cover_video}
                    label={t('CourseManagement.AddEditForm.CoverVideoLabel')}
                    SubTitle={t('CourseManagement.AddEditForm.CoverVideoSubTitle')}
                    acceptTypes="video/*"
                    fileType={EnumFileType.Video}
                  />
                  <DropZone
                    fileInputIcon="camera"
                    name="srt_file_path"
                    setValue={setFieldValue}
                    value={values.srt_file_path}
                    Title={t('CourseManagement.AddEditForm.SRTFileLabel')}
                    label="Upload caption (.SRT file)"
                    SubTitle="Upload logos"
                    acceptTypes="image/*"
                    variant={fileInputEnum.LinkFileInput}
                  />
                </div>
                <div className="right-part">
                  <InputField
                    isCompulsory
                    name="title"
                    label={t('CourseManagement.AddEditForm.TitleLabel')}
                    placeholder={t('CourseManagement.AddEditForm.TitlePlaceholder')}
                    value={values.title}
                  />
                  <ReactEditor
                    isCompulsory
                    label={t('CourseManagement.AddEditForm.DescriptionLabel')}
                    parentClass="h-unset"
                    name="description"
                    placeholder={t(
                      'CourseManagement.AddEditForm.DescriptionPlaceholder'
                    )}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    value={values?.description}
                  />
                  <CreatableReactSelect
                    isCompulsory
                    handleCreateOption={(e) =>
                      handleAslCreateOption(e, setFieldValue)
                    }
                    isLoading={creatingLevel}
                    name="asl_level_id"
                    options={aslLevel}
                    placeholder={t(
                      'CourseManagement.AddEditForm.CourseLevelPlaceholder'
                    )}
                    label={t('CourseManagement.AddEditForm.CourseLevelLabel')}
                    parentClass="width-full"
                  />
                  {/* This option is static but we will be dynamic in future */}
                  <ReactSelect
                    isCompulsory
                    options={[
                      { value: 'numbers', label: 'Numbers' },
                      { value: 'basic fingerspell', label: 'Basic FingerSpell' },
                      { value: 'interesting topic', label: 'Interesting Topic' },
                    ]}
                    placeholder={t(
                      'CourseManagement.AddEditForm.KeyLearningPlaceholder'
                    )}
                    label={t('CourseManagement.AddEditForm.KeyLearningLabel')}
                    name="key_learnings"
                    parentClass="width-full"
                    isMulti
                  />
                  <InputField
                    isCompulsory
                    type="number"
                    name="price"
                    label={t('CourseManagement.AddEditForm.Label.Price')}
                    value={values.price}
                    placeholder={t('CourseManagement.AddEditForm.Placeholder.Price')}
                  />
                  <ReactSelect
                    options={invitedEditors ?? []}
                    placeholder={t(
                      'CourseManagement.AddEditForm.SelectTeacherLabel'
                    )}
                    label={t(
                      'CourseManagement.AddEditForm.SelectTeacherPlaceholder'
                    )}
                    name="user_teacher_id"
                    parentClass="width-full"
                  />
                  <RadioButtonGroup
                    isCompulsory
                    selectedValue={values.private_mode}
                    optionWrapper="flex flex-wrap gap-4"
                    options={[
                      {
                        label: 'In-person',
                        value: privateCourseModeType.In_Person,
                      },
                      {
                        label: 'Zoom',
                        value: privateCourseModeType.Zoom,
                      },
                    ]}
                    name="private_mode"
                  />
                  {values.private_mode === privateCourseModeType.In_Person && (
                    <>
                      {' '}
                      <InputField
                        name="address"
                        isCompulsory
                        label={t('CourseManagement.AddEditForm.AddressLabel')}
                        placeholder={t(
                          'CourseManagement.AddEditForm.AddressPlaceholder'
                        )}
                        value={values.address}
                      />
                      <InputField
                        name="city"
                        isCompulsory
                        label={t('CourseManagement.AddEditForm.CityLabel')}
                        placeholder={t(
                          'CourseManagement.AddEditForm.CityPlaceholder'
                        )}
                        value={values.city}
                      />
                      <InputField
                        name="zip_code"
                        isCompulsory
                        label={t('CourseManagement.AddEditForm.ZipcodeLabel')}
                        placeholder={t(
                          'CourseManagement.AddEditForm.ZipcodePlaceholder'
                        )}
                        value={values.zip_code}
                      />
                      {/* this is static but will be dynamic in future */}
                      <ReactSelect
                        name="country"
                        isCompulsory
                        options={[
                          { value: 'india', label: 'India' },
                          { value: 'usa', label: 'USA' },
                          { value: 'uk', label: 'UK' },
                        ]}
                        placeholder={t(
                          'CourseManagement.AddEditForm.Placeholder.Country'
                        )}
                        label={t('CourseManagement.AddEditForm.Label.Country')}
                        parentClass="width-full"
                      />{' '}
                    </>
                  )}
                  <div className="cms-button half">
                    <DatePicker
                      placeholder={t('CourseManagement.AddEditForm.DatePlaceholder')}
                      name="start_date"
                      isCompulsory
                      icon
                      label={t('CourseManagement.AddEditForm.StartDateLabel')}
                      selectedDate={
                        values.start_date ? new Date(values.start_date) : undefined
                      }
                      onChange={(date) => {
                        if (!setFieldValue || !date) return;
                        setFieldValue(`start_date`, date.toISOString());
                        setFieldValue('repeat_interval_days', []);
                      }}
                      minDate={new Date()}
                      maxDate={new Date(values?.end_date ?? '')}
                    />
                    <DatePicker
                      placeholder={t('CourseManagement.AddEditForm.DatePlaceholder')}
                      name="end_date"
                      isCompulsory
                      icon
                      label={t('CourseManagement.AddEditForm.EndDateLabel')}
                      selectedDate={
                        values.end_date ? new Date(values.end_date) : undefined
                      }
                      onChange={(date) => {
                        if (!setFieldValue || !date) return;
                        setFieldValue(`end_date`, date.toISOString());
                        setFieldValue('repeat_interval_days', []);
                      }}
                      minDate={new Date(values?.start_date ?? '')}
                    />
                    <div className="week-list-wrap">
                      <div className="week-list-title">
                        <p>{t('CourseManagement.AddEditForm.WeeklyRepeatLabel')}</p>
                      </div>
                      <div className="week-list">
                        {WEEKDAYS.map((days, i) => {
                          const isDisabled =
                            differenceInDays <= 8 && !validDays.includes(i); // Disable if day is not in the valid range
                          const isChecked = values.repeat_interval_days.includes(i); // Check if the current day is checked

                          return (
                            <Checkbox
                              key={Number(i)}
                              value={Number(i)}
                              labelClass="text-sm"
                              id={`repeat_interval_days[${i}]`}
                              name={`repeat_interval_days[${i}]`}
                              text={`${days}`}
                              onChange={() => {
                                let updatedWeekDays;
                                if (isChecked) {
                                  updatedWeekDays =
                                    values.repeat_interval_days.filter(
                                      (day) => day !== i
                                    );
                                } else {
                                  updatedWeekDays = [
                                    ...values.repeat_interval_days,
                                    i,
                                  ];
                                }
                                setFieldValue(
                                  'repeat_interval_days',
                                  updatedWeekDays
                                );
                              }}
                              disabled={isDisabled}
                              parentClass={isDisabled ? 'cursor-not-allowed' : ''}
                              check={isDisabled ? false : isChecked}
                            />
                          );
                        })}
                        <p className="error-message text-sm font-medium block text-red-600 mt-1">
                          {errors.repeat_interval_days}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* this is static but will be dynamic in future */}

                  <DatePicker
                    startDatePlaceholder={t(
                      'CourseManagement.AddEditForm.StartTimePlaceholder'
                    )}
                    endDatePlaceholder={t(
                      'CourseManagement.AddEditForm.EndTimePlaceholder'
                    )}
                    selectedDate={
                      values?.start_time ? new Date(values?.start_time) : null
                    }
                    endingDate={values?.end_time ? new Date(values?.end_time) : null}
                    startDateName="start_time"
                    endDateName="end_time"
                    isCompulsory
                    icon
                    dateFormat="h:mm aa"
                    range
                    onRangeChange={(startDate, endDate) => {
                      const endTime =
                        startDate > endDate
                          ? new Date(startDate.getTime() + 3600 * 1000)
                          : endDate;

                      setFieldValue(`start_time`, startDate);
                      setFieldValue(`end_time`, endTime);
                    }}
                    label={t('CourseManagement.AddEditForm.TimeLabel')}
                    isTimePicker
                    showTimeSelectOnly
                    timeInterval={25}
                    startDateMinTime={new Date(new Date().setHours(0, 0, 0))}
                    endDateMinTime={
                      values?.start_time
                        ? new Date(
                            Number(new Date(values?.start_time).getTime() ?? 0) +
                              1 * 60 * 60 * 1000
                          )
                        : undefined
                    }
                    endDateMaxTime={new Date(new Date().setHours(23, 59, 59))}
                  />
                  {values.private_mode === privateCourseModeType.Zoom && (
                    <InputField
                      type="string"
                      name="zoom_link"
                      label={t('CourseManagement.AddEditForm.ZoomLabel')}
                      value={values.zoom_link}
                      placeholder="https:/dsdsad.zoom.com"
                    />
                  )}
                  <InputField
                    type="number"
                    isCompulsory
                    name="min_participants"
                    label={t('CourseManagement.AddEditForm.Label.MinParticipants')}
                    value={values.min_participants}
                    placeholder={t(
                      'CourseManagement.AddEditForm.Placeholder.MinParticipants'
                    )}
                  />
                  <InputField
                    type="number"
                    isCompulsory
                    name="max_participants"
                    label={t('CourseManagement.AddEditForm.Label.MaxParticipants')}
                    value={values.max_participants}
                    placeholder={t(
                      'CourseManagement.AddEditForm.Placeholder.MaxParticipants'
                    )}
                  />
                  <div className="bnt-wrap">
                    <Button
                      variants="black"
                      isLoading={isLoading}
                      className="w-fit"
                      type="submit"
                    >
                      {t('CourseManagement.AddEditForm.Button.Next')}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card>
        );
      }}
    </Formik>
  );
};

export default AppointmentStepOne;
