import { useSortable } from '@dnd-kit/sortable';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import { t } from 'i18next';
import { CourseTeachingMediaItemProps } from '../../types/courseContentManager.types';

const CourseTeachingMediaItem = ({
  sort_order,
  remove,
}: CourseTeachingMediaItemProps) => {
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
    <div ref={setNodeRef} style={style}>
      <Card
        className="course-materials-inner-card"
        key={`course_teaching_media${sort_order}`}
      >
        <div className="dnd-icon" {...attributes} {...listeners}>
          <Image iconName="dNDIcon" />
        </div>
        <div className="flex gap-4">
          <InputField
            parentClass="flex-1"
            isCompulsory
            name={`course_teaching_media.[${sort_order - 1}].title`}
            placeholder={t('CourseContentManager.Form.Placeholder.VideoTitle')}
            label={t('CourseContentManager.Form.Label.VideoTitle')}
          />
          <Button
            isIcon
            variants="Red"
            className="mt-7 w-11 h-11"
            onClickHandler={() => remove(sort_order - 1)}
          >
            <Image iconName="trashIcon" />
          </Button>
        </div>
        <InputField
          isCompulsory
          name={`course_teaching_media.[${sort_order - 1}].link`}
          placeholder={t('CourseContentManager.Form.Placeholder.VideoLinkTeaching')}
          label={t('CourseContentManager.Form.Label.VideoLinkTeaching')}
        />
      </Card>
    </div>
  );
};

export default CourseTeachingMediaItem;
