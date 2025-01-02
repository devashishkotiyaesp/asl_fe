import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CommunityType } from '../constants';

export const CommunityValidation = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    name: Yup.string().required(t('Community.Title.Required')),
    type: Yup.string().nullable(),
    description: Yup.string()
      .trim()
      .required(t('Community.Description.Required'))
      .test(
        'contains-meaningful-text',
        t('Community.Description.Invalid'),
        (value) => {
          const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
          return textWithoutTags?.trim() !== '';
        }
      ),
    course_id: Yup.string()
      .nullable()
      .when('type', {
        is: (val: string) => val === CommunityType.DISCUSSION,
        then: () => Yup.string().required(t('Community.Course.Required')),
      }),
    media: Yup.string().nullable(),
  });
};

export const ConversationValidation = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    description: Yup.string()
      .trim()
      .test(
        'contains-meaningful-text',
        t('Community.Description.Invalid'),
        (value) => {
          const textWithoutTags = value?.replace(/<\/?[^>]+(>|$)/g, '');
          return textWithoutTags?.trim() !== '';
        }
      ),
  });
};
