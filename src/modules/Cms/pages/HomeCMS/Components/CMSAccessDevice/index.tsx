import Image from 'components/Image';
import _ from 'lodash';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps } from '../../types';
import './index.css';

const CMSAccessDevice = ({ appDownload }: { appDownload?: CmsSectionProps[] }) => {
  const data = !_.isUndefined(appDownload)
    ? formatCMSObjectData({ data: appDownload })
    : {};

  return (
    <section className="access-device">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <span className="small-title">
                {(data?.title as string) ?? 'Access From any Device'}
              </span>
              <h2>{(data?.sub_title as string) ?? 'Access From any Device'}</h2>
              {data?.short_description ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.short_description as string,
                  }}
                />
              ) : (
                <p>
                  Use The ASL Shop to learn American Sign Language (ASL) on your
                  smartphone, tablet or laptop. No matter where you are, your
                  learning progress is constantly being synced across all your
                  devices.
                </p>
              )}
            </div>
            <div className="store-wrap">
              <div className="store-item">
                <Image isFromDataBase={false} src="/images/apple-store.svg" />
              </div>
              <div className="store-item">
                <Image isFromDataBase={false} src="/images/google-play-store.svg" />
              </div>
            </div>
          </div>
          <div className="right-part">
            {data?.banner_image ? (
              <Image src={data?.banner_image as string} />
            ) : (
              <Image src="/images/asl-web-and-mobile.png" isFromDataBase={false} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSAccessDevice;
