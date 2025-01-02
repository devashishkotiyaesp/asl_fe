import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { QuestionOption } from '../types';

interface DNDProps {
  options: QuestionOption[];
  orderedOptions?: (options: QuestionOption[]) => void;
  disableDrag?: boolean;
}

const SortableItem = ({
  id,
  text,
  disableDrag,
}: {
  id: string;
  text: string;
  disableDrag: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    disabled: disableDrag,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      className="dragable-item"
      {...attributes}
      style={style}
      {...listeners}
    >
      <div id={id}>{text}</div>
    </div>
  );
};

const ArrangeOrder = ({ options, orderedOptions, disableDrag }: DNDProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [optionsData, setOptionsData] = useState<QuestionOption[]>([]);

  useEffect(() => {
    const upDateOpt = options.map((item, index) => {
      return { ...item, correct_sequence: item.correct_sequence ?? index + 1 };
    });
    const sortedOpiotns = upDateOpt.sort(
      (a, b) => a.correct_sequence - b.correct_sequence
    );
    setOptionsData(sortedOpiotns);
  }, [options]);

  useEffect(() => {
    const upDateOpt = options.map((item, index) => {
      return { ...item, correct_sequence: index + 1 };
    });
    orderedOptions?.(upDateOpt);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = optionsData.findIndex(
        (item) => String(item.correct_sequence) === active.id
      );
      const newIndex = optionsData.findIndex(
        (item) => String(item.correct_sequence) === over?.id
      );

      const newOptionsData = [...optionsData];
      const [draggedItem] = newOptionsData.splice(oldIndex, 1);
      newOptionsData.splice(newIndex, 0, draggedItem);

      setOptionsData(newOptionsData);
      orderedOptions?.(newOptionsData);
    }

    setActiveId(null);
  };
  return (
    <>
      {optionsData && (
        <DndContext
          sensors={sensors}
          modifiers={[restrictToHorizontalAxis]}
          onDragStart={(e) => {
            setActiveId(e?.active?.id as string);
          }}
          onDragEnd={(event) => handleDragEnd(event)}
        >
          <div className="quiz-sorting-wrap">
            <SortableContext
              strategy={rectSortingStrategy}
              items={optionsData?.map((item) => String(item.correct_sequence)) ?? []}
              disabled={disableDrag}
            >
              {optionsData?.map((item) => (
                <SortableItem
                  key={item.correct_sequence} // Use correct_sequence as key
                  id={String(item.correct_sequence)} // Use correct_sequence as id
                  text={item.option_text as string}
                  disableDrag={disableDrag as boolean}
                />
              ))}
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
              {activeId ? (
                <SortableItem
                  disableDrag={disableDrag as boolean}
                  id={activeId.toString()}
                  text={
                    optionsData.find(
                      (item) => String(item.correct_sequence) === activeId
                    )?.option_text ?? ''
                  }
                />
              ) : (
                ''
              )}
            </DragOverlay>
          </div>
        </DndContext>
      )}
    </>
  );
};

export default ArrangeOrder;
