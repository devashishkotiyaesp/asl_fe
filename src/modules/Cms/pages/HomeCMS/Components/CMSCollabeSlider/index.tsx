import Image from 'components/Image';
import _ from 'lodash';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps } from '../../types';
import './index.css';

const CMSCollabeSlider = ({ bannerData }: { bannerData: CmsSectionProps[] }) => {
  const data = !_.isUndefined(bannerData)
    ? formatCMSObjectData({ data: bannerData })
    : {};
  return (
    <section className="collab-sec">
      <div className="container">
        <div className="wrapper">
          <div className="collab-text">
            <p>
              We collaborate with{' '}
              <strong>{data?.collaboration_logos_title as string}</strong>
            </p>
          </div>
          <div className="collab-slider">
            <Swiper
              spaceBetween={50}
              speed={2000}
              autoplay={{ delay: 1 }}
              loop
              slidesPerView="auto"
              allowTouchMove={false}
              // speed={3000}
              // autoplay={{
              //   delay: 500,
              // }}
              // slidesPerView="auto"
              // loop
              modules={[Autoplay]}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper: any) => console.log(swiper)}
            >
              {(data?.collaboration_logos as string[])?.map((e, index) => {
                return (
                  <SwiperSlide className="brand-item" key={index}>
                    <Image src={e} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSCollabeSlider;
