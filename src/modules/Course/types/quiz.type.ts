import { QuestionOption } from '../Admin/form/types';

export interface quizModal {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  lesson_slug?: string;
  module_slug?: string;
  quiz_slug?: string;
  quiz_common_id?: string;
  module_common_id?: string;
  lesson_common_id?: string;
  course_week_id?: string;
}

export interface Answer {
  question_id: string;
  selected_option_id: string;
  answer_text: string;
  is_correct: boolean;
  questions?: quizQuestions;
  answer_sequence: string[];
}

export interface checkAns {
  answer_sequence?: string;
  answer_text?: string;
  isCorrect?: boolean;
  correctAns_text?: string;
  isDisabled?: boolean;
  message?: string;
  userSelectedOptions: string[] | string;
}

export interface quizQuestions {
  question: string;
  checkAnswer: checkAns;
  common_id: string;
  slug: string;
  id: string;
  isCorrect: boolean;
  message: string;
  data: string;
  question_options: QuestionOption[];
  question_type: string;
  question_attachment_url: string;
}
