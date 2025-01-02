import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { fileInputEnum } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import Image from 'components/Image';
import { useTranslation } from 'react-i18next';
import {
  EnumFileType,
  quizFormInitialValues,
  QuizType,
  QuizTypeOptions,
} from '../../constants';
import { QuizFieldArrayProps } from '../types';
import Options from './Options';

const QuizFieldArray = ({
  data,
  setFieldValue,
  isEditable,
  remove,
  push,
  isEdit,
}: QuizFieldArrayProps) => {
  const { t } = useTranslation();

  return (
    <>
      {data.map((quiz, index) => (
        <div
          className="module-add-filed-item"
          key={`UniqueKey_question${index + 1}`}
        >
          <span className="module-add-filed-counter">{index + 1}</span>
          <div className="module-add-filed-inner">
            <div className="module-add-question-wrap">
              {quiz.question_type === QuizType.FILL_IN_THE_BLANK && (
                <Button
                  variants="black"
                  onClickHandler={() =>
                    setFieldValue(
                      `data[${index}].question`,
                      `${quiz.question}______`
                    )
                  }
                  disabled={isEditable}
                >
                  {t('QuizCreation.Button.AddBlank')}
                </Button>
              )}
              <InputField
                parentClass="module-add-question-text input-wrap"
                name={`data[${index}].question`}
                placeholder={t('QuizCreation.Placeholder.Question')}
                isDisabled={isEditable}
              />
              <DropZone
                fileInputIcon="linkIcon"
                name={`data[${index}].question_attachment_url`}
                setValue={setFieldValue}
                value={quiz?.question_attachment_url ?? ''}
                isCompulsory
                Title={t('QuizCreation.Label.UploadFile')}
                acceptTypes="image/*"
                variant={fileInputEnum.CommentFileInput}
                parentClass="module-add-question-file module-add-question-file--secondary"
                fileType={[EnumFileType.Image, EnumFileType.Video]}
              />

              <ReactSelect
                name={`data[${index}].question_type`}
                options={QuizTypeOptions}
                selectedValue={quiz.question_type}
                onChange={(value) => {
                  setFieldValue(
                    `data[${index}].question_type`,
                    (value as IOptions).value
                  );
                  if ((value as IOptions).value === QuizType.TRUE_FALSE) {
                    setFieldValue(`data[${index}].question_options`, []);
                  }
                }}
                placeholder={t('QuizCreation.Placeholder.SelectQuestionType')}
                parentClass="module-add-question-select"
                disabled={isEditable || (isEdit && quiz.correct_answer !== '')}
              />
              <Button
                isIcon
                variants="Red"
                onClickHandler={() => remove(index)}
                disabled={isEditable}
              >
                <Image iconName="trashIcon" />
              </Button>
            </div>

            {(quiz.question_type === QuizType.MCQ ||
              quiz.question_type === QuizType.FILL_IN_THE_BLANK ||
              quiz.question_type === QuizType.MULTIPLE_ANSWER) && (
              <Options
                isEditable
                quiz={quiz}
                index={index}
                setFieldValue={setFieldValue}
              />
            )}

            {quiz.question_type === QuizType.TRUE_FALSE && (
              <ReactSelect
                name={`data[${index}].correct_answer`}
                placeholder={t('QuizCreation.Placeholder.TrueFalse')}
                options={[
                  {
                    label: t('QuizCreation.Label.True'),
                    value: 'TRUE',
                  },
                  {
                    label: t('QuizCreation.Label.False'),
                    value: 'FALSE',
                  },
                ]}
                isCompulsory
                disabled={
                  !isEditable ||
                  (isEdit &&
                    quiz.question_options?.some((item) => {
                      return item.is_correct;
                    }))
                }
              />
            )}

            {quiz.question_type === QuizType.SHORT_ANSWER && (
              <div className="module-add-question-option-wrap">
                <InputField
                  name={`data[${index}].correct_answer`}
                  placeholder={t('QuizCreation.Placeholder.EnterAnswer')}
                  isCompulsory
                  isDisabled={!isEditable}
                />
              </div>
            )}

            {quiz.question_type === QuizType.ARRANGE_ORDER && (
              <Options
                isEdit={isEdit}
                isEditable={isEditable}
                isOrder
                quiz={quiz}
                index={index}
                setFieldValue={setFieldValue}
              />
            )}
          </div>
        </div>
      ))}
      {!isEditable && (
        <Button
          isIcon
          variants="PrimaryWood"
          onClickHandler={() => push(quizFormInitialValues?.data?.[0])}
        >
          {t('QuizCreation.Button.AddQuestion')}
          <Image iconName="plus" />
        </Button>
      )}
    </>
  );
};

export default QuizFieldArray;
