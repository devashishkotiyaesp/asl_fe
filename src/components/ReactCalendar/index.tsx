import { endOfDay, format, getDay, parse, startOfDay, startOfWeek } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { enUS, es } from 'date-fns/locale';
import { useAxiosGet } from 'hooks/useAxios';
import React, { ComponentType, useState } from 'react';
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  ToolbarProps,
  View,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomEvent } from './Components/CustomEvent';
import { CustomToolbar } from './Components/CustomToolbar';
import { EventPopover } from './Components/EventPopover';
import ShowMorePopover from './Components/ShowMorePopover';
import './style/index.css';
import {
  CalendarEvent,
  ReactCalendarProps,
  TabValueProps,
  TimeSlotsProps,
} from './types';

const locales = {
  'en-US': enUS,
  es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = ({
  setFilterRange,
  events,
  currentTab,
  onViewChange,
  calendarView,
  setCurrentDate,
  currentDate,
}: ReactCalendarProps) => {
  const [getAPi, { isLoading }] = useAxiosGet();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlotsProps[]>();
  const [eventElement, setEventElement] = useState<HTMLElement | null>(null);
  const [showMorePosition, setShowMorePosition] = useState<HTMLElement | null>(null);
  const [currentView, setCurrentView] = useState<View>(
    calendarView as unknown as View
  );
  const [daySlots, setDaySlots] = useState([] as CalendarEvent[]);
  const modalClickApi = async (startDate: Date) => {
    const date = zonedTimeToUtc(startOfDay(startDate), 'UTC').toISOString();
    const responseData = await getAPi(`/teacher-availabilities/${date}`, {
      params: { allAvailabilities: true },
    });
    setTimeSlots(responseData.data.data);
  };
  const modalClickCourseApi = async (id: string) => {
    const responseData = await getAPi(`/calendar/courses`, {
      params: { id },
    });
    setTimeSlots(responseData.data);
  };

  const getSlotListing = async (date: string) => {
    const responseData = await getAPi(`/teacher-availabilities/${date}`, {
      params: { allAvailabilities: true },
    });
    setDaySlots(responseData?.data?.data);
  };

  const getCourseSlotsListing = async (date1: string, date2: string) => {
    const responseData = await getAPi(`/calendar/courses`, {
      params: {
        start_date: date1,
        end_date: date2,
      },
    });
    setDaySlots(responseData?.data);
  };

  const handleSelectEvent = (event: CalendarEvent, e: React.SyntheticEvent) => {
    setSelectedEvent(event);
    setEventElement(e.currentTarget as HTMLElement);

    if (currentTab === TabValueProps.Teachers) {
      modalClickApi(event?.start as unknown as Date);
    } else {
      modalClickCourseApi(event?.id);
    }
  };

  const handleClosePopover = () => {
    setSelectedEvent(null);
  };

  const handleShowClosePopover = () => {
    setShowMorePosition(null);
  };

  const components = {
    event: CustomEvent,
    toolbar: CustomToolbar as unknown as
      | ComponentType<ToolbarProps<CalendarEvent, object>>
      | undefined,
  };

  const handleShowMore = async (
    e: React.MouseEvent<HTMLDivElement>,
    date: { start: Date }[]
  ) => {
    const rect = e.currentTarget as unknown as HTMLElement | null;
    setShowMorePosition(rect); // Store the position (top, left, right, bottom)
    const date1 = zonedTimeToUtc(startOfDay(date[0]?.start), 'UTC').toISOString();
    const date2 = zonedTimeToUtc(endOfDay(date[0]?.start), 'UTC').toISOString();
    if (currentTab === TabValueProps.Teachers) {
      getSlotListing(date1);
    } else {
      getCourseSlotsListing(date1, date2);
    }
  };
  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };
  return (
    <div className="content-base">
      <BigCalendar
        onView={(e) => {
          setCurrentView(e);
          onViewChange(e);
        }}
        defaultDate={currentDate}
        onNavigate={handleNavigate}
        className={
          currentView === 'month'
            ? 'admin-month-view'
            : currentView === 'week'
              ? 'admin-week-view'
              : currentView === 'day'
                ? 'admin-day-view'
                : ''
        }
        defaultView={currentView as View}
        localizer={localizer}
        events={events as CalendarEvent[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '900px' }}
        onRangeChange={(range) => {
          if (Array.isArray(range)) {
            setFilterRange?.({
              start_date: zonedTimeToUtc(startOfDay(range[0]), 'UTC').toISOString(),
              end_date: zonedTimeToUtc(
                endOfDay(range[range.length - 1]),
                'UTC'
              ).toISOString(),
            });
          } else {
            setFilterRange?.({
              start_date: range?.start.toISOString(),
              end_date: range?.end.toISOString(),
            });
          }
        }}
        onSelectEvent={handleSelectEvent}
        components={components as any}
        formats={{
          dayFormat: (date, culture) => {
            return format(date, 'EEEE dd', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          weekdayFormat: (date, culture) => {
            return format(date, 'EEEE', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          dayRangeHeaderFormat: ({ start, end }, culture) => {
            const locale = locales[culture as keyof typeof locales] || enUS;
            const formattedStart = format(start, 'MMMM d', { locale });
            const formattedEnd = format(end, 'd, yyyy', { locale });
            return `${formattedStart} – ${formattedEnd}`;
          },
          dayHeaderFormat: (date, culture) => {
            return format(date, 'MMMM dd, yyyy', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          monthHeaderFormat: (date, culture) => {
            return format(date, 'MMMM, yyyy', {
              locale: locales[culture as keyof typeof locales],
            });
          },
          eventTimeRangeFormat: () => {
            return '';
          },
        }}
        messages={{
          showMore: (total, date) =>
            (
              <div
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleShowMore(e, date)} // Pass the date here
              >{`+${total} more`}</div>
            ) as any,
        }}
        doShowMoreDrillDown={false}
      />

      <EventPopover
        event={selectedEvent}
        referenceElement={eventElement}
        isOpen={!!selectedEvent}
        timeSlots={timeSlots}
        currentTab={currentTab}
        onClose={handleClosePopover}
        isLoading={isLoading}
      />

      {showMorePosition && (
        <ShowMorePopover
          referenceElement={showMorePosition as HTMLElement | null}
          daySlots={daySlots}
          onClose={handleShowClosePopover}
          currentTab={currentTab}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Calendar;
