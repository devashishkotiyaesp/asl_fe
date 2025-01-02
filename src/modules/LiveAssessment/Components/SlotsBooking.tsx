import Button from 'components/Button/Button';
import DatePicker from 'components/FormElement/datePicker';
import Image from 'components/Image';
import { format, parseISO, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { t } from 'i18next';
import _ from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { SlotBookingSchema } from '../validation';

const SlotsBooking = () => {
  const [getSlotsApi, { isLoading }] = useAxiosPost();
  const [createAssessment, { isLoading: assessmentLoading }] = useAxiosPost();
  const user = useSelector(getCurrentUser);
  const [activeState, setActiveState] = useState<number | null>(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigate = useNavigate();
  const initialValues = {
    date: '',
    start_time: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    const bodyData = {
      ...values,
      date: format(new Date(values.date), 'yyyy-MM-dd'),
      student_id: user?.id,
    };
    const { error } = await createAssessment(`/live-assessment`, bodyData);

    if (_.isNil(error)) {
      navigate(`/courses/assessment`);
    }
  };

  const getAVailableSlots = async (date: Date) => {
    const newFormattedDate = zonedTimeToUtc(startOfDay(date), 'UTC').toISOString();
    const response = await getSlotsApi(`/live-assessment/available-slots`, {
      date: newFormattedDate,
    });
    setAvailableSlots(response.data);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SlotBookingSchema()}
    >
      {({ values, setFieldValue, errors }) => {
        return (
          <Form>
            <div className="w-1/3 mb-5">
              <DatePicker
                name="date"
                icon
                labelClass="!text-[16px]"
                label={t('teacherAvailability.form.startDate.title')}
                selectedDate={values?.date ? parseISO(values?.date) : null}
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                onChange={(date) => {
                  getAVailableSlots(date);
                  if (date) {
                    setActiveState(null);
                    setFieldValue('date', date.toISOString());
                  }
                }}
                placeholder={t('teacherAvailability.form.startDate.placeholder')}
              />
            </div>
            {isLoading ? (
              <Image loaderType="Spin" />
            ) : (
              <>
                {availableSlots.length > 0 ? (
                  <div>
                    <label className="mb-2 block w-full">
                      {t('LiveAssessment.slots.title')}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {Array.isArray(availableSlots) &&
                        availableSlots?.length > 0 &&
                        availableSlots?.map((slot, index) => {
                          const isActive = activeState === index; // Check if this slot is active
                          return (
                            <Button
                              key={`slot_${index + 1}`}
                              className={`slot-btn ${isActive ? 'bg-PrimaryWood text-white' : ''}`}
                              onClickHandler={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                const button = e.currentTarget as HTMLButtonElement; // Cast to HTMLButtonElement
                                setActiveState(index);
                                setFieldValue('start_time', button.innerText);
                              }}
                            >
                              <p>{slot}</p>
                            </Button>
                          );
                        })}
                    </div>
                    {!_.isEmpty(errors.start_time) ? (
                      <p className="error-message text-sm font-medium block text-red-600 mt-3">
                        {t('LiveAssessment.slotSelection.Errors.Title')}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  values.date && <p>{t('LiveAssessment.slots.notAvailable')}</p>
                )}
              </>
            )}
            {availableSlots.length > 0 ? (
              <Button
                type="submit"
                variants="black"
                className="mt-[30px]"
                isLoading={assessmentLoading}
                disabled={assessmentLoading}
              >
                {t('LiveAssessment.slots.price')}
              </Button>
            ) : (
              ''
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default SlotsBooking;
