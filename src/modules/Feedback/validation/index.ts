import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const SupportRequestValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object({
    query: Yup.array().of(
      Yup.object({
        question: Yup.string().required(
          t('SupportRequest.Form.Query.Error.question')
        ),
        answer: Yup.string().required(t('SupportRequest.Form.Query.Error.answer')),
      })
    ),
  });
};

export const SupportRequestFormValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    query_type: Yup.string().required(
      t('SupportRequest.Form.Query.Error.QueryType')
    ),
    query: Yup.string().required(t('SupportRequest.Form.Query.Error.Message')),
  });
};

export const CreateTagSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    tag: Yup.string().trim().required(t('Dictionary.EditForm.Errors.TitleHashTag')),
  });
};

export const SupportFilterValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    startDate: Yup.string().nullable(),
    endDate: Yup.string()
      .nullable()
      .when('startDate', {
        is: (val: string) => val != null,
        then: () => Yup.string().required(t('AuditLog.Filter.Errors.endDate')),
      }),
  });
};
