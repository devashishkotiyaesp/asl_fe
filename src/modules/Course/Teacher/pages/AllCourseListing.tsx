// import { ICourse } from 'modules/Course/types/courseList.type';

import Breadcrumbs from 'components/Breadcrumbs';
import MyCourseCard from 'components/MyCourseCard';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { FilterValues } from 'components/TableFilter/types';
import { CourseTypeEnum, Roles } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { t } from 'i18next';
import { CourseListType } from 'modules/Course/common/types/courseList.type';
import StudentFilter from 'modules/Course/Student/components/StudentFilter';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import TeacherFilter from '../components/TeacherFilter';

interface tempType {
  id: string;
  member_of_organizations: {
    organization_user_id: string;
  }[];
}

const AllCourseListing = () => {
  const [getCourseList] = useAxiosGet();
  const { type_id } = useParams();
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState<CourseListType>();
  const [filterValues, setFilterValues] = useState({});
  const isStudent = useSelector(getCurrentUser)?.role?.role === Roles.Student;
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

  const getShowAllCourseList = async (filterValues?: FilterValues) => {
    if (!userIds) return;

    const { data } = await getCourseList(
      `/courses/${isStudent ? 'get-user-courses' : 'get-teacher-courses'}`,
      {
        params: {
          ...(isStudent && {
            user_ids: userIds?.toString(),
          }),
          type_id,
          ...(Array.isArray(filterValues?.course_category) &&
          filterValues?.course_category?.length
            ? { course_category: filterValues.course_category.toString() }
            : {}),
          ...(Array.isArray(filterValues?.asl_level) &&
          filterValues?.asl_level.length
            ? { asl_level: filterValues.asl_level.toString() }
            : {}),
        },
      }
    );

    setCourseList(data.data[0]);
  };

  const handleFilterChange = (newValues: FilterValues) => {
    setFilterValues(newValues);
    getShowAllCourseList(newValues);
  };

  useEffect(() => {
    getUserIds();
  }, []);

  useEffect(() => {
    if (userIds) {
      getShowAllCourseList();
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
                label: t('CourseManagement.Teacher.Breadcrumbs.Courses'),
                url: '/courses',
              },
            ]}
          />
        </div>
      </div>
      <section className="student-course">
        <div className="container">
          <PageHeader title={courseList?.type}>
            <SearchComponent
              SearchBarChildren={
                !isStudent ? (
                  <TeacherFilter
                    handleFilterChange={handleFilterChange}
                    filterValues={filterValues}
                  />
                ) : (
                  <StudentFilter
                    handleFilterChange={handleFilterChange}
                    filterValues={filterValues}
                  />
                )
              }
              IsFilter
              placeholder={t('InputSearchPlaceholder')}
            />
          </PageHeader>
          <div className="content-base">
            <div className="teacher-course-list">
              {courseList?.courses.map((course) => {
                return (
                  <MyCourseCard
                    imgOverlay
                    isTagInside
                    tag={course?.courseCategory?.name}
                    variant="white"
                    title={course.title}
                    imagePath={course.cover_image ?? './images/blog-1.png'}
                    authorImage={
                      course?.type?.type !== CourseTypeEnum.SELF_PACED_COURSES
                        ? './images/profile.png'
                        : undefined
                    }
                    authorText="Stephanie Zornoza"
                    onClickCard={() => navigate(`/courses/view/${course?.slug}`)}
                    editCourseClick={
                      !isStudent && course.is_edit_access
                        ? (e) => {
                            const langParam =
                              course?.type?.type ===
                              CourseTypeEnum.SELF_PACED_COURSES
                                ? `&lang=${course.language_id}`
                                : '';
                            e.stopPropagation();
                            navigate(
                              `/courses/${course?.slug}?course_id=${course.id}&step=1${langParam}`
                            );
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllCourseListing;
