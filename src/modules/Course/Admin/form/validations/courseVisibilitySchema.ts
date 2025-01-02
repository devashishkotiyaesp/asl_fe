import { TFunction } from 'i18next';
import * as Yup from 'yup';

const CourseVisibilitySchema = (t: TFunction<'translation', undefined>) => {
  return Yup.object()
    .shape({
      is_public: Yup.string(),
      can_teacher_view: Yup.string(),
      visibility_to: Yup.string(),
    })
    .test(
      'at-least-one',
      t('CourseVisibilitySetting.Validation.AtLeastOneField'),
      (_, { path }) => {
        return new Yup.ValidationError(
          t('CourseVisibilitySetting.Validation.AtLeastOneField'),
          {},
          path
        );
      }
    );
};

export default CourseVisibilitySchema;
