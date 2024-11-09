import * as Yup from 'yup';

export const FeedbackValidation = (t: any) => {
  return Yup.object().shape({
    addFeedback: Yup.string().trim().required(t('Community.Description.Required')),
  });
};
