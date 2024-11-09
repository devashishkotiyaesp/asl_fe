// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';

// ** Types **
import { CmsSectionProps } from '../../HomeCMS/types';
import { IAboutBannerProps } from '../types';

// ** Utils **
import _ from 'lodash';
import { formatCMSObjectData } from '../../HomeCMS/helper';
import './index.css';

interface AboutBannerProps {
  aboutStory?: CmsSectionProps[];
  aboutUser?: CmsSectionProps[];
  isOwnerSection?: boolean;
}

const AboutBanner = ({
  aboutStory,
  aboutUser,
  isOwnerSection,
}: AboutBannerProps) => {
  const storyData = !_.isUndefined(aboutStory)
    ? formatCMSObjectData({ data: aboutStory })
    : {};
  const userData = !_.isUndefined(aboutUser)
    ? formatCMSObjectData({ data: aboutUser })
    : {};

  const bannerData = isOwnerSection ? userData : storyData;
  const {
    banner_image,
    banner_title,
    description,
    eyebrow_title,
    fun_tidbits,
    button_text,
    button_url,
  } = bannerData as unknown as IAboutBannerProps;
  return (
    <section className={`about-banner ${isOwnerSection ? 'owner-sec' : ' fill'}`}>
      <div className="container">
        <div className="wrapper">
          {banner_image ? (
            <div className="left-part">
              <div className="about-banner-img">
                <Image src={banner_image} isFromDataBase />
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="right-part">
            <div className="section-title">
              {eyebrow_title ? (
                <span className="small-title">{eyebrow_title}</span>
              ) : (
                ''
              )}
              {isOwnerSection ? (
                <h2>{banner_title}</h2>
              ) : (
                <h1 className="h2">{banner_title}</h1>
              )}
              <p>{description}</p>
              <div className="btn btn-black-border">
                {button_text && (
                  <Link to={button_url ?? ''}>
                    {button_text}
                    <Image iconName="arrowRight" />
                  </Link>
                )}
              </div>
            </div>
            {isOwnerSection && fun_tidbits ? (
              <div className="info-text">{fun_tidbits}</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
