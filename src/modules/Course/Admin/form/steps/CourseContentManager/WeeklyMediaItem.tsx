// ** DnD Kit Imports **
import { useSortable } from '@dnd-kit/sortable';

// ** Components **
import Card from 'components/Card';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';

// ** Hooks **
import { useTranslation } from 'react-i18next';

// ** Types **
import { WeeklyMediaItemProps } from '../../types/courseContentManager.types';

const WeeklyMediaItem = ({ index, sort_order }: WeeklyMediaItemProps) => {
  // ** Hooks **
  const { t } = useTranslation();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: sort_order,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };
  return (
    <div style={style} ref={setNodeRef}>
      <Card isGray className="course-week-inner-card">
        <div className="dndIcon" {...attributes} {...listeners}>
          <Image iconName="dNDIcon" />
        </div>
        {/* Course {courseIndex + 1} */}
        <div className="filed-wrap">
          <InputField
            parentClass="flex-1"
            name={`course_weeks[${index}].course_week_media.[${sort_order - 1}].title`}
            placeholder={t('CourseContentManager.WeeklyMediaItem.Placeholder.Title')}
            label={t('CourseContentManager.WeeklyMediaItem.Label.Title')}
          />
          <InputField
            parentClass="flex-1"
            name={`course_weeks[${index}].course_week_media.[${sort_order - 1}].link`}
            placeholder={t('CourseContentManager.WeeklyMediaItem.Placeholder.Link')}
            label={t('CourseContentManager.WeeklyMediaItem.Label.Link')}
          />
        </div>

        <TextArea
          rows={5}
          name={`course_weeks[${index}].course_week_media.[${sort_order - 1}].description`}
          placeholder={t(
            'CourseContentManager.WeeklyMediaItem.Placeholder.Description'
          )}
          label={t('CourseContentManager.WeeklyMediaItem.Label.Description')}
        />
      </Card>
    </div>
  );
};

export default WeeklyMediaItem;
