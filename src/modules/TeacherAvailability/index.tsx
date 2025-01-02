import Button from 'components/Button/Button';
import {
  addDays,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subDays,
} from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import 'modules/TeacherAvailability/styles/index.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from './Components/Calendar';
import { EditAvailability } from './Components/EditAvailability';

const TeacherAvailability = () => {
  const modal = useModal();
  const [getEvents, { isLoading: loadingAllAvailabilities }] = useAxiosGet();
  const currentDate = new Date();
  const { t } = useTranslation();
  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);
  const visibleRangeStart = subDays(currentMonthStart, 6);
  const visibleRangeEnd = addDays(currentMonthEnd, 6);
  const [events, setEvents] = useState([] as { start: string; end: string }[]);
  const [filterRange, setFilterRange] = useState<{
    start_date?: string | Date;
    end_date?: string | Date;
  }>({
    start_date: format(visibleRangeStart, "yyyy-MM-dd'T'00:00:00.000'Z'"),
    end_date: format(visibleRangeEnd, "yyyy-MM-dd'T'00:00:00.000'Z'"),
  });

  const fetchEvents = async () => {
    const AllEvents = await getEvents(`/teacher-availabilities`, {
      params: {
        startDate: format(
          parseISO(filterRange.start_date as string),
          "yyyy-MM-dd'T'00:00:00.000'Z'"
        ),
        endDate: format(
          parseISO(filterRange.end_date as string),
          "yyyy-MM-dd'T'00:00:00.000'Z'"
        ),
        allAvailabilities: true,
        view: true,
      },
    });
    const eventData = AllEvents.data?.data?.map(
      (data: { start_time: string; end_time: string; date: string }) => {
        return {
          start: data?.start_time ? parseISO(data?.start_time) : null,
          end: data?.end_time ? parseISO(data?.end_time) : null,
          ...data,
        };
      }
    );
    setEvents(eventData);
  };

  useEffect(() => {
    fetchEvents();
  }, [filterRange]);
  return (
    <>
      <div className="teacher-availability">
        <div className="teacher-availability-btn-card">
          <Button
            className="bg-PrimaryWood text-white p-3"
            onClickHandler={() => modal.openModal()}
          >
            {t('teacherAvailability.manage.title')}
          </Button>
          <span className="text-PrimaryWood text-sm mt-3">
            {t('teacherAvailability.manage.description')}
          </span>
        </div>
        <div className="calendar-main-wrap">
          <label className="calendar-main-title">
            {t('teacherAvailability.manage.selectDate.title')}
          </label>
          <Calendar
            setFilterRange={setFilterRange}
            events={events}
            loadingAllAvailabilities={loadingAllAvailabilities}
          />
        </div>
      </div>
      {modal?.isOpen && <EditAvailability modal={modal} fetchEvents={fetchEvents} />}
    </>
  );
};

export default TeacherAvailability;
