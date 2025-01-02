// ** Yup Validation **
import { t } from 'i18next';
import * as Yup from 'yup';
import { checkTimeOverlap } from '../constants';
import { validationProps } from '../types';

export const TeacherAvailabilityValidationSchema = () => {
  return Yup.object().shape({
    startDate: Yup.date().required(t('TeacherAvailability.validation.startDate')),
    endDate: Yup.date().required(t('TeacherAvailability.validation.endDate')),
    week_days: Yup.array()
      .min(1, t('TeacherAvailability.validation.weekDays'))
      .required(t('TeacherAvailability.validation.weekDays')),
    time_ranges: Yup.array()
      .of(
        Yup.object().shape({
          start_time: Yup.date().required(
            t('TeacherAvailability.validation.startTime')
          ),
          end_time: Yup.date()
            .required(t('TeacherAvailability.validation.endTime'))
            .min(
              Yup.ref('start_time'),
              t('TeacherAvailability.validation.endTimeValid')
            ),
        })
      )
      .test(
        'is-valid-time',
        'Date must be valid',
        (val: validationProps[] | undefined, { path }) => {
          const conflicts = checkTimeOverlap(
            val as unknown as { start_time: string; end_time: string }[]
          );
          const errors: Yup.ValidationError[] = [];

          /* ******************** Duplicate Dates Validation ******************** */
          if (conflicts.length > 0) {
            errors.push(
              ...conflicts.flatMap(([index1, index2]) => [
                new Yup.ValidationError(
                  t('teacherAvailability.form.timeSlots.startValidation', {
                    Session: index2 + 1,
                  }),
                  null,
                  `${path}.[${index1}].start_time`
                ),
                new Yup.ValidationError(
                  t('teacherAvailability.form.timeSlots.endValidation', {
                    Session: index1 + 1,
                  }),
                  null,
                  `${path}.[${index2}].end_time`
                ),
              ])
            );
          }
          if (errors?.length) throw new Yup.ValidationError(errors);
          return true;
        }
      ),
  });
};

export const TeacherAvailabilityUpdateValidationSchema = () => {
  return Yup.object().shape({
    time_ranges: Yup.array()
      .of(
        Yup.object().shape({
          start_time: Yup.date().required(
            t('TeacherAvailability.validation.startTime')
          ),
          end_time: Yup.date()
            .required(t('TeacherAvailability.validation.endTime'))
            .min(
              Yup.ref('start_time'),
              t('TeacherAvailability.validation.endTimeValid')
            ),
        })
      )
      .test(
        'is-valid-time',
        t('TeacherAvailability.validation.dateValid'),
        (val: validationProps[] | undefined, { path }) => {
          const conflicts = checkTimeOverlap(
            val as unknown as { start_time: string; end_time: string }[]
          );
          const errors: Yup.ValidationError[] = [];

          /* ******************** Duplicate Dates Validation ******************** */
          if (conflicts.length > 0) {
            errors.push(
              ...conflicts.flatMap(([index1, index2]) => [
                new Yup.ValidationError(
                  t('teacherAvailability.form.timeSlots.startValidation', {
                    Session: index2 + 1,
                  }),
                  null,
                  `${path}.[${index1}].start_time`
                ),
                new Yup.ValidationError(
                  t('teacherAvailability.form.timeSlots.endValidation', {
                    Session: index1 + 1,
                  }),
                  null,
                  `${path}.[${index2}].end_time`
                ),
              ])
            );
          }
          if (errors?.length) throw new Yup.ValidationError(errors);
          return true;
        }
      ),
  });
};
