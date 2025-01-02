import Button from 'components/Button/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { useAxiosGet } from 'hooks/useAxios';
import { quizQuestions } from 'modules/Course/types/quiz.type';
import { useEffect, useState } from 'react';
import '../../../Static5/index.css';
import QuizOptions from './QuizOptions';

export interface reviewModal {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  score: number;
  question: quizQuestions[];
  quiz_slug?: string;
}

const ReviewQuiz = ({ modal, score, question, quiz_slug }: reviewModal) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string[] | string | null>(
    null
  );
  const [, setUserAnswer] = useState<any[]>([]);

  const currentQuestion = question?.[currentQuestionIndex];

  const [getApi] = useAxiosGet();

  const fetchReviewQuizData = async () => {
    const { data: userData, error } = await getApi(`/courses/quiz/user-ans`, {
      params: {
        slug: quiz_slug,
      },
    });

    if (userData && !error) {
      setUserAnswer(userData.question_user_answer);
    }
  };

  useEffect(() => {
    if (modal.isOpen) {
      fetchReviewQuizData();
    }
  }, [modal.isOpen]);
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer(
        question[currentQuestionIndex - 1]?.checkAnswer?.userSelectedOptions
      );
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < question.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(
        question[currentQuestionIndex + 1]?.checkAnswer?.userSelectedOptions
      );
    }
  };

  const toggleAnswer = (optionSlug: string): void => {
    setSelectedAnswer((prev) => {
      if (Array.isArray(prev)) {
        return prev.includes(optionSlug)
          ? prev.filter((slug) => slug !== optionSlug)
          : [...prev, optionSlug];
      }
      return [optionSlug];
    });
  };
  return (
    <Modal closeOnEscape headerTitle="Review Quiz" closeOnOutsideClick modal={modal}>
      <Card title="Review Quiz">
        <div>
          <div>
            You got {score} Answer Right Out Of {question.length}
          </div>
          <div className="review-quiz-wrap">
            <div className="review-quiz-question-list">
              <ul>
                {question.map((_, index) => (
                  <li
                    key={index}
                    className={`${question?.[index]?.checkAnswer?.isCorrect ? 'correct' : 'wrong'}`}
                  >
                    <span className="icon">
                      <Image
                        iconName={
                          question?.[index]?.checkAnswer?.isCorrect
                            ? 'checkIcon'
                            : 'crossIcon'
                        }
                      />
                    </span>
                    Question {index + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="review-quiz-question-content">
            <div className="question-list">{currentQuestion?.question}</div>
            <QuizOptions
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              toggleAnswer={toggleAnswer}
            />
            {currentQuestion?.checkAnswer && (
              <p
                className={` ${currentQuestion?.checkAnswer?.isCorrect ? 'quiz-correct' : 'quiz-error'}`}
              >
                {currentQuestion?.checkAnswer?.message}
              </p>
            )}

            {currentQuestionIndex > 0 && (
              <Button
                variants="PrimaryWoodBorder"
                onClickHandler={handlePreviousQuestion}
              >
                Previous Question
              </Button>
            )}
            <Button variants="black" onClickHandler={handleNextQuestion}>
              Next Question
            </Button>
            <Button variants="black" onClickHandler={() => modal.closeModal()}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default ReviewQuiz;
