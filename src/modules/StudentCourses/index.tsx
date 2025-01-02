import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import MyCourseCard from 'components/MyCourseCard';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style/index.css';

const StudentCourses = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="student-page-header">
        <Breadcrumbs
          items={[
            {
              label: t('Header.CMS.Home'),
              url: '/',
            },
            {
              label: t('Courses.Title'),
              url: '/courses',
            },
          ]}
        />
      </div>
      <PageHeader title={t('Courses.Title')}>
        <SearchComponent placeholder={t('InputSearchPlaceholder')} />
      </PageHeader>
      <Card
        title={t('LiveAssessment.allAppointments')}
        className="your-course-slider-wrap mb-5 last:mb-0"
        minimal
        bigTitle
      >
        {/* static data for course  */}
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
                tag="Live ASL Assessments"
                isTagInside
                title="Beginner ASL Level 1"
                imagePath="./images/blog-1.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <MyCourseCard
                imgOverlay
                isTagInside
                variant="white"
                title="Beginner ASL Level 1"
                imagePath="./images/blog-1.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <MyCourseCard
                variant="white"
                isTagInside
                tag="Live ASL Assessments"
                title="Beginner ASL Level 1"
                imagePath="./images/blog-1.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <MyCourseCard
                variant="white"
                title="Beginner ASL Level 1"
                imagePath="./images/blog-1.png"
              />
            </SwiperSlide>
          </Swiper>
          <div className="swiper-button image-swiper-button-next">
            <Image iconName="arrowRight" />
          </div>
        </div>
        <Button
          variants="PrimaryWoodLight"
          className="mt-3"
          onClickHandler={() => {
            navigate('/courses/book-appointment');
          }}
        >
          {t('Student.courses.appointments.title')}
        </Button>
      </Card>

      <GlobalSection hideAccessDevice />
    </div>
  );
};

export default StudentCourses;
