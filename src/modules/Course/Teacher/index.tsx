import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { FilterValues } from 'components/TableFilter/types';
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import CourseSlides from '../common/components/CourseSlides';
import { CourseListType } from '../common/types/courseList.type';
import TeacherFilter from './components/TeacherFilter';
import './index.css';

const TeacherCourse = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [getCourseList] = useAxiosGet();
  const [courseList, setCourseList] = useState<CourseListType[]>();
  const [filterValues, setFilterValues] = useState({});

  const getCourses = async (filterValues?: FilterValues) => {
    const { data, error } = await getCourseList('/courses/get-teacher-courses', {
      params: {
        ...(Array.isArray(filterValues?.course_category) &&
        filterValues?.course_category?.length
          ? { course_category: filterValues.course_category.toString() }
          : {}),
        ...(Array.isArray(filterValues?.asl_level) && filterValues?.asl_level.length
          ? { asl_level: filterValues.asl_level.toString() }
          : {}),
      },
    });
    if (data && !error) {
      setCourseList(data?.data);
    }
  };

  const handleFilterChange = (newValues: FilterValues) => {
    setFilterValues(newValues);
    getCourses(newValues);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <div className="container ">
        <div className="student-page-header">
          <Breadcrumbs
            items={[
              {
                label: t('Header.CMS.Home'),
                url: '/',
              },
              {
                label: t('CourseManagement.Teacher.Breadcrumbs.Courses'),
                url: '/courses',
              },
            ]}
          />
        </div>
      </div>
      <section className="student-course">
        <div className="container">
          <PageHeader title="Courses">
            <SearchComponent
              SearchBarChildren={
                <TeacherFilter
                  handleFilterChange={handleFilterChange}
                  filterValues={filterValues}
                />
              }
              IsFilter
              placeholder={t('InputSearchPlaceholder')}
            />
          </PageHeader>

          {courseList?.map((course, idx) => {
            return course?.type ? (
              <Card
                key={idx + 1}
                title={course?.type}
                className="your-course-slider-wrap mb-5 last:mb-0"
                minimal
                bigTitle
                headerExtra={
                  <Button
                    variants="PrimaryWoodBorder"
                    onClickHandler={() => navigate(`/courses/all/${course.type_id}`)}
                  >
                    {t('CourseManagement.Teacher.CourseListing.ShowAll')}
                  </Button>
                }
              >
                <CourseSlides
                  idx={idx}
                  courseType={course.type}
                  courses={course.courses || []}
                />
              </Card>
            ) : (
              <></>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default TeacherCourse;
