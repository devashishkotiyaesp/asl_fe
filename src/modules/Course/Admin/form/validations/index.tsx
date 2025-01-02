import { t, TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { privateCourseModeType } from '../../constants';

export const SelfPacedValidations = (step: number, t?: any, isAdmin?: boolean) => {
  // const { t } = useTranslation();

  const BasicDetailsSchema = Yup.object({
    title: Yup.string()
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
    cover_image: Yup.string().optional().nullable(),
    cover_video: Yup.string().optional().nullable(),
    srt_file_path: Yup.string().trim().optional().nullable(),
    asl_level_id: Yup.string().trim().required('Please select asl level'),
    key_learnings: Yup.array(Yup.string())
      .min(1, t('SelfPacedValidation.Validation.KeyLearningMin'))
      .optional(),
    editor_teacher_id: Yup.array(Yup.string().trim()).optional().nullable(),
    subscription_type_id: Yup.string().trim().optional().nullable(),
    category_id: isAdmin
      ? Yup.string().trim().required('Please select Course Category')
      : Yup.string().trim().optional(),
  });

  const StepTwoSchema = Yup.object({
    title: Yup.string()
      .trim()
      .required(t('Cms.homepage.banner.bannerTitleValidation')),
    cover_image: Yup.string().trim().optional().nullable(),
  });

  switch (step) {
    case 1:
      return BasicDetailsSchema;
    case 2:
      return StepTwoSchema;
    default:
      break;
  }
};

export const MiniCourseValidations = () => {
  const { t } = useTranslation();

  const BasicDetailsSchema = Yup.object({
    title: Yup.string()
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
    cover_image: Yup.string().optional().nullable(),
    cover_video: Yup.string().optional().nullable(),
    srt_file_path: Yup.string().trim().optional().nullable(),
    category_id: Yup.string()
      .trim()
      .required(t('CommonValidation.Validation.CourseCategoryRequired')),
  });

  return BasicDetailsSchema;
};

export const LessonValidations = (t: TFunction<'translation', undefined>) => {
  const Lessons = Yup.object({
    title: Yup.string()
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
    lesson_banner_image: Yup.string().optional().nullable(),
    lesson_video: Yup.string().optional().nullable(),
    srt_file_path: Yup.string().trim().optional().nullable(),
  });

  return Lessons;
};

const CommonFieldsSchema = (t: TFunction<'translation', undefined>) => {
  return {
    title: Yup.string()
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
    cover_image: Yup.string().optional().nullable(),
    cover_video: Yup.string().optional().nullable(),
    srt_file_path: Yup.string().trim().optional().nullable(),
    asl_level_id: Yup.string()
      .trim()
      .required(t('CommonValidation.Validation.CourseLevelIsRequired')),
    key_learnings: Yup.array(Yup.string())
      .min(1, t('SelfPacedValidation.Validation.KeyLearningMin'))
      .optional(),
    price: Yup.string().required(t('CommonValidation.Validation.PriceRequired')),
    max_participants: Yup.number()
      .min(1, t('CommonValidation.Validation.MaxParticipantsAtLeastOne'))
      .required(t('CommonValidation.Validation.MaxParticipantsRequired'))
      .test(
        'is-greater-than-min',
        t('CommonValidation.Validation.MaxParticipantsGreaterThanMin'),
        (value, { parent }) => {
          const { min_participants } = parent;
          return value > min_participants;
        }
      ),
    min_participants: Yup.number()
      .default(0)
      .required(t('CommonValidation.Validation.MinParticipantsRequired')),
    start_date: Yup.date().required(
      t('CommonValidation.Validation.StartDateRequired')
    ),
    end_date: Yup.date().required(t('CommonValidation.Validation.EndDateRequired')),
    repeat_interval_days: Yup.array(Yup.number())
      .required(t('CommonValidation.Validation.RepeatIntervalDaysRequired'))
      .min(1, t('CommonValidation.Validation.RepeatIntervalDaysMin')),
    timezone: Yup.string().trim().nullable(),
    editor_teacher_id: Yup.array(Yup.string()),
  };
};

export const InPersonValidations = (isAdmin?: boolean) => {
  const { t } = useTranslation();
  const BasicDetailSchema = Yup.object({
    ...CommonFieldsSchema(t),
    user_teacher_id: isAdmin
      ? Yup.string()
          .trim()
          .required(t('CommonValidation.Validation.InviteTeacherRequired'))
          .min(1, t('CommonValidation.Validation.InviteTeacherEmpty'))
      : Yup.string().trim(),
    address: Yup.string()
      .required(t('CommonValidation.Validation.AddressRequired'))
      .nullable(),
    city: Yup.string()
      .trim()
      .nullable()
      .required(t('CommonValidation.Validation.CityRequired')),
    country: Yup.string()
      .trim()
      .nullable()
      .required(t('CommonValidation.Validation.CountryRequired')),
    zip_code: Yup.string()
      .trim()
      .nullable()
      .required(t('CommonValidation.Validation.ZipCodeRequired')),
  });

  return BasicDetailSchema;
};

export const ZoomValidations = (isAdmin?: boolean) => {
  const { t } = useTranslation();
  const BasicDetailSchema = Yup.object({
    ...CommonFieldsSchema(t),
    user_teacher_id: isAdmin
      ? Yup.string()
          .trim()
          .required(t('CommonValidation.Validation.InviteTeacherRequired'))
          .min(1, t('CommonValidation.Validation.InviteTeacherEmpty'))
      : Yup.string().trim().nullable(),
    zoom_link: Yup.string()
      .url(t('CommonValidation.Validation.LinkValidURL'))
      .required(t('CommonValidation.Validation.LinkRequired')),
  });

  return BasicDetailSchema;
};

const requiredWhenInPerson = (
  fieldNames: string[]
): Record<string, Yup.StringSchema> =>
  fieldNames.reduce(
    (acc, field) => {
      acc[field] = Yup.string().when('private_mode', {
        is: privateCourseModeType.In_Person,
        then: () =>
          Yup.string().required(
            t('CommonValidation.Validation.FieldRequired', { field })
          ),
        otherwise: () => Yup.string().notRequired(),
      });
      return acc;
    },
    {} as Record<string, Yup.StringSchema>
  );
export const AppointmentValidations = () => {
  const { t } = useTranslation();
  const BasicDetailSchema = Yup.object({
    ...CommonFieldsSchema(t),
    private_mode: Yup.string()
      .required('Appointment mode is required')
      .oneOf(
        [privateCourseModeType.In_Person, privateCourseModeType.Zoom],
        'Invalid appointment mode'
      ),
    zoom_link: Yup.mixed().when('private_mode', {
      is: (val: string) => {
        return val === privateCourseModeType.Zoom;
      },
      then: () =>
        Yup.string()
          .url(t('CommonValidation.Validation.LinkValidURL'))
          .required(t('CommonValidation.Validation.LinkRequired')),
      otherwise: () => Yup.string().notRequired(),
    }),
    ...requiredWhenInPerson(['address', 'city', 'zip_code', 'country']),
  });

  return BasicDetailSchema;
};
