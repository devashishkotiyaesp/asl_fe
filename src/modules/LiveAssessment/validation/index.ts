import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const SlotBookingSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    start_time: Yup.string()
      .trim()
      .required(t('LiveAssessment.slotSelection.Errors.Title')),
  });
};
