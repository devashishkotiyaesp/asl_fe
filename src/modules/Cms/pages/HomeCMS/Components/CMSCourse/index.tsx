import CourseCard from 'components/CourseCard';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css';

import _ from 'lodash';
import { Autoplay, Pagination } from 'swiper/modules';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps, pointDataArrayProps } from '../../types';

const CMSCourse = ({ courses }: { courses?: CmsSectionProps[] }) => {
  const data = !_.isUndefined(courses) ? formatCMSObjectData({ data: courses }) : {};
  return (
    <section className="course">
      <div className="container">
        <div className="section-title">
          <span className="small-title">{data?.title as string}</span>
          <h2>{data?.sub_title as string}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: data?.short_description as string,
            }}
          />
        </div>
        <div className="wrapper">
          <Swiper
            slidesPerView={3}
            spaceBetween={2}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {(data?.point_data_array as pointDataArrayProps[])?.map((e, index) => {
              return (
                <SwiperSlide key={`CMSHomeCourseSwipper${index + 1}`}>
                  <CourseCard
                    key={index}
                    imagePath={e.banner_image}
                    price="free"
                    title={e.title}
                    description={e.description}
                    linkText={e.button_text}
                    linkURL={e.button_url ?? ''}
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

export default CMSCourse;
