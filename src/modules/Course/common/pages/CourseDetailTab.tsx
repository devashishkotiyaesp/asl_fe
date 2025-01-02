import Breadcrumbs from 'components/Breadcrumbs';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import TabComponent from 'components/Tabs';
import { TabColumnProps } from 'components/Tabs/types';
import { CourseTypeEnum, Roles } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import '../../index.css';
import CourseDetails from '../components/CourseDetail';
import EnrolledStudents from '../components/EnrolledStudents';
import ModuleView from '../components/ModuleView';
import PracticeMaterialView from '../components/PracticeMaterialView';
import StandALoneLessons from '../components/StandALoneLessons';
import StudentRoasterList from '../components/StudentRoasterSheet';
import TeachingMaterialView from '../components/TeachingMaterialView';
import { ICourse } from '../types/courseList.type';

const CourseDetailTab = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('course') ?? 'courseDetails';
  const currentCourse =
    urlParams.get('course_type') ?? CourseTypeEnum.SELF_PACED_COURSES;
  const [activeTab, setActiveTab] = useState(currentTab ?? '');
  const [courseDetail, setCourseDetail] = useState<ICourse>();
  const [getApi, { isLoading }] = useAxiosGet();
  const { id } = useParams();
  const storeLang = useSelector(useLanguage);
  const languageId = storeLang.allLanguages?.find(
    (lang) => lang.short_name === storeLang.language
  )?.id;
  const user = useSelector(getCurrentUser)?.role?.role;
  const isAdmin = user === Roles.Admin;
  const isStudent = user === Roles.Student;

  const handleGetCourseDetail = async () => {
    const { data } = await getApi('/courses/basic-details', {
      params: {
        slug: id,
      },
    });
    setCourseDetail(data);
  };
  useEffect(() => {
    handleGetCourseDetail();
  }, [id, languageId]);

  const tabs: TabColumnProps[] = [
    {
      uniqueKey: 'courseDetails',
      title: t('CourseManagement.CoursePreview.CourseDetailTab'),
      component: (
        <CourseDetails
          courseDetail={courseDetail}
          refetch={handleGetCourseDetail}
          isPageLoading={isLoading}
        />
      ),
    },
    ...(currentCourse === CourseTypeEnum.SELF_PACED_COURSES
      ? [
          courseDetail?.has_modules
            ? {
                uniqueKey: 'modules',
                title: t('CourseManagement.CoursePreview.ModulesTab'),
                component: <ModuleView courseDetail={courseDetail} />,
              }
            : {
                uniqueKey: 'lessons',
                title: t('CourseManagement.CoursePreview.LessonsTab'),
                component: <StandALoneLessons courseDetail={courseDetail} />,
              },
        ]
      : [
          {
            uniqueKey: 'practiceMaterials',
            title: t('CourseManagement.CoursePreview.PracticeMaterialsTab'),
            component: <PracticeMaterialView courseDetail={courseDetail} />,
          },
          {
            uniqueKey: 'teachingMaterials',
            title: t('CourseManagement.CoursePreview.TeachingMaterialsTab'),
            component: <TeachingMaterialView />,
          },
        ]),

    ...(!isStudent
      ? [
          {
            uniqueKey: 'enrolledStudents',
            title: t('CourseManagement.CoursePreview.EnrolledStudentsTab'),
            component: <EnrolledStudents />,
          },
          {
            uniqueKey: 'studentRoasterSheet',
            title: t('CourseManagement.CoursePreview.StudentRoasterSheetTab'),
            component: <StudentRoasterList />,
          },
        ]
      : []),
  ];

  return (
    <div className="student-course-view">
      <div className={!isAdmin ? 'container' : ''}>
        {!isAdmin && (
          <Breadcrumbs
            className="student-page-header"
            items={[
              {
                label: t('CourseManagement.Teacher.Breadcrumbs.Home'),
                url: '/',
              },
              {
                label: t('CourseManagement.Teacher.Breadcrumbs.Courses'),
                url: '/courses',
              },
              {
                label: `${courseDetail?.title ?? t('CourseManagement.Teacher.Breadcrumbs.CourseDetail')}`,
                url: '/',
              },
            ]}
          />
        )}
        <div className="student-course-banner-wrap">
          <PageHeader title={courseDetail?.title} url="/courses" />
          <div className="student-course-banner">
            <Image src={courseDetail?.cover_image ?? ''} isFromDataBase />
            <div className="student-course-content">
              <div className="student-course-tag">
                {courseDetail?.is_full_course &&
                  courseDetail?.key_learnings.map((key) => <span>{key}</span>)}
              </div>
              <div className="student-course-title">{courseDetail?.title}</div>
              <div className="student-course-category">
                <span>{courseDetail?.type?.type}</span>
                {courseDetail?.courseCategory?.name && (
                  <span>{courseDetail?.courseCategory.name}</span>
                )}
              </div>
            </div>
          </div>

          <div className="student-course-tab-wrap">
            <TabComponent
              current={activeTab}
              onTabChange={(status: string) => {
                setActiveTab(status);
              }}
            >
              {tabs?.map(
                (
                  { title, component, icon, uniqueKey }: TabColumnProps,
                  index: number
                ) => (
                  <TabComponent.Tab
                    uniqueKey={uniqueKey}
                    key={`TAB_${index + 1}`}
                    title={title}
                    icon={icon}
                  >
                    {activeTab === uniqueKey && component}
                  </TabComponent.Tab>
                )
              )}
            </TabComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailTab;
