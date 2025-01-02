import Image from 'components/Image';
import { format } from 'date-fns';
import { t } from 'i18next';
import _ from 'lodash';
import { getISOString } from 'modules/Course/Admin/form/helper/form.helper';
import React from 'react';
import { CourseDetailsProps } from '../types';

interface CoursePopoverProps {
  courseData: CourseDetailsProps;
  event: { start: Date; user?: { profile_image?: string } };
  isLoading?: boolean;
}

const CoursesPopover: React.FC<CoursePopoverProps> = ({
  event,
  courseData,
  isLoading,
}) => {
  const parsedStartTime =
    courseData?.start_time && getISOString(courseData?.start_time);
  const parsedEndTime = courseData?.end_time && getISOString(courseData?.end_time);
  const formattedStartTime =
    parsedStartTime && format(new Date(parsedStartTime), 'HH:mm a');
  const formattedEndTime =
    parsedEndTime && format(new Date(parsedEndTime), 'HH:mm a');
  return (
    <div className='course-event-popover"'>
      <div className="course-event-popover-wrap">
        <div className="course-event-popover-img">
          {isLoading ? (
            <div className="flex flex-col gap-4 min-w-[320px]">
              <div className="lazy h-12" />
            </div>
          ) : (
            <Image
              width={178}
              height={178}
              src={
                _.isNil(courseData?.cover_image)
                  ? './images/no-image.png'
                  : courseData?.cover_image
              }
              isFromDataBase={!_.isNil(courseData?.cover_image)}
            />
          )}
        </div>
        <div className="course-event-popover-data">
          {courseData?.type?.type && (
            <span className="course-event-popover-mode">
              {courseData?.type?.type}
            </span>
          )}
          {courseData?.title && (
            <p className="course-event-popover-title">{courseData?.title}</p>
          )}
          {event?.start && (
            <div className="course-event-popover-date-time">
              <span>
                <Image iconName="calendar" />
                {format(event?.start, 'yyyy-MM-dd')}
              </span>
              <span>
                <Image iconName="clock" />
                {formattedStartTime} - {formattedEndTime}
              </span>
            </div>
          )}
          {/* currently static data  */}
          {/* <Link to="#!" className="course-event-popover-online-text">
            <Image iconName="zoomIcon" />
            Start Zoom meeting
          </Link>
          <div className="course-event-popover-participants">9/10 participants</div> */}
        </div>
      </div>
      <div className="course-event-popover-bottom-bar">
        {/* <div className="course-event-popover-session">
          <span>Session 1</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </div> */}
        {/* <div className="course-event-popover-session">
          <span>Organizaion</span>
          <p>Public School</p>
        </div> */}
        <div className="course-event-popover-session">
          <span>{t('UserManagement.Form.Label.AssignTeacher')}</span>
          <p>
            <Image src={event?.user?.profile_image} />
            {courseData?.assign_teachers?.full_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPopover;
