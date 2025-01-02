import Button from 'components/Button/Button';
import Card from 'components/Card';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType, fileInputEnum } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { Form, Formik } from 'formik';
import { MiniCourseValidations } from 'modules/Course/Admin/form/validations';
import { useCommonCourseCategory } from 'modules/Course/common/hooks';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseBasicDetailDataTypes, MiniCourseBasicTypes } from '../../types';

interface MiniCourseBasicDetailsProps {
  initialData: { data: CourseBasicDetailDataTypes };
  onSubmit: (data: MiniCourseBasicTypes) => void;
  isLoading: boolean;
}

const MiniCourseBasicDetails: FC<MiniCourseBasicDetailsProps> = ({
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const courseCategory = useCommonCourseCategory();

  const initialValues = {
    cover_video: initialData.data.cover_video ?? null,
    cover_image: initialData.data.cover_image ?? null,
    srt_file_path: initialData.data.srt_file_path ?? null,
    description: initialData.data.description || 'Add the description',
    title: initialData.data.title || 'New course',
    category_id: initialData.data.category_id || undefined,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MiniCourseValidations()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        return (
          <Card isGray className="course-inner-card">
            <div className="course-card-title">
              {t('CourseManagement.AddEditForm.BasicFormHeader')}
            </div>
            <Form className="">
              <div className="row">
                <div className="left-part">
                  <DropZone
                    fileInputIcon="camera"
                    name="cover_image"
                    setValue={setFieldValue}
                    value={values.cover_image ?? null}
                    isCompulsory
                    label={t('CourseManagement.AddEditForm.CoverPhotoLabel')}
                    SubTitle={t('CourseManagement.AddEditForm.CoverPhotoSubTitle')}
                    acceptTypes="image/*"
                    fileType={EnumFileType.Image}
                  />
                  <DropZone
                    fileInputIcon="pause"
                    name="cover_video"
                    setValue={setFieldValue}
                    value={values.cover_video ?? null}
                    isCompulsory
                    label={t('CourseManagement.AddEditForm.CoverVideoLabel')}
                    SubTitle={t('CourseManagement.AddEditForm.CoverVideoSubTitle')}
                    acceptTypes="video/*"
                    fileType={EnumFileType.Video}
                  />
                  <DropZone
                    fileInputIcon="camera"
                    name="srt_file_path"
                    setValue={setFieldValue}
                    value={values.srt_file_path ?? null}
                    isCompulsory
                    Title={t('CourseManagement.AddEditForm.SRTFileLabel')}
                    label="Upload caption (.SRT file)"
                    acceptTypes="image/*"
                    variant={fileInputEnum.LinkFileInput}
                  />
                </div>
                <div className="right-part">
                  <InputField
                    name="title"
                    label={t('CourseManagement.AddEditForm.TitleLabel')}
                    placeholder={t('CourseManagement.AddEditForm.TitlePlaceholder')}
                    value={values.title}
                    isCompulsory
                  />
                  <ReactEditor
                    label={t('CourseManagement.AddEditForm.DescriptionLabel')}
                    parentClass="h-unset"
                    name="description"
                    placeholder={t(
                      'CourseManagement.AddEditForm.DescriptionPlaceholder'
                    )}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    value={values?.description}
                    isCompulsory
                  />
                  <ReactSelect
                    name="category_id"
                    options={courseCategory}
                    placeholder={t(
                      'CourseManagement.AddEditForm.CourseCategoryPlaceholder'
                    )}
                    label={t('CourseManagement.AddEditForm.CourseCategoryLabel')}
                    parentClass="width-full"
                    isCompulsory
                  />
                  <div className="bnt-wrap">
                    <Button
                      variants="black"
                      className="w-fit"
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {t('CourseManagement.AddEditForm.NextButtonText')}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card>
        );
      }}
    </Formik>
  );
};

export default MiniCourseBasicDetails;
