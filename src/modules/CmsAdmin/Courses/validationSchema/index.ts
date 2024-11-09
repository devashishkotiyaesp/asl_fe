import { t, TFunction } from 'i18next';
import * as Yup from 'yup';

export const CourseValidationSchema = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
  return Yup.object().shape({
    title_hashing: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),

    button_text: Yup.string()
      .trim()
      .required(t('Dictionary.EditForm.Errors.ButtonText')),
    point_data_array: Yup.array().of(PointsArraySchema()).required(),
  });
};

export const PointsArraySchema = () => {
  return Yup.object().shape({
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
    button_text: Yup.string().required(
      t('Cms.homepage.story.buttonTitleValidation')
    ),
    // fun_tidbits: Yup.string()
    // .trim()
    // .required(t('Cms.aboutUs.aboutUsers.funTidbits'))
    // .test(
    // 'contains-meaningful-text',
    // t('Cms.aboutUs.aboutUsers.funTidbits'),
    // (value) => {
    // const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
    // return textWithoutTags?.trim() !== '';
    // }
    // ),
    banner_image: Yup.string().required(
      t('Cms.homepage.banner.bannerImageValidation')
    ),
    // banner_video: Yup.string().required(t('Cms.courses.videoValidation')),
  });
};
