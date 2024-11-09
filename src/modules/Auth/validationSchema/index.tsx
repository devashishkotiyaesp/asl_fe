import { t } from 'i18next';
import * as Yup from 'yup';

// Email Validation
export const emailValidation = () => {
  return Yup.string()
    .trim()
    .email(t('Auth.Validation.Email.Error.InvalidEmail'))
    .max(255, t('Auth.Validation.Email.Error.ValidChars'))
    .required(t('Auth.Validation.Email.Error.EmailRequired'))
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
      t('Auth.Validation.Email.Error.InvalidEmail')
    );
};

// Password Validation
export const passwordValidation = () => {
  return Yup.string()
    .trim()
    .required(t('Auth.Validation.Password.Error.Required'))
    .min(8, t('Auth.Validation.Password.Error.MinChar'))
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      t('Auth.Validation.Password.Error.CapitalChars')
    )
    .matches(/\d/, t('Auth.Validation.Password.Error.MustHaveNumber'))
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      t('Auth.Validation.Password.Error.SpecialChars')
    );
};

// Confirm Password validation
export const confirmPasswordValidation = () => {
  return Yup.string()
    .required(t('Auth.Validation.ConfirmPassword.Error.Required'))
    .oneOf(
      [Yup.ref('password')],
      t('Auth.Validation.ConfirmPassword.Error.MatchWithPass')
    );
};

// Register Validation
export const RegisterValidationSchema = () => {
  return Yup.object().shape({
    email: emailValidation(),
    password: passwordValidation(),
    profile_image: Yup.string(),
    first_name: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, t('Auth.Validation.FirstName.Error.OnlyCharsAllowed'))
      .required(t('Auth.Validation.FirstName.Error.Requried')),
    last_name: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, t('Auth.Validation.LastName.Error.OnlyCharsAllowed'))
      .required(t('Auth.Validation.LastName.Error.Requried')),
    language: Yup.string().required(),
  });
};

// Login Validation
export const LoginValidationSchema = () => {
  return Yup.object().shape({
    email: emailValidation(),
    password: passwordValidation(),
  });
};

// Forgot Password Validation
export const ForgotPasswordValidationSchema = () => {
  return Yup.object().shape({
    email: emailValidation(),
  });
};

// Reset Password Validation
export const ResetPasswordValidationSchema = () => {
  return Yup.object().shape({
    password: passwordValidation(),
    confirmPassword: confirmPasswordValidation(),
  });
};
// edit profile
export const AdminUserValidationSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Requried')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Requried')),
    profile_image: Yup.mixed()
      .test(
        'fileType',
        t('Auth.Validation.Image.Error.UnsupportedFormat'),
        (value: any) => {
          return (
            !value ||
            (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
          );
        }
      )
      .test(
        'fileSize',
        t('Auth.Validation.Image.Error.FileSize'),
        (value: any) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB limit
      )
      .nullable(),
    email: emailValidation(),
    profile_image_url: Yup.string().optional(),
  });
};
export const TeacherUserValidationSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Requried')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Requried')),
    profile_image: Yup.mixed()
      .test(
        'fileType',
        t('Auth.Validation.Image.Error.UnsupportedFormat'),
        (value: any) => {
          return (
            !value ||
            (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
          );
        }
      )
      .test(
        'fileSize',
        t('Auth.Validation.Image.Error.FileSize'),
        (value: any) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB limit
      )
      .nullable(),
    email: emailValidation(),
    profile_image_url: Yup.string().optional(),
  });
};
export const StudentUserValidationSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Requried')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Requried')),
    bio: Yup.string().trim().required(t('Community.Description.Required')),
  });
};
export const editValidationSchema = () => {
  return Yup.object().shape({
    id: Yup.string(),
    level: Yup.string().trim().required(t('Auth.Validation.Level.Error.Required')),
  });
};
export const addValidationSchema = () => {
  return Yup.object().shape({
    level: Yup.string().trim().required(t('Auth.Validation.Level.Error.Required')),
  });
};
export const ResetUserPasswordValidationSchema = () => {
  return Yup.object().shape({
    currentpassword: Yup.string().required(
      t('Auth.Validation.CurrentPassword.Error.Required')
    ),
    password: passwordValidation(),
    confirmpassword: confirmPasswordValidation(),
  });
};
