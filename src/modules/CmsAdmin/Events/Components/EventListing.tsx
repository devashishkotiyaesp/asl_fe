// ** Libraries **
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ** Hooks **
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';

// ** Utility Functions **
import { getDateInDateMonthYear, getTimeInHoursMinutes } from 'utils/date';

// ** Components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';

// ** Constants **

// ** Types **
import { CellProps } from 'components/Table/types';
import { EventDataTypes, IEventItem } from '../types';

const EventListing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ** Redux **
  const { language } = useSelector(useLanguage);
  const { currentPage } = useSelector(currentPageSelector);

  // ** useState **
  const [eventData, setEventData] = useState<EventDataTypes>();
  const [sort, setSort] = useState<string>('-updated_at');
  const [limit, setLimit] = useState<number>(10);
  const [selectedEvent, setSelectedEvent] = useState<IEventItem>();

  // ** Hooks **
  const deleteEvent = useModal();
  const [getEvents, { isLoading }] = useAxiosGet();
  const [deleteEventApi, { isLoading: deleteLoader }] = useAxiosDelete();

  // ** useEffects **
  useEffect(() => {
    fetchEventList();
  }, [language, sort, limit, currentPage]);

  const fetchEventList = async () => {
    const data = await getEvents(`/events`, {
      params: {
        sort,
        limit,
        page: currentPage,
      },
    });
    setEventData(data?.data);
  };

  const handleDelete = async (slug: string | undefined) => {
    const { error } = await deleteEventApi(`/events/${slug}`);
    if (!error) fetchEventList();
  };

  const columnData = [
    {
      header: 'No',
      name: 'no',
      option: { hasFilter: false, isIndex: true },
    },
    {
      header: t('Event.Table.EventTitle'),
      name: 'image_path',
      cell: (props: CellProps) => eventImageRender(props as unknown as IEventItem),
      option: { sort: false, hasFilter: false },
    },
    {
      name: 'title',
      option: { sort: true, hasFilter: false },
    },
    {
      name: 'date',
      header: t('Event.Table.EventDate'),
      cell: (props: CellProps) => eventDateRender(props as unknown as IEventItem),
      option: { sort: true, hasFilter: false },
    },
    {
      header: t('Event.Table.EventTime'),
      cell: (props: CellProps) => eventTimeRender(props as unknown as IEventItem),
    },
    {
      header: t('Community.Table.Action'),
      cell: (props: CellProps) => actionRender(props as unknown as IEventItem),
    },
  ];

  const actionRender = (data: IEventItem) => (
    <div className="flex flex-wrap gap-4">
      <Button
        className="action-button green"
        onClickHandler={() => navigate(`/edit-event/${data?.slug}`)}
      >
        <Image iconName="editPen" />
      </Button>
      <Button
        className="action-button red"
        onClickHandler={() => {
          deleteEvent.openModal();
          setSelectedEvent(data);
        }}
      >
        <Image iconName="trashIcon" />
      </Button>
    </div>
  );

  const eventDateRender = ({ date }: IEventItem) => (
    <div>{getDateInDateMonthYear(date)}</div>
  );

  const eventTimeRender = ({ start_time, end_time }: IEventItem) => (
    <div>
      {getTimeInHoursMinutes(start_time)} - {getTimeInHoursMinutes(end_time)}
    </div>
  );

  const eventImageRender = (item: { image_path: string }) => (
    <div className="w-[50px] h-[50px] ">
      <Image
        src={item?.image_path}
        imgClassName="w-full h-full object-cover rounded-lg"
        serverPath
      />
    </div>
  );

  return isLoading ? (
    <Image loaderType="Spin" />
  ) : (
    <div className="relative p-10">
      <div className="flex w-full">
        <h1 className="text-xl font-bold">{t('Events.PageHeader.Title')}</h1>
        <Button
          className="bg-LightWood p-3 absolute right-12"
          onClickHandler={() => navigate('/create-event')}
        >
          + Add Event
        </Button>
      </div>

      <div className="mt-12">
        <Table
          headerData={columnData}
          loader={isLoading}
          bodyData={eventData?.data}
          pagination
          totalPage={eventData?.lastPage}
          dataCount={eventData?.count}
          dataPerPage={limit}
          setSort={setSort}
          sort={sort}
          setLimit={setLimit}
        />
        <ConfirmationPopup
          showCloseIcon
          modal={deleteEvent}
          isLoading={deleteLoader}
          deleteTitle={t('Event.ConfirmationPopup.DeleteTitle')}
          bodyText={t('Event.ConfirmationPopup.DeleteBody', {
            eventName: selectedEvent?.title,
          })}
          cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
          confirmButtonText={t('Community.ConfirmationPopup.Delete')}
          cancelButtonFunction={() => deleteEvent.closeModal()}
          confirmButtonFunction={() => {
            handleDelete(selectedEvent?.slug);
            deleteEvent.closeModal();
          }}
          popUpType="danger"
        />
      </div>
    </div>
  );
};

export default EventListing;
