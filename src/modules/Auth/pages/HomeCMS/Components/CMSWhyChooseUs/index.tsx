import Button from 'components/Button/Button';
import Image from 'components/Image';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCMSObjectData } from '../../helper';
import { CmsSectionProps, pointDataArrayProps } from '../../types';
import './index.css';

const CMSWhyChooseUs = ({ whyChooseUs }: { whyChooseUs: CmsSectionProps[] }) => {
  const [activeToggle, setActiveToggle] = useState<number | null>();
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    contentRef.current = contentRef.current.slice(0, data?.point_data_array?.length);
  }, []);

  const handleToggle = (index: number | null) => {
    setActiveToggle(activeToggle === index ? null : index);
  };
  const data = !_.isUndefined(whyChooseUs)
    ? formatCMSObjectData({ data: whyChooseUs })
    : {};

  return (
    <section className="why-choose">
      <div className="container">
        <div className="section-title">
          <span className="small-title">{data?.eyebrow_title as string}</span>
          <h2>{data?.title as string}</h2>
        </div>
        <div className="wrapper">
          <div className="left-part">
            <div className="accordion-wrapper">
              {(data?.point_data_array as pointDataArrayProps[])?.map((e, index) => {
                return (
                  <div
                    key={index}
                    className={`accordion-item ${
                      activeToggle === index ? 'active' : ''
                    }`}
                  >
                    <div className="accordion-title">
                      <h3>
                        <span className="index">{index + 1}.</span>
                        {e.title}
                      </h3>
                      <Button
                        className={`trigger-btn ${
                          activeToggle === index ? 'active' : ''
                        }`}
                        onClickHandler={() => handleToggle(index)}
                      >
                        {activeToggle === index ? (
                          <Image iconName="minus" />
                        ) : (
                          <Image iconName="plus" />
                        )}
                      </Button>
                    </div>
                    <div
                      className="accordion-content"
                      ref={(el) => (contentRef.current[index] = el)} // Assign ref to each content div
                      style={{
                        maxHeight:
                          activeToggle === index
                            ? `${contentRef.current[index]?.scrollHeight}px`
                            : '0',
                        overflow: 'hidden',
                      }}
                    >
                      <div className="inner">
                        <p>{e.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right-part">
            <div className="inner">
              <span className="color-round blue">
                <Image isFromDataBase={false} src="/images/hand-sign-1.png" />
              </span>
              <span className="color-round yellow">
                <Image isFromDataBase={false} src="/images/hand-sign-2.png" />
              </span>
              <Image src={data?.banner_image as string} />
              <div className="quote-wrap">
                <span className="quote-icon">
                  <Image iconName="quote" isFromDataBase={false} />
                  <span className="line" />
                </span>
                <p>{t('Cms.homepage.whyChoseUs.quoteText')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSWhyChooseUs;
