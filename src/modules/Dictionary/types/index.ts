export type IAllLanguages = {
  id: number;
  name: string;
  short_name: string;
  slug?: string;
  is_default?: boolean;
};

// export interface DictionaryInitialValues {}

export interface DictionarySubmitDataType {
  [fieldName: string]: string | string[] | File;
}

export interface IDictionary {
  id: string;
  name: string;
  asl_level: string;
  sign_gif: string;
  sign_mp4_file: string;
  sign_photo: string;
}

export interface IQuestions {
  id: string;
  sign_photo: string;
  sign_gif: string;
  question_options: {
    id: string;
    option_text: string;
  }[];
}

export interface IQuiz {
  name: string;
  questions?: IQuestions[];
}
