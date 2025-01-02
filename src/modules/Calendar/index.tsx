import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import ReactCalendar from 'components/ReactCalendar';
import { CalendarEvent } from 'components/ReactCalendar/types';
import TabComponent from 'components/Tabs';
import {
  addDays,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subDays,
} from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { t } from 'i18next';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface EventProps {
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  user: {
    full_name?: string;
  };
}

const Calendar = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentTab = urlParams.get('calendar') ?? 'Courses';
  const [activeTab, setActiveTab] = useState(currentTab ?? 'Courses');
  const [searchParams, setSearchParams] = useSearchParams();
  const [getEvents, { isLoading }] = useAxiosGet();
  const currentDate = new Date();
  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);
  const visibleRangeStart = subDays(currentMonthStart, 6);
  const visibleRangeEnd = addDays(currentMonthEnd, 6);
  const [events, setEvents] = useState<EventProps[]>();
  const [calendarView, setCalendarView] = useState('month'); // or 'week', 'day', etc.
  const [currentDate1, setCurrentDate] = useState(new Date());
  const isFirstRender = useRef(true);
  const [filterValue, setFilterValue] = useState<{
    start_date?: string | Date;
    end_date?: string | Date;
  }>({
    start_date: format(visibleRangeStart, 'yyyy-MM-dd'),
    end_date: format(visibleRangeEnd, 'yyyy-MM-dd'),
  });
  // Fetch and process course events
  const fetchCourseEvents = async () => {
    try {
      const response = await getEvents(`/calendar/courses`, {
        params: {
          startDate: filterValue.start_date,
          endDate: filterValue.end_date,
          view: true,
        },
      });
      const courseEvents = response?.data ?? [];
      // Process course events if needed
      const eventData = courseEvents.map(
        (data: {
          start_date: string;
          end_date: string;
          user: { full_name: string };
        }) => {
          const startTime = data?.start_date ? parseISO(data?.start_date) : null;
          const endTime = data?.end_date ? parseISO(data?.end_date) : null;

          return {
            ...data,
            start: startTime,
            end: endTime,
            currentTab,
          };
        }
      );
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching course events:', error);
    }
  };

  const fetchEvents = async () => {
    const AllEvents = await getEvents(`/calendar/teachers`, {
      params: {
        startDate: filterValue.start_date,
        endDate: filterValue.end_date,
        view: true,
      },
    });

    const events = AllEvents.data ?? [];

    const eventData = events.map(
      (data: {
        start_time: string;
        end_time: string;
        user: { full_name: string };
      }) => {
        const startTime = data?.start_time ? parseISO(data?.start_time) : null;
        const endTime = data?.end_time ? parseISO(data?.end_time) : null;

        return {
          ...data,
          start: startTime,
          end: endTime,
          start_time_only: startTime ? format(startTime, 'yyyy-MM-dd') : null,
          end_time_only: endTime ? format(endTime, 'yyyy-MM-dd') : null,
          currentTab,
        };
      }
    );
    // Filter unique teachers based on the combination of start_time_only and end_time_only
    const uniqueTeachers = _.uniqBy(
      eventData,
      (event: {
        start_time_only: string;
        end_time_only: string;
        user: { full_name?: string };
      }) =>
        `${event.start_time_only}-${event.end_time_only}-${event.user?.full_name}`
    );

    setEvents(uniqueTeachers);
  };

  useEffect(() => {
    if (activeTab === 'Teachers') {
      fetchEvents();
    } else {
      fetchCourseEvents();
    }
  }, [filterValue, activeTab]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Set to false after the first render
      return; // Skip the first render
    }

    setCalendarView('month');
    setFilterValue({
      start_date: format(visibleRangeStart, 'yyyy-MM-dd'),
      end_date: format(visibleRangeEnd, 'yyyy-MM-dd'),
    });
  }, [activeTab]);

  return (
    <div className="admin-calendar">
      <PageHeader title={t('Calendar.title')} />
      <TabComponent
        current={activeTab}
        onTabChange={(status: string) => {
          setActiveTab(status);
          searchParams.set('calendar', status);
          setSearchParams(searchParams);
        }}
      >
        <TabComponent.Tab title="Courses" uniqueKey="Courses" />
        <TabComponent.Tab title="Teachers" uniqueKey="Teachers" />
      </TabComponent>
      {isLoading ? (
        <Image loaderType="Spin" />
      ) : (
        <ReactCalendar
          setFilterRange={setFilterValue}
          events={events as unknown as CalendarEvent[]}
          currentTab={currentTab}
          onViewChange={setCalendarView}
          calendarView={calendarView}
          setCurrentDate={setCurrentDate}
          currentDate={currentDate1}
        />
      )}

      <div />
    </div>
  );
};

export default Calendar;
