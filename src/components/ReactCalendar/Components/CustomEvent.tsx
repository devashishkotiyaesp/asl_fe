import Image from 'components/Image';
import { format } from 'date-fns';
import _ from 'lodash';
import { getISOString } from 'modules/Course/Admin/form/helper/form.helper';
import React from 'react';
import { CustomEventProps, TabValueProps } from '../types';

export const CustomEvent: React.FC<CustomEventProps> = ({
  event,
}: CustomEventProps) => {
  let formattedStartTime = '';
  let formattedEndTime = '';

  if (event.currentTab === 'Courses') {
    const parsedStartTime = event?.start_time && getISOString(event?.start_time);
    const parsedEndTime = event?.end_time && getISOString(event?.end_time);
    formattedStartTime =
      parsedStartTime && format(new Date(parsedStartTime), 'HH:mm a');
    formattedEndTime = parsedEndTime && format(new Date(parsedEndTime), 'HH:mm a');
  }

  return (
    <>
      {event?.currentTab === TabValueProps.Teachers ? (
        <div className="month-teacher-view-event">
          <Image
            imgClassName="month-teacher-view-event-img"
            src={
              _.isNil(event?.user?.profile_image)
                ? './images/no-image.png'
                : event?.user?.profile_image
            }
            isFromDataBase={!_.isNil(event?.user?.profile_image)}
          />
          <p className="month-teacher-view-event-name">{event?.user?.full_name}</p>
        </div>
      ) : (
        <div className="month-course-view-event">
          <span className="course-event-popover-mode">{event?.type}</span>
          <span className="text-black px-1">{event?.private_mode}</span>
          <div className="inner">
            <p className="month-course-view-event_mode">{event?.title}</p>
          </div>
          <p className="month-course-view-event_time">
            {formattedStartTime} - {formattedEndTime}
          </p>
          {event?.user?.first_name}
        </div>
      )}
    </>
  );
};
