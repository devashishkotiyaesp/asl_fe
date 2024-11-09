// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';

// ** Types **
import {
  CmsSectionProps,
  pointDataArrayProps,
} from 'modules/Auth/pages/HomeCMS/types';

// ** Constants **
import { PublicNavigation } from 'constants/navigation.constant';

// ** Utils **
import { IconTypes } from 'components/Icon/types';
import _ from 'lodash';
import { formatCMSObjectData } from 'modules/Auth/pages/HomeCMS/helper';
import { useTranslation } from 'react-i18next';
import './index.css';

interface ContactSocialLinkProps {
  link_name: IconTypes;
  link_url: string;
}

const Footer = ({
  footer,
  ctaTwo,
}: {
  footer?: CmsSectionProps[];
  ctaTwo?: CmsSectionProps[];
}) => {
  const footerData = !_.isUndefined(footer)
    ? formatCMSObjectData({ data: footer })
    : {};
  const ctaTwoData = !_.isUndefined(ctaTwo)
    ? formatCMSObjectData({ data: ctaTwo })
    : {};

  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="footer-upper">
        <div className="container">
          <div className="wrapper">
            <div className="left-part">
              <h2>{String(ctaTwoData?.title)}</h2>
            </div>
            <div className="right-part">
              <div className="footer-form">
                <input type="email" placeholder="Enter email address" />
                <input type="submit" value="Subscribe" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="wrapper">
            <div className="footer-logo">
              <Link to="./">
                <Image src={String(footerData.image)} />
              </Link>
              <p>{String(footerData?.short_description)}</p>
            </div>
            <div className="footer-others">
              <div className="footer-col">
                <div className="footer-link-title">
                  <span>{String(footerData.quick_link_title)}</span>
                </div>
                <ul className="footer-link-list">
                  {(footerData?.quick_titles as pointDataArrayProps[])?.map(
                    (item, index) => (
                      <li key={`quick_links_${index + 1}`}>
                        <Link to={String(item?.link_url)}>
                          {String(item.link_name)}
                        </Link>
                      </li>
                    )
                  ) ?? (
                    <>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="./">About Us</Link>
                      </li>
                      <li>
                        <Link to="./">Events</Link>
                      </li>
                      <li>
                        <Link to="./">Dictionary</Link>
                      </li>
                      <li>
                        <Link to="./">Courses</Link>
                      </li>
                      <li>
                        <Link to="./">Organizations</Link>
                      </li>
                      <li>
                        <Link to="./">Shop</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="footer-col">
                <div className="footer-link-title">
                  <span>{String(footerData.resources_link_title)}</span>
                </div>
                {footerData.resources_titles ? (
                  <ul className="footer-link-list">
                    {(footerData?.resources_titles as pointDataArrayProps[])?.map(
                      (item, index) => (
                        <li key={`resources_titles_${index + 1}`}>
                          <Link to={String(item?.link_url)}>
                            {String(item.link_name)}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <ul className="footer-link-list">
                    <li>
                      <Link to="./">Refer Your Friends</Link>
                    </li>
                    <li>
                      <Link to="./">Blog</Link>
                    </li>
                    <li>
                      <Link to="./">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="./">Terms of Use</Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="footer-col">
                <div className="footer-link-title">
                  <span>{String(footerData.members_title)}</span>
                </div>
                {footerData.members_titles ? (
                  <ul className="footer-link-list">
                    {(footerData?.members_titles as pointDataArrayProps[])?.map(
                      (item, index) => (
                        <li key={`member_titles_${index + 1}`}>
                          <Link to={String(item?.link_url)}>
                            {String(item.link_name)}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <ul className="footer-link-list">
                    <li>
                      <Link to="./">Self-Paced Courses</Link>
                    </li>
                    <li>
                      <Link to="./">Live Classes</Link>
                    </li>
                    <li>
                      <Link to="./">Community</Link>
                    </li>
                  </ul>
                )}
                <div className="btn btn-black-border">
                  <Link to={PublicNavigation.login}>Login</Link>
                </div>
              </div>
              <div className="footer-col">
                <div className="footer-link-title">
                  <span>{String(footerData.contact_title)}</span>
                </div>
                <ul className="footer-link-list">
                  <li>
                    <Link to="mailto:contact@theaslshop.com">
                      <Image iconName="mail" iconClassName="w-4 h-4" />
                      {String(footerData?.contact_email_title)}
                    </Link>
                  </li>
                  <li>
                    <Link to="tel:(207) 555-0119">
                      <Image iconName="phone" iconClassName="w-4 h-4" />{' '}
                      {String(footerData?.contact_number_title)}
                    </Link>
                  </li>
                </ul>
                <div className="footer-link-title">
                  <span>{t('Cms.globalSection.footer.followUs')}</span>
                </div>
                <div className="footer-social">
                  <ul>
                    {(
                      footerData?.contact_social_links as ContactSocialLinkProps[]
                    ).map(({ link_name, link_url }, index) => {
                      return (
                        <li key={`contact_links_${index + 1}`}>
                          {link_name && link_url ? (
                            <Link to={link_url ?? ''}>
                              <Image iconName={link_name} />
                            </Link>
                          ) : (
                            ''
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copy">
            <p>{t('Cms.globalSection.footer.copyRightText')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
