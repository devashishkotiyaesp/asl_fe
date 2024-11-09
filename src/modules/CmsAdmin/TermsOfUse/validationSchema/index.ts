import { t, TFunction } from 'i18next';
import * as Yup from 'yup';

export const TermsValidationSchema = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
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
    summary_keyPoints: Yup.string()
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
  });
};
