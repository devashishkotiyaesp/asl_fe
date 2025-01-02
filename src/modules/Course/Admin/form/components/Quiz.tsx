// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';

// ** Hooks **
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// ** Constants **
import { quizFormInitialValues } from '../../constants';

// ** Helpers **
import {
  getQueryParams,
  processQuizData,
  setEditFormInitialValues,
} from '../helper/form.helper';

// ** Types **
import { QuestionData, QuizData, QuizProps } from '../types';

// ** Validations **
import { quizValidationSchema } from '../validations/quizeValidationSchema';

// ** Utils **
import { Roles } from 'constants/common.constant';
import { FieldArray, Form, Formik, FormikValues } from 'formik';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import QuizFieldArray from './QuizFieldArray';

const Quiz: FC<QuizProps> = ({
  isPreview,
  addQuiz,
  slug,
  lesson_common_id,
  module_common_id,
  common_id,
  refetchData,
  course_week_id,
  courseCommonId,
}) => {
  // ** Hooks **
  const { t } = useTranslation();

  // ** State & Variables **
  const { common_id: course_common_id } = useParams();
  const { language_id } = getQueryParams();
  const user = useSelector(getCurrentUser);
  const isTeacher = user?.role?.role === Roles.Teacher;
  const [headerTitle, setHeaderTitle] = useState(t('QuizCreation.Label.QuizTitle'));
  const [editFormData, setEditFormData] = useState<QuizData>();
  const [initialValues, setInitialValues] = useState<{
    data: Array<QuestionData>;
  }>();
  const isEditable = !!(isTeacher && isPreview);

  const isEdit = !!(common_id && course_common_id);

  // ** API Hooks **
  const [createQuize, { isLoading: isCreating }] = useAxiosPost();
  const [getQuizData, { isLoading }] = useAxiosGet();

  // ** Fetch Quiz Data **
  const retriveQuizData = async () => {
    const { data } = await getQuizData('/courses/quiz', {
      params: {
        ...(slug ? { slug } : {}),
        ...(course_common_id
          ? { course_common_id }
          : { course_common_id: courseCommonId }),
        ...(lesson_common_id ? { lesson_common_id } : {}),
        ...(module_common_id ? { module_common_id } : {}),
      },
    });

    if (data) {
      const { quizQuestions, ...editFormProps }: QuizData = data;
      delete editFormProps.course_modules;
      delete editFormProps.course_week;
      delete editFormProps.course_lesson;

      setInitialValues(setEditFormInitialValues(quizQuestions ?? []));
      setHeaderTitle(editFormProps.title ?? t('QuizCreation.Label.QuizTitle'));
      setEditFormData(editFormProps);
    }
  };

  // ** Effect Hook **
  useEffect(() => {
    if (isEdit) {
      retriveQuizData();
    } else {
      setInitialValues(quizFormInitialValues);
    }
  }, [common_id, course_common_id]);

  // ** Submit Handler **
  const handleSubmit = async (values: FormikValues) => {
    const { data } = values as { data: QuestionData[] };

    const { formData, processedData } = processQuizData(data);

    const quizFormData = {
      ...(language_id ? { language_id } : {}),

      title: headerTitle,
    };

    const finalQuizObject = {
      ...(isEdit ? { ...editFormData, title: headerTitle } : { ...quizFormData }),
      ...(course_common_id ? { course_common_id } : {}),
      ...(lesson_common_id ? { lesson_common_id } : {}),
      ...(module_common_id ? { module_common_id } : {}),
      ...(course_week_id ? { course_week_id } : {}),
      ...(slug ? { slug } : {}),
      ...(common_id ? { common_id } : {}),
      quizData: processedData,
    };

    Object.entries(finalQuizObject).forEach(([key, value]) => {
      if (value) {
        formData.append(key, JSON.stringify(value));
      }
    });

    const { error, data: quizResonseData } = await createQuize(
      '/courses/quiz',
      formData
    );
    if (!error) {
      addQuiz.closeModal();
      refetchData?.(quizResonseData);
    }
  };

  const renderAddEditQuizForm = () => {
    if (isLoading && isEdit) {
      return <Image loaderType="Spin" />;
    }
    if (initialValues) {
      return (
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
                      <QuizFieldArray
                        isEdit={isEdit}
                        push={push}
                        data={values.data}
                        isEditable={isEditable}
                        remove={remove}
                        setFieldValue={setFieldValue}
                      />
                    )}
                  </FieldArray>
                </div>
                <div className="btn-wrap">
                  <Button
                    variants="black"
                    onClickHandler={() => submitForm()}
                    isLoading={isCreating}
                    disabled={isEditable}
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
      );
    }
    return <></>;
  };

  return (
    <Modal
      value={headerTitle}
      setValue={(e) => setHeaderTitle(e)}
      isTitleEditable={!isEditable}
      width="max-w-[1000px]"
      headerTitle={headerTitle}
      modal={addQuiz}
      headerCancelClick={() => addQuiz.closeModal()}
      modalBodyClassName="module-add-quiz-modal"
    >
      {renderAddEditQuizForm()}
    </Modal>
  );
};

export default Quiz;
