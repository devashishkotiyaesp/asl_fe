import Button from 'components/Button/Button';
import Image from 'components/Image';
import Progressbar from 'components/Progressbar';
import { Roles } from 'constants/common.constant';
import { MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import './index.css';

interface MyCourseCardProps {
  imagePath?: string;
  tag?: string;
  isTagInside?: boolean;
  imgOverlay?: boolean;
  title?: string;
  totalLesson?: number;
  completedLesson?: number;
  courseProgress?: number;
  authorText?: string;
  authorImage?: string;
  variant?: 'white';
  ButtonText?: string;
  onClickHandler?: MouseEventHandler<HTMLElement>;
  editCourseClick?: MouseEventHandler<HTMLElement>;
  onClickCard?: () => void;
  isFromDatabase?: boolean;
}

const MyCourseCard = ({
  imagePath,
  tag,
  isTagInside,
  imgOverlay,
  title,
  completedLesson,
  courseProgress,
  authorText,
  authorImage,
  totalLesson,
  variant,
  ButtonText,
  onClickHandler,
  onClickCard,
  editCourseClick,
  isFromDatabase = true,
}: MyCourseCardProps) => {
  const user = useSelector(getCurrentUser);
  return (
    <Button
      className={`mycourse-card w-full text-left ${variant === 'white' ? 'white' : ''}`}
      onClickHandler={onClickCard}
    >
      <div className={`mycourse-card-image ${imgOverlay && 'black-overlay'}`}>
        <Image src={imagePath} isFromDataBase={isFromDatabase} />
        {isTagInside && tag && (
          <span className="mycourse-card-tag inside-tag">{tag}</span>
        )}
        {editCourseClick && (
          <Button className="mycourse-card-edit" onClickHandler={editCourseClick}>
            <Image iconName="editpen2" iconClassName="w-full h-full" />
          </Button>
        )}
      </div>
      <div className="mycourse-card-content">
        {!isTagInside && tag && <span className="mycourse-card-tag">{tag}</span>}
        {title && <h3>{title}</h3>}
        {(completedLesson || courseProgress || totalLesson) &&
        user?.role?.role === Roles.Student ? (
          <Progressbar
            hideProgressCount
            completedLesson={completedLesson}
            courseProgress={courseProgress}
            totalLesson={totalLesson}
          />
        ) : (
          ''
        )}
        {authorImage && authorText && (
          <div className="mycourse-author">
            <div className="author-profile">
              <Image src={authorImage} />
            </div>
            <div className="author-name">{authorText}</div>
          </div>
        )}
        {ButtonText && (
          <Button variants="black" onClickHandler={onClickHandler}>
            {ButtonText}
          </Button>
        )}
      </div>
    </Button>
  );
};

export default MyCourseCard;
