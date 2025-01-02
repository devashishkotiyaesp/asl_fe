import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { FieldArray } from 'formik';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import {
  CourseTeachingMedia,
  CourseTeachingMediaListPorps,
} from '../../types/courseContentManager.types';
import CourseTeachingMediaItem from './CourseTeachingItem';

const CourseTeachingMediaList = ({
  course_teaching_media,
  setFieldValue,
}: CourseTeachingMediaListPorps) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [activeId, setActiveId] = useState<number | string>();
  const [teachingMediaList, setTeachingMediaList] =
    useState<Array<CourseTeachingMedia>>(course_teaching_media);

  useEffect(() => {
    setTeachingMediaList(course_teaching_media);
  }, [course_teaching_media]);

  const teachingMediaSortItem = course_teaching_media.map((item) =>
    Number(item.sort_order)
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      const oldIndex = teachingMediaList?.findIndex(
        (item) => item.sort_order === Number(active.id)
      );
      const newIndex = teachingMediaList?.findIndex(
        (item) => item.sort_order === Number(over?.id ?? 0)
      );

      const newOptionsData = [...teachingMediaList];
      const [draggedItem] = newOptionsData.splice(oldIndex, 1);
      newOptionsData.splice(newIndex, 0, draggedItem);
      setFieldValue('course_arranged_teaching_media', newOptionsData);
      setTeachingMediaList(newOptionsData);
    }
    setActiveId(undefined);
  };

  return (
    <DndContext
      onDragStart={(e) => {
        setActiveId(e?.active?.id);
      }}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <FieldArray name="course_teaching_media">
        {({ push, remove }) => (
          <>
            <SortableContext
              items={teachingMediaSortItem}
              strategy={verticalListSortingStrategy}
            >
              {teachingMediaList?.map((item) => (
                <CourseTeachingMediaItem
                  remove={remove}
                  sort_order={Number(item.sort_order)}
                />
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId && (
                <CourseTeachingMediaItem
                  remove={remove}
                  sort_order={Number(
                    teachingMediaList.find((item) => item.sort_order === activeId)
                      ?.sort_order
                  )}
                />
              )}
            </DragOverlay>
            <Button
              isIcon
              className="w-full"
              variants="PrimaryWood"
              onClickHandler={() =>
                push({
                  title: '',
                  link: '',
                  sort_order: teachingMediaList.length + 1,
                })
              }
            >
              <Image iconName="plus" />
              {t('CourseContentManager.Form.Button.AddMaterial')}
            </Button>
          </>
        )}
      </FieldArray>
    </DndContext>
  );
};

export default CourseTeachingMediaList;
