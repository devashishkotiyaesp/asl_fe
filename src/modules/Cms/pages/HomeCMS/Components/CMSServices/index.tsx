import Button from 'components/Button/Button';
import Image from 'components/Image';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps, pointDataArrayProps } from '../../types';
import './index.css';

const CMSServices = ({ services }: { services: CmsSectionProps[] }) => {
  const [serviceData, setServiceData] = useState<number | null>(0);

  const contentRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRef.current = contentRef.current.slice(0, data?.point_data_array?.length);
    if (contentRef.current[0]) {
      const initialHeight = contentRef.current[0].scrollHeight;
      contentRef.current[0].style.maxHeight = `${initialHeight}px`;
    }
  }, []);

  const handleToggle = (index: number | null) => {
    setServiceData(serviceData === index ? null : index);
  };
  const data = !_.isUndefined(services)
    ? formatCMSObjectData({ data: services })
    : {};
  return (
    <section className="services">
      <div className="container">
        <div className="wrapper">
          <div className="section-title">
            <div className="left-content">
              <span className="small-title">{data?.eyebrow_title as string}</span>
              <h2>{data?.service_sub_title as string}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.short_description as string,
                }}
              />
            </div>
            <div className="right-content">
              <div className="btn btn-black-border">
                <Link to={data?.button_url as string}>
                  {data?.button_text as string}
                  <Image iconName="arrowRight" iconClassName="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="left-part">
            <div className="accordion-wrapper">
              {(data?.point_data_array as pointDataArrayProps[])?.map((e, index) => {
                return (
                  <div
                    key={`cmsServices${index + 1}`}
                    className={`accordion-item ${
                      serviceData === index ? 'active' : ''
                    }`}
                  >
                    <Button
                      className="accordion-title"
                      onClickHandler={() => handleToggle(index)}
                    >
                      <h3>
                        <span className="index">{index + 1}. </span>
                        {e.title}
                      </h3>
                    </Button>
                    <div
                      ref={(ele) => (contentRef.current[index] = ele)}
                      className={`accordion-content ${
                        serviceData === index ? 'active' : ''
                      }`}
                      style={{
                        maxHeight:
                          serviceData === index
                            ? `${contentRef.current[index]?.scrollHeight}px`
                            : '0',
                        overflow: 'hidden',
                      }}
                    >
                      <div className="inner">
                        <p dangerouslySetInnerHTML={{ __html: e.description }} />
                        <div className="btn btn-black-border">
                          <Link to={e.button_url ? e.button_url : './'}>
                            {e.button_text}
                            <Image iconName="arrowRight" iconClassName="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right-part">
            <div className="service-img-wrap">
              <Image
                isFromDataBase={false}
                src="/images/girl-hand-gesture-2.png"
                alt=""
              />
              <span className="service-img-speed">
                <Image isFromDataBase={false} src="/images/speed-popup.png" alt="" />
              </span>
              <span className="service-img-small">
                <Image
                  isFromDataBase={false}
                  src="/images/girl-hand-gesture-3.png"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSServices;
