import { LayoutConstant } from 'constants/common.constant';
import NotFound from 'modules/Auth/pages/NotFound';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { activeLayoutType } from 'reduxStore/slices/layoutSlice';
import AdminCourse from './Admin';
import OrganizationCourse from './Organization';
import StudentCourse from './Student';
import TeacherCourse from './Teacher';

const Course: FC = () => {
  const activeLayout = useSelector(activeLayoutType);
  const [CourseComponent, setCourseComponent] = useState<React.ComponentType | null>(
    null
  );

  useEffect(() => {
    switch (activeLayout) {
      case LayoutConstant.Admin:
        setCourseComponent(() => AdminCourse);
        break;
      case LayoutConstant.Organization:
        setCourseComponent(() => OrganizationCourse);
        break;
      case LayoutConstant.Teacher:
        setCourseComponent(() => TeacherCourse);
        break;
      case LayoutConstant.Student:
        setCourseComponent(() => StudentCourse);
        break;
      default:
        setCourseComponent(() => NotFound);
    }
  }, [activeLayout]);

  if (!CourseComponent) {
    return <NotFound />;
  }

  return <CourseComponent />;
};

export default Course;
