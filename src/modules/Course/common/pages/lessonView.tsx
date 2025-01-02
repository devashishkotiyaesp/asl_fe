import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import VideoPlayer from 'components/VideoPlayer';
import { CourseProgressEnum, Roles } from 'constants/common.constant';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import _ from 'lodash';
import Quiz from 'modules/Course/Admin/form/components/Quiz';
import { QuizData } from 'modules/Course/Admin/form/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import '../../index.css';
import QuizModal from '../components/QuizModal';
import { LessonViewTypes } from '../types/courseList.type';

const LessonView = () => {
  const { t } = useTranslation();
  const [getLessonDetail] = useAxiosGet();
  const [lessonMarkAsCompleteApi, { isLoading }] = useAxiosPost();
  const { slug, lesson_slug, common_id } = useParams();
  const [lesson, setLesson] = useState<LessonViewTypes>();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData>();
  const user = useSelector(getCurrentUser);
  const isTeacher = user?.role?.role === Roles.Teacher;
  const quizModal = useModal();
  const isPreview = true;
  const handleQuizButtonClick = (quiz: QuizData) => {
    setSelectedQuiz(quiz);
    quizModal.openModal();
  };
  const isStudent = user?.role?.role === Roles.Student;
  const isAdmin = useSelector(getCurrentUser)?.role?.role === Roles.Admin;

  const handleGetLessonListing = async () => {
    const { data } = await getLessonDetail(`/courses/lesson`, {
      params: {
        course_slug: slug,
        slug: lesson_slug,
      },
    });
    setLesson(data);
  };

  useEffect(() => {
    handleGetLessonListing();
  }, []);

  const handleMarkAsComplete = async () => {
    const { error } = await lessonMarkAsCompleteApi('/courses/status-update', {
      lesson_id: lesson?.id,
      course_id: lesson?.course_id,
      status: CourseProgressEnum.Completed,
      ...(!_.isNull(lesson?.course_module_id)
        ? { module_id: lesson?.course_module_id }
        : {}),
    });
    if (!error) {
      handleGetLessonListing();
    }
  };
  const showMarkAsCompleted = !_.isUndefined(lesson?.course_user_tracking?.status);

  return (
    <div className="lesson-details">
      <div className="container">
        {!isAdmin && (
          <Breadcrumbs
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
                label: t('CourseManagement.Teacher.Breadcrumbs.SelfPaced'),
                url: '/',
              },
            ]}
          />
        )}
        <PageHeader title={t('LessonDetails')} />
        <div className="lesson-detail-banner">
          <Image src={lesson?.banner_image ?? ''} isFromDataBase />
          <div className="lesson-detail-content">
            <h2>{lesson?.title}</h2>
          </div>
        </div>
        {user?.role?.role === Roles.Student &&
        showMarkAsCompleted &&
        lesson?.course_user_tracking?.status !== CourseProgressEnum.Completed ? (
          <div className="flex flex-row-reverse m-3">
            <Button
              variants="black"
              small
              className=""
              onClickHandler={() => handleMarkAsComplete()}
              isLoading={isLoading}
            >
              {t('CourseManagement.CoursePreview.LessonView.MarkAsCompleted')}
            </Button>
          </div>
        ) : (
          ''
        )}
        <div className="lesson-detail-wrap">
          <div className="lesson-detail-left">
            {lesson?.lesson_video && (
              <div className="lesson-detail-media">
                <div className="lesson-detail-video">
                  <div className="video-overlay">
                    <Image iconName="playButtonRound" />
                  </div>
                  <VideoPlayer
                    src={lesson?.lesson_video}
                    title={lesson?.title}
                    poster={lesson?.banner_image}
                    srt_file={lesson?.srt_file_path}
                  />
                </div>
              </div>
            )}
            <div className="lesson-detail-quizbox">
              {lesson?.quiz?.map((quizDetail) => (
                <div key={quizDetail.slug}>
                  <Button
                    key={quizDetail.slug}
                    onClickHandler={() => handleQuizButtonClick(quizDetail)}
                    variants="black"
                  >
                    {t('CourseManagement.CoursePreview.LessonView.QuizButton')}
                  </Button>
                </div>
              ))}
              <Image src="./images/question.png" isFromDataBase={false} />
            </div>
            {/* <div className="lesson-detail-quizbox attempted">
              <div className="content">
                <p>
                  <strong>Your Score</strong>
                  You got 6 answers right out of 8
                </p>
                <Button variants="black">Review Quiz</Button>
              </div>
              <Image src="./images/quiz-attempted.png" isFromDataBase={false} />
            </div> */}
          </div>
          {quizModal.isOpen && isStudent && (
            <QuizModal
              lesson_slug={lesson_slug}
              quiz_slug={selectedQuiz?.slug}
              quiz_common_id={selectedQuiz?.common_id}
              modal={quizModal}
            />
          )}
          {isTeacher && quizModal.isOpen && (
            <Quiz
              lesson_common_id={lesson?.common_id}
              courseCommonId={common_id}
              slug={selectedQuiz?.slug}
              common_id={selectedQuiz?.common_id}
              addQuiz={quizModal}
              isPreview={isPreview}
            />
          )}
          <div className="lesson-detail-right">
            {lesson?.description}
            <Link target="_blank" to={lesson?.video_link ?? ''}>
              {lesson?.video_link}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
