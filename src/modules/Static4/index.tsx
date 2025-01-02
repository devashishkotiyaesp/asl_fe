import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import LessonCard from 'components/LessonCard';
import MyCourseCard from 'components/MyCourseCard';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css';

const Static4 = () => {
  const { t } = useTranslation();

  return (
    <>
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
          <Breadcrumbs
            items={[
              {
                label: 'Home',
                url: '/',
              },
              {
                label: 'Courses',
                url: '/',
              },
            ]}
          />
          <div className="student-course-banner-wrap">
            <PageHeader title="Beginner ASL Level 1" />
            <div className="student-course-banner">
              <Image src="./images/blog-1.png" isFromDataBase={false} />
              <div className="student-course-content">
                <div className="student-course-tag">
                  <span>Numbering</span>
                  <span>Beginner</span>
                </div>
                <div className="student-course-category">
                  <span>Self Paced</span>
                  <span>General Course</span>
                </div>
              </div>
            </div>

            <div className="student-course-tab-wrap">
              {/* TAB 1 */}
              <div className="student-course-overview">
                <div className="student-course-details">
                  <h4>Course Description</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est
                    laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </p>
                  <div className="student-course-cousre-tag">
                    <ul>
                      <li>Basic Fingerspelling</li>
                      <li>Numbers</li>
                      <li>Feelings</li>
                      <li>Family Members</li>
                      <li>Colors</li>
                      <li>Basic ASL</li>
                    </ul>
                  </div>
                </div>
                <div className="student-course-sort-video">
                  <h4>Preview Video</h4>
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
                  <div className="subscription-card">
                    <div className="subscription-duration">6 Months</div>
                    <p className="subscription-text">
                      Monthly self-paced ASL courses
                    </p>
                    <span className="subscription-sub-text">
                      Access to the full Self paced courses for{' '}
                    </span>
                    <p className="subscription-price">$120.00</p>
                  </div>
                </div>
              </div>
              {/* TAB 2 */}
              <div className="student-course-list">
                <div className="student-course-module-list">
                  <ul>
                    <li>
                      <span className="status-icon">
                        <Image iconName="threeMoreDots" />
                      </span>
                      <Button className="text">01. Sign Connect</Button>
                    </li>
                    <li>
                      <span className="status-icon">
                        <Image iconName="threeMoreDots" />
                      </span>
                      <Button className="text">02. Signs for Everyone</Button>
                    </li>
                    <li>
                      <span className="status-icon complete">
                        <Image iconName="checkIcon" />
                      </span>
                      <Button className="text">03. Signs for Everyone</Button>
                    </li>
                    <li>
                      <span className="status-icon ">
                        <Image iconName="threeMoreDots" />
                      </span>
                      <Button className="text">
                        04. Bridge to Deaf Culture
                        <Image iconName="arrowRight" />
                      </Button>
                    </li>
                  </ul>
                </div>
                <div className="student-course-module-card-wrap">
                  <div className="sign-connect-title">Sign Connect</div>
                  <div className="sign-connect-wrap">
                    <div className="sign-connect-left">
                      <div className="img-wrap">
                        <Image src="./images/blog-1.png" isFromDataBase={false} />
                      </div>
                    </div>
                    <div className="sign-connect-right">
                      <div className="quiz-wrap">
                        <Button variants="black">Quiz</Button>
                        <Image src="./images/question.png" isFromDataBase={false} />
                      </div>
                      <div className="quiz-wrap attempted">
                        <div className="content">
                          <p>
                            <strong>Your Score</strong>
                            You got 6 answers right out of 8
                          </p>
                          <Button variants="black">Review Quiz</Button>
                        </div>
                        <Image
                          src="./images/quiz-attempted.png"
                          isFromDataBase={false}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="student-course-lessons-list">
                    <div className="student-course-lessons-title">lessons</div>
                    <div className="student-course-lessons-inner">
                      <LessonCard
                        title="Course Introduction"
                        description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                        courseProgress={50}
                        duration="03:00"
                      />
                      <LessonCard
                        title="Course Introduction"
                        description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                        courseProgress={50}
                        duration="03:00"
                      />
                      <LessonCard
                        title="Course Introduction"
                        description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                        courseProgress={50}
                        duration="03:00"
                      />
                      <LessonCard
                        title="Course Introduction"
                        description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                        courseProgress={50}
                        duration="03:00"
                      />
                      <LessonCard
                        title="Course Introduction"
                        description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                        courseProgress={50}
                        duration="03:00"
                      />
                      <LessonCard
                        title="Course Introduction"
                        description="need to break some news to you! You probably already learned the ABCs from a worksheet on Google images or some other source. "
                        courseProgress={50}
                        duration="03:00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STUDENT COURSE VIEW END */}

      {/* LESSON DETAILS START */}
      <section className="lesson-details">
        <div className="container">
          <Breadcrumbs
            items={[
              {
                label: 'Home',
                url: '/',
              },
              {
                label: 'Courses',
                url: '/',
              },
              {
                label: 'Self Paced',
                url: '/',
              },
            ]}
          />
          <PageHeader title="LessonDetails" url="/" />
          <div className="lesson-detail-banner">
            <Image src="./images/blog-1.png" isFromDataBase={false} />
            <div className="lesson-detail-content">
              <h2>History of Deaf Education</h2>
            </div>
          </div>
          <div className="lesson-detail-wrap">
            <div className="lesson-detail-left">
              <div className="lesson-detail-media">
                <div className="lesson-detail-video">
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
              <div className="lesson-detail-quizbox">
                <Button variants="black">Quiz</Button>
                <Image src="./images/question.png" isFromDataBase={false} />
              </div>
              <div className="lesson-detail-quizbox attempted">
                <div className="content">
                  <p>
                    <strong>Your Score</strong>
                    You got 6 answers right out of 8
                  </p>
                  <Button variants="black">Review Quiz</Button>
                </div>
                <Image src="./images/quiz-attempted.png" isFromDataBase={false} />
              </div>
            </div>
            <div className="lesson-detail-right">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaeLorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat.cat
                cupidatat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad
              </p>
              <p>
                cididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat.cat cupidatat.
              </p>

              <Link target="_blank" to="https://www.youtube.com/watch?v=YZFKQgS1ENo">
                https://www.youtube.com/watch?v=YZFKQgS1ENo
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* LESSON DETAILS END */}
    </>
  );
};

export default Static4;
