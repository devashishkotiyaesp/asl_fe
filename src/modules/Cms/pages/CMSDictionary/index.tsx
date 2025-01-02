// ** Components **
import GlobalSection from 'components/GlobalSection';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import DictionaryBanner from './DictionaryBanner';
import DictionarySignList from './DictionarySignList';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';

// ** Slices **
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Types  **
import { CmsSectionDataProps } from '../HomeCMS/types';

// ** Utils **
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import _ from 'lodash';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { formatCMSObjectData } from '../HomeCMS/helper';
import { DictionaryResponse } from './types';

const CMSDictionary = () => {
  const { language } = useSelector(useLanguage);
  const [responseData, setResponseData] = useState<CmsSectionDataProps>();
  const [dictionaryData, setDictionaryData] = useState<DictionaryResponse>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: {
        sectionName: CMSEnum.Dictionary,
      },
    });
    setIsLoading(apiLoading);
    setResponseData(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, [language]);

  useEffect(() => {
    const dictionaryData = !_.isUndefined(responseData?.dictionary)
      ? formatCMSObjectData({ data: responseData?.dictionary ?? [] })
      : {};
    setDictionaryData(dictionaryData as unknown as DictionaryResponse);
  }, [responseData]);

  return (
    <>
      {isLoading && !responseData ? (
        <Image loaderType="Spin" />
      ) : (
        responseData &&
        dictionaryData && (
          <>
            <DictionaryBanner bannerData={dictionaryData} />
            <DictionarySignList />
            <CMSCTA
              variant="2"
              linkText={dictionaryData?.button_text}
              linkURL={dictionaryData?.button_url ?? ''}
              leftImagePath={dictionaryData?.banner_image}
              title={dictionaryData?.button_title}
              isFormDataBase
            />
            <GlobalSection />
          </>
        )
      )}
    </>
  );
};

export default CMSDictionary;
