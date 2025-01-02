// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';

// ** Types **
import { PointData } from '../types';

// ** Hooks **
import { useRef } from 'react';

// ** Utils **
import { REACT_APP_BACKEND_URL } from 'config';
import { useTranslation } from 'react-i18next';
import './index.css';

interface CourseBannerProps {
  title_hashing: string;
  courseData: PointData;
}

const CourseBanner = ({ title_hashing, courseData }: CourseBannerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { t } = useTranslation();
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="course-banner">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <span className="hashtag-label">{title_hashing}</span>
              <h1 className="h2">{courseData.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: courseData.description }} />
            </div>
            <div className="btn btn-black-border">
              <Link to={courseData.button_url ?? ''}>
                {courseData.button_text}
                <Image iconName="arrowRight" />
              </Link>
            </div>
          </div>
          <div className="right-part">
            <div className="video-wrap">
              <Image src={courseData.banner_image} isFromDataBase />
              <video
                ref={videoRef}
                width="600"
                src={`${REACT_APP_BACKEND_URL}${courseData.banner_video}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                muted
                autoPlay
                loop
              />
            </div>
            <p className="note">{t('Course.courseBanner.noteText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseBanner;
