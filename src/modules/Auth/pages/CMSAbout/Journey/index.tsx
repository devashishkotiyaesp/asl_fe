// *8 Components **

// ** Hooks **

// ** Types **
import { useState } from 'react';
import { CmsSectionProps } from '../../HomeCMS/types';
import { JourneyProps } from '../types';

// ** Utils **
import Image from 'components/Image';
import './index.css';

interface JourneyData {
  timeLineData: JourneyProps[];
  title: string;
}

const Journey = ({ ourJourney }: { ourJourney: CmsSectionProps[] }) => {
  const journeyData: JourneyData = {
    timeLineData: [],
    title: '',
  };

  ourJourney.forEach((item) => {
    if (item.field_name === 'journey_years') {
      const fieldValue = JSON.parse(item.field_value) as JourneyProps;
      journeyData.timeLineData.push(fieldValue);
    } else if (item.field_name === 'eyebrow_title') {
      journeyData.title = item.field_value;
    }
  });

  const [currentData, setCurrentData] = useState<JourneyProps>(
    journeyData.timeLineData[0]
  );

  return (
    <section className="journey-sec">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <label htmlFor="" className="small-title">
                {journeyData.title}
              </label>
              <h2>{currentData?.banner_title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: String(currentData?.description),
                }}
              />
            </div>
          </div>
          <div className="right-part">
            <div className="img-part">
              <Image src={currentData?.banner_image} isFromDataBase />
            </div>
          </div>
        </div>

        <div className="journey-path">
          {journeyData.timeLineData.map((item) => (
            <div
              className={`journey-path-item ${item.year === currentData.year ? 'active' : ''}`}
              onClick={() => setCurrentData(() => item)}
            >
              <Image
                imgClassName="logo-rounded "
                src="/images/logo-round.png"
                isFromDataBase={false}
              />
              <span className="journey-path-circle" />
              <span>{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
