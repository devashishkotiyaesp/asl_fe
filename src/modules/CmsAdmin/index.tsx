import { REACT_APP_API_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import PrivacyPolicyAdmin from 'modules/CmsAdmin/PrivacyPolicy';
import EditDictionary from 'modules/Dictionary/Pages/EditDictionary';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CMSAboutAdmin from './Aboutus';
import { CMSEnum } from './constants';
import CoursesAdmin from './Courses';
import CMSGlobalAdmin from './GlobalSection';
import CMSHomeAdmin from './Home';
import './styles/index.css';
import TermsUseAdmin from './TermsOfUse';

export interface CMSPageProps {
  page_name: string;
}

const CMSSections = () => {
  const [getApi] = useAxiosGet();
  const [cmsSection, setCmsSection] = useState<CMSPageProps>();
  const { id } = useParams();

  const dataFetch = async () => {
    const response = await getApi(`${REACT_APP_API_URL}/cms-pages/${id}`);
    setCmsSection(response?.data);
  };

  useEffect(() => {
    if (id) {
      dataFetch();
    }
  }, [id]);

  const renderComponent = () => {
    switch (cmsSection?.page_name) {
      case CMSEnum.AboutUs:
        return <CMSAboutAdmin />;
      case CMSEnum.HomePage:
        return <CMSHomeAdmin />;
      case CMSEnum.Dictionary:
        return <EditDictionary />;
      case CMSEnum.PrivacyPolicy:
        return <PrivacyPolicyAdmin />;
      case CMSEnum.TermsOfUse:
        return <TermsUseAdmin />;
      case CMSEnum.Courses:
        return <CoursesAdmin />;
      case CMSEnum.GlobalSection:
        return <CMSGlobalAdmin />;
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
};

export default CMSSections;
