import Image from 'components/Image';
import { REACT_APP_BACKEND_URL } from 'config';
import _ from 'lodash';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps } from '../../types';
import './index.css';

const CMSHomeBanner = ({ bannerData }: { bannerData: CmsSectionProps[] }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef?.current) {
      videoRef?.current?.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef?.current) {
      videoRef?.current?.pause();
    }
  };

  const data = !_.isUndefined(bannerData)
    ? formatCMSObjectData({ data: bannerData })
    : {};
  return (
    <section className="home-banner">
      <div className="container">
        <div className="text-center">
          <span className="hashtag-label">{data?.title_hashing as string}</span>
          <h1 className="banner-main-title">{data?.banner_title as string}</h1>
          <p
            className="banner-small-desc"
            dangerouslySetInnerHTML={{ __html: data?.description as string }}
          />
          <div className="banner-buttons">
            <Link
              to={(data?.link_btn_url as string) ?? './'}
              className="underline underline-offset-4 inline-flex items-center gap-2 px-5 pt-3.5 pb-4 hover:text-PrimaryWood transition-all duration-300"
            >
              <Image iconName="playButtonRound" iconClassName="w-6 h-6" />
              {data?.link_button as string}
            </Link>
            <div className="btn btn-black">
              <Link to={(data?.banner_button_url as string) ?? './'}>
                {data?.banner_button as string}
              </Link>
            </div>
          </div>
        </div>
        <div className="banner-video-wrapper">
          <div className="video-wrap">
            <Image isFromDataBase src={String(data?.banner_image)} />
            <video
              ref={videoRef}
              width="600"
              src={`${REACT_APP_BACKEND_URL}${data?.banner_video}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              muted
              autoPlay
              loop
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSHomeBanner;
