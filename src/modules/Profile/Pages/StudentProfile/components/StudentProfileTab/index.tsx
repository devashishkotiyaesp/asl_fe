import Button from 'components/Button/Button';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { Form, Formik } from 'formik';
import { useModal } from 'hooks/useModal';
import ChangePassword from 'modules/Profile/common/components/ChangePassword';
import Language from 'modules/Profile/common/components/Langauges';
import Notification from 'modules/Profile/common/components/Notification';
import { useState } from 'react';
import ProfileSidebar from '../StudentProfileSidebar/StudentProfileSidebar';
import UserProfile from '../UserProfile';
import './index.css';

const StudentProfileTab = () => {
  const SelectModal = useModal();

  const [isSidebar, setSidebar] = useState<string>('edit');

  return (
    <>
      <div className="sidebar-content">
        <ProfileSidebar isSidebar={isSidebar} setSidebar={setSidebar} />
        <UserProfile isSidebar={isSidebar} setSidebar={setSidebar} />
        <Notification isSidebar={isSidebar} />
        <Language isSidebar={isSidebar} />
        <ChangePassword isSidebar={isSidebar} modal={false} />
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
              initialValues={{ name: '', email: '' }}
              onSubmit={() => {
                // console.log('');
              }}
            >
              <Form className="feedback-form">
                <div className="emoji-rating">
                  <span className="emoji-rating-title">
                    Overall experience with The ASL Shop
                  </span>
                  <ul>
                    <li>&#128548;</li>
                    <li>&#128577;</li>
                    <li className="active">&#128528;</li>
                    <li>&#128522;</li>
                    <li>&#129321;</li>
                  </ul>
                </div>
                <div className="emoji-rating">
                  <span className="emoji-rating-title">Ease of using the app</span>
                  <ul>
                    <li>&#128548;</li>
                    <li>&#128577;</li>
                    <li className="active">&#128528;</li>
                    <li>&#128522;</li>
                    <li>&#129321;</li>
                  </ul>
                </div>
                <div className="emoji-rating">
                  <span className="emoji-rating-title">Content quality</span>
                  <ul>
                    <li>&#128548;</li>
                    <li>&#128577;</li>
                    <li className="active">&#128528;</li>
                    <li>&#128522;</li>
                    <li>&#129321;</li>
                  </ul>
                </div>
                <TextArea
                  name="sdsd"
                  parentClass="max-w-[440px]"
                  label="Comments (suggestions, favorite features, etc)"
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
    </>
  );
};

export default StudentProfileTab;
