import Image from 'components/Image';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css';

const BenefitsCollab = () => {
  return (
    <section className="benefites-collab">
      <div className="container">
        <div className="section-title">
          <span className="small-title">Benefits of Collaboration</span>
          <h2>Get to know The ASL shop</h2>
          <p>
            Use The ASL Shop to learn American Sign Language (ASL) on your
            smartphone, tablet or laptop. No matter where you are, your learning
            progress is constantly being synced across all your devices.
          </p>
        </div>
        <div className="benefites-collab-slider">
          <Swiper pagination speed={800} modules={[Pagination]}>
            <SwiperSlide>
              <div className="wrapper">
                <div className="left-part">
                  <h3>Tailored Solutions for Unique Needs</h3>
                  <p>
                    At The ASL Shop, we recognize that every business is unique with
                    its own set of challenges and objectives. That&apos;s why we
                    offer bespoke solutions specifically designed to address your
                    individual needs. By deeply understanding your business
                    requirements, we craft strategies and deliverables that are
                    precisely aligned with your goals. This personalized approach
                    ensures that our solutions not only meet your expectations but
                    also drive significant and measurable results, helping you
                    achieve your desired outcomes efficiently and effectively.
                  </p>
                  <div className="btn btn-black-border">
                    <Link to="./">
                      Join Us
                      <Image iconName="arrowRight" />
                    </Link>
                  </div>
                </div>
                <div className="right-part">
                  <img src="/images/asl-web-and-mobile.png" alt="" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="wrapper">
                <div className="left-part">
                  <h3>Tailored Solutions for Unique Needs</h3>
                  <p>
                    At The ASL Shop, we recognize that every business is unique with
                    its own set of challenges and objectives. That&apos;s why we
                    offer bespoke solutions specifically designed to address your
                    individual needs. By deeply understanding your business
                    requirements, we craft strategies and deliverables that are
                    precisely aligned with your goals. This personalized approach
                    ensures that our solutions not only meet your expectations but
                    also drive significant and measurable results, helping you
                    achieve your desired outcomes efficiently and effectively.
                  </p>
                  <div className="btn btn-black-border">
                    <Link to="./">
                      Join Us
                      <Image iconName="arrowRight" />
                    </Link>
                  </div>
                </div>
                <div className="right-part">
                  <img src="/images/asl-web-and-mobile.png" alt="" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="wrapper">
                <div className="left-part">
                  <h3>Tailored Solutions for Unique Needs</h3>
                  <p>
                    At The ASL Shop, we recognize that every business is unique with
                    its own set of challenges and objectives. That&apos;s why we
                    offer bespoke solutions specifically designed to address your
                    individual needs. By deeply understanding your business
                    requirements, we craft strategies and deliverables that are
                    precisely aligned with your goals. This personalized approach
                    ensures that our solutions not only meet your expectations but
                    also drive significant and measurable results, helping you
                    achieve your desired outcomes efficiently and effectively.
                  </p>
                  <div className="btn btn-black-border">
                    <Link to="./">
                      Join Us
                      <Image iconName="arrowRight" />
                    </Link>
                  </div>
                </div>
                <div className="right-part">
                  <img src="/images/asl-web-and-mobile.png" alt="" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="wrapper">
                <div className="left-part">
                  <h3>Tailored Solutions for Unique Needs</h3>
                  <p>
                    At The ASL Shop, we recognize that every business is unique with
                    its own set of challenges and objectives. That&apos;s why we
                    offer bespoke solutions specifically designed to address your
                    individual needs. By deeply understanding your business
                    requirements, we craft strategies and deliverables that are
                    precisely aligned with your goals. This personalized approach
                    ensures that our solutions not only meet your expectations but
                    also drive significant and measurable results, helping you
                    achieve your desired outcomes efficiently and effectively.
                  </p>
                  <div className="btn btn-black-border">
                    <Link to="./">
                      Join Us
                      <Image iconName="arrowRight" />
                    </Link>
                  </div>
                </div>
                <div className="right-part">
                  <img src="/images/asl-web-and-mobile.png" alt="" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BenefitsCollab;
