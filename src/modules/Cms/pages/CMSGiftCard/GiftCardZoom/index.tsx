import Image from 'components/Image';
import { Link } from 'react-router-dom';
import './index.css';

interface GiftCardProps {
  button_text: string;
  button_url: string;
  image: string;
  banner_title: string;
  cta_description: string;
}

const GiftCardZoom = ({ giftCardData }: { giftCardData: GiftCardProps }) => {
  const { banner_title, image, cta_description, button_text } =
    giftCardData as unknown as GiftCardProps;
  return (
    <section className="gift-card-zoom fill">
      <div className="container">
        <div className="title">
          <h2>{banner_title}</h2>
        </div>
        <div className="wrapper">
          <div className="left-part">
            <Image src={image} alt={image} />
          </div>
          <div className="right-part">
            <p
              className="text"
              dangerouslySetInnerHTML={{ __html: cta_description }}
            />
            <div className="btn btn-black">
              <Link to="#!">
                {button_text}
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
