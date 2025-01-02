// ** Components **
import Image from 'components/Image';

// ** Types **
import { EventCardProps } from 'modules/Cms/pages/CMSEvent/types';

// ** Localization **
import { useTranslation } from 'react-i18next';

// ** Styles **
import './index.css';

const EventCard = ({
  imagePath,
  date,
  month,
  title,
  time,
  onClickHandler,
}: EventCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="event-card">
      <div className="inner">
        <div className="image-banner">
          <Image src={imagePath} />
          <div className="date">
            <span>{date}</span>
            <span>{month}</span>
          </div>
        </div>
        <div className="event-card-content">
          <h3>{title}</h3>
          <div className="event-time">
            <Image iconName="clock" />
            <span className="time-stamp">{time}</span>
          </div>
          <div className="link" onClick={onClickHandler}>
            {t('Events.EventBanner.details')}
            <Image iconName="arrowRight" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
