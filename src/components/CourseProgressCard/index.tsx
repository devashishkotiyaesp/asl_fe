import Button from 'components/Button/Button';
import Image from 'components/Image';
import Progressbar from 'components/Progressbar';
import './index.css';

interface CourseProgressCardProps {
  moduleName?: string;
  title?: string;
  totalLesson?: number;
  completedLesson?: number;
  courseProgress?: number;
}

const CourseProgressCard = ({
  moduleName,
  title,
  completedLesson,
  totalLesson,
  courseProgress,
}: CourseProgressCardProps) => {
  return (
    <div className="course-progress-card">
      <span className="course-progress-card-tag">{moduleName}</span>
      <div className="course-progress-title">
        <span>{title}</span>
        <Button className="course-play-btn">
          <Image iconName="playButton" />
        </Button>
      </div>
      <Progressbar
        courseProgress={courseProgress}
        totalLesson={totalLesson}
        completedLesson={completedLesson}
      />
    </div>
  );
};

export default CourseProgressCard;
