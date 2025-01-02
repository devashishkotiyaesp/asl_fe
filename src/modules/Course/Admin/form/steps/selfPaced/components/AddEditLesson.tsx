import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType, fileInputEnum } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { ILessonsItem } from 'modules/Course/common/types/course.type';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getQueryParams } from '../../../helper/form.helper';
import { LessonValidations } from '../../../validations';
import { AddEditLessonProps } from '../types/selfPacedMaterial.type';

const AddEditLesson = ({
  selectedLesson,
  modal,
  refetch,
  module_common_id,
  lessonSortOrder,
}: AddEditLessonProps) => {
  const { common_id: course_common_id } = useParams();
  const { t } = useTranslation();
  const existData = selectedLesson || null;
  const formikRef = useRef<FormikProps<ILessonsItem>>(null);
  const [postApi, { isLoading: isLoadingCreateLesson }] = useAxiosPost();
  const { language_id } = getQueryParams();

  const [courseLessonData, setCourseLessonData] = useState<ILessonsItem>(
    (existData as ILessonsItem) || {
      title: '',
      description: '',
      banner_image: null,
      lesson_video: null,
      video_link: null,
      srt_file_path: null,
    }
  );

  const handleLessonSubmit = async (
    values: ILessonsItem,
    helpers: FormikHelpers<ILessonsItem>
  ) => {
    const formData = new FormData();
    const payload = {
      title: values.title,
      ...(values.common_id ? { common_id: values.common_id } : {}),
      ...(values.slug ? { slug: values.common_id } : {}),
      ...(module_common_id ? { module_common_id } : {}),
      lesson_banner_image: values.banner_image,
      lesson_video: values.lesson_video,
      ...(values.video_link ? { video_link: values.video_link } : {}),
      lesson_srt_file_path: values.srt_file_path,
      description: values.description,
      language_id,
      ...(selectedLesson ? {} : { sort_order: lessonSortOrder }),
      course_common_id,
    };

    Object.entries(payload).forEach(
      ([key, value]: [string, string | number | string[] | undefined | null]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      }
    );

    const result = await postApi('/courses/lesson', formData);
    if (result.data) {
      helpers.resetForm();
      modal.closeModal();
      refetch();
    }
  };
  return (
    <Modal
      width="max-w-[1000px]"
      headerTitle={
        existData?.slug
          ? t('Course.AddEditLesson.HeaderTitle.Add')
          : t('Course.AddEditLesson.HeaderTitle.Edit')
      }
      modal={modal}
      closeOnEscape
      closeOnOutsideClick
      setDataClear={setCourseLessonData}
    >
      <Formik<ILessonsItem>
        initialValues={courseLessonData}
        validationSchema={() => LessonValidations(t)}
        onSubmit={handleLessonSubmit}
        innerRef={formikRef}
      >
        {({ values, setFieldValue, submitForm }) => (
          <Form>
            <div className="row">
              <InputField
                name="title"
                isCompulsory
                label={t(
                  'CourseManagement.AddEditForm.AddEditLesson.LessonTitleLabel'
                )}
                placeholder={t(
                  'CourseManagement.AddEditForm.AddEditLesson.LessonTitlePlaceholder'
                )}
                type="text"
                value={values?.title}
              />
              <InputField
                name="description"
                isCompulsory
                label={t(
                  'CourseManagement.AddEditForm.AddEditLesson.LessonDescriptionLabel'
                )}
                placeholder={t(
                  'CourseManagement.AddEditForm.AddEditLesson.LessonDescriptionPlaceholder'
                )}
                type="text"
                value={values?.description}
              />
              <div className="add-lesson-filed-group">
                <DropZone
                  fileInputIcon="camera"
                  name="banner_image"
                  setValue={setFieldValue}
                  value={values?.banner_image}
                  label={t(
                    'CourseManagement.AddEditForm.AddEditLesson.LessonBannerLabel'
                  )}
                  SubTitle={t('CourseManagement.AddEditForm.AddEditLesson.Subtitle')}
                  acceptTypes="image/*"
                  fileType={EnumFileType.Image}
                />
                <DropZone
                  fileInputIcon="pause"
                  name="lesson_video"
                  setValue={setFieldValue}
                  value={values.lesson_video}
                  label={t(
                    'CourseManagement.AddEditForm.AddEditLesson.LessonVideoLabel'
                  )}
                  SubTitle={t('CourseManagement.AddEditForm.AddEditLesson.Subtitle')}
                  acceptTypes="video/*"
                  fileType={EnumFileType.Video}
                />
                <div className="inner-group">
                  <DropZone
                    fileInputIcon="camera"
                    name="srt_file_path"
                    setValue={setFieldValue}
                    value={values.srt_file_path}
                    Title={t('Course.AddEditLesson.UploadFileTitle')}
                    label={t(
                      'CourseManagement.AddEditForm.AddEditLesson.SRTFileLabel'
                    )}
                    SubTitle={t(
                      'CourseManagement.AddEditForm.AddEditLesson.SRTFilePlaceholder'
                    )}
                    acceptTypes="image/*"
                    // fileType={EnumFileType.}
                    variant={fileInputEnum.LinkFileInput}
                  />
                  <InputField
                    name="video_link"
                    label={t(
                      'CourseManagement.AddEditForm.AddEditLesson.LessonVideoLinkLabel'
                    )}
                    placeholder={t(
                      'CourseManagement.AddEditForm.AddEditLesson.LessonVideoLinkPlaceholder'
                    )}
                    type="text"
                    value={values?.video_link}
                  />
                </div>
              </div>
            </div>
            <div className="btn-wrap">
              <Button
                type="button"
                variants="blackBorder"
                onClickHandler={modal.closeModal}
              >
                {t('Course.AddEditLesson.Button.Back')}
              </Button>

              <Button
                type="button"
                variants="black"
                disabled={isLoadingCreateLesson}
                isLoading={isLoadingCreateLesson}
                onClickHandler={submitForm}
              >
                {t('Course.AddEditLesson.Button.Continue')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddEditLesson;
