import Button from 'components/Button/Button';
import Progressbar, { ProgressbarColor } from 'components/Progressbar';
import { CourseProgressEnum, Roles } from 'constants/common.constant';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import './index.css';

interface LessonCardProps {
  videoPath?: string;
  duration?: string;
  title?: string;
  description?: string;
  courseProgress?: number;
  progressbarColor?: ProgressbarColor;
  onClick?: () => void;
  status?: CourseProgressEnum;
}

const LessonCard = ({
  videoPath,
  courseProgress,
  duration,
  title,
  description,
  progressbarColor,
  onClick,
  status,
}: LessonCardProps) => {
  const user = useSelector(getCurrentUser);
  return (
    <Button className="lesson-card text-left" onClickHandler={onClick}>
      <div className="lesson-card-video">
        <video>
          <source src={videoPath || 'videos/banner.mp4'} type="video/mp4" />
          <track
            src="example-captions.vtt"
            kind="captions"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support the video tag.
        </video>
        <div className="lesson-card-overlay">
          <span className="lesson-card-duration">{duration || '00:00'}</span>
          {/* <Button className="lesson-card-play-button">
            <Image iconName="playButtonRound" />
          </Button> */}
        </div>
      </div>
      <div className="lesson-card-content">
        <div className="lesson-card-title">{title}</div>
        <div className="lesson-card-desc">{description}</div>
        {user?.role?.role === Roles.Student ? (
          <Progressbar
            color={progressbarColor}
            variant="boolean"
            courseProgress={courseProgress}
            status={status}
          />
        ) : (
          ''
        )}
        {/* <Button variants="blackBorder">
          <Image iconName="arrowRightIcon" iconClassName="rotate-90" />
          Download
        </Button> */}
      </div>
    </Button>
  );
};

export default LessonCard;
