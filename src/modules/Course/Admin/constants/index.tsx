import { CourseType } from 'modules/Course/common/types/course.type';
import { QuestionData } from '../form/types';

export enum ActionNameEnum {
  NEXT = 'next',
  PREV = 'prev',
  SUBMIT = 'submit',
  UPDATE = 'update',
  DRAFT = 'draft',
  PREVIEW = 'preview',
}

export enum EnumFileType {
  Image = 'image',
  Video = 'video',
  Document = 'document',
}

export enum QuizType {
  MCQ = 'MCQ',
  SHORT_ANSWER = 'Short Answer',
  TRUE_FALSE = 'True-False',
  MULTIPLE_ANSWER = 'Multiple Answer',
  FILL_IN_THE_BLANK = 'Fill In The Blank',
  ARRANGE_ORDER = 'Arrange Order',
}

export enum QuestionTypeName {
  QUIZ = 'Quiz',
  TRUE_FALSE = 'True/False',
  FILL_IN_THE_BLANK = 'Fill in the Blank',
  SHORT_ANSWER = 'Quiz(Short Answer)',
  ORDER_QUIZ = 'Order Quiz',
  FIND_RIGHT_ANSWER = 'Find Right Answer',
  UNKNOWN = 'Unknown',
}

export const QuizTypeOptions = [
  { value: QuizType.MCQ, label: 'Multiple Choice' },
  { value: QuizType.TRUE_FALSE, label: 'True/False' },
  { value: QuizType.SHORT_ANSWER, label: 'Short Answer' },
  { value: QuizType.ARRANGE_ORDER, label: 'Order' },
  { value: QuizType.FILL_IN_THE_BLANK, label: 'Fill in the blank' },
  { value: QuizType.MULTIPLE_ANSWER, label: 'Multiple Answer' },
];

export const subTypes: CourseType[] = [
  { label: 'Full Course', value: 'Full Course' },
  { label: 'Mini Lessons', value: 'Mini Lessons' },
];

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export enum privateCourseModeType {
  In_Person = 'In-Person',
  Zoom = 'Zoom',
}

export const quizFormInitialValues: { data: QuestionData[] } = {
  data: [
    {
      question: '',
      question_attachment_url: '',
      question_type: '',
      question_options: [
        {
          option_text: '',
          option_attachment_url: '',
          is_correct: false,
        },
        {
          option_text: '',
          option_attachment_url: '',
          is_correct: false,
        },
        {
          option_text: '',
          option_attachment_url: '',
          is_correct: false,
        },
        {
          option_text: '',
          option_attachment_url: '',
          is_correct: false,
        },
      ],
      correct_answer: '',
    },
  ],
};

export enum CourseVisibilityEnum {
  Organization = 'Organization',
  Student = 'Student',
}
