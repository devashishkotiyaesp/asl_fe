import { t } from 'i18next';
import { KeysEnum } from 'modules/CmsAdmin/constants';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const HomeValidationSchema = (sectionName: string | undefined) => {
  const { t } = useTranslation();
  // Fields for the 'banner' section

  // Fields for the 'story' section
  const storyFields = {
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
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
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.eyebrowTitleValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTitleValidation')),
  };

  const visionFields = {
    collaboration_logos: Yup.array()
      .of(Yup.string().trim())
      .min(2, t('Cms.aboutUs.vision.bannerImageLengthValidation'))
      .max(2, t('Cms.aboutUs.vision.bannerImageLengthValidation'))
      .required(t('Cms.homepage.common.imageValidation')),
    multiple_banner_images: Yup.array()
      .of(Yup.string().trim())
      .min(2, t('Cms.aboutUs.vision.bannerImageLengthValidation'))
      .max(2, t('Cms.aboutUs.vision.bannerImageLengthValidation'))
      .required(t('Cms.homepage.banner.bannerImageValidation')),
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
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.eyebrowTitleValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    link_button: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.linkButtonValidation')),
  };

  const aboutUsersFields = {
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerTitleValidation')),
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

    fun_tidbits: Yup.string()
      .trim()
      .required(t('Cms.aboutUs.aboutUsers.funTidbits')),
  };

  const localStoriesFields = {
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.eyebrowTitleValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    point_data_array: Yup.array().of(PointsArraySchema()).required(),
  };

  const ctaFields = {
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTitleValidation')),
  };

  // Construct the schema based on the sectionName
  const schema = {
    ...(sectionName === KeysEnum.AboutStory ? storyFields : {}),
    ...(sectionName === KeysEnum.Vision ? visionFields : {}),
    ...(sectionName === KeysEnum.AboutUsers ? aboutUsersFields : {}),
    ...(sectionName === KeysEnum.LocalStories ? localStoriesFields : {}),
    ...(sectionName === KeysEnum.aboutCta ? ctaFields : {}),
  };

  return Yup.object().shape(schema);
};

export const PointsArraySchema = () => {
  return Yup.object().shape({
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    date: Yup.string().trim().required(t('Cms.aboutUs.aboutUsers.dateValidation')),
    banner_image: Yup.string().required(t('Cms.homepage.common.imageValidation')),
  });
};

export const CrewValidation = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.common.imageValidation')),
    banner_video: Yup.string().trim().required(t('Cms.courses.videoValidation')),
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
    username: Yup.string()
      .trim()
      .required(t('Cms.homepage.testimonial.usernameValidation')),
    designation: Yup.string()
      .trim()
      .required(t('Cms.aboutUs.crew.designationValidation')),
    fun_tidbits: Yup.string()
      .trim()
      .required(t('Cms.aboutUs.aboutUsers.funTidbits')),
  });
};

export const JourneyValidation = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.common.imageValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
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
    year: Yup.string().trim().required(t('Cms.aboutUs.journey.YearValidation')),
  });
};
