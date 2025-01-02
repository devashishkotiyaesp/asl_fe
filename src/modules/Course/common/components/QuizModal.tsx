import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { QuestionTypeName, QuizType } from 'modules/Course/Admin/constants';
import { QuestionOption, QuizData } from 'modules/Course/Admin/form/types';
import { Answer, quizModal, quizQuestions } from 'modules/Course/types/quiz.type';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import QuizOptions from './QuizOptions';
import ReviewQuiz from './ReviewQuiz';

const QuizModal = ({
  modal,
  quiz_slug,
  quiz_common_id,
  module_slug,
  lesson_slug,
  // course_week_id,
}: quizModal) => {
  const data = useParams();
  const course_slug = data.id ?? data.slug;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuizData>();
  const [questions, setQuestions] = useState<quizQuestions[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string[] | string | null>(
    null
  );
  const [title, setTitle] = useState<string>('');
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [finalScore, setFinalScore] = useState<number>(0);
  const reviewModal = useModal();
  const [questionType, setQuestionType] = useState<string>('');
  const [preview, setPreview] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const isQuestionAnswered = answeredQuestions.every((answered) => answered);
  const [getApi] = useAxiosGet();
  const [postApi, { isLoading: isLoadingCheckAns }] = useAxiosPost();
  const currentQuestion = questions[currentQuestionIndex];

  const { t } = useTranslation();

  const getQuestionTypeName = (type: string): string => {
    switch (type) {
      case QuizType.MCQ:
        return QuestionTypeName.QUIZ;
      case QuizType.TRUE_FALSE:
        return QuestionTypeName.TRUE_FALSE;
      case QuizType.FILL_IN_THE_BLANK:
        return QuestionTypeName.FILL_IN_THE_BLANK;
      case QuizType.SHORT_ANSWER:
        return QuestionTypeName.SHORT_ANSWER;
      case QuizType.ARRANGE_ORDER:
        return QuestionTypeName.ORDER_QUIZ;
      case QuizType.MULTIPLE_ANSWER:
        return QuestionTypeName.FIND_RIGHT_ANSWER;
      default:
        return QuestionTypeName.UNKNOWN;
    }
  };

  const toggleAnswer = (option_slug: string): void => {
    setSelectedAnswer((prev) => {
      if (Array.isArray(prev)) {
        return prev.includes(option_slug)
          ? prev.filter((slug) => slug !== option_slug)
          : [...prev, option_slug];
      }
      return [option_slug];
    });
  };

  const fetchQuizData = async () => {
    setIsLoading(true);
    setCurrentQuestionIndex(0);
    if (quiz_slug && course_slug) {
      const { data, error } = await getApi(`/courses/quiz/all`, {
        params: {
          slug: quiz_slug,
        },
      });
      setTitle(data.title);

      const { data: userData, error: userError } = await getApi(
        `/courses/quiz/user-ans`,
        {
          params: {
            slug: quiz_slug,
          },
        }
      );

      if (data && !error) {
        setQuizData(data);
        setQuestions(data.quizQuestions);
        setAnsweredQuestions(() => new Array(data.quizQuestions.length).fill(false));
        setQuestionType(data.quizQuestions[0].question_type);
        if (userData && !userError) {
          const mappedAnswers = data.quizQuestions.map((question: quizQuestions) => {
            const updatedQuestions = userData?.question_user_answer?.filter(
              (ans: Answer) => ans.question_id === question.id
            );

            if (updatedQuestions && updatedQuestions.length > 0) {
              const selectedOptionSlug = updatedQuestions.flatMap(
                (answer: Answer) => answer.questions?.question_options
              );
              const userSelectedOptions =
                question.question_type === QuizType.SHORT_ANSWER
                  ? updatedQuestions
                      .map((answer: Answer) => answer.answer_text)
                      .join(', ')
                  : updatedQuestions.flatMap((answer: Answer) => {
                      if (question.question_type === QuizType.ARRANGE_ORDER) {
                        return answer.answer_sequence.map((optionId: string) => {
                          const option = question.question_options.find(
                            (option) => option.id === optionId
                          );
                          return option ? option.slug : null;
                        });
                      }
                      return answer.questions?.question_options
                        .filter(
                          (option: QuestionOption) =>
                            answer.selected_option_id === option.id
                        )
                        .map((option: QuestionOption) => option.slug);
                    });
              const userSelectedOptionsResult =
                question.question_type === QuizType.SHORT_ANSWER
                  ? userSelectedOptions
                  : userSelectedOptions.length === 1
                    ? userSelectedOptions[0]
                    : userSelectedOptions;

              // if (question.id === data.quizQuestions[0].id) {
              //   setSelectedAnswer(userSelectedOptionsResult);
              // }
              const correctOptionIds = selectedOptionSlug
                .filter((option: QuestionOption) => option.is_correct)
                .map((option: QuestionOption) => option.id);

              const correctAnsText = selectedOptionSlug
                .map((option: QuestionOption) => option.correct_answer)
                .join(', ');
              const selectedOptionIds = updatedQuestions.map(
                (answer: Answer) => answer.selected_option_id
              );

              const updatedOptions = question.question_options.map((option) => {
                const isCorrect = correctOptionIds.includes(option.id);
                const isSelected = selectedOptionIds.includes(option.id);

                return {
                  ...option,
                  isCorrect,
                  isSelected,
                  isDisabled: true,
                };
              });

              return {
                ...question,
                question_options: updatedOptions,
                checkAnswer: {
                  isCorrect: updatedQuestions.every(
                    (answer: Answer) => answer.is_correct
                  ),
                  correctAns_text: correctAnsText,
                  answer_text: updatedQuestions
                    .map((answer: Answer) => answer.answer_text)
                    .join(', '),
                  isDisabled: true,
                  message: updatedQuestions.every(
                    (answer: Answer) => answer.is_correct
                  )
                    ? t('QuizModal.Completion.CorrectAnswer')
                    : t('QuizModal.Completion.IncorrectAnswer'),

                  userSelectedOptions: userSelectedOptionsResult,
                },
              };
            }

            return question;
          });
          setQuestions(mappedAnswers);
          const preAnsweredQuestions = mappedAnswers.map(
            (question: any) => question.checkAnswer !== undefined
          );
          setAnsweredQuestions(preAnsweredQuestions);
        }
      }
      const { data: quizCompletionData } = await getApi(
        `/courses/quiz/quiz-report`,
        {
          params: {
            slug: quiz_slug,
          },
        }
      );
      if (
        quizCompletionData !== null &&
        Object.keys(quizCompletionData).length > 0 &&
        quiz_slug === quizCompletionData?.quiz_report?.slug
      ) {
        setPreview(quizCompletionData?.is_preview);
        setFinalScore(quizCompletionData?.obtain_score);
        setQuizComplete(true);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (modal.isOpen) {
      fetchQuizData();
    }
  }, [quiz_common_id, modal.isOpen]);

  const handleCheckAnswer = async () => {
    if (
      selectedAnswer === null ||
      selectedAnswer === undefined ||
      selectedAnswer.length === 0
    ) {
      setFeedback(t('QuizModal.Feedback.SelectAnswer'));
      return;
    }
    const { data, error } = await postApi(`/courses/quiz/check-ans`, {
      question_slug: currentQuestion.slug,
      option_slug: selectedAnswer,
      quiz_slug,
      course_slug,
      lesson_slug,
      module_slug,
      course_week_id: quizData?.course_week_id,
    });
    if (data && !error) {
      setAnsweredQuestions((prev) => {
        prev[currentQuestionIndex] = true;
        return prev;
      });
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        const currentQuestion = updatedQuestions[currentQuestionIndex];
        const updatedOptions = currentQuestion.question_options.map((option) => ({
          ...option,
          isCorrect: option.option_text === data.data,
          isSelected: option.slug === selectedAnswer,
          isDisabled: true,
        }));

        updatedQuestions[currentQuestionIndex] = {
          ...currentQuestion,
          question_options: updatedOptions,
          checkAnswer: {
            isCorrect: data.isCorrect,
            correctAns_text: data.data,
            isDisabled: true,
            message: data.message,
            userSelectedOptions: selectedAnswer,
          },
        };
        return updatedQuestions;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setFeedback(null);
      setQuestionType(questions[currentQuestionIndex + 1].question_type);
      setSelectedAnswer(
        questions[currentQuestionIndex + 1]?.checkAnswer?.userSelectedOptions
      );
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setFeedback(null);
      setQuestionType(questions?.[currentQuestionIndex - 1]?.question_type);
      setSelectedAnswer(
        questions[currentQuestionIndex - 1]?.checkAnswer?.userSelectedOptions
      );
    }
  };

  const submitScore = async (score: number) => {
    const { data, error } = await postApi(`/courses/quiz/submit-score`, {
      slug: quiz_slug,
      total_score: questions.length,
      obtain_score: score,
    });
    if (data && !error) {
      setQuizComplete(true);
      setFeedback('Quiz submitted successfully!');
    }
  };

  const handleFinishQuestion = async () => {
    if (
      selectedAnswer === null ||
      selectedAnswer === undefined ||
      selectedAnswer.length === 0
    ) {
      setFeedback(t('QuizModal.Feedback.SelectAnswer'));
      return;
    }
    let score = 0;
    questions.forEach((question) => {
      if (question.checkAnswer?.isCorrect) {
        score += 1;
      }
    });

    setFinalScore(score);
    await submitScore(score);
  };

  const handleQuizReview = async () => {
    const { data } = await postApi(`/courses/quiz/review`, {
      is_preview: true,
      slug: quiz_slug,
    });
    setPreview(data?.[0]?.is_preview);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setSelectedAnswer(null);
    reviewModal.openModal();
  };

  if (!modal.isOpen) {
    return null;
  }

  return (
    <div>
      <Modal
        closeOnEscape
        headerTitle={title}
        closeOnOutsideClick
        handleCloseOutsideClick={() => {
          setQuizComplete(false);
          modal.closeModal();
        }}
        headerCancelClick={() => {
          setQuizComplete(false);
        }}
        modal={modal}
      >
        {quizComplete ? (
          <div className="congrats-wrap">
            <Image iconName="celebrationPop" />
            <h3 className="congrats-wrap-title">{t('QuizModal.Congrats.Title')}</h3>
            <p className="congrats-wrap-score">
              {t('QuizModal.Congrats.Score', {
                finalScore,
                length: questions.length,
              })}
            </p>
            <div className="btn-wrap !justify-center">
              {!preview && (
                <Button
                  variants="PrimaryWoodLight"
                  onClickHandler={handleQuizReview}
                  isLoading={isLoadingCheckAns}
                >
                  {t('QuizModal.Button.QuizReview')}
                </Button>
              )}
              <Button variants="black" onClickHandler={() => modal.closeModal()}>
                {t('QuizModal.Button.GoToModule')}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="lazy h-[50px]" />
            ) : questions.length > 0 ? (
              <div className="student-quiz">
                <div className="quiz-progress">
                  <div className="quiz-progress-wrap">
                    {questions.map((_, index) => {
                      let barClass = 'quiz-progress-bar';

                      if (answeredQuestions[index]) {
                        barClass += ' completed';
                      } else if (index === currentQuestionIndex) {
                        barClass += ' active';
                      }

                      return <span key={index} className={barClass} />;
                    })}
                  </div>
                  <span className="quiz-progress-count">
                    0{currentQuestionIndex + 1}/0{questions.length}
                  </span>
                </div>
                <div className="quiz-title-bar">
                  {getQuestionTypeName(questionType)}
                </div>

                <div className="ques-ans-wrapper">
                  <div className="ques-item">
                    <div className="ques-item-text">
                      {t('QuizModal.Question.Label', {
                        question_number: currentQuestionIndex + 1,
                      })}
                    </div>
                    <div className="ques-item-list">
                      <label className="ques-item-title">
                        {currentQuestion?.question}
                      </label>
                      {currentQuestion?.question_attachment_url && (
                        <div className="ques-ans-media-wrap">
                          <Image
                            src={currentQuestion?.question_attachment_url}
                            isFromDataBase
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ans-item">
                    <div className="ans-item-text">
                      {t('QuizModal.Question.Text')}
                    </div>
                    <QuizOptions
                      question={currentQuestion}
                      selectedAnswer={selectedAnswer}
                      setSelectedAnswer={setSelectedAnswer}
                      toggleAnswer={toggleAnswer}
                    />
                  </div>
                </div>

                {/* FOR ERROR WHILE SELECTING - CHEK ANSWER */}
                {feedback && !currentQuestion?.checkAnswer && (
                  <p className="quiz-error">{feedback}</p>
                )}
                {/* FOR ERROR WHILE SELECTING - CHEK ANSWER */}

                {/* FOR ERROR WHILE CHECK SHORT ANSWER - CHEK ANSWER */}
                {currentQuestion?.checkAnswer &&
                  currentQuestion.question_type === QuizType.SHORT_ANSWER && (
                    <p className="quiz-correct">
                      {t('QuizModal.Question.CorrectAnswer', {
                        correct_answer_text:
                          currentQuestion?.checkAnswer.correctAns_text,
                      })}
                    </p>
                  )}

                {/* FOR ERROR WHILE CHECK SHORT ANSWER - CHEK ANSWER */}

                {currentQuestion?.checkAnswer && (
                  <p
                    className={` ${currentQuestion?.checkAnswer.isCorrect ? 'quiz-correct' : 'quiz-error'}`}
                  >
                    {currentQuestion?.checkAnswer.message}
                  </p>
                )}

                <div className="btn-wrap">
                  <Button
                    variants="PrimaryWood"
                    onClickHandler={handleCheckAnswer}
                    disabled={
                      currentQuestion?.checkAnswer?.isDisabled || isLoadingCheckAns
                    }
                    isLoading={isLoadingCheckAns}
                  >
                    {t('QuizModal.Button.CheckAnswer')}
                  </Button>
                  {currentQuestionIndex > 0 && (
                    <Button
                      variants="PrimaryWoodBorder"
                      onClickHandler={handlePreviousQuestion}
                    >
                      {t('QuizModal.Button.PreviousQuestion')}
                    </Button>
                  )}

                  {isQuestionAnswered &&
                  currentQuestionIndex + 1 === questions.length ? (
                    <Button
                      variants="black"
                      onClickHandler={handleFinishQuestion}
                      disabled={!isQuestionAnswered}
                    >
                      {t('QuizModal.Button.FinishAndResults')}
                    </Button>
                  ) : (
                    <Button variants="black" onClickHandler={handleNextQuestion}>
                      {t('QuizModal.Button.NextQuestion')}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div>{t('QuizModal.NoQuestions')}</div>
            )}
          </>
        )}
      </Modal>
      <ReviewQuiz
        quiz_slug={quiz_slug}
        modal={reviewModal}
        score={finalScore}
        question={questions}
      />
    </div>
  );
};

export default QuizModal;
