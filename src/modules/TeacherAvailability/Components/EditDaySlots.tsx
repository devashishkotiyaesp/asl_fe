import Button from 'components/Button/Button';
import DatePicker from 'components/FormElement/datePicker';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import {
  endOfDay,
  getHours,
  getMinutes,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { FieldArray, Form, Formik, FormikValues } from 'formik';
import { useAxiosPut } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { generateTimeSlots } from '../constants';
import { AllSlotsProps, ErrorType } from '../types';
import { TeacherAvailabilityUpdateValidationSchema } from '../validation';

interface ModalData {
  daySlots: { start_time: string; end_time: string; id: string; date: string }[];
  selectedDate?: string | Date;
  getDayLoading?: boolean;
  getSlotListing: (date: string) => void;
}

export const mergeDateTime = (dateString?: string, timeString?: string) => {
  if (timeString && dateString) {
    const date = parseISO(dateString);
    const time = parseISO(timeString);
    const hours = getHours(time);
    const minutes = getMinutes(time);
    const mergedDate = setMinutes(setHours(date, hours), minutes);
    return mergedDate?.toISOString();
  }
  return dateString;
};

export const EditDaySlots = ({
  daySlots,
  selectedDate,
  getDayLoading,
  getSlotListing,
}: ModalData) => {
  const [updateAvailability, { isLoading: updateLoading }] = useAxiosPut();
  const [submit, setSubmit] = useState(false);
  const confirmationModal = useModal();
  const [initialValues, setInitialValues] = useState({
    time_ranges: [{ start_time: '', end_time: '', id: '', date: '' }],
    deleted_ids: [] as string[],
  });
  useEffect(() => {
    const daySlotsDetails = {
      time_ranges:
        daySlots?.map((slot) => ({
          start_time: slot?.start_time,
          end_time: slot?.end_time,
          id: slot?.id,
          date: slot?.date,
        })) ?? [],

      deleted_ids: [],
    };
    checkSlotTime(daySlotsDetails.time_ranges);
    setInitialValues(daySlotsDetails);
  }, [daySlots]);

  const checkSlotTime = (daySlotsDetails: AllSlotsProps[]) => {
    daySlotsDetails?.map((range: { start_time: string; end_time: string }) => {
      const startDate = parseISO(range.start_time);
      const endDate = parseISO(range.end_time);
      const endOfSelectedDay = endOfDay(selectedDate as Date);
      const startOfSelectedDay = startOfDay(selectedDate as Date);
      // Check if start_time is before the end of the selected day
      if (startDate >= startOfSelectedDay && startDate <= endOfSelectedDay) {
        range.start_time = range.start_time as string; // No change needed
      } else {
        // Update start_time to the start of the selected day
        range.start_time = startOfSelectedDay.toISOString();
      }
      if (endDate >= startOfSelectedDay && endDate <= endOfSelectedDay) {
        range.end_time = range.end_time as string;
      } else {
        range.end_time = endOfSelectedDay.toISOString();
      }
      return range;
    });
  };

  const handleSubmit = async (values: FormikValues) => {
    const bodyData = values?.time_ranges?.map((slotData: AllSlotsProps) => {
      const mergedStartTime = mergeDateTime(
        values?.time_ranges[0]?.date,
        slotData.start_time
      );
      const mergedEndTime = mergeDateTime(
        values?.time_ranges[0]?.date,
        slotData.end_time
      );

      return {
        date: slotData?.date || values?.time_ranges[0]?.date,
        start_time: slotData?.id ? slotData?.start_time : mergedStartTime,
        end_time: slotData?.id ? slotData?.end_time : mergedEndTime,
        ...(slotData.id && { id: slotData.id }),
      };
    });
    setInitialValues({
      time_ranges: bodyData as AllSlotsProps[],
      deleted_ids: values.deleted_ids,
    });
    confirmationModal.openModal();
  };
  const handleOkProcess = async () => {
    const { error } = await updateAvailability('/teacher-availabilities', {
      availabilities: initialValues.time_ranges,
      deletedIds: initialValues.deleted_ids,
    });
    if (_.isNil(error)) {
      confirmationModal.closeModal();
      getSlotListing(
        zonedTimeToUtc(startOfDay(selectedDate as Date), 'UTC').toISOString()
      );
    }
  };
  const isExpired = selectedDate && new Date() > selectedDate;
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={TeacherAvailabilityUpdateValidationSchema()}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <Form>
              {getDayLoading ? (
                <div className="spinnerLoad">
                  <Image loaderType="Spin" />
                </div>
              ) : (
                <>
                  {values?.time_ranges?.length > 0 && (
                    <label className="select-time-slot-wrap-title">
                      {t('teacherAvailability.form.timeSlots.title')}
                    </label>
                  )}

                  <FieldArray
                    name="time_ranges"
                    render={(timeRangeArrayHelpers) => {
                      return (
                        <>
                          {values?.time_ranges?.map((timeRange, timeIndex) => {
                            const excludeTimes = values.time_ranges
                              .filter((_, idx) => idx !== timeIndex) // Exclude current time range
                              .flatMap((range) => {
                                const startTime = parseISO(range.start_time);
                                const endTime = parseISO(range.end_time);
                                return generateTimeSlots(startTime, endTime); // Generate all slots for each range
                              });
                            return (
                              <div key={`slots_${timeIndex + 1}`}>
                                <div
                                  key={`time_range_day_${timeIndex}`}
                                  className="select-time-slot-wrap mt-2"
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
                                    excludeTimes={excludeTimes}
                                    noErrorShow={false}
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
                                  {!isExpired &&
                                    values?.time_ranges?.length > 0 &&
                                    timeIndex === values.time_ranges.length - 1 && (
                                      <Button
                                        variants="PrimaryWoodLight"
                                        onClickHandler={() =>
                                          timeRangeArrayHelpers.push({
                                            start_time: '',
                                            end_time: '',
                                          })
                                        }
                                        className="gap-1 h-10"
                                      >
                                        <Image iconName="plus" />
                                      </Button>
                                    )}
                                  {!isExpired && values.time_ranges.length > 1 && (
                                    <Button
                                      className="action-button red icon-delete"
                                      onClickHandler={() => {
                                        timeRangeArrayHelpers.remove(timeIndex);
                                        setFieldValue('deleted_ids', [
                                          ...values.deleted_ids,
                                          timeRange.id,
                                        ]);
                                      }}
                                    >
                                      <Image iconName="trashIcon" />
                                    </Button>
                                  )}
                                </div>
                                {submit &&
                                errors.time_ranges &&
                                Array.isArray(errors.time_ranges) ? (
                                  <>
                                    <p className="error-message">
                                      {(errors as unknown as ErrorType)
                                        ?.time_ranges?.[timeIndex]?.start_time
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
                              </div>
                            );
                          })}
                        </>
                      );
                    }}
                  />
                </>
              )}

              {!isExpired && values?.time_ranges?.length > 0 && (
                <div className="btn-wrap">
                  <Button
                    type="submit"
                    variants="PrimaryWoodLight"
                    onClickHandler={() => {
                      setSubmit(true);
                    }}
                  >
                    {t('Dictionary.EditForm.SubmitButton')}
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
      <ConfirmationPopup
        showCloseIcon
        modal={confirmationModal}
        deleteTitle={t('teacherAvailability.form.timeSlots.proceedText')}
        cancelButtonText={`${t('Settings.cancel')}`}
        confirmButtonText="Ok"
        cancelButtonFunction={() => confirmationModal.closeModal()}
        confirmButtonFunction={handleOkProcess}
        popUpType="warning"
        isLoading={updateLoading}
        isDisabled={updateLoading}
      />
    </>
  );
};
