// ** Components **
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import { CrewModal } from './crewModal';

// ** Hooks **
import { useModal } from 'hooks/useModal';
import { useState } from 'react';

// ** Types **
import { CmsSectionProps } from '../../HomeCMS/types';
import { AboutCrewProps } from '../types';

// ** Utils **
import './index.css';

const Crew = ({ crew }: { crew: CmsSectionProps[] }) => {
  const CrewProfile = useModal();
  const [selected, setSelected] = useState<string | null>(null);

  const data: AboutCrewProps[] = crew.map((item) => JSON.parse(item.field_value));

  return (
    <section className="crew-sec">
      <div className="container">
        <div className="section-title">
          <span className="small-title">The Crew</span>
          <h2>Decades of Industry Expertise</h2>
        </div>
        <div className="crew-list">
          {data.map((item) => (
            <div className="crew-item">
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
