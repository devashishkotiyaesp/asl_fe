import Image from 'components/Image';
import { CourseProgressEnum } from 'constants/common.constant';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import './index.css';

interface ProgressbarProps {
  totalLesson?: number;
  completedLesson?: number;
  courseProgress?: number;
  variant?: 'simple' | 'boolean';
  color?: ProgressbarColor;
  hideProgressCount?: boolean;
  status?: CourseProgressEnum;
}

export type ProgressbarColor = 'green' | 'yellow';

const Progressbar = ({
  completedLesson,
  totalLesson,
  courseProgress,
  variant,
  color,
  hideProgressCount,
  status,
}: ProgressbarProps) => {
  if (status === CourseProgressEnum.Pending) {
    courseProgress = 0;
  } else if (_.isUndefined(status)) {
    courseProgress = 0;
  } else if (status === CourseProgressEnum.In_Progress) {
    courseProgress = 100;
    color = 'yellow';
  } else {
    courseProgress = 100;
    color = 'green';
  }
  const { t } = useTranslation();

  return (
    <div
      className={`course-progress-bar-wrap ${color || ''} 
      ${variant === 'simple' ? 'simple' : ''}
      ${variant === 'boolean' ? 'boolean' : ''}
      `}
    >
      {variant !== 'boolean' && variant !== 'simple' && (
        <span className="course-progress-status">
          {completedLesson} {t('of')} {totalLesson} {t('lessonsCompleted')}
        </span>
      )}
      <div className="course-progress-bar">
        <span className="inner" style={{ width: `${courseProgress || 0}%` }} />
      </div>
      {!hideProgressCount && variant !== 'boolean' && (
        <span className="course-progress-number">{courseProgress || 0}%</span>
      )}
      {variant === 'boolean' && (
        <>
          <span className="progress-status">
            <span className="icon">
              <Image iconName="checkIcon" iconClassName="w-full h-full" />
            </span>
            {status ??
              t('CourseManagement.CoursePreview.Lessons.ProgressiveBarText')}
          </span>
        </>
      )}
    </div>
  );
};

export default Progressbar;
