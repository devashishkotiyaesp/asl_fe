import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfDay,
  format,
  parse,
  parseISO,
  startOfDay,
} from 'date-fns';
import { NavigateFunction } from 'react-router-dom';
import { QuizType } from '../../constants';
import { DataPayloadTypes, QuestionData, QuestionOption } from '../types';
import { CourseMaterials } from '../types/courseContentManager.types';

export const getQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    course_id: urlParams.get('course_id') ?? '',
    language_id: urlParams.get('lang') ?? '',
    step: urlParams.get('step') ?? '',
  };
};
export const updateParamActiveStep = (
  direction: boolean,
  navigate: NavigateFunction,
  limit?: number
) => {
  const currentUrl = new URL(window.location.href);
  const currentStep = parseInt(currentUrl.searchParams.get('step') ?? '1', 10);
  let newStep = direction ? currentStep + 1 : currentStep - 1;

  newStep = Math.max(newStep, 1); // Ensure newStep is at least 1

  if (limit !== undefined) {
    newStep = Math.min(newStep, limit); // Ensure newStep does not exceed limit
  }

  currentUrl.searchParams.set('step', newStep.toString());
  navigate(currentUrl.pathname + currentUrl.search, { replace: true });
};
export const createFormData = (payload: DataPayloadTypes) => {
  const newFormData = new FormData();

  const fieldsToAppend = [
    'step',
    'language_id',
    'type_id',
    'common_id',
    'slug',
    'course_id',
    'category_id',
    'languages',
    'is_full_course',
  ];

  fieldsToAppend.forEach((key) => {
    const value = payload[key as keyof DataPayloadTypes];
    if (value !== undefined && value !== null && value !== '') {
      if (key === 'step' || key === 'languages') {
        newFormData.append(key, JSON.stringify(value));
      } else {
        newFormData.append(key, value.toString());
      }
    }
  });

  // newFormData.append('step', JSON.stringify(payload.step));
  // newFormData.append('language_id', payload.language_id);
  // if (payload?.category_id) {
  //   newFormData.append('category_id', payload?.category_id);
  // }
  // newFormData.append('type_id', payload.type_id);
  // newFormData.append('languages', JSON.stringify(payload.languages));

  // if (payload.slug) newFormData.append('slug', payload.slug);
  // if (payload.course_id) newFormData.append('course_id', payload.course_id);
  const data: {
    [key: string]:
      | string
      | string[]
      | null
      | boolean
      | File
      | File[]
      | Date
      | number
      | number[];
  } = {};
  Object.entries(payload.data).forEach(([key, value]) => {
    if (value instanceof File) {
      newFormData.append(`course_${key}`, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          newFormData.append(`course_${key}`, item);
        } else {
          data[key] = value;
        }
      });
    } else if (['cover_video', 'cover_image', 'srt_file_path'].includes(key)) {
      data[`course_${key}`] = value;
    } else {
      data[key] = value;
    }
  });
  newFormData.append('data', JSON.stringify(data));

  return newFormData;
};
export const getISOString = (timeString: string) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const utcDate = parse(
    `${currentDate}T${timeString}Z`,
    "yyyy-MM-dd'T'HH:mm:ssX",
    new Date()
  );

  return utcDate.toISOString();
};

export const formInitialData = {
  id: '',
  type_id: '',
  sub_type_id: null,
  asl_level_id: '',
  category_id: null,
  cover_image: null,
  cover_video: null,
  srt_file_path: null,
  is_full_course: null,
  zoom_link: '',
  title: '',
  description: '',
  price: '',
  key_learnings: [],
  address: '',
  city: '',
  country: '',
  zip_code: '',
  user_teacher_id: '',
  start_date: null,
  end_date: null,
  repeat_interval_days: [],
  timezone: null,
  start_time: null,
  end_time: null,
  min_participants: null,
  max_participants: null,
  has_modules: null,
  is_student_roster: null,
  is_private: null,
  slug: null,
  last_updated_by: null,
  created_by: null,
  is_published: null,
  introduction_video: null,
  parent_table_id: null,
  language_id: null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
  courseCategory: null,
  language: { id: null, name: null, short_name: null },
  type: { id: null, type: null },
  sub_type: null,
  AslLevel: {
    id: null,
    level: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
  },
  invited_course_editors: [],
  subscription_type_id: '',
};

