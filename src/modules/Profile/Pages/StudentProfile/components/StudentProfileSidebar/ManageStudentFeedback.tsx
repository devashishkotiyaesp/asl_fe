import Button from 'components/Button/Button';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { GetFeedbackJSON } from 'modules/Feedback/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { FeedbackValidation } from '../../StudentProfileTab/validation';

const ManageStudentFeedback = () => {
  const { t } = useTranslation();
  const user: any = useSelector(getCurrentUser);
  const [sendFeedbackData, { isLoading: sendFeedbackDataloading }] = useAxiosPost();
  const [getFeedbackData, { isLoading: getFeedbackDataloading }] = useAxiosGet();
  const [getFeedbackDataState, setGetFeedbackDataState] =
    useState<GetFeedbackJSON>();
  const SelectModal = useModal();

  const [feedbackInitialValues, setFeedbackInitialValues] = useState({
    addFeedback: '',
  });

  // Select Emoji
  const [selectEmoji, setSelectEmoji] = useState<any | undefined>({
    overallRating: { id: '', emojiItem: '', value: '' },
    easeUseRating: { id: '', emojiItem: '', value: '' },
    contentQualityRating: { id: '', emojiItem: '', value: '' },
  });

  // FOR EMOJI
  const handleEmojiClick = (
    emoji: string,
    index: number,
    value: number,
    key: string
  ) => {
    setSelectEmoji({
      ...selectEmoji,
      [`${key}`]: {
        id: index,
        emojiItem: emoji,
        value,
        key,
      },
    });
  };

  const emojiFeedback = [
    {
      id: 1,
      name: 'Overall experience with The ASL Shop',
      key: 'overallRating',
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
      name: 'Ease of using the app',
      key: 'easeUseRating',
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
      name: 'Content quality',
      key: 'contentQualityRating',
      selectEmoji: [
        { id: 1, emoji: '\uD83D\uDE24', value: 1 },
        { id: 2, emoji: '\uD83D\uDE21', value: 2 },
        { id: 3, emoji: '\uD83D\uDE10', value: 3 },
        { id: 4, emoji: '\uD83D\uDE0A', value: 4 },
        { id: 5, emoji: '\uD83E\uDD73', value: 5 },
      ],
    },
  ];

  const getFeedbackDataFunction = async () => {
    const data = await getFeedbackData('feedback', {
      params: {},
    });
    setGetFeedbackDataState(data?.data);
  };

  const OnSubmitFeedback = async (values: FormikValues) => {
    const payLoad = {
      user_id: user.id,
      feedback: values.addFeedback,
      overall_rating: selectEmoji?.overallRating?.value,
      ease_of_use_rating: selectEmoji?.easeUseRating?.value,
      content_quality_rating: selectEmoji?.contentQualityRating?.value,
    };

    const { error } = await sendFeedbackData('/feedback', payLoad);

    if (!error) {
      setFeedbackInitialValues({ addFeedback: '' });
    }
  };
  return (
    <>
      <div className="sidebar-content-wrap">
        <div className="sidebar-content-title-wrap">
          <div className="sidebar-content-title">
            <span>Feedback Form</span>
          </div>
          <span className="sidebar-content-small-title">
            We want your feedback! Your input helps us improve The ASL Shop app.
          </span>
        </div>

        <div className="feedback-form-wrap">
          {sendFeedbackDataloading ? (
            'Loading'
          ) : (
            <Formik
              initialValues={feedbackInitialValues}
              validationSchema={FeedbackValidation(t)}
              onSubmit={(values) => {
                OnSubmitFeedback(values);
              }}
              enableReinitialize
            >
              {({ values }) => {
                return (
                  <>
                    <Form className="feedback-form">
                      {emojiFeedback.map((data, index) => {
                        return (
                          <div className="emoji-rating" key={index + 1}>
                            <span className="emoji-rating-title">{data.name}</span>
                            <ul>
                              {data.selectEmoji.map((e) => {
                                // console.log(e.id, index + 1, 'e.id,index');

                                return (
                                  <li
                                    key={e.id}
                                    className={
                                      selectEmoji[data.key]?.id === e.id
                                        ? 'active'
                                        : ''
                                    }
                                  >
                                    <Button
                                      onClickHandler={() =>
                                        handleEmojiClick(
                                          e.emoji,
                                          e.id,
                                          e.value,
                                          data.key
                                        )
                                      }
                                    >
                                      {e.emoji}
                                    </Button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}

                      <TextArea
                        name="addFeedback"
                        parentClass="max-w-[440px]"
                        label={t('Comments.suggestions')}
                        rows={8}
                        placeholder={t('TextareaTypePlaceholder')}
                        value={values.addFeedback}
                      />
                      <Button type="submit" variants="black" className="w-fit">
                        Submit
                      </Button>
                    </Form>
                  </>
                );
              }}
            </Formik>
          )}
        </div>
        <Button
          onClickHandler={() => SelectModal.openModal()}
          type="button"
          variants="black"
          className="w-fit mt-5"
        >
          Why would you like to learn ASL
        </Button>

        <div className="feedback-form-wrap">
          {getFeedbackDataloading
            ? 'loading'
            : getFeedbackDataState?.data.map((e) => {
                return (
                  <>
                    Loading{e.id}
                    {/* <div className="feedback-form">
                  <div className="emoji-rating">
                    <span className="emoji-rating-title">
                      Overall experience with The ASL Shop
                    </span>
                    <span>{e.overall_rating}</span>
                  </div>
                  <div className="emoji-rating">
                    <span className="emoji-rating-title">
                      Ease of using the app
                    </span>
                    <span>{e.ease_of_use_rating}</span>
                  </div>
                  <div className="emoji-rating">
                    <span className="emoji-rating-title">Content quality</span>
                    <span>{e.content_quality_rating}</span>
                  </div>
                </div>
                <p>{e.user_id}</p> */}
                  </>
                );
              })}
        </div>

        <div className="w-full">
          <Button
            variants="Green"
            className="h-fit"
            onClickHandler={() => getFeedbackDataFunction()}
          >
            Click to view Feedback
          </Button>
        </div>
      </div>

      <Modal
        width="max-w-[600px]"
        headerTitle="Why would you like to learn ASL?"
        modal={SelectModal}
        closeOnOutsideClick
        closeOnEscape
        modalClassName="learn-asl-modal"
      >
        <>
          <div className="learn-asl-text">
            <p>
              Test your skills and knowledge with interactive quizzes designed to
              challenge and enhance your expertise.
            </p>
          </div>
          <div className="learn-asl-select-wrap">
            <div className="learn-asl-select-item">
              <span className="check-name">I am a Parent of a Deaf/HoH child</span>
              <span className="check-icon">
                <Image iconName="checkIcon" iconClassName="w-full h-full" />
              </span>
            </div>
            <div className="learn-asl-select-item active">
              <span className="check-name">I am a Parent of a Deaf/HoH child</span>
              <span className="check-icon">
                <Image iconName="checkIcon" iconClassName="w-full h-full" />
              </span>
            </div>
            <div className="learn-asl-select-item">
              <span className="check-name">I am a Parent of a Deaf/HoH child</span>
              <span className="check-icon">
                <Image iconName="checkIcon" iconClassName="w-full h-full" />
              </span>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default ManageStudentFeedback;
