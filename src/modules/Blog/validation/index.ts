import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const EditBlogSchema = () => {
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

export const CreateBlogSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    banner_image: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.UploadPhoto')),
    tag: Yup.string().trim().required(t('Dictionary.EditForm.Errors.TitleHashTag')),
    title: Yup.string().trim().required(t('Blog.Form.Errors.BlogTitle')),
    author: Yup.string().trim().required(t('Blog.Form.Errors.Author')),
    bio: Yup.string().trim().required(t('Blog.Form.Errors.BlogBio')),
    conclusion: Yup.string().trim().required(t('Blog.Form.Errors.Conclusion')),
    details: Yup.string().trim().required(t('Blog.Form.Errors.BlogDetail')),
  });
};
