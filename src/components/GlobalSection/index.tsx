// ** Components **
import Image from 'components/Image';
import Footer from 'components/TopBarLayout/Footer/Index';
import CMSAccessDevice from 'modules/Cms/pages/HomeCMS/Components/CMSAccessDevice';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';

// ** Types **
import { CmsSectionDataProps } from 'modules/Cms/pages/HomeCMS/types';

// ** Slices **
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Utils **
import { REACT_APP_API_URL } from 'config';
import { CMSEnum } from 'modules/CmsAdmin/constants';

interface GlobalSectionProps {
  hideFooter?: boolean;
  hideAccessDevice?: boolean;
}

const GlobalSection = ({ hideAccessDevice, hideFooter }: GlobalSectionProps) => {
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.GlobalSection,
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
            {!hideAccessDevice && (
              <CMSAccessDevice appDownload={responseData?.appDownload} />
            )}
            {!hideFooter && (
              <Footer footer={responseData?.footer} ctaTwo={responseData?.ctaTwo} />
            )}
          </>
        )
      )}
    </>
  );
};

export default GlobalSection;
