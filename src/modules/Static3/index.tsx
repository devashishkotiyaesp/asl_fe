import CourseProgressCard from 'components/CourseProgressCard';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import TopicCard from 'components/TopicCard';
import { useTranslation } from 'react-i18next';

import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import InputField from 'components/FormElement/InputField';
import PhoneNumberInput from 'components/FormElement/PhoneNumberInput';
import Image from 'components/Image';
import LessonCard from 'components/LessonCard';
import MaterialsBox from 'components/MaterialsBox';
import MyCourseCard from 'components/MyCourseCard';
import TeacherProfileTeaches from 'components/TeacherProfileTeaches';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css';

const Static3 = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* STEP 1 START */}
      <section className="student-dashboard">
        <div className="container">
          <PageHeader title={t('Sidebar.Courses')} parentClass="">
            <SearchComponent placeholder={t('InputSearchPlaceholder')} />
          </PageHeader>
          <div className="course-progress-list">
            <CourseProgressCard
              moduleName="Module 3"
              title="ASL Essentials: Self Paced Beginner 1"
              totalLesson={5}
              completedLesson={1}
              courseProgress={50}
            />
            <CourseProgressCard
              moduleName="Module 3"
              title="ASL Essentials: Self Paced Beginner 1"
              totalLesson={5}
              completedLesson={1}
              courseProgress={50}
            />
            <CourseProgressCard
              moduleName="Module 3"
              title="ASL Essentials: Self Paced Beginner 1"
              totalLesson={5}
              completedLesson={1}
              courseProgress={50}
            />
          </div>

          <PageHeader
            parentClass="student-dashboard-part-title"
            title="Recent Community Posts"
          />
          <div className="student-dashboard-topic-slider-wrap  arrow-up">
            <div className="swiper-button image-swiper-button-prev">
              <Image iconName="arrowRight" />
            </div>

            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              speed={800}
              // navigation
              navigation={{
                prevEl: '.image-swiper-button-prev',
                nextEl: '.image-swiper-button-next',
                disabledClass: 'swiper-button-disabled',
              }}
              modules={[Navigation]}
              className="student-dashboard-topic-slider"
            >
              <SwiperSlide>
                <TopicCard
                  conversationCount={5}
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi."
                  time="10"
                  title="Lorem, ipsum dolor sit amet"
                />
              </SwiperSlide>
              <SwiperSlide>
                <TopicCard
                  conversationCount={5}
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi."
                  time="10"
                  title="Lorem, ipsum dolor sit amet"
                  imagePath="./images/blog-1.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <TopicCard
                  conversationCount={5}
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi."
                  time="10"
                  title="Lorem, ipsum dolor sit amet"
                />
              </SwiperSlide>
              <SwiperSlide>
                <TopicCard
                  conversationCount={5}
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi."
                  time="10"
                  title="Lorem, ipsum dolor sit amet"
                />
              </SwiperSlide>
              <SwiperSlide>
                <TopicCard
                  conversationCount={5}
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi."
                  time="10"
                  title="Lorem, ipsum dolor sit amet"
                />
              </SwiperSlide>
              <SwiperSlide>
                <TopicCard
                  conversationCount={5}
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi."
                  time="10"
                  title="Lorem, ipsum dolor sit amet"
                />
              </SwiperSlide>
              <SwiperSlide>
                <TopicCard
                  conversationCount={5}
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi."
                  time="10"
                  title="Lorem, ipsum dolor sit amet"
                />
              </SwiperSlide>
            </Swiper>
            <div className="swiper-button image-swiper-button-next">
              <Image iconName="arrowRight" />
            </div>
          </div>
          <PageHeader
            parentClass="student-dashboard-part-title"
            title="Recent Community Posts"
          >
            <Link to="./" className="title-link">
              View All
            </Link>
          </PageHeader>
          <div className="dictionary-sign-list student-dictionary-sign-list">
            <div className="student-dictionary-sign-item">
              <span>ONE(1)</span>
              <Image src="/images/sign-1.png" isFromDataBase={false} />
            </div>
            <div className="student-dictionary-sign-item">
              <span>ONE(1)</span>
              <Image src="/images/sign-1.png" isFromDataBase={false} />
            </div>
            <div className="student-dictionary-sign-item">
              <span>ONE(1)</span>
              <Image src="/images/sign-1.png" isFromDataBase={false} />
            </div>
            <div className="student-dictionary-sign-item">
              <span>ONE(1)</span>
              <Image src="/images/sign-1.png" isFromDataBase={false} />
            </div>
          </div>

          <PageHeader
            parentClass="student-dashboard-part-title"
            title="Recent Instagram Post"
          />
        </div>
      </section>
      {/* STEP 1 END */}

      {/* Step 2 START */}
      <section className="student-course">
        <div className="container">
          <PageHeader title="Courses">
            <SearchComponent
              SearchBarChildren={
                <div className="student-filter-inner">
                  <div className="filter-title">
                    <p>Filters</p>
                  </div>
                  <div className="filter-tab-wrap">
                    <div className="filter-tab-list">
                      <ul>
                        <li>
                          <Button className="filter-tab-list-item active">
                            Level
                          </Button>
                        </li>
                        <li>
                          <Button className="filter-tab-list-item">Modality</Button>
                        </li>
                        <li>
                          <Button className="filter-tab-list-item">
                            Instructor
                          </Button>
                        </li>
                        <li>
                          <Button className="filter-tab-list-item">Time</Button>
                        </li>
                      </ul>
                    </div>
                    <div className="filter-tab-content">
                      <div className="filter-checkbox-list">
                        <Checkbox text="Beginner Level 1" />
                        <Checkbox text="Beginner Level 1" />
                        <Checkbox text="Beginner Level 1" />
                        <Checkbox text="Beginner Level 1" />
                      </div>
                      <div className="filter-tab-question">
                        <p className="question-item">Unsure of your level?</p>
                        <div className="btn-wrap">
                          <Button variants="blackBorder">live ASL assessment</Button>
                          <Button variants="black">Self ASL assessment</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              IsFilter
              placeholder={t('InputSearchPlaceholder')}
            />
          </PageHeader>

          <Card
            bigTitle
            title="Your Courses"
            className="your-course-slider-wrap mb-5 last:mb-0"
            minimal
          >
            <div className="arrow-up">
              <div className="swiper-button image-swiper-button-prev">
                <Image iconName="arrowRight" />
              </div>
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                speed={800}
                // navigation
                navigation={{
                  prevEl: '.image-swiper-button-prev',
                  nextEl: '.image-swiper-button-next',
                  disabledClass: 'swiper-button-disabled',
                }}
                modules={[Navigation]}
                className=""
              >
                <SwiperSlide>
                  <MyCourseCard
                    tag="Self Paced Course"
                    title="Beginner ASL Level 1"
                    totalLesson={5}
                    completedLesson={1}
                    courseProgress={50}
                    imagePath="./images/blog-1.png"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    tag="Self Paced Course"
                    title="Beginner ASL Level 1"
                    totalLesson={5}
                    completedLesson={1}
                    courseProgress={50}
                    imagePath="./images/blog-1.png"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    tag="Self Paced Course"
                    title="Beginner ASL Level 1"
                    totalLesson={5}
                    completedLesson={1}
                    courseProgress={50}
                    imagePath="./images/blog-1.png"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    tag="Self Paced Course"
                    title="Beginner ASL Level 1"
                    totalLesson={5}
                    completedLesson={1}
                    courseProgress={50}
                    imagePath="./images/blog-1.png"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    tag="Self Paced Course"
                    title="Beginner ASL Level 1"
                    totalLesson={5}
                    completedLesson={1}
                    courseProgress={50}
                    imagePath="./images/blog-1.png"
                  />
                </SwiperSlide>
              </Swiper>
              <div className="swiper-button image-swiper-button-next">
                <Image iconName="arrowRight" />
              </div>
            </div>
          </Card>

          <Card
            title="Self Paced Courses"
            className="your-course-slider-wrap mb-5 last:mb-0"
            minimal
            bigTitle
          >
            <div className="your-course-slider arrow-up">
              <div className="swiper-button image-swiper-button-prev">
                <Image iconName="arrowRight" />
              </div>
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                speed={800}
                // navigation
                navigation={{
                  prevEl: '.image-swiper-button-prev',
                  nextEl: '.image-swiper-button-next',
                  disabledClass: 'swiper-button-disabled',
                }}
                modules={[Navigation]}
                className=""
              >
                <SwiperSlide>
                  <MyCourseCard
                    imgOverlay
                    variant="white"
                    title="Beginner ASL Level 1"
                    imagePath="./images/blog-1.png"
                    authorImage="./images/profile.png"
                    authorText="Stephanie Zornoza"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    variant="white"
                    title="Beginner ASL Level 1"
                    imagePath="./images/blog-1.png"
                    ButtonText="Take Self-assessment"
                    // authorImage="./images/profile.png"
                    // authorText="Stephanie Zornoza"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    imgOverlay
                    isTagInside
                    tag="sds"
                    variant="white"
                    title="Beginner ASL Level 1"
                    imagePath="./images/blog-1.png"
                    authorImage="./images/profile.png"
                    authorText="Stephanie Zornoza"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    variant="white"
                    title="Beginner ASL Level 1"
                    imagePath="./images/blog-1.png"
                    authorImage="./images/profile.png"
                    authorText="Stephanie Zornoza"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MyCourseCard
                    variant="white"
                    title="Beginner ASL Level 1"
                    imagePath="./images/blog-1.png"
                    authorImage="./images/profile.png"
                    authorText="Stephanie Zornoza"
                  />
                </SwiperSlide>
              </Swiper>
              <div className="swiper-button image-swiper-button-next">
                <Image iconName="arrowRight" />
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* Step 2 END */}

      {/* STUDENT COURSE VIEW START */}
      <section className="student-course-view">
        <div className="container">
          <div className="student-course-banner-wrap">
            <PageHeader title="Beginner ASL Level 1">
              <div className="btn-wrap items-center">
                <Button>Ready to Dive In?</Button>
                <Button variants="PrimaryWood">Sign-up Now!</Button>
              </div>
            </PageHeader>
            <div className="student-course-banner">
              <Image src="./images/blog-1.png" isFromDataBase={false} />
              <div className="content">
                <div className="student-course-title-user">
                  <div className="student-course-banner-title">
                    Beginner ASL Level 1
                  </div>
                  <div className="user-profile-data">
                    <div className="user-profile-image ">
                      <Image src="./images/profile.png" isFromDataBase={false} />
                    </div>
                    <span className="user-profile-name">John Doe</span>
                  </div>
                </div>
                <div className="student-course-enroll-date">
                  <span className="check-icon">
                    <Image iconName="checkIcon" />
                  </span>
                  Enrolled 2/14/23
                </div>
              </div>
            </div>
          </div>

          <div className="student-course-tab-wrap">
            <div className="student-course-tab-base">
              {/* TAB 1 */}
              <div className="student-course-details">
                <h4>Course Description</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <ul>
                  <li>Basic Fingerspelling</li>
                  <li>Numbers</li>
                  <li>Feelings</li>
                  <li>Family Members</li>
                  <li>Colors</li>
                  <li>Basic ASL</li>
                </ul>
              </div>

              <div className="student-course-overview row">
                <div className="left-part">
                  <h4 className="">Included in Course</h4>
                  <ul>
                    <li>40 Lessons</li>
                    <li>10 Quizzes</li>
                    <li>
                      Access to XX or all signs in the dictionary and the ability to
                      practice using Quiz Yourself
                    </li>
                    <li>
                      Access to a private Discussion group just for others in this
                      course in our ASL Community where you can get your questions
                      answered by members of The ASL Shop Crew and connect with peers
                    </li>
                  </ul>
                </div>
                <div className="right-part">
                  <h4>Sneak Peek</h4>
                  <div className="student-course-overview-video">
                    <div className="video-overlay">
                      <Image iconName="playButtonRound" />
                    </div>
                    <video
                      width="100%"
                      src="/videos/banner.mp4"
                      // controls
                      muted
                      // autoPlay
                      // loop
                    />
                  </div>
                </div>
              </div>
              {/* TAB 1 */}

              {/* TAB 2 */}
              <div className="student-course-module-wrap">
                <h4>Course Modules</h4>
                <div className="student-course-module-tab-slider">
                  <div className="swiper-button image-swiper-button-prev">
                    <Image iconName="chevronRight" />
                  </div>
                  <Swiper
                    slidesPerView="auto"
                    spaceBetween={0}
                    navigation={{
                      prevEl: '.image-swiper-button-prev',
                      nextEl: '.image-swiper-button-next',
                      disabledClass: 'swiper-button-disabled',
                    }}
                    modules={[Navigation]}
                    // className="student-course-module-tab-slider"
                  >
                    <SwiperSlide className="active">Module 1</SwiperSlide>
                    <SwiperSlide>Module 2</SwiperSlide>
                    <SwiperSlide>Module 2</SwiperSlide>
                    <SwiperSlide>Module 4</SwiperSlide>
                    <SwiperSlide>Module 5</SwiperSlide>
                    <SwiperSlide>Module 6</SwiperSlide>
                    <SwiperSlide>Module 7</SwiperSlide>
                    <SwiperSlide>Module 8</SwiperSlide>
                    <SwiperSlide>Module 9</SwiperSlide>
                    <SwiperSlide>Module 10</SwiperSlide>
                    <SwiperSlide>Module 11</SwiperSlide>
                    <SwiperSlide>Module 12</SwiperSlide>
                    <SwiperSlide>Module 13</SwiperSlide>
                    <SwiperSlide>Module 14</SwiperSlide>
                    <SwiperSlide>Module 15</SwiperSlide>
                    <SwiperSlide>Module 16</SwiperSlide>
                    <SwiperSlide>Module 17</SwiperSlide>
                    <SwiperSlide>Module 18</SwiperSlide>
                  </Swiper>
                  <div className="swiper-button image-swiper-button-next">
                    <Image iconName="chevronRight" />
                  </div>
                </div>

                <div className="student-course-lesson-wrap">
                  <p className="student-course-lesson-title">Lessons</p>
                  <div className="student-course-lesson-list">
                    <LessonCard
                      title="Course Introduction"
                      description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                      courseProgress={50}
                      duration="03:00"
                    />
                    <LessonCard
                      progressbarColor="green"
                      title="Course Introduction"
                      description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                      courseProgress={50}
                      duration="03:00"
                    />
                    <div className="vocab-practice-box">
                      <Button variants="black">Want to do vocab practice?</Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* TAB 2 */}

              {/* TAB 3 */}
              <div className="student-practice-materials-wrap">
                <h4>Practice Materials</h4>

                <div className="student-practice-materials-list">
                  <MaterialsBox
                    boxVariant="fileCSV"
                    fileName="Contract no 22"
                    date="12-01-2016"
                  />
                </div>
              </div>
              {/* TAB 3 */}
            </div>
          </div>
        </div>
      </section>
      {/* STUDENT COURSE VIEW END */}

      {/* STUDENT COURSE BOOKING START */}
      <section className="student-course-booking">
        <div className="container">
          <PageHeader title="Client Details" />
          <div className="row">
            <div className="left-part">
              <div className="student-course-booking-form-wrap">
                <Card>
                  <Formik
                    initialValues={{
                      name: '',
                    }}
                    onSubmit={() => {
                      // console.log('');
                    }}
                  >
                    {() => {
                      return (
                        <Form className="student-course-booking-form">
                          <InputField label="First Name" isCompulsory name="name" />
                          <InputField label="Last Name" isCompulsory name="name" />
                          <InputField label="Email" isCompulsory name="name" />
                          <PhoneNumberInput label="Phone" name="sd" />
                          <div className="btn-wrap !justify-start col-span-2">
                            <Button variants="PrimaryWood">Submit</Button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </Card>
              </div>
            </div>
            <div className="right-part">
              <div className="booking-details-card">
                <h4>Booking Details</h4>
                <div className="booking-details-info">
                  <div className="booking-details-img">
                    <Image src="./images/blog-1.png" isFromDataBase={false} />
                  </div>
                  <div className="booking-details-content">
                    <span className="booking-details-type">
                      <Image iconName="videoRecord" />
                      In-Person
                    </span>
                    <span className="booking-details-title">ASL Level 1 </span>
                    <span className="booking-details-address">
                      <em>Address :</em>
                      4517 Washington Ave. Manchester, Kentucky 39495
                    </span>
                  </div>
                </div>
                <h4>Payment Details</h4>
                <div className="booking-details-price">
                  <span className="price-lable">Total</span>
                  <span className="price">$200</span>
                </div>
              </div>
              <div className="booking-policy-text">
                <p>
                  Policy: All sessions are non-refundable, so please double-check the
                  schedule to ensure that you don't have any conflicts!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STUDENT COURSE BOOKING END */}

      {/* TEACHER PROFILE FROM STUDENT ACCOUNT START */}
      <section className="teacher-profile">
        <div className="container">
          <Breadcrumbs
            items={[
              {
                label: 'Course',
                url: '/',
              },
              {
                label: 'Self-placed Course',
                url: '/',
              },
              {
                label: 'Teacher',
                url: '/',
              },
            ]}
          />
          <PageHeader title="Teacher Profile" />
          <div className="content-base">
            <div className="teacher-profile-wrap">
              <div className="image">
                <Image src="./images/blog-1.png" isFromDataBase={false} />
              </div>
              <div className="teacher-profile-content">
                <h1>Aisha Johnson</h1>
                <p>Founder and CEO of The ASL Shop</p>
              </div>
            </div>
            <div className="teacher-profile-bio">
              <p>
                Stephanie is a proud Deaf woman living in Los Angeles. She is a
                native signer of American Sign Language (ASL), taught to her by her
                grandmother who is also a Deaf native ASL user. Stephanie received
                her Bachelor's degree in ASL with a minor in Linguistics and a
                Master's degree in Sign Language Education, both from Gallaudet
                University. She then went on to teach at her alma mater. Stephanie
                has taught ASL in several well known colleges and universities, such
                as UCLA, CSUN, and Pierce.
              </p>
            </div>
            <div className="teacher-profile-bio-video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/DBaVShrYz6s?si=00ZDCzxXoZYQIUjV"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="teacher-profile-category">
              <div className="teacher-profile-category-title">Stephanie Teaches</div>
              <div className="teacher-profile-category-list">
                <TeacherProfileTeaches
                  imgPath="./images/blog-1.png"
                  text="shkdjshkjd"
                />
                <TeacherProfileTeaches
                  imgPath="./images/blog-1.png"
                  text="shkdjshkjd"
                />
                <TeacherProfileTeaches
                  imgPath="./images/blog-1.png"
                  text="shkdjshkjd"
                />
                <TeacherProfileTeaches
                  imgPath="./images/blog-1.png"
                  text="shkdjshkjd"
                />
                <TeacherProfileTeaches
                  imgPath="./images/blog-1.png"
                  text="shkdjshkjd"
                />
                <TeacherProfileTeaches
                  imgPath="./images/blog-1.png"
                  text="shkdjshkjd"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* TEACHER PROFILE FROM STUDENT ACCOUNT END */}
    </>
  );
};

export default Static3;
