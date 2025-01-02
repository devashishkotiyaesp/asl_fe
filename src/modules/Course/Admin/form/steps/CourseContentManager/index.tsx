// ** Components **
import Button from 'components/Button/Button';
import Card from 'components/Card';
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import Image from 'components/Image';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import WeekOverview from './WeekOverview';

// ** Constants & Enums **
import { EnumFileType } from 'components/FormElement/enum';

// ** Form Libraries **
import { Form, Formik } from 'formik';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

// ** Utilities **
import {
  processCourseContentFormData,
  removeEmptyKeys,
  updateParamActiveStep,
} from '../../helper/form.helper';

// ** Types & Validation **
import {
  CourseMaterialProps,
  CourseMaterialResponse,
  CourseMaterials,
  WeekData,
} from '../../types/courseContentManager.types';
import { CourseMaterialSchema } from '../../validations/courseContentManager.validation';
import CourseTeachingMediaList from './CourseTeachingMediaList';

const CourseContentManager = ({
  initialData,
  onSubmit,
  isLoading,
}: CourseMaterialProps) => {
  // ** Hooks **
  const { common_id: course_common_id } = useParams();
  const [getEditData, { isLoading: gettingEditData }] = useAxiosGet();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ** State Management **
  const [initialValues, setInitialValues] = useState<CourseMaterials>();
  const [CourseMaterials, setCourseMaterials] = useState<CourseMaterialResponse>();

  const { repeat_interval_days } = initialData.data;

  // Fetch Edit data for set initial Value.
  const fetchEditData = async () => {
    const { data } = await getEditData(`/courses/course-material`, {
      params: {
        ...(course_common_id ? { common_id: course_common_id } : {}),
      },
    });
    console.log('🚀 ~ fetchEditData ~ data:', data);
    if (data) {
      setCourseMaterials(data);
      const nonEmptyData = removeEmptyKeys(data);
      const { course_material, ...courseData } = nonEmptyData ?? {};
      console.log('🚀 ~ fetchEditData ~ course_material:', course_material);

      const course_week_media = repeat_interval_days.map((_, index) => ({
        title: '',
        link: '',
        description: '',
        sort_order: index + 1,
      }));

      let course_week_data = [];
      if (courseData?.course_weeks) {
        if (courseData?.course_weeks?.length > 0) {
          course_week_data = courseData?.course_weeks.map(
            (item: WeekData, course_week_index: number) => ({
              ...item,
              sort_order: course_week_index + 1,
              ...(item.course_week_media.length > 0
                ? {
                    course_week_media: course_week_media.map(
                      (weekMaterial, weekIndex) => {
                        if (item.course_week_media[weekIndex]) {
                          return item.course_week_media[weekIndex];
                        }
                        return weekMaterial;
                      }
                    ),
                  }
                : { course_week_media }),
            })
          );
        }
      }

      const initialValuesData = {
        practice_materials: [],
        teaching_materials: [],
        course_material_media: courseData?.course_material_media ?? {
          description: '',
          note: '',
          video_link: '',
        },
        is_student_roster: String(courseData?.is_student_roster ?? ''),
        course_teaching_media:
          Array.isArray(courseData?.course_teaching_media) &&
          courseData?.course_teaching_media.length > 0
            ? courseData?.course_teaching_media
            : [{ title: '', link: '', sort_order: 1 }],
        course_weeks: course_week_data,
      };

      setInitialValues(initialValuesData);
    }
  };

  useEffect(() => {
    fetchEditData();
  }, []);

  return (
    <>
      {gettingEditData && !initialValues ? (
        <Image loaderType="SiteLoader" />
      ) : (
        initialValues && (
          <Formik
            initialValues={initialValues}
            validationSchema={CourseMaterialSchema(t)}
            onSubmit={(value) => {
              const processedFormData = processCourseContentFormData(value);
              onSubmit(processedFormData);
            }}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <Card isGray className="course-inner-card">
                    <div className="course-card-title">
                      {t('CourseContentManager.Form.Title.PracticeMaterial')}
                    </div>
                    <div className="row">
                      <div className="left-part">
                        <DropZone
                          fileInputIcon="filePDF"
                          className="row"
                          name="practice_materials"
                          setValue={setFieldValue}
                          value={values?.practice_materials}
                          isCompulsory
                          label={t(
                            'CourseContentManager.Form.Label.PracticeMaterialUpload'
                          )}
                          SubTitle={t(
                            'CourseContentManager.Form.SubTitle.PracticeMaterialUpload'
                          )}
                          isMulti
                          acceptTypes="pdf"
                          fileType={[EnumFileType.Document, EnumFileType.Image]}
                        />
                      </div>
                      <div className="right-part">
                        <InputField
                          isCompulsory
                          name="course_material_media.description"
                          label={t(
                            'CourseContentManager.Form.Label.PracticeDescription'
                          )}
                          placeholder={t(
                            'CourseContentManager.Form.Placeholder.PracticeDescription'
                          )}
                        />
                        <InputField
                          isCompulsory
                          name="course_material_media.video_link"
                          label={t('CourseContentManager.Form.Label.VideoLink')}
                          placeholder={t(
                            'CourseContentManager.Form.Placeholder.VideoLink'
                          )}
                        />
                        <ReactEditor
                          isCompulsory
                          name="course_material_media.note"
                          label={t('CourseContentManager.Form.Label.Notes')}
                          setFieldValue={setFieldValue}
                          value={values?.course_material_media?.note}
                        />
                      </div>
                    </div>
                    {values?.course_weeks && (
                      <WeekOverview
                        setFieldValue={setFieldValue}
                        course_weeks={values?.course_weeks}
                      />
                    )}
                  </Card>
                  <Card isGray className="course-inner-card">
                    <div className="course-card-title">
                      {t('CourseContentManager.Form.Title.TeachingMaterials')}
                    </div>
                    <div className="row">
                      <div className="left-part">
                        <DropZone
                          name="teaching_materials"
                          setValue={setFieldValue}
                          value={values?.teaching_materials}
                          label={t(
                            'CourseContentManager.Form.Label.TeachingMaterialUpload'
                          )}
                          SubTitle={t(
                            'CourseContentManager.Form.SubTitle.TeachingMaterialUpload'
                          )}
                          fileInputIcon="fileIcon"
                          isMulti
                          isCompulsory
                          acceptTypes="pdf"
                          fileType={EnumFileType.Document}
                        />
                      </div>
                      <div className="right-part">
                        <RadioButtonGroup
                          optionWrapper="flex gap-4 [&>.radio-option]:w-fit flex-row"
                          isCompulsory
                          name="is_student_roster"
                          options={[
                            {
                              label: t('CourseContentManager.Form.Option.Yes'),
                              value: 'true',
                            },
                            {
                              label: t('CourseContentManager.Form.Option.No'),
                              value: 'false',
                            },
                          ]}
                          label={t(
                            'CourseContentManager.Form.Label.IncludeStudentRoster'
                          )}
                        />
                        <CourseTeachingMediaList
                          setFieldValue={setFieldValue}
                          course_teaching_media={values?.course_teaching_media}
                        />
                      </div>
                    </div>
                  </Card>
                  <div className="btn-wrap">
                    <Button
                      variants="PrimaryWoodBorder"
                      onClickHandler={() => updateParamActiveStep(false, navigate)}
                    >
                      {t('CourseManagement.AddEditForm.PreviousButtonText')}
                    </Button>
                    <Button
                      variants="PrimaryWood"
                      onClickHandler={() => {
                        navigate(
                          `/courses/view/${CourseMaterials?.slug}?course_type=${CourseMaterials?.type.type}`
                        );
                      }}
                    >
                      {t('CourseManagement.AddEditForm.PreviewButtonText')}
                    </Button>
                    <Button variants="black" type="submit" isLoading={isLoading}>
                      {t('CourseManagement.AddEditForm.NextButtonText')}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )
      )}
    </>
  );
};

export default CourseContentManager;
