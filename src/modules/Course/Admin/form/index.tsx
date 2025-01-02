import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader';
import { CourseTypeEnum, Roles } from 'constants/common.constant';
import { PrivateNavigation } from 'constants/navigation.constant';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import {
  CourseType,
  SelectedValuesType,
} from 'modules/Course/common/types/course.type';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { useCourseLanguages } from 'reduxStore/slices/courseLanguagesSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { AllLanguages } from 'reduxStore/types';
import {
  createFormData,
  formInitialData,
  getQueryParams,
  updateParamActiveStep,
} from './helper/form.helper';
import CourseStepForm from './StepSelector';
import {
  DataPayloadTypes,
  FormDataTypes,
  InPersonBasicTypes,
  MiniCourseBasicTypes,
  SelfPacedBasicTypes,
  SelfPacedModuleTypes,
  ZoomBasicTypes,
} from './types';
import { CourseMaterials } from './types/courseContentManager.types';
import { CourseVisibilityField } from './types/courseVisibilitySetting.types';

interface CustomStepperFormType {
  course_type?: string;
  courseLanguages: CourseType[];
  selectedValues: SelectedValuesType;
  defaultLanguage: string;
  refetchLanguageData: (slug: string) => void;
}

const CustomStepperForm: FC<CustomStepperFormType> = ({
  course_type,
  courseLanguages,
  selectedValues,
  defaultLanguage,
  refetchLanguageData,
}) => {
  const { languageValues, courseValue: type_id, is_full_course } = selectedValues;
  const [languageOption, setLanguageOption] =
    useState<Array<CourseType>>(courseLanguages);
  const { slug_language_pair } = useSelector(useCourseLanguages);
  const [callApi, { isLoading: submitLoader }] = useAxiosPost();
  const [getApi, { isLoading: isFormFetching }] = useAxiosGet();
  const navigate = useNavigate();
  const { slug, common_id } = useParams();
  const editLanguage = useModal(false);
  const { step: paramStep, course_id, language_id } = getQueryParams();
  const { allLanguages } = useSelector(useLanguage);
  const userFromRedux = useSelector(getCurrentUser)?.role?.role ?? Roles.Admin;

  const [activeStep, setActiveStep] = useState(Number(paramStep) || 1);
  const [languageId, setLanguageId] = useState(defaultLanguage);
  const [languages, setLanguages] = useState<string[]>(languageValues);
  const [isAdmin, setIsAdmin] = useState<boolean>(userFromRedux === Roles.Admin);
  const [formData, setFormData] = useState<FormDataTypes>({
    data: formInitialData,
    is_full_course,
    course_id,
    type_id,
    course_type,
    slug,
  });

  const fetchCourseData = async () => {
    if (slug) {
      const { data, error } = await getApi(`/courses/basic-details`, {
        params: {
          slug,
        },
      });

      if (data && !error) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          data,
          course_id: data.course_id,
          type_id: data.type_id,
          course_type: data.type.type,
          slug,
          common_id,
          is_full_course: data.is_full_course,
        }));
      }
    }
  };

  useEffect(() => {
    fetchCourseData();
    if (paramStep) {
      setActiveStep(Number(paramStep));
      setLanguageId(language_id);
    }
  }, [course_id, paramStep, language_id]);

  useEffect(() => {
    setIsAdmin(userFromRedux === Roles.Admin);
  }, [userFromRedux]);

  const handleStepSubmit = async (
    stepData:
      | SelfPacedBasicTypes
      | InPersonBasicTypes
      | ZoomBasicTypes
      | CourseMaterials
      | MiniCourseBasicTypes
      | SelfPacedModuleTypes
      | CourseVisibilityField
  ) => {
    if (activeStep === 1) {
      const payload: DataPayloadTypes = {
        data: stepData as SelfPacedBasicTypes,
        step: activeStep,
        type_id,
        category_id: stepData.category_id,
        is_full_course,
      };
      if (formData?.course_type === CourseTypeEnum.SELF_PACED_COURSES) {
        payload.language_id = languageId;
        payload.languages = languages;
      }
      if (slug) {
        payload.slug = slug;
        payload.course_id = course_id;
        payload.type_id = formData.type_id;
        if (formData.common_id) {
          payload.common_id = formData.common_id;
        }
      }

      const newFormData = createFormData(payload);
      const { data, error } = await callApi('/courses', newFormData);
      if (data && !error) {
        setActiveStep(activeStep + 1);
        setFormData((prev: FormDataTypes) => ({
          ...prev,
          data,
        }));
        refetchLanguageData(data.slug);
        navigate({
          pathname: `/courses/${data.common_id}/${data.slug}`,
          search:
            formData.course_type === CourseTypeEnum.SELF_PACED_COURSES
              ? `lang=${data.language_id}&course_id=${data.id}&step=${activeStep + 1}`
              : `course_id=${data.id}&step=${activeStep + 1}`,
        });
      }
    }
    if (activeStep === 2 || activeStep === 3) {
      const payload: DataPayloadTypes = {
        data: stepData as SelfPacedModuleTypes,
        step: activeStep,
        ...(languageId ? { language_id: languageId } : {}),
        ...(languages?.some((language) => language !== null) ? { languages } : {}),

        category_id: formData.data.category_id,
        is_full_course,
        slug,
        common_id,
        course_id,
        type_id: formData.type_id,
      };

      const newFormData = createFormData(payload);
      const { data, error } = await callApi('/courses', newFormData);
      if (data && !error) {
        if (activeStep !== 3 && isAdmin) {
          setActiveStep(activeStep + 1);
          updateParamActiveStep(true, navigate);
        }
        setFormData((prev: FormDataTypes) => ({
          ...prev,
          data,
        }));
      }
    }
  };

  const handleLanguageChange = (value: string) => {
    if (slug) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('lang', value);

      const course_slug = slug_language_pair.find(
        (item) => item.language_id === value
      )?.slug;

      navigate(`/courses/${common_id}/${course_slug}${currentUrl.search}`, {
        replace: true,
      });
    }
    setLanguageId(value);
  };

  const handleAddLanguage = (item: AllLanguages) => {
    if (!languageValues.includes(item.id)) {
      setLanguages((prev: string[]) => [...prev, item.id]);
      setLanguageOption((prev) => [...prev, { label: item.name, value: item.id }]);
    }
  };

  return isFormFetching ? (
    <div className="flex justify-center items-center h-[calc(100dvh_-_120px)]">
      <Image loaderType="SiteLoader" />
    </div>
  ) : (
    <div className={` ${!isAdmin ? 'container' : ''}`}>
      <PageHeader
        title={t('Cms.homePage.title')}
        url={PrivateNavigation.courses.view.path}
      />
      <div>
        {formData?.course_type === CourseTypeEnum.SELF_PACED_COURSES && (
          <div className="btn-wrap !mt-0 mb-2">
            {activeStep !== 3 ? (
              <>
                {languageOption.map((language, idx) => (
                  <Button
                    key={idx + 1}
                    variants={
                      language.value === languageId ? 'RedOpacity' : 'blackBorder'
                    }
                    onClickHandler={() => handleLanguageChange(language.value)}
                  >
                    {language.label}
                  </Button>
                ))}
                <Button
                  variants="black"
                  onClickHandler={() => editLanguage.openModal()}
                >
                  {t('CourseManagement.AddEditForm.EditLanguageSubmitButton')}
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
        <div className="content-base">
          <div className="step-wrapper flex items-center">
            {Array.from({ length: isAdmin ? 3 : 2 }).map((_, index) => {
              const stepNumber = index + 1;
              return (
                <div
                  key={stepNumber}
                  className={`step-item ${activeStep === stepNumber ? 'active' : ''}  ${activeStep > stepNumber ? 'completed' : ''}`}
                >
                  <span className="step-item__number">{stepNumber}</span>
                </div>
              );
            })}
          </div>
          <CourseStepForm
            course_type={course_type ?? formData.course_type ?? null}
            handleStepSubmit={handleStepSubmit}
            activeStep={activeStep}
            formData={formData}
            is_full_course={is_full_course || formData.is_full_course}
            isLoading={submitLoader}
          />
        </div>
      </div>

      <Modal
        modal={editLanguage}
        showFooter
        showHeader
        headerTitle={t('CourseManagement.AddEditForm.EditLanguageHeader')}
        footerSubmitButtonTitle={t(
          'CourseManagement.AddEditForm.EditLanguageSubmitButton'
        )}
        footerSubmit={() => editLanguage.closeModal()}
        cancelClick={editLanguage.closeModal}
      >
        <div className="select-course-type-wrap">
          {allLanguages?.map((item, idx) => {
            const isChecked = languages.includes(item.id);
            return (
              <Button
                key={idx + 1}
                className={`select-course-type-item ${isChecked ? 'active' : ''}`}
                disabled={isChecked}
                onClickHandler={() => handleAddLanguage(item)}
              >
                <div className="select-course-type-icon">
                  <Image iconName="selfPacedCourse" />
                </div>
                <span className="select-course-type-name">{item.name}</span>
                <span className="checkbox-design" />
              </Button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default CustomStepperForm;
