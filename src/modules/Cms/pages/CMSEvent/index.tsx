// ** Components **
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import EventBanner from './EventBanner';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ** Redux Slices **
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Constans **
import { CMSEnum } from 'modules/CmsAdmin/constants';

// **  Types **
import { formatCMSObjectData } from '../HomeCMS/helper';
import { CmsSectionDataProps } from '../HomeCMS/types';
import { EventBannerResponse, EventListResponse } from './types';

// ** Utils **
import { REACT_APP_API_URL } from 'config';
import { format } from 'date-fns';
import _ from 'lodash';
import './index.css';

const CMSEvent = () => {
  // ** Translation and Redux State **
  const { t } = useTranslation();
  const { language } = useSelector(useLanguage);

  // ** Modal   **
  const eventInfo = useModal();

  // ** State **
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [eventList, setEventList] = useState<EventListResponse[]>();
  const [EventCardState, setEventCardState] = useState<string | null>(null);
  const [eventBanner, setEventBanner] = useState<EventBannerResponse>();

  // ** Axios Hooks and State **
  const [getEvents] = useAxiosGet();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const [isLoading, setIsLoading] = useState<boolean>();

  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.Events,
      },
    });
    setIsLoading(apiLoading);
    setResponseData(data?.data);
    const eventList = await getEvents(`${REACT_APP_API_URL}/events`, {
      params: {
        view: true,
      },
    });
    setEventList(eventList?.data?.data);
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  const data = !_.isUndefined(responseData?.cmsEvent)
    ? formatCMSObjectData({ data: responseData?.cmsEvent ?? [] })
    : {};

  useEffect(() => {
    setEventBanner(data as unknown as EventBannerResponse);
  }, [responseData?.cmsEvent]);

  return (
    <>
      {isLoading && !responseData?.data ? (
        <Image loaderType="Spin" />
      ) : (
        responseData &&
        eventList && (
          <>
            <EventBanner
              eventData={eventList ?? []}
              eventInfo={eventInfo}
              setEventCardState={setEventCardState}
              tag_description={eventBanner?.description ?? ''}
              tag_title={eventBanner?.title_event ?? ''}
              title_tag={eventBanner?.hashTag ?? ''}
            />

            <CMSCTA
              variant="2"
              linkText={eventBanner?.button_text}
              leftImagePath={eventBanner?.banner_image}
              title={eventBanner?.button_title}
              isFormDataBase
            />
            {eventList?.map((e, index) => (
              <>
                {EventCardState === e.id ? (
                  <Modal
                    cancelClick={() => setEventCardState(null)}
                    key={index + 1}
                    modal={eventInfo}
                    headerTitle="Event Details"
                    modalClassName="event-modal"
                  >
                    <>
                      <div className="event-modal-img">
                        <Image isFromDataBase src={e.image_path} />
                        <div className="date">
                          <span>{format(new Date(e.date), 'dd')}</span>
                          <span>{format(new Date(e.date), 'MMM')}</span>
                        </div>
                        <div className="event-modal-img-content">
                          <h3>{e.title}</h3>
                          <div className="event-time">
                            <Image iconName="clock" />
                            <span className="time-stamp">{`${format(new Date(e.start_time), 'hh:mmaaa')} - ${format(new Date(e.end_time), 'hh:mmaaa')}`}</span>
                          </div>
                        </div>
                      </div>
                      <div className="event-modal-content">
                        <span className="event-modal-content__title">
                          {t('Events.EventModal.Description')}
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: e.description }} />
                        <span className="event-modal-content__title">
                          {t('Events.EventModal.location')}
                        </span>
                        <div className="event-location">
                          <span className="text">{e.location}</span>
                          <Link to="#!" className="icon">
                            <Image iconName="direction" />
                          </Link>
                        </div>
                      </div>
                    </>
                  </Modal>
                ) : (
                  ''
                )}
              </>
            ))}
            <GlobalSection />
          </>
        )
      )}
    </>
  );
};

export default CMSEvent;
