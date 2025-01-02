import Button from 'components/Button/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import MaterialsBox from 'components/MaterialsBox';
import { Roles } from 'constants/common.constant';
import { format } from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import Quiz from 'modules/Course/Admin/form/components/Quiz';
import { QuizData } from 'modules/Course/Admin/form/types';
import { PracticeMaterialViewTypes } from 'modules/Course/Admin/form/types/courseContentManager.types';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { MaterialTypeEnum } from '../constants';
import { ICourse } from '../types/courseList.type';
import QuizModal from './QuizModal';

type IModuleViewProps = {
  courseDetail: ICourse | undefined;
};
const PracticeMaterialView: FC<IModuleViewProps> = ({ courseDetail }) => {
  const { t } = useTranslation();
  const [activeToggle, setActiveToggle] = useState<number | null>();
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedQuizSlug, setSelectedQuizSlug] = useState<QuizData | undefined>();
  const [getMaterial, { isLoading }] = useAxiosGet();
  const quizModal = useModal();
  const { id } = useParams();
  const user = useSelector(getCurrentUser);
  const isStudent = user?.role?.role === Roles.Student;
  const isTeacher = user?.role?.role === Roles.Teacher;
  const [practiceMaterials, setPracticeMaterials] =
    useState<PracticeMaterialViewTypes>();
  const isPreview = true;
  const getPracticeMaterials = async () => {
    const { data } = await getMaterial('/courses/course-material', {
      params: {
        slug: id,
      },
    });
    setPracticeMaterials(data);
  };
  const handleQuizButtonClick = (quizDetail?: QuizData) => {
    setSelectedQuizSlug(quizDetail);
    quizModal.openModal();
  };

  useEffect(() => {
    if (id) {
      getPracticeMaterials();
    }
  }, [id]);

  const handleToggle = (index: number | null) => {
    setActiveToggle(activeToggle === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 p-10">
        <div className="lazy w-full h-20" />
        <div className="lazy !w-full h-20" />
        <div className="lazy !w-1/2 h-24" />
        <div className="lazy w-full h-48" />
      </div>
    );
  }

  return (
    <Card
      className="practice-materials-card shadow-none rounded-none"
      title="Practice Materials"
    >
      <div className="">
        <span className="teacher-practice-materials-title">
          {t('CourseManagement.CoursePreview.PracticeMaterials.Documents')}
        </span>
        <div className="teacher-practice-materials-list">
          {practiceMaterials?.course_material
            ?.filter((item) => item.material_type === MaterialTypeEnum.PRACTICE)
            ?.map((material, material_item) => (
              <MaterialsBox
                key={`material_item${material_item + 1}`}
                isDownload
                boxVariant="filePDF"
                fileName={material?.material_media_url
                  ?.split('/')
                  ?.pop()
                  ?.split('.')
                  .slice(0, -1)
                  .toString()}
                date={format(new Date(material?.updated_at), 'dd-mm-yyyy')}
                fileUrl={material.material_media_url}
              />
            ))}
        </div>
      </div>
      <div className="">
        <span className="teacher-practice-materials-title">
          {t('CourseManagement.CoursePreview.PracticeMaterials.Description')}
        </span>
        <p className="">{practiceMaterials?.course_material_media?.description}</p>
      </div>
      <div className="quiz-week-note-list">
        <span className="teacher-practice-materials-title">
          {t('CourseManagement.CoursePreview.PracticeMaterials.Notes')}
        </span>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: practiceMaterials?.course_material_media?.note as string,
          }}
        />
      </div>
      <Card minimal isGray title="Weekly Materials" className="weekly-gray-card">
        {practiceMaterials?.course_weeks?.map((week, index) => (
          <Card
            className={`quiz-week-card shadow-none ${activeToggle === index ? '' : 'collapsed'}`}
            title={`Week : ${index + 1}`}
            key={`quiz_week_card${index + 1}`}
            headerExtra={
              <Button
                onClickHandler={() => handleToggle(index)}
                className="quiz-week-card-trigger"
              >
                <Image iconName="chevronRight" iconClassName="rotate-90" />
              </Button>
            }
          >
            <div
              className="transition-all duration-300"
              ref={(el) => (contentRef.current[index] = el)}
              style={{
                maxHeight:
                  activeToggle === index
                    ? `${contentRef.current[index]?.scrollHeight}px`
                    : '0',
                overflow: 'hidden',
              }}
            >
              {week.quiz && week.quiz.length > 0 && (
                <>
                  <Button
                    onClickHandler={() => handleQuizButtonClick(selectedQuizSlug)}
                    variants="PrimaryWood"
                  >
                    {t('CourseManagement.CoursePreview.LessonView.QuizButton')}
                  </Button>

                  {week.quiz.map((quizDetail) => (
                    <div key={quizDetail.slug}>
                      {quizModal.isOpen &&
                        selectedQuizSlug?.slug === quizDetail?.slug &&
                        isStudent && (
                          <QuizModal
                            course_week_id={
                              selectedQuizSlug?.course_week_id as string
                            }
                            quiz_common_id={selectedQuizSlug?.common_id as string}
                            quiz_slug={selectedQuizSlug?.slug}
                            modal={quizModal}
                          />
                        )}
                      {isTeacher &&
                        quizModal.isOpen &&
                        selectedQuizSlug?.slug === quizDetail?.slug && (
                          <Quiz
                            course_week_id={
                              selectedQuizSlug?.course_week_id as string
                            }
                            courseCommonId={courseDetail?.common_id}
                            common_id={selectedQuizSlug?.common_id}
                            addQuiz={quizModal}
                            isPreview={isPreview}
                          />
                        )}
                    </div>
                  ))}
                </>
              )}

              {week.course_week_media.map((media, mediaItem) => {
                if (media.title) {
                  return (
                    <div
                      className="quiz-week-item"
                      key={`media_items${mediaItem + 1}`}
                    >
                      <div className="quiz-week-item__title">{media.title}</div>
                      <Link
                        to={media.link}
                        target="_blank"
                        className="quiz-week-item__link"
                      >
                        {media.link}
                      </Link>
                      <div className="quiz-week-item__desc">{media.description}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </Card>
        ))}
      </Card>
    </Card>
  );
};

export default PracticeMaterialView;
