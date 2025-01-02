import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { QuizType } from '../../constants';
import { countOccurrencesOfBlank } from '../helper/form.helper';

export const quizValidationSchema = (t: TFunction<'translation', undefined>) => {
  const optionSchema = () =>
    Yup.object().shape({
      option_text: Yup.string()
        .required(t('QuizCreation.Form.Validation.OptionText.Required'))
        .min(1, t('QuizCreation.Form.Validation.OptionText.MinLength')),
      option_attachment_url: Yup.string().nullable(),
      is_correct: Yup.boolean().nullable(),
      correct_sequence_number: Yup.number()
        .nullable()
        .integer(t('QuizCreation.Form.Validation.OptionText.Integer'))
        .min(1, t('QuizCreation.Form.Validation.OptionText.Min')),
    });

  function findDuplicateIndices(arr: string[]): number[] {
    const seen = new Map<string, number[]>();
    const duplicateIndices: number[] = [];

    arr.forEach((value, index) => {
      if (!seen.has(value)) {
        seen.set(value, []);
      }
      seen.get(value)?.push(index);
    });

    seen.forEach((indices) => {
      if (indices.length > 1) {
        duplicateIndices.push(...indices.slice(1));
      }
    });

    return duplicateIndices;
  }

  return Yup.object().shape({
    data: Yup.array().of(
      Yup.object().shape({
        question: Yup.string()
          .required(t('QuizCreation.Form.Validation.Question.Required'))
          .min(3, t('QuizCreation.Form.Validation.Question.MinLength'))
          .test(
            'valid-blank',
            t('QuizCreation.Form.Validation.Question.BlankRequired'),
            (value, { parent, path }) => {
              const { question_type } = parent;
              if (question_type === QuizType.FILL_IN_THE_BLANK && value) {
                const blankCount = countOccurrencesOfBlank(value, '____'); // Count underscores in question
                if (blankCount === 0) {
                  return new Yup.ValidationError(
                    t('QuizCreation.Form.Validation.Question.BlankRequired'),
                    {},
                    `${path}`
                  );
                }
              }
              return true;
            }
          ),
        question_attachment_url: Yup.string().nullable(),
        question_type: Yup.string()
          .required(t('QuizCreation.Form.Validation.QuestionType.Required'))
          .oneOf(
            Object.values(QuizType),
            t('QuizCreation.Form.Validation.QuestionType.Invalid')
          ),
        correct_answer: Yup.mixed().test(
          'is-valid-answer',
          t('QuizCreation.Form.Validation.CorrectAnswer.Boolean'),
          (value, { parent, path }) => {
            const errors: Yup.ValidationError[] = [];
            const { question_type } = parent;
            if (question_type === QuizType.TRUE_FALSE) {
              if (value !== 'TRUE' && value !== 'FALSE') {
                errors.push(
                  new Yup.ValidationError(
                    t('QuizCreation.Form.Validation.CorrectAnswer.Boolean'),
                    {},
                    `${path}`
                  )
                );
              }
            }
            if (
              question_type === QuizType.SHORT_ANSWER ||
              question_type === QuizType.MCQ ||
              question_type === QuizType.MULTIPLE_ANSWER
            ) {
              if (value === '' || value === undefined)
                errors.push(
                  new Yup.ValidationError(
                    t('QuizCreation.Form.Validation.CorrectAnswer.Required'),
                    {},
                    `${path}`
                  )
                );
            }
            return errors.length > 0 ? new Yup.ValidationError(errors) : true;
          }
        ),

        question_options: Yup.mixed()
          .nullable()
          .when('question_type', {
            is: (val: string) => {
              return val !== QuizType.TRUE_FALSE && val !== QuizType.SHORT_ANSWER;
            },
            then: () =>
              Yup.array()
                .of(optionSchema())
                .test(
                  'is-unique',
                  t('QuizCreation.Form.Validation.OptionText.Unique'),
                  (value, { path }) => {
                    const indexes = findDuplicateIndices(
                      value?.map((item) => item.option_text) ?? []
                    );
                    const errors = indexes.map(
                      (item) =>
                        new Yup.ValidationError(
                          t('QuizCreation.Form.Validation.OptionText.Unique'),
                          {},
                          `${path}.[${item}].option_text`
                        )
                    );
                    return new Yup.ValidationError(errors);
                  }
                )
                .test(
                  'valid-blank-matching',
                  t('QuizCreation.Form.Validation.OptionText.Blank'),
                  (value, { parent, path }) => {
                    const { question_type, question } = parent;
                    if (question_type === QuizType.FILL_IN_THE_BLANK && question) {
                      const blankCount = countOccurrencesOfBlank(question, '____'); // Count underscores in question
                      const errors: Yup.ValidationError[] = [];

                      value?.forEach((option, index) => {
                        const optionValues = option.option_text?.split(',') ?? [];
                        if (
                          (optionValues.includes('') ||
                            optionValues.length !== blankCount) &&
                          blankCount > 0
                        ) {
                          errors.push(
                            new Yup.ValidationError(
                              t(
                                'QuizCreation.Form.Validation.OptionText.BlankMatch',
                                {
                                  count: blankCount,
                                }
                              ),
                              {},
                              `${path}.[${index}].option_text`
                            )
                          );
                        }
                      });

                      if (errors.length > 0) {
                        return new Yup.ValidationError(errors);
                      }
                    }
                    return true;
                  }
                ),
          }),
      })
    ),
  });
};
