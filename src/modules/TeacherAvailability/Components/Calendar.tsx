import {
  endOfDay,
  format,
  getDay,
  isSameDay,
  parse,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { useAxiosGet } from 'hooks/useAxios';
import { useCallback, useEffect, useState } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  EventProps,
  ToolbarProps,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import '../styles/index.css';
import { AllSlotsProps, CustomToolbarProps, TeacherCalendarProps } from '../types';
import { CustomToolbar } from './CustomToolbar';
import { EditDaySlots } from './EditDaySlots';

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
const TeacherCalendar = ({
  setFilterRange,
  events,
  loadingAllAvailabilities,
}: TeacherCalendarProps) => {
  const [getApi, { isLoading: getDayLoading }] = useAxiosGet();
  const [daySlots, setDaySlots] = useState([] as AllSlotsProps[]);
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [selectedDate, setSelectedDate] = useState<string | Date>();
  const storeLang = useSelector(useLanguage);
  const TimeGutterHeader = () => (
    <p className="text-base leading-6 text-dark font-medium">
      {format(new Date(), 'EEEE (dd MMM)')}
    </p>
  );
  const customToolbarCallback = useCallback(
    (props: ToolbarProps<EventProps, object>) => {
      return <CustomToolbar {...(props as CustomToolbarProps)} />;
    },
    []
  );
  const getSlotListing = async (date: string) => {
    const responseData = await getApi(`/teacher-availabilities/${date}`, {
      params: { timezone: timeZone },
    });
    setDaySlots(responseData?.data?.data);
  };
  const onSelectSlot = async (slotInfo: { start: Date; end: Date }) => {
    if (slotInfo) {
      const { start } = slotInfo; // Destructure start date from slotInfo
      const date = zonedTimeToUtc(startOfDay(start), 'UTC').toISOString();
      getSlotListing(date);
      setSelectedDate(start);
    }
  };
  useEffect(() => {
    if (loadingAllAvailabilities) {
      setDaySlots([]);
    }
  }, [loadingAllAvailabilities]);

  const dayPropGetter = (date: Date) => {
    const currentDay = date;
    const currentStartDay = startOfDay(currentDay);
    const currentEndDay = endOfDay(currentDay);
    // Initialize an empty className array
    const classNames = [];
    // Check if the current day is the selected date
    if (selectedDate && isSameDay(selectedDate as Date, currentDay)) {
      classNames.push('highlighted-day'); // Add highlighted-day class
    }
    // Check if there are any events on the current day
    const hasEvents = events?.some(
      (event: { start_time: string; end_time: string }) => {
        const eventStart = new Date(event?.start_time as string);
        const eventEnd = new Date(event?.end_time as string);
        return (
          (eventStart >= currentStartDay && eventStart <= currentEndDay) ||
          (eventEnd >= currentStartDay && eventEnd <= currentEndDay)
        );
      }
    );
    // If there are events, add the event-day class
    if (hasEvents) {
      classNames.push('event-day');
    }
    // Return the className as a string
    return {
      className: classNames.join(' '), // Join the classes with a space
    };
  };
  return (
    <div className="">
      <Calendar
        localizer={localizer}
        events={events}
        culture={storeLang.language}
        components={{
          timeGutterHeader: TimeGutterHeader,
          toolbar: customToolbarCallback,
        }}
        defaultView="month"
        onRangeChange={(range) => {
          if (Array.isArray(range)) {
            setFilterRange?.({
              start_date: range[0].toISOString(),
              end_date: range[range.length - 1].toISOString(),
            });
          } else {
            setFilterRange?.({
              start_date: range?.start.toISOString(),
              end_date: range?.end.toISOString(),
            });
          }
        }}
        onSelectSlot={(slotInfo) => {
          onSelectSlot(slotInfo);
        }}
        selectable
        dayPropGetter={dayPropGetter} // Add dayPropGetter to apply custom styles
      />
      <EditDaySlots
        daySlots={daySlots}
        selectedDate={selectedDate}
        getDayLoading={getDayLoading}
        getSlotListing={getSlotListing}
      />
    </div>
  );
};

export default TeacherCalendar;
