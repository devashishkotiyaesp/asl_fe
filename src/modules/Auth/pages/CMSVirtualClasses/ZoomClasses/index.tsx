import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useState } from 'react';
import './index.css';

const lessonData = [
  {
    id: 0,
    tabTitle: 'Current Session',
    dataTab: [
      {
        id: 0,
        duration: 'September 9 - October 5',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '1',
            title: 'Level 4 - Zoom',
            days: 'Mondays & Wednesdays: 6 pm PST',
          },
          {
            id: '2',
            title: 'Intermediate 2 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '3',
            title: 'ASL Conversational Practice and details',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '',
      },
      {
        id: 2,
        duration: 'November 18 - December 17',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '1',
            title: 'Level 4 - Zoom',
            days: 'Mondays & Wednesdays: 6 pm PST',
          },
          {
            id: '2',
            title: 'Intermediate 2 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '3',
            title: 'ASL Conversational Practice and details',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '',
      },
      {
        id: 2,
        duration: 'October 14 - November 7',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '1',
            title: 'Level 4 - Zoom',
            days: 'Mondays & Wednesdays: 6 pm PST',
          },
          {
            id: '2',
            title: 'Intermediate 2 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '3',
            title: 'ASL Conversational Practice and details',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '**We will not meet on November 27 and 28**',
      },
    ],
  },
  {
    id: 1,
    tabTitle: 'Upcoming Session',
    dataTab: [
      {
        id: 0,
        duration: 'September 9 - October 5',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '',
      },
      {
        id: 2,
        duration: 'November 18 - December 17',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '1',
            title: 'Level 4 - Zoom',
            days: 'Mondays & Wednesdays: 6 pm PST',
          },
        ],
        note: '',
      },
      {
        id: 2,
        duration: 'October 14 - November 7',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '1',
            title: 'Level 4 - Zoom',
            days: 'Mondays & Wednesdays: 6 pm PST',
          },
          {
            id: '2',
            title: 'Intermediate 2 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '',
      },
    ],
  },
  {
    id: 2,
    tabTitle: '2024/2025 Schedule',
    dataTab: [
      {
        id: 0,
        duration: 'September 9 - October 5',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '1',
            title: 'Level 4 - Zoom',
            days: 'Mondays & Wednesdays: 6 pm PST',
          },
          {
            id: '2',
            title: 'Intermediate 2 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '3',
            title: 'ASL Conversational Practice and details',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '',
      },
      {
        id: 2,
        duration: 'November 18 - December 17',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
          {
            id: '1',
            title: 'Level 4 - Zoom',
            days: 'Mondays & Wednesdays: 6 pm PST',
          },
          {
            id: '2',
            title: 'Intermediate 2 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '',
      },
      {
        id: 2,
        duration: 'October 14 - November 7',
        lessonList: [
          {
            id: '0',
            title: 'Level 1 - Zoom',
            days: 'Tuesdays & Thursdays: 4:30 pm PST',
          },
        ],
        note: '**We will not meet on November 27 and 28**',
      },
    ],
  },
];

const ZoomClasses = () => {
  const [tabSelect, setTabSelect] = useState<HTMLElement | number>(0);

  const tabHandler = (index: any) => {
    setTabSelect(index);
  };

  return (
    <section className="zoom-classes">
      <div className="container">
        <div className="wrapper">
          <div className="section-title">
            <span className="hashtag-label">#Group Session</span>
            <h2>Zoom Classes</h2>
            <p>
              Virtual Classes: Learn from anywhere, anytime with live, interactive
              sessions.
            </p>
          </div>
          <div className="tab-wrapper">
            <div className="tab-list">
              <ul>
                {lessonData.map((e, index) => {
                  return (
                    <>
                      <li key={index}>
                        <Button
                          onClickHandler={() => tabHandler(index)}
                          variants={`${tabSelect === index ? 'black' : 'blackBorder'}`}
                        >
                          {e.tabTitle}
                        </Button>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
            <div className="tab-content">
              {lessonData.map((e, index) => {
                return (
                  <>
                    {tabSelect === index && (
                      <div
                        key={index}
                        className={`tab-content-item ${tabSelect === index ? 'active' : ''}`}
                      >
                        <div className=" inner">
                          {e.dataTab.map((el, elindex) => {
                            return (
                              <>
                                <div className="lesson-column" key={elindex}>
                                  <p className="lesson-column-duration">
                                    {el.duration}
                                  </p>
                                  <div className="lesson-list">
                                    {el.lessonList.map((list, listindex) => {
                                      return (
                                        <>
                                          <div
                                            className="lesson-list__item"
                                            key={listindex}
                                          >
                                            <p className="title">{list.title}</p>
                                            <p className="days">
                                              <Image
                                                iconName="clock"
                                                iconClassName="w-5 h-5"
                                              />
                                              <span>{list.days}</span>
                                            </p>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                  {el.note && (
                                    <div className="lesson-note">
                                      <p>{el.note}</p>
                                    </div>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZoomClasses;
