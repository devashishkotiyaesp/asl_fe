import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import CMSCollabeSlider from './Components/CMSCollabeSlider';
import CMSCourse from './Components/CMSCourse';
import CMSCTA from './Components/CMSCTA';
import CMSFeatures from './Components/CMSFeatures';
import CMSHomeBanner from './Components/CMSHome_Banner';
import CMSOurStory from './Components/CMSOurStory';
import CMSServices from './Components/CMSServices';
import CMSWhyChooseUs from './Components/CMSWhyChooseUs';
import Testimonial from './Components/Testimonials';
import { CmsSectionDataProps } from './types';

const CMSHome = () => {
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.HomePage,
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
            <CMSHomeBanner key="banner" bannerData={responseData?.banner} />
            <CMSCollabeSlider bannerData={responseData?.banner} />
            <CMSOurStory key="ourStory" ourStory={responseData?.ourStory} />
            <CMSWhyChooseUs whyChooseUs={responseData?.whyChooseUs} />
            <CMSCTA
              ctaOne={responseData?.[`cta-one`]}
              rightImagePath="true"
              isFormDataBase
              isSpanish={language === 'es'}
            />
            <CMSServices services={responseData?.services} />
            <CMSFeatures userInsight={responseData?.userInsight} />
            <CMSCourse courses={responseData?.aslCourses} />
            <Testimonial testimonials={responseData?.testimonials} />
            <GlobalSection />
          </>
        )
      )}
    </>
  );
};

export default CMSHome;
