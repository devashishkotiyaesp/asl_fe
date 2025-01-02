import { IconTypes } from 'components/Icon/types';
import Image from 'components/Image';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps, pointDataArrayProps } from '../../types';
import './index.css';

const CMSOurStory = ({ ourStory }: { ourStory: CmsSectionProps[] }) => {
  const data = !_.isUndefined(ourStory)
    ? formatCMSObjectData({ data: ourStory })
    : {};
  const storyIconArray: IconTypes[] = [
    'starRounded',
    'videoRounded',
    'noteBookmark',
  ];
  return (
    <section className="our-story">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="img-wrap">
              <Image src={data?.banner_image as string} />
            </div>
          </div>
          <div className="right-part">
            <div className="section-title">
              <span className="small-title">{data?.eyebrow_title as string}</span>
              <h2>{data?.story_title as string}</h2>
            </div>
            <div className="right-content">
              <p>
                <strong>{data?.banner_title as string}</strong>
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.description as string,
                }}
              />

              <div className="icon-text-list">
                {(data?.point_data_array as pointDataArrayProps[])?.map(
                  (e, index) => (
                    <div
                      className="icon-text-list-item"
                      key={`story_list${index + 1}`}
                    >
                      <span className="icon">
                        <Image iconName={storyIconArray[index]} />
                      </span>
                      <div className="text">
                        <span>{e.title}</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: e.description,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="btn btn-black-border">
                <Link to={data?.button_url as string}>
                  {data?.button_text as string}
                  <Image iconName="arrowRight" iconClassName="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSOurStory;
