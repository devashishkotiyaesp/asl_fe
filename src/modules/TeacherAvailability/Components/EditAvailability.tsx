import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import DatePicker from 'components/FormElement/datePicker';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { Modal } from 'components/Modal/Modal';
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfDay,
  parseISO,
  startOfDay,
} from 'date-fns';
import { FieldArray, Form, Formik, FormikValues } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import _ from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { ModalProps } from 'types/comman';
import { generateTimeSlots } from '../constants';
import { EditAvailabilityProps, ErrorType } from '../types';
import { TeacherAvailabilityValidationSchema } from '../validation';

interface ModalData {
  modal: ModalProps;
  fetchEvents: () => void;
}

export const EditAvailability = ({ modal, fetchEvents }: ModalData) => {
  const [createAvailability, { isLoading }] = useAxiosPost();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const confirmationModal = useModal();
  const user = useSelector(getCurrentUser);
  const [submit, setSubmit] = useState(false);
  const [initialValues, setInitialValues] = useState({
    startDate: '',
    endDate: '',
    time_ranges: [{ start_time: '', end_time: '' }],
    week_days: [0, 1, 2, 3, 4, 5, 6] as number[],
  });
  const handleSubmit = async (values: FormikValues) => {
    const bodyData = {
      ...values,
      week_days: values.week_days,
      userId: user?.id,
      timezone: timeZone,
    };
    setInitialValues(bodyData as unknown as EditAvailabilityProps);
    if (Array.isArray(values.week_days) && values.week_days.length > 0) {
      confirmationModal.openModal();
    }
  };

  const weekDays = [
    {
      label: t('teacherAvailability.weekDays.mondayTitle'),
      value: 1,
    },
    {
      label: t('teacherAvailability.weekDays.tuesdayTitle'),
      value: 2,
    },
    {
      label: t('teacherAvailability.weekDays.wednesdayTitle'),
      value: 3,
    },
    {
      label: t('teacherAvailability.weekDays.thursdayTitle'),
      value: 4,
    },
    {
      label: t('teacherAvailability.weekDays.fridayTitle'),
      value: 5,
    },
    {
      label: t('teacherAvailability.weekDays.saturdayTitle'),
      value: 6,
    },
    {
      label: t('teacherAvailability.weekDays.sundayTitle'),
      value: 0,
    },
  ];
  const handleOkProcess = async () => {
    const { error } = await createAvailability(
      '/teacher-availabilities/bulkInsert',
      initialValues
    );

    if (_.isNil(error)) {
      modal.closeModal();
      confirmationModal.closeModal();
      fetchEvents();
    }
  };
  return (
    <>
      <Modal
        width="max-w-[900px]"
        modal={modal}
        closeOnEscape
        headerTitle={t('teacherAvailability.form.title')}
        closeOnOutsideClick
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={TeacherAvailabilityValidationSchema()}
        >
          {({ values, setFieldValue, errors }) => {
            const parsedStartDate = parseISO(values.startDate);
            const parsedEndDate = parseISO(values.endDate);
            // Calculate the difference between the start and end date (including both dates)
            const differenceInDays =
              differenceInCalendarDays(parsedEndDate, parsedStartDate) + 1;
            // If the difference is <= 8 days, get the days between the start and end date
            let validDays: number[] = [];
            if (differenceInDays <= 8) {
              validDays = eachDayOfInterval({
                start: startOfDay(parsedStartDate),
                end: endOfDay(parsedEndDate),
              }).map((date) => date.getDay()); // Get the day of the week (0-6)
            }
            return (
              <Form>
                <div className="manage-time-select-date">
                  <DatePicker
                    name="startDate"
                    label={t('teacherAvailability.form.startDate.title')}
                    icon
                    selectedDate={
                      values?.startDate ? parseISO(values?.startDate) : null
                    }
                    minDate={new Date(new Date().setDate(new Date().getDate()))}
                    maxDate={values.endDate ? parseISO(values.endDate) : undefined}
                    onChange={(date) => {
                      setFieldValue(`week_days`, [0, 1, 2, 3, 4, 5, 6]);
                      if (date) {
                        setFieldValue('startDate', date.toISOString());
                      }
                    }}
                    placeholder={t('teacherAvailability.form.startDate.placeholder')}
                    isCompulsory
                  />
                  <DatePicker
                    name="endDate"
                    label={t('teacherAvailability.form.endDate.title')}
                    icon
                    selectedDate={values?.endDate ? parseISO(values?.endDate) : null}
                    onChange={(date) => {
                      setFieldValue(`week_days`, [0, 1, 2, 3, 4, 5, 6]);
                      if (date) {
                        setFieldValue('endDate', date.toISOString());
                      }
                    }}
                    minDate={
                      values.startDate ? parseISO(values.startDate) : undefined
                    }
                    placeholder={t('teacherAvailability.form.endDate.placeholder')}
                    isCompulsory
                  />
                </div>
                <div className="manage-time-select-days-wrap ">
                  <p className="manage-time-select-days-title">
                    {t('teacherAvailability.form.weekDays.title')}
                  </p>
                  <div className="manage-time-select-days">
                    {Array.isArray(weekDays) &&
                      weekDays.length > 0 &&
                      weekDays.map((data, dayIndex) => {
                        const isDisabled =
                          differenceInDays <= 8 && !validDays.includes(data.value); // Disable if day is not in the valid range
                        const isChecked = values.week_days.includes(data.value); // Check if the current day is checked

                        return (
                          <div key={dayIndex}>
                            <Checkbox
                              id={`week_days[${dayIndex}]`}
                              labelClass="text-white"
                              name={`week_days[${dayIndex}]`}
                              onChange={() => {
                                let updatedWeekDays;
                                if (isChecked) {
                                  updatedWeekDays = values.week_days.filter(
                                    (day) => day !== data.value
                                  );
                                } else {
                                  updatedWeekDays = [
                                    ...values.week_days,
                                    data.value,
                                  ];
                                }
                                setFieldValue('week_days', updatedWeekDays);
                              }}
                              check={isDisabled ? false : isChecked}
                              text={data.label}
                              disabled={isDisabled}
                              parentClass={isDisabled ? 'cursor-not-allowed' : ''}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                {submit && errors.week_days ? (
                  <p className="error-message">
                    {t('TeacherAvailability.validation.weekDays')}
                  </p>
                ) : (
                  ''
                )}
                <label className="select-time-slot-wrap-title">
                  {t('teacherAvailability.form.timeSlots.title')}
                </label>
                <FieldArray
                  name="time_ranges"
                  render={(timeRangeArrayHelpers) => {
                    return (
                      <>
                        {values?.time_ranges.map((timeRange, timeIndex) => {
                          const excludeTimes = values.time_ranges
                            .filter((_, idx) => idx !== timeIndex) // Exclude current time range
                            .flatMap((range) => {
                              const startTime = parseISO(range.start_time);
                              const endTime = parseISO(range.end_time);
                              return generateTimeSlots(startTime, endTime); // Generate all slots for each range
                            });
                          return (
                            <>
                              <div
                                key={`time_range_${timeIndex}`}
                                className="flex gap-4 items-center mt-2"
                              >
                                <DatePicker
                                  startDateName={`time_ranges[${timeIndex}].start_time`}
                                  endDateName={`time_ranges[${timeIndex}].end_time`}
                                  parentClass="flex-[1_0_0%]"
                                  range
                                  selectedDate={
                                    timeRange?.start_time
                                      ? parseISO(timeRange?.start_time)
                                      : undefined
                                  }
                                  endingDate={
                                    timeRange?.end_time
                                      ? parseISO(timeRange?.end_time)
                                      : undefined
                                  }
                                  onRangeChange={(startDate, endDate) => {
                                    if (setFieldValue) {
                                      if (startDate)
                                        setFieldValue(
                                          `time_ranges[${timeIndex}].start_time`,
                                          startDate.toISOString()
                                        );
                                      if (endDate)
                                        setFieldValue(
                                          `time_ranges[${timeIndex}].end_time`,
                                          endDate.toISOString()
                                        );
                                    }
                                  }}
                                  noErrorShow={false}
                                  excludeTimes={excludeTimes}
                                  isTimePicker
                                  showTimeSelectOnly
                                  startDatePlaceholder={t(
                                    'teacherAvailability.form.timeSlots.startTime.title'
                                  )}
                                  endDatePlaceholder={t(
                                    'teacherAvailability.form.timeSlots.endTime.title'
                                  )}
                                  dateFormat="h:mm aa"
                                  startDateMinTime={
                                    new Date(new Date().setHours(0, 0, 0))
                                  }
                                  startDateMaxTime={
                                    timeRange?.end_time
                                      ? parseISO(timeRange?.end_time)
                                      : undefined
                                  }
                                  endDateMinTime={
                                    timeRange?.start_time
                                      ? parseISO(timeRange?.start_time)
                                      : undefined
                                  }
                                  endDateMaxTime={
                                    new Date(new Date().setHours(23, 59, 59))
                                  }
                                />
                                {timeIndex === values.time_ranges.length - 1 && (
                                  <Button
                                    variants="PrimaryWoodLight"
                                    onClickHandler={() => {
                                      timeRangeArrayHelpers.push({
                                        start_time: '',
                                        end_time: '',
                                      });
                                    }}
                                    className="gap-1 h-10"
                                  >
                                    <Image iconName="plus" />
                                  </Button>
                                )}
                                {values.time_ranges.length > 1 ? (
                                  <Button
                                    className="action-button red icon-delete"
                                    onClickHandler={() => {
                                      timeRangeArrayHelpers.remove(timeIndex);
                                    }}
                                  >
                                    <Image iconName="trashIcon" />
                                  </Button>
                                ) : (
                                  ''
                                )}
                              </div>
                              {submit &&
                              errors.time_ranges &&
                              Array.isArray(errors.time_ranges) ? (
                                <>
                                  <p className="error-message">
                                    {(errors as unknown as ErrorType)?.time_ranges?.[
                                      timeIndex
                                    ]?.start_time
                                      ? `${`${(errors as unknown as ErrorType)?.time_ranges[timeIndex]?.start_time} ` ?? ''}`
                                      : ''}
                                    {(errors as unknown as ErrorType).time_ranges[
                                      timeIndex
                                    ]?.end_time
                                      ? `${(errors as unknown as ErrorType).time_ranges[timeIndex]?.start_time ? 'Or ' : ''} ${(errors as unknown as ErrorType).time_ranges[timeIndex]?.end_time}`
                                      : ''}
                                  </p>
                                </>
                              ) : null}
                            </>
                          );
                        })}
                      </>
                    );
                  }}
                />
                <div className="btn-wrap">
                  <Button
                    type="submit"
                    variants="PrimaryWoodLight"
                    onClickHandler={() => {
                      setSubmit(true);
                    }}
                  >
                    {t('Community.Table.Add')}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <ConfirmationPopup
        showCloseIcon
        modal={confirmationModal}
        deleteTitle={t('teacherAvailability.form.timeSlots.proceedText')}
        linkText="abcd"
        cancelButtonText={`${t('Settings.cancel')}`}
        confirmButtonText="Ok"
        cancelButtonFunction={() => confirmationModal.closeModal()}
        confirmButtonFunction={handleOkProcess}
        popUpType="warning"
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </>
  );
};
