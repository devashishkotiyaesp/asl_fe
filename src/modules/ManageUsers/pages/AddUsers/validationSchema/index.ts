import { Roles } from 'constants/common.constant';
import { useTranslation } from 'react-i18next';
import { RoleType } from 'types/comman';
import * as Yup from 'yup';

export const getValidationSchema = (role: RoleType) => {
  const { t } = useTranslation();

  const baseSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, t('UserManagement.Form.Validation.FirstNameLength'))
      .required(t('UserManagement.Form.Validation.FirstNameRequired')),
    last_name: Yup.string()
      .min(3, t('UserManagement.Form.Validation.LastNameLength'))
      .required(t('UserManagement.Form.Validation.LastNameRequired')),
    email: Yup.string()
      .email(t('UserManagement.Form.Validation.EmailFormat'))
      .required(t('UserManagement.Form.Validation.EmailRequired')),
    profile_image: Yup.string().trim(),
  });

  switch (role) {
    case Roles.Organization:
      return baseSchema.shape({
        organizationType: Yup.string().required(
          t('UserManagement.Form.Validation.OrganizationTypeRequired')
        ),
        teacherIds: Yup.array().of(Yup.string()),
      });

    case Roles.Teacher:
      return baseSchema.shape({
        organizationIds: Yup.array().of(Yup.string()),
      });
    case Roles.Student:
      return baseSchema.shape({
        organizationIds: Yup.array().of(Yup.string()),
      });

    default:
      return baseSchema;
  }
};
