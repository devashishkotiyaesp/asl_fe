// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';

// ** Types **
import { CmsSectionProps } from '../../HomeCMS/types';

// ** Utils **
import _ from 'lodash';
import { formatCMSObjectData } from '../../HomeCMS/helper';
import { AboutVisionProps } from '../types';
import './index.css';

const OurVision = ({ ourVision }: { ourVision: CmsSectionProps[] }) => {
  const visionData = !_.isUndefined(ourVision)
    ? formatCMSObjectData({ data: ourVision })
    : {};

  const {
    eyebrow_title,
    banner_title,
    collaboration_logos,
    description,
    link_button,
    link_url,
    multiple_banner_images,
  } = visionData as unknown as AboutVisionProps;
  return (
    <section className="our-vision">
      <div className="container">
        <div className="section-title">
          <span className="small-title">{eyebrow_title}</span>
          <h2>{banner_title}</h2>
          <p>{description}</p>
          <div className="btn btn-black-border">
            <Link to={link_url ?? ''}>
              {link_button} <Image iconName="arrowRight" />
            </Link>
          </div>
        </div>
        <div className="images-wrap wrapper">
          <div className="left-part">
            {collaboration_logos.map((item) => (
              <Image src={item} isFromDataBase />
            ))}
          </div>
          <div className="right-part">
            {multiple_banner_images.map((item) => (
              <Image src={item} isFromDataBase />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
