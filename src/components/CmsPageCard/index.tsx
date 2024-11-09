import Button from 'components/Button/Button';
import Image from 'components/Image';
import './index.css';

const CMSPageCard = ({
  cardName,
  onClick,
}: {
  cardName: string;
  onClick: () => void;
}) => {
  return (
    <div className="cms-page-card">
      <div className="inner">
        <div className="cms-page__img-wrap">
          <Image src="/images/page-preview.png" isFromDataBase={false} />
        </div>
        <div className="cms-page__label">
          <span className="text">{cardName}</span>
          <Button className="edit-icon" onClickHandler={onClick}>
            <Image iconName="editPen" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CMSPageCard;
