// ** Components **
import Image from 'components/Image';
import SimpleCTA from 'components/SimpleCTA';
import AboutBanner from './AboutBanner';
import AboutBlogList from './AboutBlogList';
import Crew from './Crew';
import Journey from './Journey';
import OurVision from './OurVision';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Types **
import { CmsSectionDataProps } from '../HomeCMS/types';

// ** Utils **
import GlobalSection from 'components/GlobalSection';
import { REACT_APP_API_URL } from 'config';
import { CMSEnum } from 'modules/CmsAdmin/constants';

const CMSAbout = () => {
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.AboutUs,
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
            <AboutBanner aboutStory={responseData?.aboutStory} />
            <OurVision ourVision={responseData?.ourVision} />
            <AboutBanner aboutUser={responseData?.aboutUsers} isOwnerSection />
            <Crew crew={responseData?.crew} />
            <Journey ourJourney={responseData?.ourJourney} />
            <AboutBlogList localStories={responseData?.localStories} />
            <SimpleCTA aboutCta={responseData?.aboutCta} />
            <GlobalSection />
          </>
        )
      )}
    </>
  );
};

export default CMSAbout;
