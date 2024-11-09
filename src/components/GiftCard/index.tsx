import Image from 'components/Image';
import { Link } from 'react-router-dom';
import './index.css';

const GiftCard = () => {
  return (
    <div className="gift-card">
      <div className="gift-card__img">
        <Image isFromDataBase={false} src="./images/gift-card.png" />
      </div>
      <div className="gift-card__content">
        <span className="text">3-Month Access | ASL Self-Paced Courses</span>
        <span className="price">$38.97</span>
      </div>
      <div className="btn btn-offWhite">
        <Link to="#!">Buy Gift Card</Link>
      </div>
    </div>
  );
};

export default GiftCard;
