import GlobalSection from 'components/GlobalSection';
import GiftCardBanner from './GiftCardBanner';
import GiftCardList from './GiftCardList';
import GiftCardZoom from './GiftCardZoom';

const CMSGiftCard = () => {
  return (
    <>
      <GiftCardBanner />
      <GiftCardList />
      <GiftCardZoom />
      <GlobalSection />
    </>
  );
};

export default CMSGiftCard;
