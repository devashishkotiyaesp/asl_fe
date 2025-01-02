import { REACT_APP_API_URL } from 'config';
import { useAxiosGet } from 'hooks/useAxios';
import Blog from 'modules/Blog';
import EditBlog from 'modules/Blog/Pages/EditBlog';
import CMSEvents from 'modules/CmsAdmin/Events/index';
import PrivacyPolicyAdmin from 'modules/CmsAdmin/PrivacyPolicy';
import EditDictionary from 'modules/Dictionary/pages/EditDictionary';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CMSAboutAdmin from './Aboutus';
import { CMSEnum } from './constants';
import CoursesAdmin from './Courses';
import EventListing from './Events/Components/EventListing';
import CMSGiftCardAdmin from './GiftCard';
import CMSGlobalAdmin from './GlobalSection';
import CMSHomeAdmin from './Home';
import CMSOrganizationAdmin from './Organization';
import CMSReferFriendsAdmin from './ReferFriends';
import './styles/index.css';
import TermsUseAdmin from './TermsOfUse';
import CMSVirtualClassesAdmin from './VirtualClasses';

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
      case CMSEnum.Events:
        return <CMSEvents />;
      case CMSEnum.EventsDetails:
        return <EventListing />;
      case CMSEnum.PrivacyPolicy:
        return <PrivacyPolicyAdmin />;
      case CMSEnum.TermsOfUse:
        return <TermsUseAdmin />;
      case CMSEnum.Courses:
        return <CoursesAdmin />;
      case CMSEnum.GlobalSection:
        return <CMSGlobalAdmin />;
      case CMSEnum.Organizations:
        return <CMSOrganizationAdmin />;
      case CMSEnum.VirtualClass:
        return <CMSVirtualClassesAdmin />;
      case CMSEnum.ReferYourFriends:
        return <CMSReferFriendsAdmin />;
      case CMSEnum.GiftCard:
        return <CMSGiftCardAdmin />;
      case CMSEnum.Blog:
        return <EditBlog />;
      case CMSEnum.BlogDetails:
        return <Blog />;
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
};

export default CMSSections;
