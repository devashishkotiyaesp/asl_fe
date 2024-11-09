import Image from 'components/Image';
import { MouseEventHandler } from 'react';
import './index.css';

interface EventCardProps {
  imagePath?: string;
  date?: string;
  month?: string;
  title?: string;
  time?: string;
  linkText?: string;
  onClickHandler?: MouseEventHandler<HTMLElement>;
}
const EventCard = ({
  imagePath,
  date,
  month,
  title,
  time,
  onClickHandler,
  linkText,
}: EventCardProps) => {
  return (
    <div className="event-card" onClick={onClickHandler}>
      <div className="inner">
        <div className="image-banner">
          <Image src={imagePath} isFromDataBase={false} />
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
          <div className="link">
            {linkText}
            <Image iconName="arrowRight" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
