import GiftCard from 'components/GiftCard';
import './index.css';

const GiftCardList = () => {
  return (
    <section className="gift-card-list">
      <div className="container">
        <div className="gift-card-list__title">
          <h2>Gift card: Self-placed Courses</h2>
        </div>
        <div className="list-wrap">
          <GiftCard />
          <GiftCard />
          <GiftCard />
        </div>
      </div>
    </section>
  );
};

export default GiftCardList;
