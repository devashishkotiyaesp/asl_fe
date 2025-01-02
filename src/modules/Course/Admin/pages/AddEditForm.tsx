import Button from 'components/Button/Button';
import { IconTypes } from 'components/Icon/types';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { CourseTypeEnum } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import _ from 'lodash';
import {
  CourseType,
  SelectedValuesType,
} from 'modules/Course/common/types/course.type';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCourseLanguages } from 'reduxStore/slices/courseLanguagesSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { SlugLanguagePair } from 'reduxStore/types';
import { useCommonCourseTypes } from '../../common/hooks';
import { subTypes } from '../constants';
import CustomStepperForm from '../form';
import { getQueryParams } from '../form/helper/form.helper';
import '../index.css';

const AddEditForm = () => {
  const [getApi, { isLoading: gettingLanguage }] = useAxiosGet();
  const { t } = useTranslation();
  const courseInfo = useModal(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { courseTypes, isLoading } = useCommonCourseTypes();
  const defaultLanguage =
    useSelector(useLanguage).allLanguages?.find((item) => item.name === 'english')
      ?.id ?? '';
  const initialSelectedValues = {
    courseValue: '',
    is_full_course: null,
    languageValues: [defaultLanguage],
  };

  const [languageTypes, setLanguageTypes] = useState<CourseType[]>();
  const [modalStep, setModalStep] = useState<number>(0);
  const [selectedValues, setSelectedValues] =
    useState<SelectedValuesType>(initialSelectedValues);

  const [selectedLanguages, setSelectedLanguages] = useState<CourseType[]>();

  const { step } = getQueryParams();
  const getCourseLanguages = async (course_slug: string) => {
    const { data, error } = await getApi('/courses/language', {
      params: {
        slug: course_slug,
      },
    });
    if (data && !error) {
      dispatch(
        setCourseLanguages({
          slug_language_pair: data,
          course_languages: data.map((item: SlugLanguagePair) => item.language_id),
        })
      );
      setSelectedValues((prev) => ({
        ...prev,
        languageValues: data.map((item: SlugLanguagePair) => item.language_id),
      }));
      const languages = languageTypes?.filter((item: CourseType) =>
        data.some(
          (languageItem: { language_id: string }) =>
            languageItem.language_id === item.value
        )
      );
      setSelectedLanguages(languages);
    }
  };

  const getLanguagesType = async () => {
    const { data, error } = await getApi('/language', {
      params: {
        dropdown: true,
      },
    });
    if (data && !error) {
      setLanguageTypes(data);
    }
  };

  const handleFooterSubmit = async () => {
    switch (modalStep) {
      case 1:
        if (selectedValues.courseValue !== '') {
          if (
            selectedValues.courseValue ===
            courseTypes?.find(
              (course) => course.label === CourseTypeEnum.SELF_PACED_COURSES
            )?.value
          )
            setModalStep(2);
          else setModalStep(4);
        }
        break;
      case 2:
        if (selectedValues.is_full_course !== null) setModalStep(3);
        break;
      case 3:
        if (selectedValues.languageValues.length > 0) {
          setModalStep(4);
          courseInfo.closeModal();
        }
        break;
      default:
        break;
    }
  };

  const handleFooterBack = () => {
    switch (modalStep) {
      case 1:
        setSelectedValues(initialSelectedValues);
        navigate('/courses');
        courseInfo.closeModal();
        break;
      // case 3:
      //   setStep(selectedValues.is_full_course ? 2 : 1);
      //   setSelectedValues((prev) => ({ ...prev, languageValues: '' }));
      //   break;
      default:
        setSelectedValues((prev) => ({ ...prev, is_full_course: null }));
        setModalStep(1);
        break;
    }
  };

  const handleRadioChange = (value: string) => {
    switch (modalStep) {
      case 1:
        setSelectedValues((prev) => ({ ...prev, courseValue: value }));
        break;
      case 2:
        if (value === CourseTypeEnum.FULL_COURSE)
          setSelectedValues((prev) => ({ ...prev, is_full_course: true }));
        else setSelectedValues((prev) => ({ ...prev, is_full_course: false }));
        break;
      // case 3:
      //   setSelectedValues((prev) => ({
      //     ...prev.languageValues,
      //     languageValues: value,
      //   }));
      //   break;
      default:
        break;
    }
  };

  const handleSelectionChange = (lang: string) => {
    if (!selectedValues.languageValues.includes(lang)) {
      setSelectedValues((prev) => ({
        ...prev,
        languageValues: [...prev.languageValues, lang],
      }));
    } else if (
      selectedValues.languageValues.includes(lang) &&
      lang !== defaultLanguage
    ) {
      setSelectedValues((prev) => ({
        ...prev,
        languageValues: prev.languageValues.filter((item) => item !== lang),
      }));
    }
  };

  const getIconName = (label: string): IconTypes | undefined => {
    switch (label) {
      case CourseTypeEnum.SELF_PACED_COURSES:
        return 'selfPacedCourse';
      case CourseTypeEnum.MINI_LESSONS:
        return 'aSLMiniLesson';
      case CourseTypeEnum.IN_PERSON_CLASS:
        return 'inPersonCourse';
      case CourseTypeEnum.ZOOM_CLASS:
        return 'zoomClassCourse';
      case CourseTypeEnum.APPOINTMENTS:
        return 'appointmentCourse';
      case CourseTypeEnum.FULL_COURSE:
        return 'fullCourse';
      default:
        return 'selfPacedCourse';
    }
  };

  useEffect(() => {
    getLanguagesType();
    setModalStep(1);
    setSelectedValues(initialSelectedValues);
    if (!(slug && step)) {
      courseInfo.openModal();
    } else {
      getCourseLanguages(slug);
      setModalStep(4);
    }
  }, []);

  useEffect(() => {
    if (
      selectedValues.languageValues.length > 0 &&
      languageTypes &&
      languageTypes.length > 0
    ) {
      const languages = languageTypes?.filter((item: CourseType) =>
        selectedValues.languageValues.includes(item.value)
      );
      setSelectedLanguages(languages);
    }
  }, [selectedValues, languageTypes]);

  const mappingArray =
    modalStep === 1 ? courseTypes : modalStep === 2 ? subTypes : [];

  let subtypeSelector = '';

  if (selectedValues.is_full_course === true) {
    subtypeSelector = CourseTypeEnum.FULL_COURSE;
  } else if (selectedValues.is_full_course === false) {
    subtypeSelector = CourseTypeEnum.MINI_LESSONS;
  }
  return (
    <>
      {modalStep !== 4 && (
        <Modal
          headerTitle={t(
            'CourseManagement.CourseCategory.AddEditCategory.ModalHeader'
          )}
          width="max-w-[900px]"
          modal={courseInfo}
          headerCancelClick={() => {
            setSelectedValues(initialSelectedValues);
            navigate('/courses');
          }}
        >
          {isLoading ? (
            <Image loaderType="SiteLoader" />
          ) : (
            <div>
              <div className="select-course-type-wrap">
                {mappingArray?.map((item) => {
                  const isActive =
                    modalStep === 1
                      ? selectedValues.courseValue === item.value
                      : subtypeSelector === item.value;
                  const iconName = getIconName(item.label);
                  return (
                    <Button
                      key={item.value}
                      className={`select-course-type-item ${isActive ? 'active' : ''}`}
                      onClickHandler={() => handleRadioChange(item.value)}
                    >
                      <div className="select-course-type-icon">
                        <Image iconName={iconName} />
                      </div>
                      <span className="select-course-type-name">{item.label}</span>
                      <span className="checkbox-design" />
                    </Button>
                  );
                })}
              </div>
              <div className="select-course-type-wrap">
                {modalStep === 3 &&
                  languageTypes?.map((item) => {
                    const isChecked = selectedValues.languageValues.includes(
                      item.value
                    );
                    return (
                      <Button
                        key={item.value}
                        className={`select-course-type-item ${isChecked ? 'active' : ''}`}
                        onClickHandler={() => handleSelectionChange(item.value)}
                      >
                        <div className="select-course-type-icon">
                          <Image iconName="selfPacedCourse" />
                        </div>
                        <span className="select-course-type-name">{item.label}</span>
                        <span className="checkbox-design" />
                      </Button>
                    );
                  })}
              </div>
              <div className="modal-footer py-3 border-t px-5">
                <div className="flex items-center justify-end gap-x-4">
                  <Button
                    variants="blackBorder"
                    className="min-w-[140px]"
                    onClickHandler={handleFooterBack}
                  >
                    {t('CourseManagement.AddEditForm.PreviousButtonText')}
                  </Button>

                  <Button
                    onClickHandler={handleFooterSubmit}
                    type="submit"
                    variants="black"
                    className="min-w-[140px]"
                  >
                    {t('CourseManagement.AddEditForm.ContinueButtonText')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
      {modalStep === 4 && (
        <>
          {gettingLanguage && _.isUndefined(selectedLanguages) ? (
            <Image loaderType="SiteLoader" />
          ) : (
            selectedLanguages && (
              <CustomStepperForm
                refetchLanguageData={(e) => getCourseLanguages(e)}
                selectedValues={selectedValues}
                courseLanguages={selectedLanguages ?? []}
                course_type={
                  courseTypes?.find(
                    (item) => item.value === selectedValues.courseValue
                  )?.label as CourseTypeEnum
                }
                defaultLanguage={defaultLanguage}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default AddEditForm;
