import { KeysEnum } from 'modules/CmsAdmin/constants';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const GlobalSectionValidationSchema = (sectionName: string | undefined) => {
  const { t } = useTranslation();

  const appDownloadFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    sub_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.subTitleValidation')),
    short_description: Yup.string()
      .trim()
      .required(t('Description is required'))
      .test('contains-meaningful-text', t('Description is required'), (value) => {
        const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
        return textWithoutTags?.trim() !== '';
      }),
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
  };

  const ctaTwoFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
  };

  // Construct the schema based on the sectionName
  const schema = {
    ...(sectionName === KeysEnum.AppDownload ? appDownloadFields : {}),
    ...(sectionName === KeysEnum.CtaTwo ? ctaTwoFields : {}),
  };

  return Yup.object().shape(schema);
};
