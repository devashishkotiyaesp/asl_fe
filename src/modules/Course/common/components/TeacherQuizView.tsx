// ** Components **
import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';

// ** Hooks **
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCourseLanguages } from 'reduxStore/slices/courseLanguagesSlice';

// ** Constants **

// ** Types **
import { IOptions } from 'components/FormElement/types';

// ** Validations **

// ** Utils **
import { EnumFileType, fileInputEnum } from 'components/FormElement/enum';
import { Roles } from 'constants/common.constant';
import { FieldArray, Form, Formik, FormikValues } from 'formik';
import {
  quizFormInitialValues,
  QuizType,
  QuizTypeOptions,
} from 'modules/Course/Admin/constants';
import Options from 'modules/Course/Admin/form/components/Options';
import {
  getQueryParams,
  processQuizData,
  setEditFormInitialValues,
} from 'modules/Course/Admin/form/helper/form.helper';
import { QuestionData, QuizData, QuizProps } from 'modules/Course/Admin/form/types';
import { quizValidationSchema } from 'modules/Course/Admin/form/validations/quizeValidationSchema';
import { getCurrentUser } from 'reduxStore/slices/authSlice';

const TeacherQuizView: FC<QuizProps> = ({
  addQuiz,
  courseCommonId,
  lesson_common_id,
  module_common_id,
  common_id,
  refetchData,
  course_week_id,
}) => {
  // ** Hooks **
  const { t } = useTranslation();

  // ** State & Variables **
  const { slug: course_slug } = useParams();
  const { language_id } = getQueryParams();
  const languages = useSelector(useCourseLanguages).course_languages;
  const user = useSelector(getCurrentUser);
  const isTeacher = user?.role?.role === Roles.Teacher;
  const [headerTitle, setHeaderTitle] = useState(t('QuizCreation.Label.QuizTitle'));
  const [editFormData, setEditFormData] = useState<QuizData>();
  const [initialValues, setInitialValues] = useState<{
    data: Array<QuestionData>;
  }>();

  // ** API Hooks **
  const [createQuize, { isLoading: isCreating }] = useAxiosPost();
  const [getQuizData, { isLoading }] = useAxiosGet();

  // ** Fetch Quiz Data **
  const retriveQuizData = async (final_course_slug: string) => {
    const { data } = await getQuizData('/courses/quiz', {
      params: {
        slug: common_id,
        course_slug: final_course_slug,
        ...(language_id ? { language_id } : {}),
      },
    });

    if (data) {
      const { quizQuestions, ...editFormProps }: QuizData = data;
      delete editFormProps.course_modules;
      delete editFormProps.course_week;
      delete editFormProps.course_lesson;

      setInitialValues(setEditFormInitialValues(quizQuestions ?? []));
      setHeaderTitle(editFormProps.title ?? '');
      setEditFormData(editFormProps);
    }
  };

  // ** Effect Hook **
  useEffect(() => {
    if (common_id && (course_slug || courseCommonId)) {
      const final_course_slug = courseCommonId ?? course_slug;
      retriveQuizData(final_course_slug as string);
    } else {
      setInitialValues(quizFormInitialValues);
    }
  }, [common_id, course_slug]);

  // ** Submit Handler **
  const handleSubmit = async (values: FormikValues) => {
    const { data } = values as { data: QuestionData[] };

    const { formData, processedData } = processQuizData(data);

    const quizFormData = {
      ...(language_id ? { language_id } : {}),
      ...(languages?.some((language) => language !== null) ? { languages } : {}),

      title: headerTitle,
    };

    const finalQuizObject = {
      ...(common_id && course_slug
        ? { ...editFormData, title: headerTitle }
        : { ...quizFormData }),
      ...(course_slug ? { course_slug } : {}),
      ...(lesson_common_id ? { lesson_common_id } : {}),
      ...(module_common_id ? { module_common_id } : {}),
      ...(course_week_id ? { course_week_id } : {}),
      quizData: processedData,
    };

    Object.entries(finalQuizObject).forEach(([key, value]) => {
      if (value) {
        formData.append(key, JSON.stringify(value));
      }
    });

    const { error } = await createQuize('/courses/quiz', formData);
    if (!error) {
      addQuiz.closeModal();
      refetchData?.();
    }
  };

  return (
    <>
      {isLoading && common_id && course_slug ? (
        <Image loaderType="Spin" />
      ) : (
        initialValues && (
          <Modal
            value={headerTitle}
            setValue={(e) => setHeaderTitle(e)}
            isTitleEditable={!isTeacher}
            width="max-w-[1000px]"
            headerTitle={headerTitle}
            modal={addQuiz}
            headerCancelClick={() => addQuiz.closeModal()}
            modalBodyClassName="module-add-quiz-modal"
          >
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={quizValidationSchema(t)}
            >
              {({ values, setFieldValue, submitForm }) => {
                return (
                  <Form>
                    <div className="module-add-filed-wrap">
                      <FieldArray name="data">
                        {({ push, remove }) => (
                          <>
                            {values.data?.map((quiz, index) => (
                              <div
                                className="module-add-filed-item"
                                key={`UniqueKey_question${index + 1}`}
                              >
                                <span className="module-add-filed-counter">
                                  {index + 1}
                                </span>
                                <div className="module-add-filed-inner">
                                  <div className="module-add-question-wrap">
                                    {quiz.question_type ===
                                      QuizType.FILL_IN_THE_BLANK && (
                                      <Button
                                        variants="black"
                                        onClickHandler={() =>
                                          setFieldValue(
                                            `data[${index}].question`,
                                            `${quiz.question}______`
                                          )
                                        }
                                        disabled={isTeacher}
                                      >
                                        {t('QuizCreation.Button.AddBlank')}
                                      </Button>
                                    )}
                                    <InputField
                                      parentClass="module-add-question-text input-wrap"
                                      name={`data[${index}].question`}
                                      placeholder={t(
                                        'QuizCreation.Placeholder.Question'
                                      )}
                                      isDisabled={isTeacher}
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
                                      fileType={[
                                        EnumFileType.Image,
                                        EnumFileType.Video,
                                      ]}
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
                                        if (
                                          (value as IOptions).value ===
                                          QuizType.TRUE_FALSE
                                        ) {
                                          setFieldValue(
                                            `data[${index}].question_options`,
                                            []
                                          );
                                        }
                                      }}
                                      placeholder={t(
                                        'QuizCreation.Placeholder.SelectQuestionType'
                                      )}
                                      parentClass="module-add-question-select"
                                      disabled={isTeacher}
                                    />
                                    <Button
                                      isIcon
                                      variants="Red"
                                      onClickHandler={() => remove(index)}
                                      disabled={isTeacher}
                                    >
                                      <Image iconName="trashIcon" />
                                    </Button>
                                  </div>

                                  {(quiz.question_type === QuizType.MCQ ||
                                    quiz.question_type ===
                                      QuizType.FILL_IN_THE_BLANK ||
                                    quiz.question_type ===
                                      QuizType.MULTIPLE_ANSWER) && (
                                    <Options
                                      quiz={quiz}
                                      index={index}
                                      setFieldValue={setFieldValue}
                                    />
                                  )}

                                  {quiz.question_type === QuizType.TRUE_FALSE && (
                                    <ReactSelect
                                      name={`data[${index}].correct_answer`}
                                      placeholder={t(
                                        'QuizCreation.Placeholder.TrueFalse'
                                      )}
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
                                      disabled={isTeacher}
                                    />
                                  )}

                                  {quiz.question_type === QuizType.SHORT_ANSWER && (
                                    <div className="module-add-question-option-wrap">
                                      <InputField
                                        name={`data[${index}].correct_answer`}
                                        placeholder={t(
                                          'QuizCreation.Placeholder.EnterAnswer'
                                        )}
                                        isCompulsory
                                        isDisabled={isTeacher}
                                      />
                                    </div>
                                  )}

                                  {quiz.question_type === QuizType.ARRANGE_ORDER && (
                                    <Options
                                      isOrder
                                      quiz={quiz}
                                      index={index}
                                      setFieldValue={setFieldValue}
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                            {!isTeacher && (
                              <Button
                                isIcon
                                variants="PrimaryWood"
                                onClickHandler={() =>
                                  push(quizFormInitialValues?.data?.[0])
                                }
                              >
                                {t('QuizCreation.Button.AddQuestion')}
                                <Image iconName="plus" />
                              </Button>
                            )}
                          </>
                        )}
                      </FieldArray>
                    </div>
                    <div className="btn-wrap">
                      <Button
                        variants="black"
                        onClickHandler={() => submitForm()}
                        isLoading={isCreating}
                        disabled={isTeacher}
                      >
                        {common_id
                          ? t('QuizCreation.Button.Edit')
                          : t('QuizCreation.Button.Create')}
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Modal>
        )
      )}
    </>
  );
};

export default TeacherQuizView;
