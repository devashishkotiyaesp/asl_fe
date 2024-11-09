import Image from 'components/Image';
import { Link } from 'react-router-dom';
import './index.css';

interface CourseCardProps {
  key?: number;
  imagePath?: string;
  price?: string | number;
  title?: string;
  description?: string;
  linkText?: string;
  linkURL?: string;
  // onClickHandler?: MouseEventHandler<HTMLElement>;
}

const CourseCard = ({
  key,
  imagePath,
  price,
  title,
  description,
  linkText,
  linkURL,
}: // onClickHandler
CourseCardProps) => {
  return (
    <>
      <div key={key} className="course-card">
        <div className="inner">
          <div className="course-card__img">
            <Image src={imagePath} />
            {/* <Image src="/images/course-card-1.png" /> */}
          </div>
          <div className="course-card__content">
            <span className="course-card__price">{price}</span>
            <h3>{title}</h3>
            <p dangerouslySetInnerHTML={{ __html: description as string }} />
            <Link to={`${linkURL}`}>
              {linkText} <Image iconName="arrowRight" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
