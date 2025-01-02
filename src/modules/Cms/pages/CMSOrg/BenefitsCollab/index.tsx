// ** Libraries **
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// ** Components **
import Image from 'components/Image';

// ** CSS Imports **
import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';

// ** Helper Functions **
import { formatCMSObjectData } from '../../HomeCMS/helper';

// ** Types **
import { CmsSectionProps } from '../../HomeCMS/types';
import { OrgBenefitResponse, PointData } from '../types';

const BenefitsCollab = ({ orgBenefits }: { orgBenefits: CmsSectionProps[] }) => {
  const data = !_.isUndefined(orgBenefits)
    ? formatCMSObjectData({ data: orgBenefits })
    : {};

  const arrayData: PointData[] = [];
  orgBenefits?.forEach((item) => {
    if (item.field_name === 'benefit_add') {
      const fieldValue = JSON.parse(item.field_value);
      arrayData.push(fieldValue);
    }
  });
  data.benefitList = arrayData;

  const { banner_title, description, eyebrow_title, benefitList } =
    data as unknown as OrgBenefitResponse;

  return (
    <section className="benefites-collab">
      <div className="container">
        <div className="section-title">
          <span className="small-title">{eyebrow_title}</span>
          <h2>{banner_title}</h2>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="benefites-collab-slider">
          <Swiper
            pagination
            speed={800}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {benefitList.map((item, index) => (
              <SwiperSlide key={`Organization_benefit_swipper_item${index + 1}`}>
                <div className="wrapper">
                  <div className="left-part">
                    <h3>{item.benefit_title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                    <div className="btn btn-black-border">
                      <Link to={item.button_url ?? ''}>
                        {item.button_text}
                        <Image iconName="arrowRight" />
                      </Link>
                    </div>
                  </div>
                  <div className="right-part">
                    <Image src={item.banner_image} isFromDataBase />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BenefitsCollab;
