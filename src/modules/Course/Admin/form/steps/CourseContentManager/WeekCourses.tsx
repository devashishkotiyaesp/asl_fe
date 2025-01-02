// ** DnD Kit Imports **
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
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// ** Components **
import Button from 'components/Button/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import Quiz from '../../components/Quiz';
import WeeklyMediaItem from './WeeklyMediaItem';

// ** Formik Imports **
import { FieldArray } from 'formik';

// ** State Management & Types **
import { useModal } from 'hooks/useModal';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CourseWeekMedia,
  WeekCourseProps,
  WeekData,
} from '../../types/courseContentManager.types';

const WeekCourses = ({ week, setFieldValue }: WeekCourseProps) => {
  // ** State Management **
  const [activeId, setActiveId] = useState<number | string>();
  const [courseWeekMedia, setCourseWeekMedia] = useState<CourseWeekMedia[]>(
    week?.course_week_media
  );
  const [weekCollapsData, setWeekCollapsData] = useState<number | null>(0);
  const [selectedWeek, setSelectedWeek] = useState<WeekData>();

  // ** Hooks **
  const { t } = useTranslation();
  const createQuizModal = useModal();

  // ** UseRef **
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);

  // ** Drag-and-Drop (DnD) State & Logic **
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const sortableCourseItems = courseWeekMedia?.map((item) => item.sort_order);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: Number(week.sort_order),
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  // ** Functions **
  const handleToggle = (index: number | null) => {
    setWeekCollapsData(weekCollapsData === index ? null : index);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const oldIndex = courseWeekMedia.findIndex(
        (item) => item.sort_order === Number(active.id)
      );
      const newIndex = courseWeekMedia.findIndex(
        (item) => item.sort_order === Number(over?.id ?? -1)
      );
      const newOptionsData = [...courseWeekMedia];
      const [draggedItem] = newOptionsData.splice(oldIndex, 1);
      newOptionsData.splice(newIndex, 0, draggedItem);
      setCourseWeekMedia(newOptionsData);
      setFieldValue?.(
        `course_arranged_weeks[${Number(week.sort_order) - 1}].course_week_media`,
        newOptionsData
      );
    }
    setActiveId(undefined);
  };

  return (
    <DndContext
      onDragStart={(e) => setActiveId(e?.active?.id)}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
    >
      <Card
        className="module-inner-card"
        key={`course_weeks_item${week.sort_order}`}
      >
        <div
          className="accordion-wrap module-acc-wrap"
          ref={setNodeRef}
          style={style}
        >
          <div className="accordion-item module-acc-item">
            <div className="accordion-title module-acc-title">
              {!weekCollapsData ? (
                <div className="dnd-icon" {...attributes} {...listeners}>
                  <Image iconName="dNDIcon" />
                </div>
              ) : (
                <div className="dnd-icon">
                  <Image iconName="dNDIcon" />
                </div>
              )}
              <span className="title">
                {t('CourseContentManager.WeekOverview.Label.Week', {
                  WeekNo: week.week_number,
                })}
              </span>
              {week?.quiz && week?.quiz?.length > 0 ? (
                <div className="module-acc-status">
                  <span>
                    {t('CourseContentManager.WeekOverview.Label.QuizAdded')}
                  </span>
                </div>
              ) : (
                ''
              )}
              <Button
                onClickHandler={() => handleToggle(Number(week.sort_order) - 1)}
                className="module-acc-arrow"
              >
                <Image
                  iconClassName={
                    weekCollapsData === Number(week.sort_order) - 1
                      ? 'rotate-180'
                      : 'rotate-0'
                  }
                  iconName="chevronRight"
                />
              </Button>
            </div>
            <div
              ref={(ele) => (contentRef.current[Number(week.sort_order) - 1] = ele)}
              className={`accordion-content module-acc-content ${
                weekCollapsData === Number(week.sort_order) - 1 ? 'active' : ''
              }`}
              data-collpase={
                weekCollapsData === Number(week.sort_order) - 1 ? '' : 'collpase'
              }
              style={{
                maxHeight:
                  weekCollapsData === Number(week.sort_order) - 1
                    ? `${contentRef.current[Number(week.sort_order) - 1]?.scrollHeight}px`
                    : '0',
                overflow: 'hidden',
              }}
            >
              <FieldArray name={`course_weeks[${Number(week.sort_order) - 1}]`}>
                {() => (
                  <>
                    <SortableContext
                      items={sortableCourseItems}
                      strategy={verticalListSortingStrategy}
                    >
                      {courseWeekMedia?.map((item, weekKey) => (
                        <WeeklyMediaItem
                          key={`weeklyMedia${weekKey + 1}`}
                          index={Number(week.sort_order) - 1}
                          sort_order={item.sort_order}
                        />
                      ))}
                    </SortableContext>
                    <DragOverlay>
                      {activeId && (
                        <WeeklyMediaItem
                          index={Number(week.sort_order) - 1}
                          sort_order={Number(activeId)}
                        />
                      )}
                    </DragOverlay>
                  </>
                )}
              </FieldArray>

              <Button
                className="w-full"
                variants="PrimaryWood"
                onClickHandler={() => {
                  setSelectedWeek(week);
                  createQuizModal.openModal();
                }}
              >
                <Image iconName="plus" />
                {week?.quiz && week?.quiz?.length > 0
                  ? t('QuizCreation.Button.Edit')
                  : t('CourseContentManager.WeekOverview.Button.AddQuiz')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Quiz
        refetchData={(data) => {
          setFieldValue(
            `course_weeks[${Number(week.sort_order) - 1}].quiz[0]`,
            data
          );
        }}
        addQuiz={createQuizModal}
        course_week_id={selectedWeek?.id}
        slug={selectedWeek?.quiz?.[0]?.slug}
        common_id={selectedWeek?.quiz?.[0]?.common_id}
      />
    </DndContext>
  );
};

export default WeekCourses;
