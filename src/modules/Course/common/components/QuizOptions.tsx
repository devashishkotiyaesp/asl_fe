import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import { QuizType } from 'modules/Course/Admin/constants';
import ArrangeOrder from 'modules/Course/Admin/form/components/ArrangeOrder';
import { QuestionOption } from 'modules/Course/Admin/form/types';
import { quizQuestions } from 'modules/Course/types/quiz.type';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

export interface QuizOption {
  question: quizQuestions;
  selectedAnswer: string | string[] | null;
  setSelectedAnswer: Dispatch<SetStateAction<string | string[] | null>>;
  toggleAnswer: (option_slug: string) => void;
}

const QuizOptions = ({
  question,
  selectedAnswer,
  setSelectedAnswer,
  toggleAnswer,
}: QuizOption) => {
  const { t } = useTranslation();

  const getOptionClass = (option: QuestionOption) => {
    switch (true) {
      case option.isCorrect:
        return 'Green';
      case option.isSelected && !option.isCorrect:
        return 'Red';
      case option.isSelected:
        return 'PrimaryWood';
      default:
        return 'PrimaryWoodLight';
    }
  };
  switch (question?.question_type) {
    case QuizType.MCQ:
      return (
        <div className="mcq-items-bar">
          {question.question_options.map((option, idx) => {
            return (
              <div className="mcq-item" key={`question_options${idx + 1}`}>
                <Button
                  variants={`${getOptionClass(option)}`}
                  className={` `}
                  onClickHandler={() => setSelectedAnswer(option.slug as string)}
                  disabled={!!question?.checkAnswer || option.isDisabled}
                >
                  {option.option_text}
                </Button>
                <Image
                  isFromDataBase
                  imgClassName="w-[25px] h-[25px]"
                  src={option.option_attachment_url as string}
                />
              </div>
            );
          })}
        </div>
      );
    case QuizType.TRUE_FALSE:
    case QuizType.FILL_IN_THE_BLANK:
      return (
        <div className="sort-ans-box-bar">
          {question.question_options.map((option, idx) => (
            <span key={`question_options_answer${idx + 1}`} className="">
              <label>
                <input
                  type="checkbox"
                  checked={selectedAnswer === option.slug}
                  onChange={() => setSelectedAnswer(option.slug as string)}
                  disabled={!!question?.checkAnswer}
                />
                {option.option_text}
              </label>
              <Image
                isFromDataBase
                imgClassName="w-[25px] h-[25px]"
                src={option.option_attachment_url as string}
              />
            </span>
          ))}
        </div>
      );
    case QuizType.SHORT_ANSWER:
      return (
        <div>
          <textarea
            className="inputField mb-5"
            rows={5}
            name="orderAnswer"
            placeholder={t('ViewQuiz.ShortAnswer.Placeholder.EnterAnswer')}
            disabled={!!question?.checkAnswer}
            value={selectedAnswer as string}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        </div>
      );
    case QuizType.ARRANGE_ORDER:
      return (
        <div>
          {question?.checkAnswer ? (
            <ArrangeOrder
              options={question.question_options}
              orderedOptions={() => {
                setSelectedAnswer(question?.checkAnswer.userSelectedOptions);
              }}
              disableDrag
            />
          ) : (
            <ArrangeOrder
              options={question.question_options}
              orderedOptions={(data) => {
                setSelectedAnswer(JSON.stringify(data.map((item) => item.slug)));
              }}
            />
          )}

          {question?.checkAnswer && (
            <ArrangeOrder
              options={question.question_options}
              orderedOptions={() => {
                setSelectedAnswer(question?.checkAnswer.userSelectedOptions);
              }}
              disableDrag
            />
          )}
          <p className="dnd-note">{t('ViewQuizDnd.Note.Reorder')}</p>
        </div>
      );
    case QuizType.MULTIPLE_ANSWER:
      return (
        <div className="sort-ans-box-bar">
          {question.question_options.map((option, idx) =>
            option.option_attachment_url ? (
              <span className="with-image" key={`option_image${idx + 1}`}>
                <Image
                  isFromDataBase
                  imgClassName="w-[25px] h-[25px]"
                  src={option.option_attachment_url as string}
                />
                <Checkbox
                  check={selectedAnswer?.includes(option.slug as string) || false}
                  disabled={!!question?.checkAnswer}
                  onChange={() => toggleAnswer(option.slug as string)}
                />
              </span>
            ) : (
              <span key={`Quiz_Multiple_answer${idx + 1}`}>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      selectedAnswer?.includes(option.slug as string) || false
                    }
                    disabled={!!question?.checkAnswer}
                    onChange={() => toggleAnswer(option.slug as string)}
                  />
                  {option.option_text}
                </label>
              </span>
            )
          )}
        </div>
      );

    default:
      return null;
  }
};

export default QuizOptions;
