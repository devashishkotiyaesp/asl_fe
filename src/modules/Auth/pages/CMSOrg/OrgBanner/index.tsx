import Button from 'components/Button/Button';
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import './index.css';

const OrgBanner = () => {
  return (
    <>
      <section className="org-banner fill">
        <div className="container">
          <div className="wrapper">
            <div className="left-part">
              <div className="section-title">
                <span className="hashtag-label">#Collaborate with Us</span>
                <h1 className="h2">Unleash New Horizons for Your Business</h1>
                <p>
                  Discover boundless opportunities through our dynamic
                  collaborations. Transform challenges into growth and innovation
                  with our expert partnership.
                </p>
                <div className="btn btn-black-border">
                  <Link to="./">
                    Contact Us <Image iconName="arrowRight" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="right-part">
              <div className="org-form">
                <span className="org-form__title">Book a demo</span>
                <div className="org-form__wrap">
                  <div className="input-item">
                    First name<span className="text-red-700">*</span>
                  </div>
                  <div className="input-item">
                    Last name<span className="text-red-700">*</span>
                  </div>
                  <div className="input-item col-span-2">
                    Email address<span className="text-red-700">*</span>
                  </div>
                  <div className="input-item col-span-2">
                    Organization name<span className="text-red-700">*</span>
                  </div>
                  <div className="min-h-20 bg-white rounded-5px flex items-center col-span-2 pl-2 text-DarkGray">
                    Message<span className="text-red-700">*</span>
                  </div>
                  <Button
                    variants="black"
                    className="w-full col-span-2 rounded-full py-3"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="org-achieve">
          <div className="container">
            <div className="wrapper">
              <div className="org-achieve__item">
                <span className="icons">
                  <Image iconName="starRounded" />
                </span>
                <div className="text">
                  <span className="title">Deaf Language Experts</span>
                  <span className="desc">Design and Teach all our courses</span>
                </div>
              </div>
              <div className="org-achieve__item">
                <span className="icons">
                  <Image iconName="videoRounded" />
                </span>
                <div className="text">
                  <span className="title">Deaf Language Experts</span>
                  <span className="desc">Design and Teach all our courses</span>
                </div>
              </div>
              <div className="org-achieve__item">
                <span className="icons">
                  <Image iconName="noteBookmark" />
                </span>
                <div className="text">
                  <span className="title">Deaf Language Experts</span>
                  <span className="desc">Design and Teach all our courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrgBanner;
