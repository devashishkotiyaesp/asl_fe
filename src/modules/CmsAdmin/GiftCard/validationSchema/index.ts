import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const ReferYourFriendsValidationSchema = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
  return Yup.object().shape({
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    button_text: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.ButtonText')),
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
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
    image: Yup.string().trim().required(t('Cms.homepage.common.imageValidation')),
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
  });
};
