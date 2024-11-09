import { IMAGE_SUPPORTED_FORMATS } from 'constants/filesupport.constant';
import { t } from 'i18next';
import { emailValidation } from 'modules/Auth/validationSchema';
import * as Yup from 'yup';

export const AdminUserValidationSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Requried')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Requried')),

    // profile_image: Yup.lazy((value) => {
    //   if (typeof value === 'string') {
    //     return Yup.string().trim();
    //   }
    //   return Yup.mixed().test(
    //     'fileFormat',
    //     t('Auth.Validation.Image.Error.UnsupportedFormat'),
    //     (file) => {
    //       if (!file) return true;
    //       return IMAGE_SUPPORTED_FORMATS.includes((file as File).type);
    //     }
    //   );
    // }),
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

    profile_image: Yup.lazy((value) => {
      if (typeof value === 'string') {
        return Yup.string().trim();
      }
      return Yup.mixed().test(
        'fileFormat',
        t('Auth.Validation.Image.Error.UnsupportedFormat'),
        (file) => {
          if (!file) return true;
          return IMAGE_SUPPORTED_FORMATS.includes((file as File).type);
        }
      );
    }),
    email: emailValidation(),
    bio: Yup.string().trim().required(t('Profile.Validation.Bio.Error.Reqired')),
  });
};

export const OrganizationUserValidationSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('Organization.EditProfile.Name.Error,Required')),

    email: emailValidation(),
    profile_image: Yup.lazy((value) => {
      if (typeof value === 'string') {
        return Yup.string().trim();
      }
      return Yup.mixed().test(
        'fileFormat',
        t('Auth.Validation.Image.Error.UnsupportedFormat'),
        (file) => {
          if (!file) return true;
          return IMAGE_SUPPORTED_FORMATS.includes((file as File).type);
        }
      );
    }),

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

export const StudentUserValidationSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.FirstName.Error.Requried')),
    last_name: Yup.string()
      .trim()
      .required(t('Auth.Validation.LastName.Error.Requried')),
    bio: Yup.string().trim().required(t('Profile.Validation.Bio.Error.Reqired')),

    // asl_level_id: Yup.string().required(
    //   t('Auth.Validation.AslLevel.Error.Requried')
    // ),
  });
};
