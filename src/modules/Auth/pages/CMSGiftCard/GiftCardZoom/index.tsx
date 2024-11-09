import Image from 'components/Image';
import { Link } from 'react-router-dom';
import './index.css';

const GiftCardZoom = () => {
  return (
    <section className="gift-card-zoom fill">
      <div className="container">
        <div className="title">
          <h2>Gift card: Zoom Sessions</h2>
        </div>
        <div className="wrapper">
          <div className="left-part">
            <Image isFromDataBase={false} src="./images/gift-card.png" />
          </div>
          <div className="right-part">
            <p className="text">
              Gift the joy of ASL! Our cards offer engaging, flexible ASL classes via
              Zoom or in-person (excludes self-paced courses). Perfect for learners!
            </p>
            <div className="btn btn-black">
              <Link to="#!">
                Buy Gift Card For Zoom Sessions
                <Image iconName="arrowRight" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCardZoom;
