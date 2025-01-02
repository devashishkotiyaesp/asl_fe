import Image from 'components/Image';
import _ from 'lodash';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps, pointDataArrayProps } from '../../types';
import './index.css';

const CMSFeatures = ({ userInsight }: { userInsight: CmsSectionProps[] }) => {
  const data = !_.isUndefined(userInsight)
    ? formatCMSObjectData({ data: userInsight })
    : {};
  return (
    <section className="features fill">
      <div className="container">
        <div className="wrapper">
          <div className="section-title">
            <span className="small-title">{data?.title as string}</span>
            <h2>{data?.sub_title as string}</h2>
          </div>
          <div className="features-wrapper">
            {(data?.point_data_array as pointDataArrayProps[])?.map((e, index) => {
              return (
                <div key={index} className="features-item">
                  <div className="features-title">
                    <span className="icon">
                      <Image iconName={e.icon} />
                    </span>
                    <h3>{e.title}</h3>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: e.description }} />
                  <div className="features-image">
                    <Image src={e.banner_image} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSFeatures;