// Calculates the difference in days and the valid days of the week between two dates.
export const calculateDaysInfo = (
  startDate: string,
  endDate: string
): { differenceInDays: number; validDays: number[] } => {
  const parsedStartDate = parseISO(startDate);
  const parsedEndDate = parseISO(endDate);

  // Calculate the difference between the start and end date (including both dates)
  const differenceInDays =
    differenceInCalendarDays(parsedEndDate, parsedStartDate) + 1;

  // Initialize validDays array
  let validDays: number[] = [];

  // If the difference is <= 8 days, calculate valid days
  if (differenceInDays <= 8) {
    validDays = eachDayOfInterval({
      start: startOfDay(parsedStartDate),
      end: endOfDay(parsedEndDate),
    }).map((date) => date.getDay()); // Get the day of the week (0-6)
  }

  return { differenceInDays, validDays };
};

// ** Quiz Form Helper Functions **

// Count numbers of blank in question for blank type question
export const countOccurrencesOfBlank = (str: string, char: string): number => {
  return (str.match(new RegExp(`\\${char}`, 'g')) || []).length;
};

// Remove Empty and undefiend value from form
export const removeEmptyKeys = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(removeEmptyKeys) as T;
  }
  if (typeof obj === 'object' && obj !== null) {
    if (obj instanceof File) {
      return obj;
    }
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== '' && v !== undefined && v !== null)
        .map(([k, v]) => [k, removeEmptyKeys(v)])
    ) as T;
  }
  return obj;
};

// Update is_correct in option for mcq and multi answer question
const updateIsCorrect = (
  option: string | string[],
  objects: QuestionOption[]
): Array<QuestionOption> => {
  const optionArray = Array.isArray(option) ? option : [option];

  return objects.map((obj) => ({
    ...obj,
    is_correct: optionArray.includes(obj.option_text ?? ''),
  }));
};

// Form Data processing for submit payload
export const processQuizData = (
  quizData: QuestionData[]
): {
  formData: FormData;
  processedData: QuestionData[];
} => {
  const formData = new FormData();
  let processedData: QuestionData[] = [];

  quizData.forEach((quiz, index) => {
    const newQuiz = { ...quiz };

    if (
      quiz?.question_attachment_url &&
      typeof quiz?.question_attachment_url === 'object'
    ) {
      formData.append(
        `data[${index}][question_attachment_url]`,
        quiz.question_attachment_url
      );
      delete newQuiz.question_attachment_url;
    }
    if (quiz?.question_type === QuizType.SHORT_ANSWER) {
      delete quiz.question_options;
      delete newQuiz.question_options;
    }
    if (quiz?.question_type === QuizType.TRUE_FALSE) {
      if (quiz?.question_options?.[0]?.option_text) {
        quiz.question_options = quiz?.question_options.map((item) => ({
          ...item,
          is_correct: quiz.correct_answer === item.option_text,
        }));
      } else {
        const quizOptions = [
          { option_text: 'TRUE', is_correct: quiz.correct_answer === 'TRUE' },
          { option_text: 'FALSE', is_correct: quiz.correct_answer === 'FALSE' },
        ];

        quiz.question_options = quizOptions;
      }

      delete newQuiz.correct_answer;
    }

    if (quiz?.question_type === QuizType.ARRANGE_ORDER) {
      quiz.question_options?.map((item, _index) => {
        const arrangedIndex =
          quiz?.arranged_options?.findIndex(
            (arrangedItem) => arrangedItem.option_text === item?.option_text
          ) ?? 0;
        item.correct_sequence = arrangedIndex + 1;
        return item;
      });
      delete newQuiz.arranged_options;
    }

    if (quiz?.question_options) {
      if (
        quiz?.question_type === QuizType.MULTIPLE_ANSWER ||
        quiz?.question_type === QuizType.MCQ ||
        quiz.question_type === QuizType.FILL_IN_THE_BLANK
      ) {
        quiz.question_options = updateIsCorrect(
          quiz?.correct_answer ?? '',
          quiz?.question_options ?? []
        );
        delete newQuiz.correct_answer;
      }
      newQuiz.question_options = quiz.question_options.map((option, optionIndex) => {
        const newOption = { ...option };

        if (
          option?.option_attachment_url &&
          typeof option?.option_attachment_url === 'object'
        ) {
          formData.append(
            `data[${index}][question_options][${optionIndex}][option_attachment_url]`,
            option.option_attachment_url
          );
          delete newOption.option_attachment_url;
        }

        return newOption;
      });
    }

    processedData.push(newQuiz);
  });

  processedData = removeEmptyKeys(processedData);

  return { formData, processedData };
};

