import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { isEmptyHtmlString } from '../helper';

export const CMSEventValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    hashTag: Yup.string().trim().required(t('Event.EditForm.Errors.Title')),
    title_event: Yup.string()
      .trim()
      .required(t('Event.EditForm.Errors.TitleHashTag')),
    description: Yup.string()
      .trim()
      .required(t('Event.EditForm.Errors.TitleDescription')),
    banner_image: Yup.string()
      .trim()
      .required(t('Event.EditForm.Errors.UploadPhoto')),
    button_title: Yup.string()
      .trim()
      .required(t('Event.EditForm.Errors.ButtonTitle')),
    button_text: Yup.string().trim().required(t('Event.EditForm.Errors.ButtonText')),
    button_url: Yup.string().trim().required(t('Event.EditForm.Errors.ButtonUrl')),
  });
};

export const EventValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    image_path: Yup.string().trim().required(t('Event.Form.Errors.Image')),
    title: Yup.string().trim().required(t('Event.Form.Errors.EventTitle')),
    date: Yup.date().required(t('Event.Form.Errors.Date')),
    start_time: Yup.date().required(t('Event.Form.Errors.StartTime')),
    end_time: Yup.date().required(t('Event.Form.Errors.EndTime')),
    description: Yup.string()
      .trim()
      .required(t('Event.Form.Errors.Description'))
      .test(
        'not-empty-html',
        t('Event.Form.Errors.Description'),
        (value) => !value || !isEmptyHtmlString(value)
      ),
    location: Yup.string().trim().required(t('Event.Form.Errors.Location')),
  });
};
