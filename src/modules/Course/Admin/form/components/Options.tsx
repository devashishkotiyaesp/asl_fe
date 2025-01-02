// ** Components **
import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import Image from 'components/Image';
import ArrangeOrder from './ArrangeOrder';

// ** Constants & Enums **
import { EnumFileType } from 'components/FormElement/enum';
import { QuizType } from '../../constants';

// ** Hooks **
import { FC, useEffect } from 'react';

// ** Types **
import { IOptions } from 'components/FormElement/types';
import { OptionProps } from '../types';

// ** Utils **
import { FieldArray } from 'formik';

import { useTranslation } from 'react-i18next';
import '../../index.css';

const Options: FC<OptionProps> = ({
  quiz,
  index,
  setFieldValue,
  isOrder,
  isEditable,
  isEdit,
}) => {
  const reactOptions = quiz?.question_options?.map((item) => ({
    label: item.option_text,
    value: item.option_text,
  }));

  const { t } = useTranslation();

  useEffect(() => {
    if (reactOptions?.length) {
      const quizAnsArray = Array.isArray(quiz.correct_answer)
        ? quiz.correct_answer
        : [quiz.correct_answer];

      const data = reactOptions?.find((item) => quizAnsArray.includes(item.value));
      if (!data) {
        setFieldValue(`data[${index}].correct_answer`, '');
      }
    }
  }, [quiz?.question_options]);

  return (
    <FieldArray name={`data[${index}].question_options`}>
      {({ remove, push }) => (
        <>
          {quiz.question_options && quiz?.question_options?.length > 0 && (
            <>
              <div className="module-add-question-option-wrap">
                <div className="module-add-question-option">
                  {quiz.question_options.map((option, optionIndex) => {
                    return (
                      <div
                        key={`Quiz_options${index}question${optionIndex + 1}`}
                        className="comment-input-wrap"
                      >
                        <InputField
                          parentClass="input-wrap"
                          name={`data[${index}].question_options[${optionIndex}].option_text`}
                          placeholder={t('QuizCreation.Placeholder.Option', {
                            number: optionIndex + 1,
                          })}
                          value={option.option_text}
                          isDisabled={!isEditable}
                        />

                        <DropZone
                          isCompulsory
                          name={`data[${index}].question_options[${optionIndex}].option_attachment_url`}
                          setValue={(name, File) => {
                            setFieldValue(name, File);
                            if (option.option_text === '') {
                              setFieldValue(
                                `data[${index}].question_options[${optionIndex}].option_text`,
                                `Image ${optionIndex + 1}`
                              );
                            }
                          }}
                          acceptTypes="image/*,video/*"
                          value={option?.option_attachment_url ?? ''}
                          variant="commentFileInput"
                          fileInputIcon="linkIcon"
                          fileType={[EnumFileType.Image, EnumFileType.Video]}
                        />
                        {option.isCorrect === true && isEdit ? (
                          <></>
                        ) : (
                          <Button
                            isIcon
                            variants="Red"
                            onClickHandler={() => remove(optionIndex)}
                            disabled={!isEditable}
                          >
                            <Image iconName="trashIcon" />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="module-add-question-correct">
                  {!isOrder && (
                    <ReactSelect
                      isCompulsory
                      name={`data[${index}].correct_answer`}
                      options={reactOptions as IOptions[]}
                      isMulti={quiz?.question_type === QuizType.MULTIPLE_ANSWER}
                      disabled={!isEditable || isEdit}
                      placeholder={t('QuizCreation.Placeholder.SelectCorrectAnswer')}
                      parentClass="module-add-question-select"
                    />
                  )}
                  <Button
                    isIcon
                    variants="PrimaryWood"
                    onClickHandler={() =>
                      push({
                        option_text: '',
                        option_attachment_url: '',
                        is_correct: false,
                        ...(isOrder
                          ? {
                              correct_sequence:
                                Number(quiz.question_options?.length ?? 0) + 1,
                            }
                          : {}),
                      })
                    }
                    disabled={!isEditable}
                  >
                    <Image iconName="plus" />
                  </Button>
                </div>
              </div>
              {isOrder && (
                <ArrangeOrder
                  orderedOptions={(data) => {
                    setFieldValue(`data[${index}].arranged_options`, data);
                  }}
                  options={quiz.question_options}
                />
              )}
            </>
          )}
        </>
      )}
    </FieldArray>
  );
};

export default Options;
