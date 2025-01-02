// ** Components **
import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import Testimonial from '../HomeCMS/Components/Testimonials';
import BenefitsCollab from './BenefitsCollab';
import CTAStipre from './CTAStripe';
import OrgBanner from './OrgBanner';
import OrgWork from './OrgWork';

// ** Configuration **
import { REACT_APP_API_URL } from 'config';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Constants **
import { CMSEnum } from 'modules/CmsAdmin/constants';

// **  Types **
import { CmsSectionDataProps } from '../HomeCMS/types';

const CMSOrg = () => {
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.Organizations,
      },
    });
    setIsLoading(apiLoading);
    setResponseData(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, [language]);
  return (
    <>
      {isLoading && !responseData?.data ? (
        <Image loaderType="Spin" />
      ) : (
        responseData && (
          <>
            <OrgBanner orgBannerData={responseData.orgCollaborating} />
            <OrgWork orgWorkData={responseData.orgWork} />
            <CTAStipre ctaOne={responseData.orgCta1} />
            <BenefitsCollab orgBenefits={responseData.orgBenefits} />
            <Testimonial
              transparentBG
              companyCard
              testimonials={responseData.orgTestimonials}
              testimonialKey="testimonial_add"
            />
            <CMSCTA
              className="remove-negative-margin"
              ctaOne={responseData?.orgCta2}
              isFormDataBase
            />
            <GlobalSection />
          </>
        )
      )}
    </>
  );
};

export default CMSOrg;
