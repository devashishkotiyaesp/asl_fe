// ** Components **
import Image from 'components/Image';

// ** Types **
import { IconTypes } from 'components/Icon/types';
import { CmsSectionProps } from '../../HomeCMS/types';
import { OrgWorkResponse } from '../types';

// ** Utilities **
import _ from 'lodash';
import { formatCMSObjectData } from '../../HomeCMS/helper';
import './index.css';

const OrgWork = ({ orgWorkData }: { orgWorkData: CmsSectionProps[] }) => {
  const data = !_.isUndefined(orgWorkData)
    ? formatCMSObjectData({ data: orgWorkData })
    : {};

  const { description, eyebrow_title, point_data_array, title } =
    data as unknown as OrgWorkResponse;

  const orgWorkIconArray: IconTypes[] = ['homeIcon', 'university', 'building'];

  return (
    <section className="org-work">
      <div className="container">
        <div className="section-title">
          <span className="small-title">{eyebrow_title}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="org-work-list">
          {point_data_array.map(({ description, title }, index) => (
            <div className="org-work-item" key={`orgWorkItem${index + 1}`}>
              <div className="inner">
                <div className="icon">
                  <Image iconName={orgWorkIconArray[index]} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgWork;
