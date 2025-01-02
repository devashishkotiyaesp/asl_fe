import React, { useRef } from 'react';
import { usePopper } from 'react-popper';
import { useClickOutside } from '../hooks/useClickOutside';
import {
  CalendarEvent,
  CourseDetailsProps,
  TabValueProps,
  TimeSlotsProps,
} from '../types';
import CoursesPopover from './CoursesPopover';
import SlotsPopover from './SlotsPopover';

interface EventPopoverProps {
  event: CalendarEvent | null;
  referenceElement: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  timeSlots?: TimeSlotsProps[];
  currentTab?: string;
  isLoading?: boolean;
}

export const EventPopover: React.FC<EventPopoverProps> = ({
  event,
  referenceElement,
  isOpen,
  onClose,
  timeSlots,
  currentTab,
  isLoading,
}) => {
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(
    null
  );
  const popperRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(popperRef, onClose, { current: referenceElement });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
    ],
  });

  if (!isOpen || !event) return null;

  return (
    <div
      ref={(el) => {
        setPopperElement(el);
        if (popperRef) {
          popperRef.current = el;
        }
      }}
      style={styles.popper}
      {...attributes.popper}
      className="month-event-popover"
    >
      {isLoading ? (
        <div className="flex flex-col gap-4 min-w-[320px]">
          <div className="lazy h-12" />
          <div className="lazy h-12" />
          <div className="lazy h-12" />
        </div>
      ) : currentTab === TabValueProps.Teachers ? (
        <SlotsPopover event={event} timeSlots={timeSlots} />
      ) : (
        <CoursesPopover
          event={event}
          courseData={timeSlots as unknown as CourseDetailsProps}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
