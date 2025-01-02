import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import MyCourseCard from 'components/MyCourseCard';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { FilterValues } from 'components/TableFilter/types';
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CourseSlides from '../common/components/CourseSlides';
import { CourseListType } from '../common/types/courseList.type';
import '../index.css';
import StudentFilter from './components/StudentFilter';

interface tempType {
  id: string;
  member_of_organizations: {
    organization_user_id: string;
  }[];
}

const StudentCourse = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [getCourseList, { isLoading }] = useAxiosGet();

  /* States */
  const [courseList, setCourseList] = useState<CourseListType[]>();
  const [filterValues, setFilterValues] = useState({});
  const [userIds, setUserIds] = useState<(string | undefined)[]>();
  const userDetails = useSelector(getCurrentUser) as tempType;

  const getUserIds = () => {
    const { id } = userDetails;
    if (userDetails.member_of_organizations.length !== 0) {
      const orgUserIds = userDetails.member_of_organizations.map(
        (org) => org.organization_user_id
      );
      setUserIds([...orgUserIds, id]);
    } else {
      setUserIds([id]);
    }
  };

  const getCourses = async (filterValues?: FilterValues) => {
    if (!userIds) return;

    const { data, error } = await getCourseList('/courses/get-user-courses', {
      params: {
        user_ids: userIds?.toString(),
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
    getUserIds();
  }, []);

  useEffect(() => {
    if (userIds) {
      getCourses();
    }
  }, [userIds]);

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
                label: t('Courses.Title'),
                url: '/courses',
              },
            ]}
          />
        </div>
      </div>
      <section className="student-course">
        <div className="container">
          <PageHeader title={t('Courses.Title')}>
            <SearchComponent
              SearchBarChildren={
                <StudentFilter
                  handleFilterChange={handleFilterChange}
                  filterValues={filterValues}
                />
              }
              IsFilter
              placeholder={t('InputSearchPlaceholder')}
            />
          </PageHeader>
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Image loaderType="Spin" />
            </div>
          ) : (
            courseList &&
            courseList?.length > 0 &&
            courseList.map((course, idx) => {
              if (!course?.type) return null; // Skip if no course type

              return (
                <Card
                  key={idx + 1}
                  title={course.type}
                  className="your-course-slider-wrap mb-5 last:mb-0"
                  minimal
                  bigTitle
                  headerExtra={
                    <Button
                      variants="PrimaryWoodBorder"
                      onClickHandler={() =>
                        navigate(`/courses/all/${course.type_id}`)
                      }
                    >
                      {t('CourseManagement.Teacher.CourseListing.ShowAll')}
                    </Button>
                  }
                >
                  <div className="arrow-up">
                    <CourseSlides
                      idx={idx}
                      courseType={course.type}
                      courses={course.courses || []}
                    />
                  </div>
                </Card>
              );
            })
          )}

          {/* //Static data of live assessment dynamic is remaining to integrate */}
          <Card
            title={t('LiveAssessment.assessmentTitle')}
            className="your-course-slider-wrap mb-5 last:mb-0"
            minimal
            bigTitle
          >
            <div className="your-course-slider arrow-up">
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                speed={800}
                modules={[Navigation]}
                className=""
              >
                <SwiperSlide>
                  <MyCourseCard
                    imgOverlay
                    variant="white"
                    title={t('LiveAssessment.title')}
                    imagePath="/images/student-course.png"
                    isFromDatabase={false}
                    ButtonText={t('Student.courses.appointments.title')}
                    onClickHandler={() => {
                      navigate('/courses/book-appointment');
                    }}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default StudentCourse;
