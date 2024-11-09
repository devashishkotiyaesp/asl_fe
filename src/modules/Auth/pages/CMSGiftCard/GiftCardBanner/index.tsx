import Image from 'components/Image';
import './index.css';

const GiftCardBanner = () => {
  return (
    <section className="gift-card-banner">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <span className="hashtag-label">#GiftTheSign</span>
              <h2>Why choose our ASL Gift Cards?</h2>
              <p>
                Do you know someone who's always wanted to learn ASL? Maybe, you want
                to support your loved one, a friend, or a family member and encourage
                them to learn ASL? This is a perfect gift for them!
              </p>

              <ul>
                <li>Redeemable for all courses.</li>
                <li>Easy to purchase</li>
                <li>No expiration date</li>
              </ul>
            </div>
          </div>
          <div className="right-part">
            <div className="img-wrap">
              <Image isFromDataBase={false} src="./images/gift-card.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCardBanner;
