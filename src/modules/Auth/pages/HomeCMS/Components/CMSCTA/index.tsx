// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';

// ** Types **
import { CMSCTAProps } from '../../types';

// ** Utils **
import _ from 'lodash';
import { formatCMSObjectData } from '../../helper';
import './index.css';

const CMSCTA = ({
  leftImagePath,
  title,
  linkText,
  rightImagePath,
  variant,
  ctaOne,
  linkURL,
  isFormDataBase,
  isSpanish,
}: CMSCTAProps) => {
  const data = !_.isUndefined(ctaOne) ? formatCMSObjectData({ data: ctaOne }) : {};
  return (
    <section
      className={`home-cta fill ${variant === '1' ? 'v1' : variant === '2' ? 'v2' : variant === '3' ? 'v3' : ''}`}
    >
      <div className="container">
        {rightImagePath && (
          <Image
            src={data?.banner_image as string}
            imgClassName="hand-sign-img"
            isFromDataBase={!!isFormDataBase}
          />
        )}
        <div className={`wrapper ${isSpanish ? 'spanish-wrapper' : ''}`}>
          <div className="left-part">
            <div className="img-wrap">
              <Image
                src={leftImagePath ?? (data?.image as string)}
                isFromDataBase={!!isFormDataBase}
              />
            </div>
          </div>
          <div className="right-part">
            <div className="inner">
              {variant === '2' ? (
                <p
                  className="big-title"
                  dangerouslySetInnerHTML={{
                    __html: title ?? (data?.title as string),
                  }}
                />
              ) : (
                // <h2>{title ?? (data?.title as string)}</h2>
                <h2 dangerouslySetInnerHTML={{ __html: data?.title as string }} />
              )}
              <div className="btn btn-black-border">
                <Link to={linkURL ?? (data?.cta_button_url as string)}>
                  {linkText ?? (data?.cta_button_title as string)}
                  <Image iconName="arrowRight" iconClassName="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSCTA;
