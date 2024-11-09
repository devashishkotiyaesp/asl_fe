// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';

// ** Hooks **
import { useRef } from 'react';

// ** Types **
import { PointData } from '../types';

// ** Utils **
import { REACT_APP_BACKEND_URL } from 'config';
import '../CourseBanner/index.css';
import './index.css';

const CMSCourseList = ({ point_data_array }: { point_data_array: PointData[] }) => {
  const videoRef2 = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef2.current) {
      videoRef2.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef2.current) {
      videoRef2.current.pause();
    }
  };

  return (
    <section className="course-list course-banner">
      {point_data_array?.slice(1)?.map((e, index) => {
        return (
          <div key={index} className="course-list-item">
            <div className="container">
              <div className="wrapper">
                <div className="left-part">
                  <div className="section-title">
                    <h2>{e.title}</h2>
                    <p>{e.description}</p>
                    <div className="btn-wrap">
                      <div className="btn btn-black-border">
                        <Link to={e.button_url ?? ''}>
                          {e.button_text} <Image iconName="arrowRight" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-part">
                  {e.banner_video ? (
                    <div className="video-wrap">
                      {e.isFree && <span className="price-label">Free</span>}
                      <Image isFromDataBase src={e.banner_image} />
                      <video
                        ref={videoRef2}
                        width="600"
                        src={`${REACT_APP_BACKEND_URL}${e.banner_video}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        muted
                        autoPlay
                        loop
                      />
                    </div>
                  ) : (
                    <div className="video-wrap">
                      <Image isFromDataBase src={e.banner_image} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CMSCourseList;
