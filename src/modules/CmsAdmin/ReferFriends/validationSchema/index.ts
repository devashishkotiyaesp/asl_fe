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
      .required(t('Cms.ReferYourFriends.shortTitleValidation')),
    button_text: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.ButtonText')),
    link_button: Yup.string()
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
    button_title: Yup.string()
      .trim()
      .required(t('Cms.privacyPolicy.summaryPoints.validation'))
      .test(
        'contains-meaningful-text',
        t('Cms.privacyPolicy.summaryPoints.validation'),
        (value) => {
          const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
          return textWithoutTags?.trim() !== '';
        }
      ),
  });
};
