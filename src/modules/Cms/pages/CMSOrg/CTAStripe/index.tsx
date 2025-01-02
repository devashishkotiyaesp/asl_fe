// ** Types **
import { CmsSectionProps } from '../../HomeCMS/types';
import { CtaStripeResponse } from '../types';

// ** Utils **
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { formatCMSObjectData } from '../../HomeCMS/helper';
import './index.css';

const CTAStipre = ({ ctaOne }: { ctaOne: CmsSectionProps[] }) => {
  const data = !_.isUndefined(ctaOne) ? formatCMSObjectData({ data: ctaOne }) : {};

  const { button_text, button_url, description, title } =
    data as unknown as CtaStripeResponse;

  return (
    <section className="cta-stripe">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="right-part">
            <div className="btn btn-black">
              <Link to={button_url ?? ''}>{button_text}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAStipre;
