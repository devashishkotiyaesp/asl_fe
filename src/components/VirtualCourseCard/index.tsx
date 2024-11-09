import Image from 'components/Image';
import { Link } from 'react-router-dom';
import './index.css';

interface VirtualCourseCardProps {
  imagePath?: string;
  title?: string;
  price?: string;
  coachName?: string;
  coachProfie?: string;
  date?: string;
  spotLeft?: number;
  linkText?: string;
  linkURL?: string;
}

const VirtualCourseCard = ({
  imagePath,
  title,
  price,
  coachName,
  coachProfie,
  date,
  spotLeft,
  linkText,
  linkURL,
}: VirtualCourseCardProps) => {
  return (
    <div className="virtual-course-card">
      <div className="virtual-course-card__img">
        <Image src={imagePath} isFromDataBase={false} alt="" />
      </div>
      <div className="virtual-course-card__content">
        <div className="virtual-course-card__title">
          <h3>{title}</h3>
          <span className="virtual-course-card__price">{price}</span>
        </div>
        <div className="virtual-course-card__coach">
          <span className="coach-img">
            <Image src={coachProfie} isFromDataBase={false} alt="" />
          </span>
          <Link to="./" className="coach-name">
            {coachName}
          </Link>
        </div>
        <div className="virtual-course-card__date">
          <span className="course-date">
            <Image iconName="calendar" iconClassName="w-6 h-6" />
            {date}
          </span>
          <span className="course-spot">{spotLeft} spots left</span>
        </div>
        <div className="btn btn-black">
          <Link to={`${linkURL}`}>{linkText}</Link>
        </div>
      </div>
    </div>
  );
};

export default VirtualCourseCard;
