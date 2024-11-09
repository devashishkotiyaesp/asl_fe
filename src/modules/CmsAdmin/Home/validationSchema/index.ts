import { t } from 'i18next';
import { KeysEnum } from 'modules/CmsAdmin/constants';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const HomeValidationSchema = (sectionName: string | undefined) => {
  const { t } = useTranslation();
  // Fields for the 'banner' section
  const bannerFields = {
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
    description: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.descriptionValidation')),
    title_hashing: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.titleHashingValidation')),
    banner_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerTitleValidation')),
    collaboration_logos: Yup.array()
      .min(3, t('Cms.homepage.banner.collaborationValidation'))
      .required(t('Cms.homepage.banner.collaborationLengthValidation')),
    link_button: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.linkButtonValidation')),
    banner_button: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerButtonValidation')),
  };

  // Fields for the 'story' section
  const storyFields = {
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
    description: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.descriptionValidation')),
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.eyebrowTitleValidation')),
    story_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    point_data_array: Yup.array().of(PointsArraySchema()).required(),
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTitleValidation')),
  };

  const whyChooseUsFields = {
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.eyebrowTitleValidation')),
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    point_data_array: Yup.array().of(PointsArraySchema()).required(),
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
  };

  const ctaOneFields = {
    title: Yup.string().trim().required('Cms.homepage.story.titleValidation'),
    cta_button_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTextValidation')),
    // cta_button_url: Yup.string().trim().required('Button Url is required'),
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
    image: Yup.string().trim().required(t('Cms.homepage.common.imageValidation')),
  };

  const serviceFields = {
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.titleValidation')),
    service_sub_title: Yup.string().trim().required('Sub title is required'),
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
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTextValidation')),
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
    point_data_array: Yup.array().of(PointsArraySchema(sectionName)).required(),
  };

  const userInsightFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    sub_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.subTitleValidation')),
    point_data_array: Yup.array().of(PointsArraySchema(sectionName)).required(),
  };

  const aslCoursesFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    sub_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.subTitleValidation')),
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
    point_data_array: Yup.array().of(PointsArraySchema(sectionName)).required(),
  };

  const testimonialFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    sub_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.subTitleValidation')),
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
    point_data_array: Yup.array().of(PointsArraySchema(sectionName)).required(),
  };

  const appDownloadFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    sub_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.subTitleValidation')),
    short_description: Yup.string().trim().required('Description is required'),
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
  };

  const ctaTwoFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
  };

  // Construct the schema based on the sectionName
  const schema = {
    ...(sectionName === KeysEnum.Banner ? bannerFields : {}),
    ...(sectionName === KeysEnum.Story ? storyFields : {}),
    ...(sectionName === KeysEnum.WhyChooseUs ? whyChooseUsFields : {}),
    ...(sectionName === KeysEnum.CtaOne ? ctaOneFields : {}),
    ...(sectionName === KeysEnum.Services ? serviceFields : {}),
    ...(sectionName === KeysEnum.UserInsight ? userInsightFields : {}),
    ...(sectionName === KeysEnum.AslCourses ? aslCoursesFields : {}),
    ...(sectionName === KeysEnum.Testimonials ? testimonialFields : {}),
    ...(sectionName === KeysEnum.AppDownload ? appDownloadFields : {}),
    ...(sectionName === KeysEnum.CtaTwo ? ctaTwoFields : {}),
  };

  return Yup.object().shape(schema);
};

export const PointsArraySchema = (sectionName?: string) => {
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
    button_text:
      sectionName === 'services' || sectionName === 'aslCourses'
        ? Yup.string().required(t('Cms.homepage.story.buttonTitleValidation'))
        : Yup.string().notRequired(),
    // button_url:
    // sectionName === 'services' || sectionName === 'aslCourses'
    // ? Yup.string().required('Button url is required')
    // : Yup.string().notRequired(),
    banner_image:
      sectionName === 'userInsight' ||
      sectionName === 'aslCourses' ||
      sectionName === 'testimonials'
        ? Yup.string().required(t('Cms.homepage.common.imageValidation'))
        : Yup.string().notRequired(),
    username:
      sectionName === 'testimonials'
        ? Yup.string().required(t('Cms.homepage.testimonial.usernameValidation'))
        : Yup.string().notRequired(),
    role:
      sectionName === 'testimonials'
        ? Yup.string().required(t('Cms.homepage.testimonial.roleValidation'))
        : Yup.string().notRequired(),
  });
};
