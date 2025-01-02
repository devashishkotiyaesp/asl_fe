import { t } from 'i18next';
import { KeysEnum } from 'modules/CmsAdmin/constants';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const OrganizationValidationSchema = (sectionName: string | undefined) => {
  const { t } = useTranslation();
  // Fields for the 'banner' section

  // Fields for the 'story' section
  const collaboratingFields = {
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
    title: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerTitleValidation')),
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTitleValidation')),
    form_title: Yup.string()
      .trim()
      .required(t('Cms.organization.collaboration.formValidation')),
    point_data_array: Yup.array().of(PointsArraySchema()).required(),
  };

  const serviceFields = {
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
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    point_data_array: Yup.array().of(PointsArraySchema()).required(),
  };

  const ctaOneFields = {
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
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTitleValidation')),
  };

  const ctaTwoFields = {
    title: Yup.string().trim().required(t('Cms.homepage.story.titleValidation')),
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTitleValidation')),
  };

  const benefitsFields = {
    eyebrow_title: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.eyebrowTitleValidation')),
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
  };

  // Construct the schema based on the sectionName
  const schema = {
    ...(sectionName === KeysEnum.OrgCollaborating ? collaboratingFields : {}),
    ...(sectionName === KeysEnum.OrgWork ? serviceFields : {}),
    ...(sectionName === KeysEnum.OrgCta1 ? ctaOneFields : {}),
    ...(sectionName === KeysEnum.OrgCta2 ? ctaTwoFields : {}),
    ...(sectionName === KeysEnum.OrgBenefits ||
    sectionName === KeysEnum.OrgTestimonials
      ? benefitsFields
      : {}),
  };

  return Yup.object().shape(schema);
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

export const BenefitValidation = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
    benefit_title: Yup.string()
      .trim()
      .required(t('Cms.Organization.Benefits.benefitTitle.validation')),
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
    button_text: Yup.string()
      .trim()
      .required(t('Cms.homepage.story.buttonTitleValidation')),
  });
};

export const TestimonialValidation = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    banner_image: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerImageValidation')),
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
    company_name: Yup.string()
      .trim()
      .required(t('Cms.Organization.Testimonials.companyName.validation')),
    city: Yup.string()
      .trim()
      .required(t('Cms.Organization.Testimonials.cityName.validation')),
  });
};
