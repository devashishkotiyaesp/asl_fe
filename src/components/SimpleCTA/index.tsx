// ** Componentns **
import Image from 'components/Image';
import { Link } from 'react-router-dom';

// ** Types **
import { AboutCTAProps } from 'modules/Auth/pages/CMSAbout/types';
import { CmsSectionProps } from 'modules/Auth/pages/HomeCMS/types';

// ** Utils **
import _ from 'lodash';
import { formatCMSObjectData } from 'modules/Auth/pages/HomeCMS/helper';
import './index.css';

const SimpleCTA = ({ aboutCta }: { aboutCta: CmsSectionProps[] }) => {
  const ctaData = !_.isUndefined(aboutCta)
    ? formatCMSObjectData({ data: aboutCta })
    : {};

  const { button_text, button_url, eyebrow_title } =
    ctaData as unknown as AboutCTAProps;

  return (
    <section className="simple-cta fill">
      <div className="container">
        <div className="section-title">
          <h2>{eyebrow_title}</h2>
          <div className="btn btn-black-border">
            <Link to={button_url ?? ''}>
              {button_text} <Image iconName="arrowRight" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleCTA;
