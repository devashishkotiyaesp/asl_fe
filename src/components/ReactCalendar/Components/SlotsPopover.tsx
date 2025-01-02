import Image from 'components/Image';
import 'components/ReactCalendar/style/index.css';
import { format, parseISO } from 'date-fns';
import { t } from 'i18next';
import React from 'react';

interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
}

interface Event {
  user: {
    profile_image?: string;
    full_name?: string;
  };
  start: Date;
}

interface SlotsPopoverProps {
  event: Event;
  timeSlots?: TimeSlot[];
}

const SlotsPopover: React.FC<SlotsPopoverProps> = ({ event, timeSlots }) => {
  return (
    <div className="teacher-event-popover">
      <h5 className="">
        {t('Calendar.modal.popupText')}
        <span>({format(event?.start, 'dd, MMM')})</span>
      </h5>

      <div className="teacher-profile-item">
        <div className="teacher-profile-wrap">
          <div className="teacher-profile-image">
            <Image
              imgClassName="w-full h-full rounded-full"
              src={event?.user?.profile_image}
            />
          </div>
          <span className="teacher-profile-text">{event?.user?.full_name}</span>
        </div>

        <div className="teacher-profile-slot-list">
          {timeSlots &&
            timeSlots?.length > 0 &&
            timeSlots?.map((timeSlot) => (
              <div key={timeSlot.id} className="teacher-profile-slot-item">
                {format(parseISO(timeSlot.start_time), 'h:mm a')} -
                {format(parseISO(timeSlot.end_time), 'h:mm a')}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SlotsPopover;
