import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const NoteFilterValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    startDate: Yup.string().required(t('AuditLog.Filter.Errors.startDate')),
    endDate: Yup.string().required(t('AuditLog.Filter.Errors.endDate')),
  });
};
