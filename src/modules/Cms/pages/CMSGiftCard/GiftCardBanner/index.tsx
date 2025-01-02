import Image from 'components/Image';
import './index.css';

interface GiftCardProps {
  banner_image: string;
  button_text: string;
  button_title: string;
  button_url: string;
  description: string;
  eyebrow_title: string;
  image: string;
  link_btn_url: string;
  link_button: string;
  title: string;
  banner_title: string;
}

const GiftCardBanner = ({ giftCardData }: { giftCardData: GiftCardProps }) => {
  const { banner_image, description, eyebrow_title, title } =
    giftCardData as unknown as GiftCardProps;
  return (
    <section className="gift-card-banner">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <span className="hashtag-label">{eyebrow_title}</span>
              <h2>{title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          </div>
          <div className="right-part flex items-end">
            <div className="img-wrap">
              <Image src={banner_image} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCardBanner;
