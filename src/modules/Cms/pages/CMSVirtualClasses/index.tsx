import GlobalSection from 'components/GlobalSection';
import Image from 'components/Image';
import { REACT_APP_API_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import { CMSEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import CMSCTA from '../HomeCMS/Components/CMSCTA';
import { CmsSectionProps } from '../HomeCMS/types';
import { virtualClass } from './constant';
import { VirtualClassesDataInterface } from './types';
import VirtualCourses from './VirtualCourses';
import ZoomClasses from './ZoomClasses';

const index = () => {
  const [getApi, { isLoading: isFetchLoading }] = useAxiosGet();
  const [cmsSection, setCmsSection] = useState<VirtualClassesDataInterface>();
  const { language } = useSelector(useLanguage);
  const dataFetch = async () => {
    const response = await getApi(`${REACT_APP_API_URL}/cms-page-section`, {
      params: { sectionName: CMSEnum.VirtualClass, view: true },
    });
    response.data?.virtualClass?.forEach((data: CmsSectionProps) => {
      const key: keyof VirtualClassesDataInterface =
        data?.field_name as keyof VirtualClassesDataInterface;
      if (data?.field_name) {
        virtualClass[key] = data?.field_value;
      }
    });

    setCmsSection(virtualClass);
  };
  useEffect(() => {
    dataFetch();
  }, [language]);
  return (
    <>
      {isFetchLoading && !cmsSection ? (
        <Image loaderType="Spin" />
      ) : (
        <>
          <ZoomClasses data={cmsSection as VirtualClassesDataInterface} />
          <VirtualCourses data={cmsSection as VirtualClassesDataInterface} />
          <CMSCTA
            variant="2"
            linkText={cmsSection?.button_text}
            leftImagePath={cmsSection?.banner_image}
            title={cmsSection?.cta_description}
          />
          <GlobalSection />
        </>
      )}
    </>
  );
};

export default index;
