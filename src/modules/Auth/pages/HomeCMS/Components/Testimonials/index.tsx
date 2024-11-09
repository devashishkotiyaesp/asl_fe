import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css';

import TestimonialCard from 'components/TestimonialCard';
import _ from 'lodash';
import { Pagination } from 'swiper/modules';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps, pointDataArrayProps } from '../../types';

interface TestimonialProps {
  transparentBG?: boolean;
  companyCard?: boolean;
  testimonials?: CmsSectionProps[];
}

const Testimonial = ({
  testimonials,
  transparentBG,
  companyCard,
}: TestimonialProps) => {
  const data = !_.isUndefined(testimonials)
    ? formatCMSObjectData({ data: testimonials })
    : {};

  const TestimonialData = [
    {
      id: 1,
      banner_image: '/images/course-card-1.png',
      title: 'Exceptional Learning Journey',
      description:
        'ASL classes revolutionized the way I communicate, dramatically improving my skills and boosting my confidence. This transformative experience is really Great!',
      username: 'Kristin Watson',
      role: 'Student, Manchester',
    },
    {
      id: 2,
      banner_image: '/images/course-card-2.png',
      title: 'Great Quality!',
      description:
        'The communication skills I gained at The ASL Shop have proven to be incredibly valuable, enriching both my personal interactions and professional relationships in ways I never imagined.',
      username: 'Savannah Nguyen',
      role: 'Student, New Mexico',
    },
    {
      id: 3,
      banner_image: '/images/course-card-3.png',
      title: 'Inspiring Education at ASL',
      description:
        'Taking ASL classes has been a life-changing experience that greatly improved my communication abilities and significantly increased my confidence.',
      username: 'Jerome Bell',
      role: 'Student, Excel Academy',
    },
    {
      id: 4,
      banner_image: '/images/course-card-1.png',
      title: 'Exceptional Learning Journey',
      description:
        'ASL classes revolutionized the way I communicate, dramatically improving my skills and boosting my confidence. This transformative experience is really Great!',
      username: 'Kristin Watson',
      role: 'Student, Manchester',
    },
    {
      id: 5,
      banner_image: '/images/course-card-2.png',
      title: 'Great Quality!',
      description:
        'The communication skills I gained at The ASL Shop have proven to be incredibly valuable, enriching both my personal interactions and professional relationships in ways I never imagined.',
      username: 'Savannah Nguyen',
      role: 'Student, New Mexico',
    },
    {
      id: 6,
      banner_image: '/images/course-card-3.png',
      title: 'Inspiring Education at ASL',
      description:
        'Taking ASL classes has been a life-changing experience that greatly improved my communication abilities and significantly increased my confidence.',
      username: 'Jerome Bell',
      role: 'Student, Excel Academy',
    },
  ];

  return (
    <section className={`testimonial ${transparentBG ? '!bg-transparent' : 'fill'}`}>
      <div className="container">
        <div className="section-title">
          <span className="small-title">
            {(data?.title as string) ?? 'Testimonials'}
          </span>
          <h2>{(data?.sub_title as string) ?? 'Hear from Our Partners'}</h2>
          {data?.short_description ? (
            <p
              dangerouslySetInnerHTML={{ __html: data?.short_description as string }}
            />
          ) : (
            <p>
              Explore how our collaboration has transformed organizations. Discover
              the impact of our solutions on their success and growth.
            </p>
          )}
        </div>
        <div className="wrapper">
          <Swiper
            slidesPerView={3}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {(data?.point_data_array
              ? (data?.point_data_array as pointDataArrayProps[])
              : TestimonialData
            )?.map((e, index) => {
              return (
                <SwiperSlide>
                  <TestimonialCard
                    className={companyCard ? 'company-card' : ''}
                    key={index}
                    imagePath={e.banner_image}
                    title={e.title}
                    description={e.description}
                    Name={e.username}
                    info={e.role}
                    isStatic={!data.point_data_array}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
