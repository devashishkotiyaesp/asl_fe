import Button from 'components/Button/Button';
import ErrorMessage from 'components/FormElement/ErrorMessage';
import TextArea from 'components/FormElement/TextArea';
import Loaders from 'components/Loaders';
import { ToastVariant } from 'constants/common.constant';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import {
  FeedbackFormValues,
  FeedbackPayload,
  SelectEmojiState,
} from 'modules/Profile/types';
import { FeedbackValidation } from 'modules/Profile/validation';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';

const FeedbackForm: FC = () => {
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const emojiFeedback = [
    {
      id: 1,
      name: t('Profile.Common.Feedback.Feedback.Level1'),
      key: 'overallRating' as keyof SelectEmojiState,
      selectEmoji: [
        { id: 1, emoji: '\uD83D\uDE24', value: 1 },
        { id: 2, emoji: '\uD83D\uDE21', value: 2 },
        { id: 3, emoji: '\uD83D\uDE10', value: 3 },
        { id: 4, emoji: '\uD83D\uDE0A', value: 4 },
        { id: 5, emoji: '\uD83E\uDD73', value: 5 },
      ],
    },
    {
      id: 2,
      name: t('Profile.Common.Feedback.Feedback.Level2'),
      key: 'easeUseRating' as keyof SelectEmojiState,
      selectEmoji: [
        { id: 1, emoji: '\uD83D\uDE24', value: 1 },
        { id: 2, emoji: '\uD83D\uDE21', value: 2 },
        { id: 3, emoji: '\uD83D\uDE10', value: 3 },
        { id: 4, emoji: '\uD83D\uDE0A', value: 4 },
        { id: 5, emoji: '\uD83E\uDD73', value: 5 },
      ],
    },
    {
      id: 3,
      name: t('Profile.Common.Feedback.Feedback.Level3'),
      key: 'contentQualityRating' as keyof SelectEmojiState,
      selectEmoji: [
        { id: 1, emoji: '\uD83D\uDE24', value: 1 },
        { id: 2, emoji: '\uD83D\uDE21', value: 2 },
        { id: 3, emoji: '\uD83D\uDE10', value: 3 },
        { id: 4, emoji: '\uD83D\uDE0A', value: 4 },
        { id: 5, emoji: '\uD83E\uDD73', value: 5 },
      ],
    },
  ];
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sendFeedback, { isLoading: sendFeedbackLoading }] = useAxiosPost();
  const [getFeedback, { isLoading: getFeedbackLoading }] = useAxiosGet();

  const [selectEmoji, setSelectEmoji] = useState<SelectEmojiState>({
    overallRating: { id: '', emojiItem: '', value: null },
    easeUseRating: { id: '', emojiItem: '', value: null },
    contentQualityRating: { id: '', emojiItem: '', value: null },
  });

  useEffect(() => {
    getFeedbackDataFunction();
  }, []);

  const feedbackInitialValues: FeedbackFormValues = {
    addFeedback: '',
    emojiRatings: selectEmoji,
  };

  const handleEmojiClick = (
    emoji: string,
    index: number,
    value: number,
    key: keyof SelectEmojiState
  ) => {
    setSelectEmoji((prev) => ({
      ...prev,
      [key]: { id: index.toString(), emojiItem: emoji, value: value.toString() },
    }));
  };

  const onSubmitFeedback = async (
    values: FeedbackFormValues,
    helpers: FormikHelpers<FeedbackFormValues>
  ) => {
    if (user?.id) {
      const payload: FeedbackPayload = {
        user_id: user.id,
        feedback: values.addFeedback,
        overall_rating: selectEmoji.overallRating.value,
        ease_of_use_rating: selectEmoji.easeUseRating.value,
        content_quality_rating: selectEmoji.contentQualityRating.value,
      };

      const { error } = await sendFeedback('/feedback', payload);

      if (!error) {
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Common.ToastMessage.Success.Create'),
            type: 'success',
            id: Date.now(),
          })
        );
        helpers.resetForm();
        setSubmitted(true);
      }
    }
  };

  const getFeedbackDataFunction = async () => {
    const response = await getFeedback('/feedback/user');
    if (response.data) {
      setSubmitted(true);
    }
  };

  const handleView = () => {
    if (getFeedbackLoading) {
      return (
        <div className="">
          <Loaders type="Spin" />
        </div>
      );
    }
    return (
      <div className="feedback-form-wrap">
        <Formik
          initialValues={feedbackInitialValues}
          validationSchema={FeedbackValidation()}
          onSubmit={onSubmitFeedback}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="feedback-form">
                {emojiFeedback.map((data) => (
                  <div className="emoji-rating" key={data.id}>
                    <span className="emoji-rating-title">{data.name}</span>
                    <ul>
                      {data.selectEmoji.map((e) => (
                        <li
                          key={e.id}
                          className={
                            values.emojiRatings[data.key]?.id === e.id.toString()
                              ? 'active'
                              : ''
                          }
                        >
                          <Button
                            onClickHandler={() => {
                              handleEmojiClick(e.emoji, e.id, e.value, data.key);
                              setFieldValue('emojiRatings', {
                                ...values.emojiRatings,
                                [data.key]: {
                                  id: e.id.toString(),
                                  emojiItem: e.emoji,
                                  value: e.value.toString(),
                                },
                              });
                            }}
                          >
                            {e.emoji}
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <ErrorMessage name={`emojiRatings.${data.key}.value`} />
                  </div>
                ))}{' '}
                <TextArea
                  name="addFeedback"
                  parentClass="max-w-[440px]"
                  label={t('Profile.Common.Feedback.Feedback.Commnets')}
                  rows={8}
                  placeholder={t(
                    'Profile.Common.Feedback.Feedback.Commnets.PlaceHolder'
                  )}
                  value={values.addFeedback}
                />
                <Button
                  type="submit"
                  variants="black"
                  className="w-fit"
                  isLoading={sendFeedbackLoading}
                >
                  {t('Profile.Common.Feedback.Submit')}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  };

  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>{t('Profile.Common.Feedback.Title')}</span>
        </div>
        <span className="sidebar-content-small-title">
          {t('Profile.Common.Feedback.SubTitle')}
        </span>
      </div>

      {submitted ? (
        <h2 className="feedback-submitted">
          {t('Profile.Common.Feedback.Submitted')}
        </h2>
      ) : (
        handleView()
      )}
    </div>
  );
};

export default FeedbackForm;
