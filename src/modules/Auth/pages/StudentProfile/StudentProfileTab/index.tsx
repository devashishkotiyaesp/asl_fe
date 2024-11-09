import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import Switch from 'components/FormElement/Switch';
import TextArea from 'components/FormElement/TextArea';
import Icon from 'components/Icon';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { REACT_APP_IMAGE_URL } from 'config';
import { PublicNavigation } from 'constants/navigation.constant';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import { ResetUserPasswordValidationSchema } from 'modules/Auth/validationSchema';
import ProfileSidebar from 'modules/Profile/Pages/StudentProfile/components/StudentProfileSidebar/StudentProfileSidebar';
import { AdminUserValidationSchema } from 'modules/Profile/validation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { clearToken } from 'reduxStore/slices/tokenSlice';
import store from 'reduxStore/store';
import supabase from 'supabase';
import './index.css';

const options = [
  { value: 'Beginner 1', label: 'Beginner 1' },
  { value: 'Beginner 2', label: 'Beginner 2' },
  { value: 'Beginner 3', label: 'Beginner 3' },
];
const StudentProfileTab = () => {
  const SelectModal = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [callApi, { isLoading }] = useAxiosPost();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrnetPassword, setShowCurrnetPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSidebar, setSidebar] = useState<string>('edit');
  const [selectedValue, setSelectedValue] = useState('Beginner 1');
  const user: any = useSelector(getCurrentUser);

  // Select Emoji
  const [selectEmoji, setSelectEmoji] = useState<object | undefined>({
    emoji1: { id: '', emojiItem: '' },
    emoji2: { id: '', emojiItem: '' },
    emoji3: { id: '', emojiItem: '' },
  });
  // const [selectEmoji2, setSelectEmoji2] = useState<string | undefined>();
  // const [selectEmoji3, setSelectEmoji3] = useState<string | undefined>();

  // const authToken = useSelector(getAuthToken);

  const editInitialValue = {
    username: user?.username || '',
    profileUpdate: user?.profileImage || null,
    email: user?.email || null,
    bio: user?.bio || null,
  };

  const resetInitialValue = {
    currentpassword: '',
    password: '',
    confirmpasswod: '',
  };
  const OnSubmit = async (userData: FormikValues) => {
    if (userData) {
      const formData = new FormData();

      // Append form data fields
      formData.append('id', user.id);
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('bio', userData.bio);
      formData.append('aslLevel', selectedValue); // Appending non-file data

      // Append file (if a file was selected)
      if (userData.profileUpdate) {
        formData.append('profileImage', userData.profileUpdate); // Assuming this holds the file
      }

      // Call your API with FormData
      const res = await callApi('/manage-users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Required for file uploads
      });
      if (res.data) {
        const toastId = new Date().getTime();
        dispatch(
          setToast({
            variant: 'Success',
            message: 'Update  Successfully',
            type: 'success',
            id: toastId,
          })
        );
      }
    }
  };
  const OnResetSubmit = async (userData: FormikValues) => {
    const toastId = new Date().getTime();

    if (userData) {
      const response = await supabase.rpc('changepassword', {
        current_plain_password: userData.currentpassword,
        new_plain_password: userData.password,
        current_id: user.sub,
      });
      if (response.data === 'success') {
        dispatch(
          setToast({
            variant: 'Success',
            message: 'Password changed Successfully',
            type: 'success',
            id: toastId,
          })
        );
      } else if (response.data === 'incorrect') {
        dispatch(
          setToast({
            variant: 'Warning',
            message: response.error?.message ?? 'Something went wrong',
            type: 'error',
            id: toastId,
          })
        );
      }
    }
  };
  const deleteUser = async () => {
    const res = await callApi('/users/delete-user', { id: user.id });
    const toastId = new Date().getTime();
    if (res.data === 1) {
      supabase.auth.signOut();
      store.dispatch(clearToken());
      dispatch(
        setToast({
          variant: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          id: toastId,
        })
      );
      navigate(PublicNavigation.login);
    } else {
      dispatch(
        setToast({
          variant: 'Warning',
          message: res.error?.message ?? 'Something went wrong',
          type: 'error',
          id: toastId,
        })
      );
    }
  };
  const handleSelectChange = (value: any) => {
    setSelectedValue(value.value);
  };

  // FOR EMOJI
  const handleEmojiClick = (emoji: string, index: number) => {
    setSelectEmoji({
      ...selectEmoji,
      [`emoji${[index]}`]: { id: index, emojiItem: emoji },
    });
  };

  console.log(selectEmoji, 'setSelectEmoji');

  const emojiFeedback = [
    {
      id: 1,
      name: 'Overall experience with The ASL Shop',
      selectEmoji: [
        { id: 1, emoji: '\uD83D\uDE24' },
        { id: 2, emoji: '\uD83D\uDE21' },
        { id: 3, emoji: '\uD83D\uDE10' },
        { id: 4, emoji: '\uD83D\uDE0A' },
        { id: 5, emoji: '\uD83E\uDD73' },
      ],
    },
    {
      id: 2,
      name: 'Ease of using the app',
      selectEmoji: [
        { id: 1, emoji: '\uD83D\uDE24' },
        { id: 2, emoji: '\uD83D\uDE21' },
        { id: 3, emoji: '\uD83D\uDE10' },
        { id: 4, emoji: '\uD83D\uDE0A' },
        { id: 5, emoji: '\uD83E\uDD73' },
      ],
    },
    {
      id: 3,
      name: 'Content quality',
      selectEmoji: [
        { id: 1, emoji: '\uD83D\uDE24' },
        { id: 2, emoji: '\uD83D\uDE21' },
        { id: 3, emoji: '\uD83D\uDE10' },
        { id: 4, emoji: '\uD83D\uDE0A' },
        { id: 5, emoji: '\uD83E\uDD73' },
      ],
    },
  ];

  useEffect(() => {
    if (user) {
      // When user data changes, update the form fields
      if (user.aslLevel) {
        setSelectedValue(user.aslLevel);
      }
      setPreviewImage(`${REACT_APP_IMAGE_URL}/${user.profileImage}`);
      editInitialValue.username = user.username || '';
      editInitialValue.profileUpdate = user.profileImage || null;
      editInitialValue.email = user.email || '';
      editInitialValue.bio = user.bio || '';
    }
  }, [user]);
  return (
    <>
      <div className="sidebar-content">
        <ProfileSidebar isSidebar={isSidebar} setSidebar={setSidebar} />
        {/* PROFILE */}
        <div
          className="sidebar-content-wrap"
          style={isSidebar === 'edit' ? { display: '' } : { display: 'none' }}
        >
          <div className="sidebar-content-title-wrap">
            <div className="sidebar-content-title">
              <span>Edit Profile</span>
            </div>
          </div>
          <div className="sidebar-content-left">
            <Formik
              initialValues={editInitialValue}
              enableReinitialize
              validationSchema={AdminUserValidationSchema()}
              onSubmit={(values) => OnSubmit(values)}
            >
              {({ values, setFieldValue }) => {
                return (
                  <Form className="student-profile-form">
                    <div className="student-profile-img">
                      {previewImage ? (
                        <Image src={previewImage} />
                      ) : (
                        <Image src="/images/profile.png" isFromDataBase={false} />
                      )}
                      <label htmlFor="image" className="profile-update">
                        <Image iconName="camera" />
                        <input
                          id="image"
                          type="file"
                          name="profileUpdate"
                          onChange={(event) => {
                            const file = event.target.files
                              ? event.target.files[0]
                              : null;
                            if (file) {
                              setFieldValue('profileUpdate', file); // Set the file value in Formik state
                              const fileUrl = URL.createObjectURL(file); // Create a temporary URL for the image
                              setPreviewImage(fileUrl);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <InputField
                      label="User Name"
                      name="username"
                      value={values.username}
                    />
                    <InputField
                      type="email"
                      label="Email"
                      name="email"
                      value={values.email}
                    />
                    <ReactSelect
                      width="100%"
                      className="[&_:nth-child(3)]:w-full"
                      options={options}
                      label="ASL Level"
                      name="aslLevel"
                      onChange={handleSelectChange}
                      placeholder="Select an option"
                      selectedValue={selectedValue}
                    />
                    <TextArea
                      name="bio"
                      label="Bio for Our Community"
                      rows={8}
                      value={values.bio}
                    />
                    <Link
                      className="reset-text"
                      to=""
                      onClick={() => setSidebar('password')}
                    >
                      Reset Password?
                    </Link>

                    <Button
                      onClickHandler={() => SelectModal.openModal()}
                      type="button"
                      variants="black"
                      className="w-fit"
                      value="Add your Interest "
                    />

                    <Button
                      isLoading={isLoading}
                      variants="black"
                      type="submit"
                      className="w-fit"
                      value="Update"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="sidebar-content-right">
            <div className="btn btn-red">
              <Link to="#!" onClick={() => deleteUser()}>
                <Image iconName="trashIcon" />
                Delete Account
              </Link>
            </div>
          </div>
        </div>
        {/* PROFILE */}

        {/* NOTIFICATION */}
        <div
          className="sidebar-content-wrap"
          style={
            isSidebar === 'notifications' ? { display: '' } : { display: 'none' }
          }
        >
          <div className="sidebar-content-title-wrap">
            <div className="sidebar-content-title">
              <span>Notification Settings</span>
            </div>
            <span className="sidebar-content-small-title">
              Configure your notification preferences below.
            </span>
          </div>
          <div className="sidebar-content-ntfc">
            <div className="sidebar-content-ntfc-title">
              <span>Email</span>
            </div>
            <div className="sidebar-content-ntfc-item">
              <span>Newsletter (Monthly)</span>
              <Switch small />
            </div>
            <div className="sidebar-content-ntfc-item">
              <span>New products and updates</span>
              <Switch small />
            </div>
            <div className="sidebar-content-ntfc-item">
              <span>Course reminders and information</span>
              <Switch small />
            </div>
          </div>

          <div className="sidebar-content-ntfc">
            <div className="sidebar-content-ntfc-title">
              <span>In App</span>
            </div>
            <div className="sidebar-content-ntfc-item">
              <span>Newsletter (Monthly)</span>
              <Switch small />
            </div>
            <div className="sidebar-content-ntfc-item">
              <span>New products and updates</span>
              <Switch small />
            </div>
            <div className="sidebar-content-ntfc-item">
              <span>Course reminders and information</span>
              <Switch small />
            </div>
          </div>
        </div>
        {/* NOTIFICATION */}

        {/* LANGUAGES */}
        <div
          className="sidebar-content-wrap"
          style={isSidebar === 'preference' ? { display: '' } : { display: 'none' }}
        >
          <div className="sidebar-content-title-wrap">
            <div className="sidebar-content-title">
              <span>Language Preference</span>
            </div>
            <span className="sidebar-content-small-title">
              Select your language for written text
            </span>
          </div>
          <div className="learn-asl-select-wrap languages-wrap">
            <div className="learn-asl-select-item active">
              <span className="flag-icon">
                <Image iconName="flagUSA" iconClassName="w-full h-full" />
              </span>
              <span className="check-name">English</span>
              <span className="check-icon">
                <Image iconName="checkIcon" iconClassName="w-full h-full" />
              </span>
            </div>
            <div className="learn-asl-select-item ">
              <span className="flag-icon">
                <Image iconName="flagEspanol" iconClassName="w-full h-full" />
              </span>
              <span className="check-name">Español</span>
              <span className="check-icon">
                <Image iconName="checkIcon" iconClassName="w-full h-full" />
              </span>
            </div>
          </div>
        </div>
        {/* LANGUAGES */}

        {/* RESET PASSWORD */}
        <div
          className="sidebar-content-wrap"
          style={isSidebar === 'password' ? { display: '' } : { display: 'none' }}
        >
          <div className="sidebar-content-title-wrap">
            <div className="sidebar-content-title">
              <span>Reset Password</span>
            </div>
            {/* <span className="sidebar-content-small-title">
              Select your language for written text
            </span> */}
          </div>

          <div className="reset-pswd-wrap">
            <Formik
              initialValues={resetInitialValue}
              validationSchema={ResetUserPasswordValidationSchema()}
              onSubmit={(values) => OnResetSubmit(values)}
            >
              <Form className="student-profile-form">
                <InputField
                  icon={
                    <Button
                      className="cursor-pointer w-5 h-5 text-grayText"
                      onClickHandler={() =>
                        setShowCurrnetPassword(!showCurrnetPassword)
                      }
                    >
                      <Icon
                        className="w-full h-full"
                        name={showCurrnetPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                      />
                    </Button>
                  }
                  name="currentpassword"
                  type={showCurrnetPassword ? 'text' : 'password'}
                  label="Current password"
                  placeholder="Enter Password"
                />
                <InputField
                  icon={
                    <Button
                      className="cursor-pointer w-5 h-5 text-grayText"
                      onClickHandler={() => setShowPassword(!showPassword)}
                    >
                      <Icon
                        className="w-full h-full"
                        name={showPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                      />
                    </Button>
                  }
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="New Password"
                  placeholder="Enter Password"
                />
                <InputField
                  icon={
                    <Button
                      className="cursor-pointer w-5 h-5 text-grayText"
                      onClickHandler={() =>
                        setConfirmShowPassword(!showConfirmPassword)
                      }
                    >
                      <Icon
                        className="w-full h-full"
                        name={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                      />
                    </Button>
                  }
                  name="confirmpasswod"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Re-Type New Password"
                  placeholder="Enter Password"
                />
                <Button type="submit" variants="black" className="w-fit">
                  Update
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
        {/* RESET PASSWORD */}

        {/* FEEDBACK FORM */}
        <div
          className="sidebar-content-wrap"
          style={isSidebar === 'feedback' ? { display: '' } : { display: 'none' }}
        >
          <div className="sidebar-content-title-wrap">
            <div className="sidebar-content-title">
              <span>Feedback Form</span>
            </div>
            <span className="sidebar-content-small-title">
              We want your feedback! Your input helps us improve The ASL Shop app.
            </span>
          </div>

          <div className="feedback-form-wrap">
            <Formik
              initialValues={{ addFeedback: '' }}
              onSubmit={(values) => {
                OnSubmit(values);
              }}
              enableReinitialize
            >
              <Form className="feedback-form">
                {emojiFeedback.map((data, index) => {
                  return (
                    <div className="emoji-rating" key={index + 1}>
                      <span className="emoji-rating-title">{data.name}</span>
                      <ul>
                        {data.selectEmoji.map((e, index) => {
                          // console.log(e.id, index + 1, 'e.id,index');

                          return (
                            <li
                              key={e.id}
                              className={e.id === index + 1 ? 'active' : ''}
                            >
                              <Button
                                onClickHandler={() =>
                                  handleEmojiClick(e.emoji, data.id)
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
                />
                <Button type="submit" variants="black" className="w-fit">
                  Submit
                </Button>
              </Form>
            </Formik>
          </div>
          <Button
            onClickHandler={() => SelectModal.openModal()}
            type="button"
            variants="black"
            className="w-fit mt-5"
          >
            Why would you like to learn ASL
          </Button>
        </div>
        {/* FEEDBACK FORM */}

        {/* SUPPORT */}
        <div
          className="sidebar-content-wrap"
          style={isSidebar === 'support' ? { display: '' } : { display: 'none' }}
        >
          <div className="sidebar-content-title-wrap">
            <div className="sidebar-content-title">
              <span>Support</span>
            </div>
            <span className="sidebar-content-small-title">
              How can we help you? Browse these common questions:
            </span>
          </div>

          <div className="support-accordion">
            <div className="accordion-wrapper">
              <div className="accordion-item">
                <div className="accordion-title">
                  <p>How can I make my online courses accessible to ASL users?</p>
                  <span className="arrow">
                    <Image iconName="chevronRight" />
                  </span>
                </div>
                <div className="accordion-content">
                  <div className="accordion-content__inner">sdsd</div>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-title">
                  <p>
                    What tools are available for integrating ASL into virtual
                    classrooms?
                  </p>
                  <span className="arrow">
                    <Image iconName="chevronRight" />
                  </span>
                </div>
                <div className="accordion-content">
                  <div className="accordion-content__inner">sdsd</div>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-title">
                  <p>Can I offer ASL courses online?</p>
                  <span className="arrow">
                    <Image iconName="chevronRight" />
                  </span>
                </div>
                <div className="accordion-content">
                  <div className="accordion-content__inner">sdsd</div>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-title">
                  <p>How do I assess ASL proficiency in an online setting?</p>
                  <span className="arrow">
                    <Image iconName="chevronRight" />
                  </span>
                </div>
                <div className="accordion-content">
                  <div className="accordion-content__inner">sdsd</div>
                </div>
              </div>
            </div>

            <div className="support-divider">
              <div className="inner">
                <span className="text">or</span>
              </div>
            </div>
            <Formik
              initialValues={{ name: '', email: '' }}
              onSubmit={() => {
                // console.log('');
              }}
            >
              <Form className="support-form">
                <TextArea
                  name="sdsd"
                  // parentClass="max-w-[440px]"
                  label="Reach out to a member of The ASL Shop team!"
                  rows={8}
                  placeholder="Write here.."
                />
                <Button
                  onClickHandler={() => SelectModal.openModal()}
                  type="submit"
                  variants="black"
                  className="w-fit"
                >
                  Update
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
        {/* SUPPORT */}
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

export default StudentProfileTab;
