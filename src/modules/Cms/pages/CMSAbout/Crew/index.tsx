// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import { CrewModal } from './crewModal';

// ** Hooks **

// ** Types **
import { CmsSectionProps } from '../../HomeCMS/types';

// ** Utils **
import { useModal } from 'hooks/useModal';
import _ from 'lodash';
import { useState } from 'react';
import { formatCMSObjectData } from '../../HomeCMS/helper';
import './index.css';

interface PointDataProps {
  banner_image: string;
  username: string;
  description: string;
  designation: string;
  fun_tidbits: string;
  banner_video: string;
  uniqueId: 1;
}
const Crew = ({ crew }: { crew: CmsSectionProps[] }) => {
  const data = !_.isUndefined(crew) ? formatCMSObjectData({ data: crew }) : {};
  const CrewProfile = useModal();
  const [selected, setSelected] = useState<string | null>(null);
  const point_data_array: PointDataProps[] = [];
  crew?.forEach((item) => {
    if (item.field_name === 'crew_members') {
      const fieldValue = JSON.parse(item.field_value);
      point_data_array.push(fieldValue);
    }
  });
  return (
    <section className="crew-sec">
      <div className="container">
        <div className="section-title">
          <span className="small-title">{data.eyebrow_title as string}</span>
          <h2>{data.title as string}</h2>
        </div>
        <div className="crew-list">
          {point_data_array?.map((item, index) => (
            <div className="crew-item" key={`Cms_About_crew_${index + 1}`}>
              <div className="crew-img">
                <Image src={item.banner_image} isFromDataBase />
                <Link
                  to="#!"
                  className="more-info"
                  onClick={() => {
                    setSelected(item.username);
                    CrewProfile.openModalWithData?.(item);
                  }}
                >
                  <Image iconName="plus" />
                </Link>
                {selected === item?.username ? (
                  <CrewModal
                    item={item}
                    modal={CrewProfile}
                    setSelected={setSelected}
                  />
                ) : (
                  ''
                )}
              </div>
              <h3>{item.username}</h3>
              <p>{item.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Crew;
