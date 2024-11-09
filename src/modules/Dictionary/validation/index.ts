import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const EditDictionarySchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    title_hashTag: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.Title')),
    title_of_hashTag: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.TitleHashTag')),
    hashTag_description: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.TitleDescription')),
    banner_image: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.UploadPhoto')),
    button_title: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.ButtonTitle')),
    button_text: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.ButtonText')),
    button_url: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.ButtonUrl')),
  });
};
