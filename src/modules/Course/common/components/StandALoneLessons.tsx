import LessonCard from 'components/LessonCard';
import { CourseProgressEnum } from 'constants/common.constant';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILessonsItem } from '../types/course.type';
import { ICourse } from '../types/courseList.type';

type IModuleViewProps = {
  courseDetail: ICourse | undefined;
};
const StandALoneLessons = ({ courseDetail }: IModuleViewProps) => {
  const navigate = useNavigate();
  const [getLessonList] = useAxiosGet();
  const [updateLessonStatus] = useAxiosPost();
  const [lessons, setLessons] = useState<ILessonsItem[]>([]);
  const handleGetLessonListing = async () => {
    const { data } = await getLessonList('/courses/lesson/all', {
      params: {
        course_slug: courseDetail?.slug,
        language_id: courseDetail?.language_id,
      },
    });
    setLessons(data.data);
  };
  const handleProgressUpdate = async (lesson_id: string, course_id: string) => {
    await updateLessonStatus('/courses/status-update', {
      lesson_id,
      course_id,
      status: CourseProgressEnum.In_Progress,
    });
  };
  useEffect(() => {
    if (courseDetail?.slug) handleGetLessonListing();
  }, [courseDetail?.slug]);
  return (
    <div className="student-course-lessons-list">
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
                navigate(`/courses/${courseDetail?.slug}/lesson/${lesson?.slug}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StandALoneLessons;
