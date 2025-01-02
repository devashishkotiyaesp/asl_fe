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
      <Button className="inner" onClickHandler={onClick}>
        <div className="cms-page__img-wrap">
          <Image src="/images/page-preview.png" isFromDataBase={false} />
        </div>
        <div className="cms-page__label">
          <span className="text">{cardName}</span>
          <Button className="edit-icon">
            <Image iconName="editPen" />
          </Button>
        </div>
      </Button>
    </div>
  );
};

export default CMSPageCard;
