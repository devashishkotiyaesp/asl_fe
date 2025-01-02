import Button from 'components/Button/Button';
import CommentInput from 'components/FormElement/CommentInput';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik } from 'formik';
import { useModal } from 'hooks/useModal';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css';

const Static = () => {
  const NewConversation = useModal();
  const DeleteComment = useModal();
  const ASLDictionary = useModal();
  const LogOut = useModal();
  return (
    <>
      <Button onClickHandler={() => LogOut.openModal()} variants="black">
        Log Out
      </Button>
      <Modal modalBodyClassName="logout-modal" width="max-w-[450px]" modal={LogOut}>
        <>
          <div className="logout-icon">
            <Image iconName="logoutIcon2" />
          </div>
          <div className="logout-title">Ready to sign out?</div>
          <p className="logout-desc">
            Your progress is saved. You can return anytime!
          </p>
          <div className="btn-wrap">
            <Button
              onClickHandler={() => LogOut.closeModal()}
              variants="blackBorder"
            >
              Cancel
            </Button>
            <Button onClickHandler={() => LogOut.closeModal()} variants="Red">
              Logout
            </Button>
          </div>
        </>
      </Modal>

      {/* Community - Topic View */}
      <h1 className="text-5xl font-semibold text-black leading-normal mb-5">
        Dictionary
      </h1>

      <Modal
        width="max-w-[1000px]"
        headerTitle="ASL Dictionary Preview"
        modal={ASLDictionary}
      >
        <div className="dict-modal-wrap">
          <div className="dict-modal-title">ONE(1)</div>
          <div className="dict-row row">
            <div className="left-part">
              <div className="video-wrap">
                <video
                  width="100%"
                  src="/videos/banner.mp4"
                  controls
                  muted
                  // autoPlay
                  // loop
                />
              </div>
            </div>
            <div className="right-part">
              <div className="dict-part">
                <span className="dict-part-title">Notes</span>
                <p>
                  Form an "A" handshape, touch your forehead, then move hand forward
                  and down slightly.
                </p>
              </div>
              <div className="dict-part-title">
                <span className="dict-part-title">Signer </span>
                <div className="dict-part-profile">
                  <div className="img">
                    <Image isFromDataBase={false} src="./images/profile.png" />
                  </div>
                  <div className="content">
                    <p className="name">Stephanie Zornoza</p>
                    <span className="role">Stephanie Zornoza</span>
                  </div>
                </div>
              </div>
              <div className="dict-part">
                <span className="dict-part-title">Dominant hand</span>
                <ul className="dict-hand-sign-wrap">
                  <li>
                    <span className="dict-hand-sign">&#9997;Left</span>
                  </li>
                  <li>
                    <span className="dict-hand-sign">&#9997;Left</span>
                  </li>
                </ul>
              </div>
              <div className="dict-part slider-part">
                <span className="dict-part-title">Sentences</span>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={3}
                  navigation
                  speed={800}
                  className="dict-slider"
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                >
                  <SwiperSlide className="dict-slide">
                    <div className="video-wrap">
                      <video
                        width="100%"
                        src="/videos/banner.mp4"
                        muted
                        // autoPlay
                        // loop
                      />
                      <span className="play-button" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="dict-slide">
                    <div className="video-wrap">
                      <video
                        width="100%"
                        src="/videos/banner.mp4"
                        muted
                        // autoPlay
                        // loop
                      />
                      <span className="play-button" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="dict-slide">
                    <div className="video-wrap">
                      <video
                        width="100%"
                        src="/videos/banner.mp4"
                        muted
                        // autoPlay
                        // loop
                      />
                      <span className="play-button" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="dict-slide">
                    <div className="video-wrap">
                      <video
                        width="100%"
                        src="/videos/banner.mp4"
                        muted
                        // autoPlay
                        // loop
                      />
                      <span className="play-button" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="dict-slide">
                    <div className="video-wrap">
                      <video
                        width="100%"
                        src="/videos/banner.mp4"
                        muted
                        // autoPlay
                        // loop
                      />
                      <span className="play-button" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="dict-slide">
                    <div className="video-wrap">
                      <video
                        width="100%"
                        src="/videos/banner.mp4"
                        muted
                        // autoPlay
                        // loop
                      />
                      <span className="play-button" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="dict-part">
                <span className="dict-part-title">Related Vocab</span>
                <ul className="dict-vocab-list">
                  <li>
                    <Link to="./" className="dict-vocab-item">
                      Blueprint
                    </Link>
                  </li>
                  <li>
                    <Link to="./" className="dict-vocab-item">
                      Structure
                    </Link>
                  </li>
                  <li>
                    <Link to="./" className="dict-vocab-item">
                      Drafting
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="dict-modal-action">
            <Button variants="PrimaryWoodBorder" className="w-fit">
              Canel
            </Button>
            <Button variants="black" className="w-fit">
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      <Button
        variants="PrimaryWood"
        className="w-fit"
        onClickHandler={() => ASLDictionary.openModal()}
      >
        ASL Dictionary
      </Button>

      {/* Community - Topic View */}
      <h1 className="text-5xl font-semibold text-black leading-normal mb-5">
        Community - Topic View
      </h1>
      <div className="content-base">
        <div className="topic-banner">
          <div className="topic-banner__title">ASL Beyond the Classroom</div>
          <div className="topic-banner__desc">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat orci netus
            lectus nulla turpis. Rhoncus nec tempor natoque; litora ac senectus
            nulla. Suspendisse quisque
          </div>

          <div className="comment-count">
            <span className="icon">
              <Image iconName="message" />
            </span>
            <span className="text">6 Conversations </span>
          </div>
        </div>

        <div className="topic-discuss">
          <div className="topic-discuss__title">
            <span className="text">Conversations(6)</span>
            <Button
              variants="PrimaryWood"
              onClickHandler={() => NewConversation.openModal()}
              className="w-fit"
            >
              Start a New Conversation
            </Button>
          </div>

          <div className="topic-item">
            <div className="topic-user-profile">
              <Image isFromDataBase={false} src="./images/profile.png" />
            </div>
            <div className="topic-box">
              <div className="topic-name-time">
                <span className="topic-user-name">Esther Howard</span>
                <span className="topic-time">12 Minutes ago</span>
              </div>
              <div className="topic-user-role">
                <span>Student</span>
              </div>
              <div className="topic-content">
                <div className="topic-content__image">
                  <Image isFromDataBase={false} src="./images/blog-3.png" />
                </div>
                <div className="topic-content__text">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat orci
                  netus lectus nulla turpis. Rhoncus nec tempor natoque; litora ac
                  senectus nulla. Suspendisse quisque hac, porttitor ipsum vivamus
                  pharetra. Class nec volutpat dolor; ridiculus dis sollicitudin.
                  Rutrum arcu a iaculis ex scelerisque.
                </div>
              </div>
              <CommentInput className="" />

              <div className="topic-action">
                <div className="topic-action-like">
                  <Image iconName="palm2" />
                  <span>15</span>
                </div>
                <div className="topic-action-comment">
                  <Image iconName="message2" />
                  <span>1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="topic-item">
            <div className="topic-user-profile">
              <Image isFromDataBase={false} src="./images/profile.png" />
            </div>
            <div className="topic-box">
              <div className="topic-name-time">
                <span className="topic-user-name">Esther Howard</span>
                <span className="topic-time">12 Minutes ago</span>
                <div className="topic-option group">
                  <span className="icon">
                    <Image iconName="threeMoreDots" />
                  </span>
                  <ul>
                    <li>
                      <Button onClickHandler={() => DeleteComment.openModal()}>
                        <Image iconName="trashIcon" />
                        <span>Delete Conversation</span>
                      </Button>
                    </li>
                    <li>
                      <Button onClickHandler={() => DeleteComment.openModal()}>
                        <Image iconName="blockIcon" />
                        <span>Block User from posting</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="topic-user-role">
                <span>Student</span>
              </div>
              <div className="topic-content">
                <div className="topic-content__image">
                  <Image isFromDataBase={false} src="./images/blog-3.png" />
                </div>
                <div className="topic-content__text">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat orci
                  netus lectus nulla turpis. Rhoncus nec tempor natoque; litora ac
                  senectus nulla. Suspendisse quisque hac, porttitor ipsum vivamus
                  pharetra. Class nec volutpat dolor; ridiculus dis sollicitudin.
                  Rutrum arcu a iaculis ex scelerisque.
                </div>
              </div>
              <CommentInput className="" />

              <div className="topic-action">
                <div className="topic-action-like">
                  <Image iconName="palm2" />
                  <span>15</span>
                </div>
                <div className="topic-action-comment">
                  <Image iconName="message2" />
                  <span>1</span>
                </div>
              </div>

              <div className="topic-comment">
                <div className="topic-item">
                  <div className="topic-user-profile">
                    <Image isFromDataBase={false} src="./images/profile.png" />
                  </div>
                  <div className="topic-box">
                    <div className="topic-name-time">
                      <span className="topic-user-name">Esther Howard</span>
                      <span className="topic-time">12 Minutes ago</span>
                    </div>
                    <div className="topic-user-role">
                      <span>Student</span>
                    </div>
                    <div className="topic-content">
                      <div className="topic-content__text">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat
                        orci netus lectus nulla turpis. Rhoncus nec tempor natoque;
                        litora ac senectus nulla. Suspendisse quisque hac, porttitor
                        ipsum vivamus pharetra. Class nec volutpat dolor; ridiculus
                        dis sollicitudin. Rutrum arcu a iaculis ex scelerisque.
                      </div>
                    </div>

                    <div className="topic-action">
                      <div className="topic-action-like">
                        <Image iconName="palm2" />
                        <span>15</span>
                      </div>
                      <div className="topic-action-comment">
                        <Image iconName="reply" />
                        <span>1</span>
                      </div>
                    </div>

                    <CommentInput isReply placeHolder="Reply" />
                  </div>
                </div>
                <div className="topic-item">
                  <div className="topic-user-profile">
                    <Image isFromDataBase={false} src="./images/profile.png" />
                  </div>
                  <div className="topic-box">
                    <div className="topic-name-time">
                      <span className="topic-user-name">Esther Howard</span>
                      <span className="topic-time">12 Minutes ago</span>
                    </div>
                    <div className="topic-user-role">
                      <span>Student</span>
                    </div>
                    <div className="topic-content">
                      <div className="topic-content__text">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat
                        orci netus lectus nulla turpis. Rhoncus nec tempor natoque;
                        litora ac senectus nulla. Suspendisse quisque hac, porttitor
                        ipsum vivamus pharetra. Class nec volutpat dolor; ridiculus
                        dis sollicitudin. Rutrum arcu a iaculis ex scelerisque.
                      </div>
                    </div>

                    <div className="topic-media-list">
                      <div className="topic-media-item">
                        <Image isFromDataBase={false} src="./images/blog-1.png" />
                      </div>
                      <div className="topic-media-item">
                        <Image isFromDataBase={false} src="./images/blog-1.png" />
                      </div>
                    </div>

                    <div className="topic-action">
                      <div className="topic-action-like">
                        <Image iconName="palm2" />
                        <span>15</span>
                      </div>
                      <div className="topic-action-comment">
                        <Image iconName="message2" />
                        <span>1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationPopup
        showCloseIcon
        modal={DeleteComment}
        deleteTitle="Want to Delete Post?"
        bodyText="Are you sure you want to delete "
        linkText="(Post Name)?"
        // navigateTo="./"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        cancelButtonFunction={() => DeleteComment.closeModal()}
        confirmButtonFunction={() => {
          alert('sdsd');
        }}
        popUpType="danger"
      />
      <Modal
        modal={NewConversation}
        closeOnEscape
        headerTitle="Start a Conversation"
      >
        <div className="conversation-modal">
          <Formik
            initialValues={{ name: '', email: '' }}
            onSubmit={() => {
              // console.log('');
            }}
          >
            <Form className="">
              <InputField
                name="sdsd"
                label="Add Link"
                placeholder="Enter Add Link"
                parentClass="mb-4"
              />
              <TextArea
                rows={5}
                name="sd"
                label="What do you want to ask or share?"
                placeholder="Write.."
              />

              <div className="btn-wrapper">
                <Button className="w-fit" variants="PrimaryWoodBorder">
                  Cancel
                </Button>
                <Button className="w-fit" variants="black">
                  Update Post
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      {/* Community - Topic View */}
    </>
  );
};

export default Static;
