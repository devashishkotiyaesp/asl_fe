import EventCard from 'components/EventCard';
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { useModal } from 'hooks/useModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import './index.css';

const eventData = [
  {
    id: 1,
    linkText: 'Explore Details',
    date: '26',
    imagePath: './images/course-card-2.png',
    month: 'aug',
    time: '10:00am - 04:00pm',
    title: 'Five Deaf Celebrities Who Will Inspire You to Learn ASL',
    description:
      'Hadel was born and raised in Iraq and currently lives in Los Angeles, California. She graduated from California State University, Northridge (CSUN) with a Bachelor of Arts in Deaf Studies and a concentration in ASL Literature. In addition, she holds a Master of Arts in Sign Language Education from Gallaudet University. Hadel has taught ASL in various local settings such as Harper College, Gallaudet University, non-profit organizations (GLAD), and Fairmont Private Schools. Growing up, her desire was always to become a teacher, a dream which has come to fruition! Having the opportunity to teach, support and encourage hearing students to immerse themselves into learning about Deaf culture, community and history is a passion for her.',
    location: '603 N Western Ave, Los Angeles, CA 90004',
  },
  {
    id: 2,
    linkText: 'Explore Details',
    date: '26',
    imagePath: './images/blog-2.png',
    month: 'aug',
    time: '10:00am - 04:00pm',
    title: 'Five Deaf Celebrities Who Will Inspire You to Learn ASL',
    description:
      'Hadel was born and raised in Iraq and currently lives in Los Angeles, California. She graduated from California State University, Northridge (CSUN) with a Bachelor of Arts in Deaf Studies and a concentration in ASL Literature. In addition, she holds a Master of Arts in Sign Language Education from Gallaudet University. Hadel has taught ASL in various local settings such as Harper College, Gallaudet University, non-profit organizations (GLAD), and Fairmont Private Schools. Growing up, her desire was always to become a teacher, a dream which has come to fruition! Having the opportunity to teach, support and encourage hearing students to immerse themselves into learning about Deaf culture, community and history is a passion for her.',
  },
  {
    id: 3,
    linkText: 'Explore Details',
    date: '26',
    imagePath: './images/girl-hand-gesture-2.png',
    month: 'aug',
    time: '10:00am - 04:00pm',
    title: 'Five Deaf Celebrities Who Will Inspire You to Learn ASL',
    location: '603 N Western Ave, Los Angeles, CA 90004',
    description:
      'Hadel was born and raised in Iraq and currently lives in Los Angeles, California. She graduated from California State University, Northridge (CSUN) with a Bachelor of Arts in Deaf Studies and a concentration in ASL Literature. In addition, she holds a Master of Arts in Sign Language Education from Gallaudet University. Hadel has taught ASL in various local settings such as Harper College, Gallaudet University, non-profit organizations (GLAD), and Fairmont Private Schools. Growing up, her desire was always to become a teacher, a dream which has come to fruition! Having the opportunity to teach, support and encourage hearing students to immerse themselves into learning about Deaf culture, community and history is a passion for her.',
  },
];

const CMSEvent = () => {
  const eventInfo = useModal();

  const [EventCardState, setEventCardState] = useState<number | null>(null);

  return (
    <>
      <section className="event-sec">
        <div className="container">
          <div className="section-title">
            <span className="hashtag-label">#Events</span>
            <h1 className="h2">Hang Out With Us!</h1>
            <p>
              Join us for a fun and interactive ASL hangout! Connect, practice, and
              learn in a relaxed, supportive environment.
            </p>
          </div>
          <div className="event-list">
            {eventData?.map((e, index) => {
              return (
                <>
                  <EventCard
                    key={index + 1}
                    linkText={e.linkText}
                    date={e.date}
                    imagePath={e.imagePath}
                    month={e.month}
                    time={e.time}
                    title={e.title}
                    onClickHandler={() => {
                      setEventCardState(e.id);
                      eventInfo.openModal();
                    }}
                  />
                </>
              );
            })}
          </div>
        </div>
      </section>
      <CMSCTA
        variant="2"
        linkText="Sign me up!"
        leftImagePath="/images/three-girl-hand-gesture.png"
        title="When you enroll, you will have access to lecture videos, skills practice videos, quizzes, assignments, and our exclusive platform, The Lobby!"
      />
      {eventData?.map((e, index) => {
        return (
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
                    <Image isFromDataBase={false} src={e.imagePath} />
                    <div className="date">
                      <span>{e.date}</span>
                      <span>{e.month}</span>
                    </div>
                    <div className="event-modal-img-content">
                      <h3>{e.title}</h3>
                      <div className="event-time">
                        <Image iconName="clock" />
                        <span className="time-stamp">{e.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="event-modal-content">
                    <span className="event-modal-content__title">Description</span>
                    <p>{e.description}</p>
                    <span className="event-modal-content__title">
                      Event Location
                    </span>
                    <div className="event-location">
                      <span className="text">
                        603 N Western Ave, Los Angeles, CA 90004
                      </span>
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
        );
      })}
      <GlobalSection />
    </>
  );
};

export default CMSEvent;
