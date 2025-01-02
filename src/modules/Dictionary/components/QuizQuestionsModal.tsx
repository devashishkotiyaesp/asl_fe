import Button from 'components/Button/Button';
import ImageComponent from 'components/Image';
import { useAxiosPost } from 'hooks/useAxios';
import { UserModalType } from 'hooks/useModal';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { IQuestions } from '../types';

export default function QuizQuestionsModal({
  questions,
  quizModalRef,
}: {
  readonly questions: IQuestions[];
  readonly quizModalRef: UserModalType;
}) {
  const [callPostApi] = useAxiosPost();
  const [questionAnswers, setQuestionAnswers] = useState<string[] | null[]>([]);
  const [question, setQuestion] = useState(questions[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState(
    questionAnswers[questionIndex]
  );
  const [isVerticalImage, setIsVerticalImage] = useState<boolean>(false);

  const handleOptionClick = (optionId: string) => {
    setQuestionAnswers((prevQuestionAnswers) => {
      prevQuestionAnswers[questionIndex] = optionId;
      return prevQuestionAnswers;
    });
  };

  const getScore = () => {
    let score = 0;
    for (let i = 0; i < questionAnswers.length; i++) {
      if (questionAnswers[i] === questions[i]?.id) score++;
    }
    return score;
  };

  const addToLearnedVocabularies = async () => {
    await callPostApi('/vocab/learned', { vocabulary_id: question?.id });
  };

  useEffect(() => {
    const handleImage = async () => {
      const img = new Image();
      img.src = question?.sign_gif ?? question?.sign_photo;

      img.onload = () => {
        setIsVerticalImage(img.width < img.height);
      };
    };
    if (question) handleImage();
  }, [question]);

  useEffect(() => {
    setQuestionAnswers(new Array(questions?.length).fill(null));
  }, [questions]);

  useEffect(() => {
    if (questionAnswer === question?.id) {
      addToLearnedVocabularies();
    }
  }, [questionAnswer]);
  return questionIndex < questions?.length ? (
    <>
      <div className="quiz-progress">
        <div className="quiz-progress-wrap">
          {questions?.map((question, index) => (
            <div
              key={question?.id}
              className={`quiz-progress-bar ${index === questionIndex ? 'active' : ''}
              ${index < questionIndex ? 'completed' : ''}
              `}
            />
          ))}
        </div>
        <span className="quiz-progress-count">
          {questionIndex + 1}/{questions?.length}
        </span>
      </div>
      <div className={`mcq-img-option-wrap ${isVerticalImage ? 'isVertical' : ''}`}>
        <div className="mcq-media">
          <div className="mcq-quiz-title">
            {t('Dictionary.QuizQuestionModal.Text.MakeYourGuess')}
          </div>
          <div className="mcq-quiz-image">
            <ImageComponent
              src={question?.sign_gif ?? question?.sign_photo ?? './no-image.png'}
              isFromDataBase={false}
            />
          </div>
        </div>
        <div className="mcq-quiz-option-wrap">
          <div className="mcq-quiz-option-title">Select the Correct Answer</div>
          <div className="mcq-quiz-options">
            {question?.question_options?.map((option) => (
              <Button
                key={option?.id}
                variants={`${questionAnswer === option?.id ? (questionAnswer === question?.id ? 'Green' : 'Red') : 'blackBorder'}`}
                onClickHandler={() => {
                  if (questionAnswers[questionIndex] === null) {
                    handleOptionClick(option?.id);
                    setQuestionAnswer(option?.id);
                  }
                }}
              >
                {option.option_text}
              </Button>
            ))}
          </div>
          {/* <div className="mcq-quiz-note">
          Remember: The ASL "ONE" sign is an extended index finger with other fingers
          curled in.
        </div> */}

          {questionAnswers[questionIndex] === questions[questionIndex]?.id && (
            <div className="mcq-quiz-status green">
              <span>
                <ImageComponent iconName="checkIcon" />
              </span>
              {t('Text.Correct')}
            </div>
          )}
          {questionAnswers[questionIndex] &&
            questionAnswers[questionIndex] !== questions[questionIndex]?.id && (
              <div className="mcq-quiz-status red">
                <span>
                  <ImageComponent iconName="checkIcon" />
                </span>
                {t('Text.Incorrect')}
              </div>
            )}
        </div>
      </div>
      <div className="btn-wrap">
        <Button
          variants="PrimaryWoodBorder"
          onClickHandler={() => quizModalRef.closeModal()}
        >
          {t('Button.Cancel')}
        </Button>
        <Button
          onClickHandler={() => {
            setQuestion(questions[questionIndex + 1]);
            setQuestionAnswer(questionAnswers[questionIndex + 1]);
            setQuestionIndex(questionIndex + 1);
          }}
          variants="black"
        >
          {t('Button.Next')}
        </Button>
      </div>
    </>
  ) : (
    <div className="congrats-wrap">
      <ImageComponent iconName="celebrationPop" />
      <h3 className="congrats-wrap-title">
        {t('Dictionary.QuizQuestionModal.Text.QuizComplete')}
      </h3>
      <p className="congrats-wrap-score">
        {t('Dictionary.QuizQuestionModal.Text.Score', {
          SCORE: getScore(),
          TOTAL: questions.length,
        })}
      </p>
      <div className="btn-wrap !justify-center">
        <Button variants="black" onClickHandler={() => quizModalRef.closeModal()}>
          {t('Button.ExploreMore')}
        </Button>
      </div>
    </div>
  );
}
