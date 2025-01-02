import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const VirtualClassValidationSchema = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
  return Yup.object().shape({
    title_hashing: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.titleHashingValidation')),
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    description: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.descriptionValidation'))
      .test(
        'contains-meaningful-text',
        t('Cms.homepage.banner.descriptionValidation'),
        (value) => {
          const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
          return textWithoutTags?.trim() !== '';
        }
      ),
    short_description: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.descriptionValidation'))
      .test(
        'contains-meaningful-text',
        t('Cms.homepage.banner.descriptionValidation'),
        (value) => {
          const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
          return textWithoutTags?.trim() !== '';
        }
      ),
    cta_description: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.descriptionValidation'))
      .test(
        'contains-meaningful-text',
        t('Cms.homepage.banner.descriptionValidation'),
        (value) => {
          const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
          return textWithoutTags?.trim() !== '';
        }
      ),
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTextValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
  });
};
