import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import CreatableReactSelect from 'components/FormElement/CreatableReactSelect';
import DatePicker from 'components/FormElement/datePicker';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType, fileInputEnum } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { Roles } from 'constants/common.constant';
import { Form, Formik } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { WEEKDAYS } from 'modules/Course/Admin/constants';
import { useCommonAslLevel } from 'modules/Course/common/hooks';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { SetFieldValue } from 'types';
import {
  calculateDaysInfo,
  getISOString,
  removeEmptyKeys,
} from '../../helper/form.helper';
import { CourseBasicDetailDataTypes, ZoomBasicTypes } from '../../types';
import { ZoomValidations } from '../../validations';

interface ZoomStepOneProps {
  initialData: { data: CourseBasicDetailDataTypes };
  onSubmit: (data: ZoomBasicTypes) => void;
  isLoading: boolean;
}

const ZoomStepOne: FC<ZoomStepOneProps> = ({ onSubmit, initialData, isLoading }) => {
  const { t } = useTranslation();
  const [callApi] = useAxiosGet();
  const [invitedEditors, setInvitedEditors] = useState<IOptions[]>();
  const userFromRedux = useSelector(getCurrentUser)?.role?.role ?? Roles.Admin;
  const [isAdmin, setIsAdmin] = useState<boolean>(userFromRedux === Roles.Admin);
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
    start_date: initialData.data.start_date || null,
    end_date: initialData.data.end_date || null,
    start_time: initialData.data.start_time
      ? getISOString(String(initialData.data.start_time))
      : null,
    end_time: initialData.data.end_time
      ? getISOString(String(initialData.data.end_time))
      : null,
    price: initialData.data.price || '',
    max_participants: initialData.data.max_participants || 0,
    min_participants: initialData.data.min_participants || 0,
    zoom_link: initialData.data.zoom_link || '',
    repeat_interval_days: initialData.data.repeat_interval_days || [],
    user_teacher_id: initialData.data.user_teacher_id || '',
    editor_teacher_id:
      initialData.data?.invited_course_editors?.map(
        (editor) => editor.user_teacher_id
      ) || [],
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

  useEffect(() => {
    setIsAdmin(userFromRedux === Roles.Admin);
  }, [userFromRedux]);

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
      validationSchema={ZoomValidations(isAdmin)}
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
              {' '}
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
                    acceptTypes="image/*"
                    variant={fileInputEnum.LinkFileInput}
                  />
                </div>
                <div className="right-part">
                  <InputField
                    name="title"
                    label={t('CourseManagement.AddEditForm.TitleLabel')}
                    placeholder={t('CourseManagement.AddEditForm.TitlePlaceholder')}
                    value={values.title}
                    isCompulsory
                  />
                  <ReactEditor
                    label={t('CourseManagement.AddEditForm.DescriptionLabel')}
                    parentClass="h-unset"
                    name="description"
                    placeholder={t(
                      'CourseManagement.AddEditForm.DescriptionPlaceholder'
                    )}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    value={values?.description}
                    isCompulsory
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
                  {isAdmin && (
                    <ReactSelect
                      placeholder={t(
                        'CourseManagement.AddEditForm.SelectTeacherPlaceholder'
                      )}
                      label={t('CourseManagement.AddEditForm.SelectTeacherLabel')}
                      name="user_teacher_id"
                      parentClass="width-full"
                      options={invitedEditors ?? []}
                      isCompulsory
                    />
                  )}
                  {/* this is static but will be dynamic in future */}
                  <ReactSelect
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
                    isCompulsory
                  />
                  <InputField
                    type="number"
                    name="price"
                    label={t('CourseManagement.AddEditForm.PriceLabel')}
                    value={values.price}
                    placeholder={t('CourseManagement.AddEditForm.PricePlaceholder')}
                    prefix="$"
                    isCompulsory
                  />
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
                  <div className="cms-button half simple bg-transparent">
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
                      endingDate={
                        values?.end_time ? new Date(values?.end_time) : null
                      }
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
                  </div>
                  <InputField
                    type="string"
                    name="zoom_link"
                    label={t('CourseManagement.AddEditForm.ZoomLabel')}
                    value={values.zoom_link}
                    placeholder="https://zoom.us/j/1234567890"
                    isCompulsory
                  />
                  <div className="cms-button half simple bg-transparent">
                    <InputField
                      type="number"
                      name="min_participants"
                      label={t('CourseManagement.AddEditForm.MinParticipantsLabel')}
                      value={values.min_participants}
                      placeholder="00"
                      isCompulsory
                    />
                    <InputField
                      type="number"
                      name="max_participants"
                      label={t('CourseManagement.AddEditForm.MaxParticipantsLabel')}
                      value={values.max_participants}
                      placeholder="00"
                      isCompulsory
                    />
                  </div>
                  {isAdmin && (
                    <ReactSelect
                      placeholder={t(
                        'CourseManagement.AddEditForm.InvitedEditorPlaceholder'
                      )}
                      label={t('CourseManagement.AddEditForm.InvitedEditorLabel')}
                      name="editor_teacher_id"
                      parentClass="width-full"
                      options={invitedEditors ?? []}
                      isMulti
                    />
                  )}
                  <div className="bnt-wrap">
                    <Button
                      variants="black"
                      className="w-fit"
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {t('CourseManagement.AddEditForm.NextButtonText')}
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

export default ZoomStepOne;
