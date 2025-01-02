import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const CourseMaterialSchema = (t: TFunction<'translation', undefined>) => {
  const courseTeachingMediaSchema = Yup.array().of(
    Yup.object().shape({
      title: Yup.string(),
      // .required(
      //   t('CourseContentManager.Validation.CourseTeachingMedia.Title.Required')
      // )
      link: Yup.string().url(
        t('CourseContentManager.Validation.CourseTeachingMedia.Link.Invalid')
      ),
      // .required(
      //   t('CourseContentManager.Validation.CourseTeachingMedia.Link.Required')
      // ),
    })
  );

  return Yup.object().shape({
    course_material_media: Yup.object().shape({
      description: Yup.string()
        .max(
          255,
          t('CourseContentManager.Validation.CourseMaterialMedia.Description.Max')
        )
        .required(
          t(
            'CourseContentManager.Validation.CourseMaterialMedia.Description.Required'
          )
        ),
      note: Yup.string().max(
        500,
        t('CourseContentManager.Validation.CourseMaterialMedia.Note.Max')
      ),
      video_link: Yup.string()
        .url(
          t('CourseContentManager.Validation.CourseMaterialMedia.VideoLink.Invalid')
        )
        .required(
          t('CourseContentManager.Validation.CourseMaterialMedia.VideoLink.Required')
        ),
    }),
    practice_materials: Yup.array()
      // .min(1, t('CourseContentManager.Validation.PracticeMaterials.Required'))
      .of(
        Yup.mixed().test(
          'is-file',
          t('CourseContentManager.Validation.PracticeMaterials.Invalid'),
          (value) => value instanceof File
        )
      ),
    // .required(t('CourseContentManager.Validation.PracticeMaterials.Required')),
    teaching_materials: Yup.array()
      // .min(1, t('CourseContentManager.Validation.TeachingMaterials.Required'))
      .of(
        Yup.mixed().test(
          'is-file',
          t('CourseContentManager.Validation.TeachingMaterials.Invalid'),
          (value) => value instanceof File
        )
      ),
    // .required(t('CourseContentManager.Validation.TeachingMaterials.Required')),
    is_student_roster: Yup.string()
      .oneOf(
        ['true', 'false'],
        t('CourseContentManager.Validation.StudentRoster.Invalid')
      )
      .required(t('CourseContentManager.Validation.StudentRoster.Required')),

    course_teaching_media: courseTeachingMediaSchema,
  });
};
