import LessonCard from 'components/LessonCard';
import { CourseProgressEnum } from 'constants/common.constant';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ILessonsItem } from '../types/course.type';
import { CourseModule } from '../types/courseList.type';

type IMoudleWiseProps = {
  courseSlug?: string;
  moduleSlug?: CourseModule;
  language_id?: string | null;
};
const ModuleWiseLessonList = ({
  courseSlug,
  moduleSlug,
  language_id,
}: IMoudleWiseProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [getLessonList] = useAxiosGet();
  const [updateLessonStatus] = useAxiosPost();
  const [lessons, setLessons] = useState<ILessonsItem[]>([]);
  const handleGetLessonListing = async () => {
    const { data } = await getLessonList('/courses/lesson/all', {
      params: {
        course_slug: courseSlug,
        module_slug: moduleSlug?.slug,
        language_id,
        sort: 'sort_order',
      },
    });
    setLessons(data.data);
  };
  const handleProgressUpdate = async (lesson_id: string, course_id: string) => {
    await updateLessonStatus('/courses/status-update', {
      lesson_id,
      course_id,
      module_id: moduleSlug?.id,
      status: CourseProgressEnum.In_Progress,
    });
  };
  useEffect(() => {
    if (moduleSlug?.slug) handleGetLessonListing();
  }, [moduleSlug?.slug]);
  return (
    <div className="student-course-lessons-list">
      <div className="student-course-lessons-title">
        {t('CourseManagement.CoursePreview.ModuleWiseLessonList')}
      </div>
      <div className="student-course-lessons-inner">
        {lessons?.map((lesson: ILessonsItem, index: number) => {
          return (
            <LessonCard
              key={index + 1}
              title={lesson?.title}
              description={lesson?.description}
              courseProgress={50}
              duration="03:00"
              status={lesson?.course_user_tracking?.status}
              onClick={() => {
                if (
                  lesson?.course_user_tracking?.status === CourseProgressEnum.Pending
                ) {
                  handleProgressUpdate(lesson?.id as string, lesson?.course_id);
                }
                navigate(`/courses/${courseSlug}/lesson/${lesson?.slug}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ModuleWiseLessonList;