// Set initial value for edit in quiz form
export const setEditFormInitialValues = (questionData: QuestionData[]) => {
  let newValue = questionData;

  questionData?.forEach((question, qIndex) => {
    if (
      question.question_type === QuizType.MCQ ||
      question.question_type === QuizType.MULTIPLE_ANSWER ||
      question.question_type === QuizType.FILL_IN_THE_BLANK
    ) {
      const correctOptions = question?.question_options
        ?.filter((item) => item.is_correct === true)
        ?.map((item) => String(item.option_text));

      newValue[qIndex].correct_answer =
        QuizType.MULTIPLE_ANSWER !== question.question_type
          ? correctOptions?.[0]
          : correctOptions;
    }

    if (question?.question_type === QuizType.TRUE_FALSE) {
      const corectValue = question?.question_options
        ?.filter((item) => item.is_correct === true)
        .map((item) => String(item.option_text))?.[0];
      newValue[qIndex].correct_answer = corectValue;
    }

    if (question?.question_type === QuizType.SHORT_ANSWER) {
      newValue[qIndex].correct_answer =
        question?.question_options?.[0].correct_answer;
    }
  });

  newValue = removeEmptyKeys(newValue);

  return { data: newValue };
};

// ** Step 2 Helper form Functions **

export const processSteperTwoformData = (
  course_material_data: CourseMaterials
): FormData => {
  const formData = new FormData();

  const newFormData: Partial<CourseMaterials> = { ...course_material_data };

  if (course_material_data?.practice_materials) {
    course_material_data?.practice_materials.forEach((item) => {
      if (typeof item === 'object') {
        formData.append(`practice_materials`, item);
      }
    });

    delete newFormData.practice_materials;
  }

  if (course_material_data?.teaching_materials) {
    course_material_data?.teaching_materials.forEach((item) => {
      if (typeof item === 'object') {
        formData.append(`teaching_materials`, item);
      }
    });

    delete newFormData.teaching_materials;
  }

  if (course_material_data?.is_student_roster) {
    formData.append(`is_student_roster`, course_material_data?.is_student_roster);
    delete newFormData.is_student_roster;
  }

  formData.append('data', JSON.stringify(newFormData));
  return formData;
};

export const processCourseContentFormData = (formData: CourseMaterials) => {
  formData = removeEmptyKeys(formData);

  const { course_arranged_teaching_media, course_arranged_weeks } = formData;

  if (course_arranged_teaching_media) {
    formData.course_teaching_media = course_arranged_teaching_media.map(
      (item, index) => ({
        ...item,
        sort_order: index + 1,
      })
    );
    delete formData.course_arranged_teaching_media;
  }

  if (course_arranged_weeks) {
    formData.course_weeks = course_arranged_weeks.map((item, index) => ({
      ...item,
      sort_order: index + 1,
      course_week_media: item.course_week_media.map((mediaItem, mIndex) => ({
        ...mediaItem,
        sort_order: mIndex + 1,
      })),
    }));
    delete formData.course_arranged_weeks;
  }

  return formData;
};
