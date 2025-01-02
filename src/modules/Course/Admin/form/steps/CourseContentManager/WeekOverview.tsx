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

// ** Components **
import { FieldArray } from 'formik';
import WeekCourses from './WeekCourses';

// ** State Management & Types **
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { WeekData, WeekOverviewProps } from '../../types/courseContentManager.types';

const WeekOverview = ({ course_weeks, setFieldValue }: WeekOverviewProps) => {
  // ** State Management **
  const [weekList, setWeekList] = useState<Array<WeekData>>(course_weeks);

  const [activeId, setActiveId] = useState<number | string>();

  const weekSortItems = course_weeks.map((item) => Number(item.sort_order));

  // ** DnD State & Logic **
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    setWeekList(course_weeks);
  }, [course_weeks]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const oldIndex = weekList.findIndex(
        (item) => item.sort_order === Number(active.id)
      );

      const newIndex = weekList.findIndex(
        (item) => item.sort_order === Number(over?.id ?? 0)
      );

      const newOptionsData = [...weekList];
      const [draggedItem] = newOptionsData.splice(oldIndex, 1);
      newOptionsData.splice(newIndex, 0, draggedItem);
      setWeekList(newOptionsData);
      setFieldValue('course_arranged_weeks', newOptionsData);
    }
    setActiveId(undefined);
  };

  return (
    <DndContext
      onDragStart={(e) => setActiveId(e?.active?.id)}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <FieldArray name="course_weeks">
        {() => (
          <>
            <SortableContext
              items={weekSortItems}
              strategy={verticalListSortingStrategy}
            >
              {weekList.map((week, key) => (
                <WeekCourses
                  week={week}
                  setFieldValue={setFieldValue}
                  key={`weekList${key + 1}`}
                />
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId && (
                <WeekCourses
                  week={
                    weekList.find((item) => item.sort_order === activeId) as WeekData
                  }
                  setFieldValue={setFieldValue}
                />
              )}
            </DragOverlay>
          </>
        )}
      </FieldArray>
    </DndContext>
  );
};

export default WeekOverview;
