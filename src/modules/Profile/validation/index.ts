import { t } from 'i18next';
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from 'modules/Auth/validationSchema';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const AdminUserValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Required')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Required')),

    email: emailValidation(),
    profile_image_url: Yup.string().optional(),
  });
};
export const TeacherUserValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Required')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Required')),

    email: emailValidation(),
    bio: Yup.string().trim().required(t('Profile.Validation.Bio.Error.Required')),
  });
};

export const OrganizationUserValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('Organization.EditProfile.Name.Error.Required')),

    email: emailValidation(),

    address: Yup.string()
      .trim()
      .required(t('Organization.EditProfile.Address.Error.Required'))
      .max(100, t('Organization.EditProfile.Address.Error.MaxChar')),

    city: Yup.string()
      .trim()
      .required(t('Organization.EditProfile.City.Error.Required'))
      .max(50, t('Organization.EditProfile.City.Error.MaxChar')),

    country: Yup.string()
      .trim()
      .required(t('Organization.EditProfile.Country.Error.Required'))
      .max(50, t('Organization.EditProfile.Country.Error.MaxChar')),

    pin: Yup.string()
      .trim()
      .required(t('Organization.EditProfile.Pin.Error.Pin.Required'))
      .matches(/^\d{5,6}$/, t('Organization.EditProfile.Pin.Error.Pin.MaxDigit')),

    organizationType: Yup.string()
      .trim()
      .required(t('Organization.EditProfile.OrganizationType.Error.Required')),
  });
};

export const StudentUserValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Required')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Required')),
    bio: Yup.string().trim().required(t('Profile.Validation.Bio.Error.Required')),
  });
};

export const ResetUserPasswordValidationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    currentpassword: Yup.string().required(
      t('Auth.Validation.CurrentPassword.Error.Required')
    ),
    password: passwordValidation(),
    confirmpassword: confirmPasswordValidation(),
  });
};

export const FeedbackValidation = () => {
  return Yup.object().shape({
    addFeedback: Yup.string().required(t('Profile.Feedback.Feedback.Required')),
    emojiRatings: Yup.object().shape({
      overallRating: Yup.object().shape({
        value: Yup.number().required(t('Profile.Feedback.OverallRating.Required')),
      }),
      easeUseRating: Yup.object().shape({
        value: Yup.number().required(t('Profile.Feedback.EaseUseRating.Required')),
      }),
      contentQualityRating: Yup.object().shape({
        value: Yup.number().required(
          t('Profile.Feedback.ContentQualityRating.Required')
        ),
      }),
    }),
  });
};
