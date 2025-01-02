// ** Components **
import TestimonialCard from 'components/TestimonialCard';

// ** Utilities  **
import _ from 'lodash';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatCMSObjectData } from '../../helper';

// ** Types **
import { PointData } from 'modules/Cms/pages/CMSOrg/types';
import { CmsSectionProps, pointDataArrayProps } from '../../types';

// **  Styles  **
import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';

interface TestimonialProps {
  transparentBG?: boolean;
  companyCard?: boolean;
  testimonials?: CmsSectionProps[];
  testimonialKey?: string;
}

const Testimonial = ({
  testimonials,
  transparentBG,
  companyCard,
  testimonialKey,
}: TestimonialProps) => {
  const data = !_.isUndefined(testimonials)
    ? formatCMSObjectData({ data: testimonials })
    : {};

  if (testimonialKey) {
    const point_data_array: PointData[] = [];
    testimonials?.forEach((item) => {
      if (item.field_name === testimonialKey) {
        const fieldValue = JSON.parse(item.field_value);
        point_data_array.push(fieldValue);
      }
    });
    data.point_data_array = point_data_array;
  }

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
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {(data?.point_data_array
              ? (data?.point_data_array as pointDataArrayProps[])
              : []
            )?.map((e, index) => {
              return (
                <SwiperSlide key={`Testimonial_swipper_slide${index + 1}`}>
                  <TestimonialCard
                    className={companyCard ? 'company-card' : ''}
                    imagePath={e.banner_image}
                    title={e.title}
                    description={e.description}
                    Name={e.username ?? e?.company_name}
                    info={e.role ?? e?.city}
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
