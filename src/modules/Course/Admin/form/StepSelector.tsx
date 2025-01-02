import { CourseSubTypeEnum, CourseTypeEnum, Roles } from 'constants/common.constant';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import '../../style.css';
import AppointmentStepOne from './steps/appointment/AppointmentStepOne';
import AppointmentVisibility from './steps/appointment/AppointmentVisibility';
import CourseContentManager from './steps/CourseContentManager';
import CourseVisibilitySetting from './steps/CourseVisibilitySetting';
import InPersonStepOne from './steps/inPerson/InPersonStepOne';
import MiniCourseBasicDetails from './steps/miniCourse/miniCourseBasicDetails';
import MiniCourseMaterial from './steps/miniCourse/miniCourseMaterials';
import SelfPacedBasicDetails from './steps/selfPaced/SelfPacedBasicDetails';
import SelfPacedMaterial from './steps/selfPaced/SelfPacedMaterial';
import ZoomStepOne from './steps/zoom/ZoomStepOne';
import {
  FormDataTypes,
  InPersonBasicTypes,
  MiniCourseBasicTypes,
  SelfPacedBasicTypes,
  SelfPacedModuleTypes,
  ZoomBasicTypes,
} from './types';
import { CourseMaterials } from './types/courseContentManager.types';
import { CourseVisibilityField } from './types/courseVisibilitySetting.types';

interface CourseStepFormTypes {
  course_type: string | null;
  formData: FormDataTypes;
  activeStep: number;
  is_full_course: boolean | null;
  isLoading: boolean;
  handleStepSubmit: (
    stepData:
      | SelfPacedBasicTypes
      | InPersonBasicTypes
      | ZoomBasicTypes
      | CourseMaterials
      | MiniCourseBasicTypes
      | SelfPacedModuleTypes
      | CourseVisibilityField
  ) => Promise<void>;
}
const CourseStepForm: FC<CourseStepFormTypes> = ({
  course_type,
  formData,
  handleStepSubmit,
  activeStep,
  is_full_course,
  isLoading,
}) => {
  const isAdmin = useSelector(getCurrentUser)?.role?.role === Roles.Admin;
  const getStepComponent = () => {
    if (is_full_course === false && is_full_course !== null) {
      course_type = CourseSubTypeEnum.MINI_COURSE;
    }
    switch (course_type) {
      case CourseTypeEnum.SELF_PACED_COURSES:
        switch (activeStep) {
          case 1:
            return (
              <SelfPacedBasicDetails
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            );
          case 2:
            return (
              <SelfPacedMaterial
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            );
          case 3:
            if (isAdmin) {
              return (
                <CourseVisibilitySetting
                  onSubmit={handleStepSubmit}
                  isLoading={isLoading}
                />
              );
            }
            return null;

          default:
            break;
        }
        break;

      case CourseSubTypeEnum.MINI_COURSE:
        switch (activeStep) {
          case 1:
            return (
              <MiniCourseBasicDetails
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            );
          case 2:
            return (
              <MiniCourseMaterial
                // onSubmit={handleStepSubmit}
                initialData={formData}
              />
            );
          case 3:
            if (isAdmin) {
              return (
                <CourseVisibilitySetting
                  isLoading={isLoading}
                  onSubmit={handleStepSubmit}
                />
              );
            }
            return null;
          default:
            break;
        }
        break;

      case CourseTypeEnum.IN_PERSON_CLASS:
        switch (activeStep) {
          case 1:
            return (
              <InPersonStepOne
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            );
          case 2:
            return (
              <CourseContentManager
                isLoading={isLoading}
                initialData={formData}
                onSubmit={handleStepSubmit}
              />
            );
          case 3:
            if (isAdmin) {
              return (
                <CourseVisibilitySetting
                  onSubmit={handleStepSubmit}
                  isLoading={isLoading}
                />
              );
            }
            return null;
          default:
            break;
        }
        break;

      case CourseTypeEnum.ZOOM_CLASS:
        switch (activeStep) {
          case 1:
            return (
              <ZoomStepOne
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            );
          case 2:
            return (
              <CourseContentManager
                initialData={formData}
                isLoading={isLoading}
                onSubmit={handleStepSubmit}
              />
            );
          case 3:
            if (isAdmin) {
              return (
                <CourseVisibilitySetting
                  onSubmit={handleStepSubmit}
                  isLoading={isLoading}
                />
              );
            }
            return null;
          default:
            break;
        }
        break;

      case CourseTypeEnum.APPOINTMENTS:
        switch (activeStep) {
          case 1:
            return (
              <AppointmentStepOne
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            );
          case 2:
            return (
              <CourseContentManager
                isLoading={isLoading}
                initialData={formData}
                onSubmit={handleStepSubmit}
              />
            );
          case 3:
            return (
              <AppointmentVisibility
                isLoading={isLoading}
                onSubmit={handleStepSubmit}
              />
            );
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  return <>{getStepComponent()}</>;
};

export default CourseStepForm;
