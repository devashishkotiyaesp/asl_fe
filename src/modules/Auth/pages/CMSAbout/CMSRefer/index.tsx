import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';
import CMSCTA from '../../HomeCMS/Components/CMSCTA';
import './index.css';

const CMSRefer = () => {
  const authToken = useSelector(getAuthToken);
  return (
    <>
      <section className="refer-sec">
        <div className="container">
          <div className="wrapper">
            <div className="left-part">
              <div className="section-title">
                <span className="hashtag-label">#Refer Your Friends</span>
                <h2>Get a $10 discount for each friend you refer</h2>
                <span className="light-text">
                  Get special perks for you and your friends
                </span>
                <ul>
                  <li>Give your friends a $10 discount.</li>
                  <li>Get a $10 discount for each friend who books a session.</li>
                </ul>
              </div>
              {!_.isNull(authToken) ? (
                <div className="refet-copy">
                  <div className="copy-link-wrap">
                    <span className="label">Copy your referral link</span>
                    <div className="link-box">
                      <span className="">
                        https://www.figma.com/design/JTNTP051s7NfExlPoPyjje/The-ASL-Shop-Web?node-id=322-3787&node-type=frame&t=19KCCX4z0LcHtGIV-0
                      </span>
                      <Link to="#!">
                        <Image iconName="copyIcon" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="refer-social">
                <Link to="#!" className="refer-social-item">
                  <Image iconName="faceBookFill" />
                </Link>
                <Link to="#!" className="refer-social-item">
                  <Image iconName="whatsApp" />
                </Link>
                <Link to="#!" className="refer-social-item">
                  <Image iconName="instagramFill" />
                </Link>
                <Link to="#!" className="refer-social-item">
                  <Image iconName="shareIcon" />
                </Link>
              </div>
            </div>
            <div className="right-part">
              <div className="img-wrap">
                <Image isFromDataBase={false} src="./images/share-img.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <CMSCTA
        variant="2"
        linkText="Sign me up!"
        leftImagePath="/images/three-girl-hand-gesture.png"
        title="When you enroll, you will have access to lecture videos, skills practice videos, quizzes, assignments, and our exclusive platform, The Lobby!"
      />
      <GlobalSection />
    </>
  );
};

export default CMSRefer;
