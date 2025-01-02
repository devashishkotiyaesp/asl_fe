import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { FieldArray, Form, Formik } from 'formik';
import { UserModalType } from 'hooks/useModal';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// This is only for dummy use it will be removed after some time

interface QuizProps {
  addQuiz: UserModalType;
}

const Testquiz: FC<QuizProps> = ({ addQuiz }) => {
  const { t } = useTranslation();
  const initialValues = {
    quizzes: [
      {
        question: '',
        image: '',
        type: 'multiple',
        options: [],
        correctAnswers: [],
      },
    ],
  };

  const handleSubmit = (values: any) => {
    console.log('Form data:', values);
  };

  return (
    <Modal
      width="max-w-[1000px]"
      headerTitle="Add Testquiz (Module 1)"
      modal={addQuiz}
      modalBodyClassName="module-add-quiz-modal"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="quizzes">
              {({ push, remove }) => (
                <>
                  {values.quizzes.map((quiz, index) => (
                    <div className="module-add-filed-item" key={index}>
                      <span className="module-add-filed-counter">{index + 1}</span>
                      <div className="module-add-filed-inner">
                        <div className="module-add-question-wrap">
                          <InputField
                            parentClass="module-add-question-text"
                            name={`quizzes[${index}].question`}
                            placeholder={t('TestQuiz.Placeholder.EnterQuestion')}
                          />

                          <DropZone
                            fileInputIcon="camera"
                            name={`quizzes[${index}].image`}
                            setValue={setFieldValue}
                            value={quiz.image}
                            isCompulsory
                            Title={t('TestQuiz.Label.UploadFile')}
                            acceptTypes="image/*"
                            variant="LinkFileInput"
                            parentClass="module-add-question-file"
                          />

                          <ReactSelect
                            name={`quizzes[${index}].type`}
                            options={[
                              {
                                value: 'multiple',
                                label: t('TestQuiz.Option.MultipleChoice'),
                              },
                              {
                                value: 'true_false',
                                label: t('TestQuiz.Option.TrueFalse'),
                              },
                              {
                                value: 'short_answer',
                                label: t('TestQuiz.Option.ShortAnswer'),
                              },
                              { value: 'order', label: t('TestQuiz.Option.Order') },
                              {
                                value: 'fill_blank',
                                label: t('TestQuiz.Option.FillBlank'),
                              },
                            ]}
                            onChange={(value) =>
                              setFieldValue(`quizzes[${index}].type`, value)
                            }
                            placeholder={t(
                              'TestQuiz.Placeholder.SelectQuestionType'
                            )}
                            parentClass="module-add-question-select"
                          />
                        </div>

                        {quiz.type === 'multiple' && (
                          <div className="module-add-question-option-wrap">
                            <div className="module-add-question-option">
                              {quiz.options.map((option, optionIndex) => (
                                <InputField
                                  key={optionIndex}
                                  name={`quizzes[${index}].options[${optionIndex}]`}
                                  placeholder={`${t('TestQuiz.Placeholder.Option')} ${optionIndex + 1}`}
                                  value={option}
                                />
                              ))}
                            </div>
                            <div className="module-add-question-correct">
                              <Button
                                isIcon
                                variants="PrimaryWood"
                                onClickHandler={() =>
                                  push({
                                    question: '',
                                    options: ['', '', '', ''],
                                    correctAnswers: [],
                                  })
                                }
                              >
                                <Image iconName="plus" />
                                {t('TestQuiz.Button.AddQuiz')}
                              </Button>
                              <Button
                                isIcon
                                variants="Red"
                                onClickHandler={() => remove(index)}
                              >
                                <Image iconName="trashIcon" />
                                {t('TestQuiz.Button.RemoveQuiz')}
                              </Button>
                            </div>
                          </div>
                        )}

                        {quiz.type === 'true_false' && (
                          <div className="module-add-question-option-wrap">
                            <div className="module-add-question-option">
                              <Checkbox
                                id={`quiz-${index}-true`}
                                text={t('TestQuiz.Placeholder.True')}
                                name={`quizzes[${index}].correctAnswers`}
                                value="True"
                              />
                              <Checkbox
                                id={`quiz-${index}-false`}
                                text={t('TestQuiz.Placeholder.False')}
                                name={`quizzes[${index}].correctAnswers`}
                                value="False"
                              />
                            </div>
                            <div className="module-add-question-correct">
                              <Button
                                isIcon
                                variants="PrimaryWood"
                                onClickHandler={() =>
                                  push({
                                    question: '',
                                    options: ['', '', '', ''],
                                    correctAnswers: [],
                                  })
                                }
                              >
                                <Image iconName="plus" />
                                {t('TestQuiz.Button.AddQuiz')}
                              </Button>
                              <Button
                                isIcon
                                variants="Red"
                                onClickHandler={() => remove(index)}
                              >
                                <Image iconName="trashIcon" />
                                {t('TestQuiz.Button.RemoveQuiz')}
                              </Button>
                            </div>
                          </div>
                        )}

                        {quiz.type === 'order' && (
                          <div className="module-add-question-option-wrap">
                            <div className="module-add-question-option">
                              {quiz.options.map((option, optionIndex) => (
                                <InputField
                                  key={optionIndex}
                                  name={`quizzes[${index}].options[${optionIndex}]`}
                                  placeholder={t('TestQuiz.Placeholder.Order', {
                                    option_number: optionIndex + 1,
                                  })}
                                  value={option}
                                />
                              ))}
                            </div>
                            <div className="module-add-question-correct">
                              <Button
                                isIcon
                                variants="PrimaryWood"
                                onClickHandler={() =>
                                  push({
                                    question: '',
                                    options: ['', '', '', ''],
                                    correctAnswers: [],
                                  })
                                }
                              >
                                <Image iconName="plus" />
                                {t('TestQuiz.Button.AddQuiz')}
                              </Button>
                              <Button
                                isIcon
                                variants="Red"
                                onClickHandler={() => remove(index)}
                              >
                                <Image iconName="trashIcon" />
                                {t('TestQuiz.Button.RemoveQuiz')}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="btn-wrap">
                    <Button
                      variants="PrimaryWoodBorder"
                      onClickHandler={() =>
                        push({
                          question: '',
                          options: ['', '', '', ''],
                          correctAnswers: [],
                        })
                      }
                    >
                      {t('TestQuiz.Button.AddQuiz')}
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>

            <div className="btn-wrap">
              <Button variants="PrimaryWoodBorder">
                {t('TestQuiz.Button.Close')}
              </Button>
              <Button variants="black" type="submit">
                {t('TestQuiz.Button.Update')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Testquiz;
