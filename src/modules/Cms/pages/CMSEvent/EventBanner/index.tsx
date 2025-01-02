// ** Components **
import EventCard from 'components/EventCard';

// ** Tpyes **
import { EventBannerProps } from '../types';

// ** Utils **
import { format } from 'date-fns';

const EventBanner = ({
  eventData,
  setEventCardState,
  eventInfo,
  tag_description,
  tag_title,
  title_tag,
}: EventBannerProps) => {
  return (
    <section className="event-sec">
      <div className="container">
        <div className="section-title">
          <span className="hashtag-label">{title_tag}</span>
          <h1 className="h2">{tag_title}</h1>
          <p dangerouslySetInnerHTML={{ __html: tag_description }} />
        </div>
        <div className="event-list">
          {eventData?.map((e, index) => {
            return (
              <EventCard
                key={index + 1}
                imagePath={e.image_path}
                date={format(new Date(e.date), 'dd')}
                month={format(new Date(e.date), 'MMM')}
                time={`${format(new Date(e.start_time), 'hh:mmaaa')} - ${format(new Date(e.end_time), 'hh:mmaaa')}`}
                title={e.title}
                onClickHandler={() => {
                  setEventCardState(e.id);
                  eventInfo.openModal();
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventBanner;
