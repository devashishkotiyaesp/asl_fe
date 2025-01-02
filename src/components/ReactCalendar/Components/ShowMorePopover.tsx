import Image from 'components/Image';
import { format, parseISO } from 'date-fns';
import _ from 'lodash';
import { getISOString } from 'modules/Course/Admin/form/helper/form.helper';
import React, { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { CalendarEvent, GroupedEvents, TabValueProps } from '../types';

interface ShowMorePopoverProps {
  referenceElement: HTMLElement | null;
  daySlots?: CalendarEvent[];
  onClose: () => void; // Callback to handle closing the popover
  currentTab?: string;
  isLoading?: boolean;
}

const ShowMorePopover: React.FC<ShowMorePopoverProps> = ({
  referenceElement,
  daySlots,
  onClose,
  currentTab,
  isLoading,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Create a popper instance to handle positioning
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom', // Adjust this as needed ('top', 'left', 'right', etc.)
  });

  // Handle click outside popover to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const groupedEvents = _.groupBy(daySlots, 'user_id') as unknown as GroupedEvents;
  return (
    <div
      ref={(node) => {
        setPopperElement(node);
        popoverRef.current = node;
      }}
      style={{
        ...styles.popper,
        zIndex: 1000, // Ensure it appears above other elements
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
      }}
      {...attributes.popper}
    >
      {isLoading ? (
        <div className="flex flex-col gap-4 min-w-[320px]">
          <div className="lazy h-12" />
          <div className="lazy h-12" />
          <div className="lazy h-12" />
        </div>
      ) : (
        <>
          {currentTab === TabValueProps.Teachers &&
            !_.isEmpty(groupedEvents) &&
            Object.entries(groupedEvents).map(([userId, events]) => (
              <div key={userId} className="teacher-profile-item min-w-[320px]">
                <div className="teacher-profile-wrap">
                  <div className="teacher-profile-image">
                    <Image
                      imgClassName="w-full h-full rounded-full"
                      src={
                        _.isNil(events[0]?.user?.profile_image)
                          ? './images/no-image.png'
                          : events[0]?.user?.profile_image
                      }
                      isFromDataBase={!_.isNil(events[0]?.user?.profile_image)}
                    />
                  </div>
                  <span className="teacher-profile-text">
                    {events[0]?.user?.full_name}
                  </span>
                </div>

                <div className="teacher-profile-slot-list">
                  {events?.map((event) => (
                    <div key={event.id} className="teacher-profile-slot-item">
                      {format(parseISO(event.start_time), 'h:mm a')} -
                      {format(parseISO(event.end_time), 'h:mm a')}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          {currentTab === TabValueProps.Courses &&
            daySlots?.map((data) => {
              const parsedStartTime =
                data?.start_time && getISOString(data?.start_time);
              const parsedEndTime = data?.end_time && getISOString(data?.end_time);
              const formattedStartTime =
                parsedStartTime && format(new Date(parsedStartTime), 'HH:mm a');
              const formattedEndTime =
                parsedEndTime && format(new Date(parsedEndTime), 'HH:mm a');
              return (
                <div key={data.id} className="teacher-profile-item min-w-[320px]">
                  <div className="teacher-profile-wrap">
                    <div className="teacher-profile-image">
                      <Image
                        imgClassName="w-full h-full rounded-full"
                        // src={data[0]?.user?.profile_image}
                        src="./image/blog-1.png"
                        isFromDataBase={false}
                      />
                    </div>
                    <span className="teacher-profile-text">
                      <p className="teacher-profile-text">{data?.title}</p>
                      {formattedStartTime} -{formattedEndTime}
                    </span>
                    <span className="course-event-popover-mode">{data?.type}</span>
                  </div>
                  {data?.private_mode && (
                    <div className="teacher-profile-slot-list">
                      <div className="teacher-profile-slot-item">
                        {data?.private_mode}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default ShowMorePopover;
