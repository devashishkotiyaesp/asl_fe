import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Roles } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import Quiz from 'modules/Course/Admin/form/components/Quiz';
import { QuizData } from 'modules/Course/Admin/form/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { CourseModule, ICourse } from '../types/courseList.type';
import ModuleWiseLessonList from './ModuleWiseLessonList';
import QuizModal from './QuizModal';

type IModuleViewProps = {
  courseDetail: ICourse | undefined;
};
const ModuleView = ({ courseDetail }: IModuleViewProps) => {
  const { t } = useTranslation();
  const [moduleList, setModuleList] = useState<CourseModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<CourseModule>();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData>();
  const quizModal = useModal();
  const [getModuleList] = useAxiosGet();
  const isPreview = true;
  const user = useSelector(getCurrentUser);
  const isTeacher = user?.role?.role === Roles.Teacher;
  const isStudent = user?.role?.role === Roles.Student;

  const handleGetModuleListing = async () => {
    const { data } = await getModuleList(`/courses/module/all`, {
      params: {
        course_slug: courseDetail?.slug,
        language_id: courseDetail?.language_id,
        sort: 'sort_order',
      },
    });
    setModuleList(data.data);
    if (data?.data?.length > 0) {
      setSelectedModule(data?.data[0]);
    }
  };

  useEffect(() => {
    handleGetModuleListing();
  }, []);
  const handleQuizButtonClick = (quiz: QuizData) => {
    setSelectedQuiz(quiz);
    quizModal.openModal();
  };
  return (
    <div className="student-course-list">
      <div className="student-course-module-list">
        <ul>
          {moduleList?.map((module: CourseModule, index) => {
            return (
              <div key={`moduleListing${index + 1}`}>
                <li>
                  {/* add complete class with status-icon to show completed status */}
                  <span className="status-icon">
                    <Image iconName="threeMoreDots" />
                  </span>
                  <Button
                    className="text"
                    onClickHandler={() => setSelectedModule(module)}
                  >
                    <span
                      className={`${selectedModule?.slug === module?.slug ? 'font-bold' : ''}`}
                    >
                      {`${index + 1}`.padStart(2, '0')}. {module?.title}
                    </span>
                    {selectedModule?.slug === module?.slug && (
                      <Image iconName="arrowRight" />
                    )}
                  </Button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <>
        {moduleList?.map((module) => {
          return (
            selectedModule?.slug === module?.slug && (
              <div className="student-course-module-card-wrap">
                <div className="sign-connect-title">{module?.title}</div>
                <div className="sign-connect-wrap">
                  <div className="sign-connect-left">
                    <div className="img-wrap">
                      <Image
                        src={selectedModule?.cover_image ?? './images/blog-1.png'}
                        isFromDataBase
                      />
                    </div>
                  </div>
                  <div className="sign-connect-right">
                    {module.quiz_exist && module.quiz?.length > 0 && (
                      <div className="quiz-wrap">
                        {module.quiz.map((quiz) => (
                          <Button
                            key={quiz.slug}
                            onClickHandler={() => handleQuizButtonClick(quiz)}
                            variants="black"
                          >
                            {t(
                              'CourseManagement.CoursePreview.LessonView.QuizButton'
                            )}
                          </Button>
                        ))}
                        <Image src="./images/question.png" isFromDataBase={false} />
                      </div>
                    )}
                  </div>
                </div>
                <ModuleWiseLessonList
                  courseSlug={courseDetail?.slug}
                  moduleSlug={selectedModule}
                  language_id={courseDetail?.language_id}
                />
              </div>
            )
          );
        })}
      </>
      {isStudent && quizModal.isOpen && (
        <QuizModal
          module_slug={selectedModule?.slug}
          quiz_slug={selectedQuiz?.slug}
          module_common_id={selectedModule?.common_id}
          quiz_common_id={selectedQuiz?.common_id as string}
          modal={quizModal}
        />
      )}
      {isTeacher && quizModal.isOpen && (
        <Quiz
          courseCommonId={courseDetail?.common_id}
          module_common_id={selectedModule?.common_id}
          slug={selectedQuiz?.slug}
          addQuiz={quizModal}
          isPreview={isPreview}
          common_id={selectedQuiz?.common_id}
        />
      )}
    </div>
  );
};

export default ModuleView;
