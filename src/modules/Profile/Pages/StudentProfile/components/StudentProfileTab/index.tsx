import ChangePassword from 'modules/Profile/common/components/ChangePassword';
import FeedbackForm from 'modules/Profile/common/components/Feedback';
import Language from 'modules/Profile/common/components/Langauges';
import Notification from 'modules/Profile/common/components/Notification';
import SupportForm from 'modules/Profile/common/components/Support';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ManageStudentJourney from '../ManageStudentJourney';
import ManageStudentSubscription from '../ManageStudentSubscription';
import ProfileSidebar from '../StudentProfileSidebar';
import UserProfile from '../UserProfile';
import './index.css';

const StudentProfileTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') ?? 'edit';
  const [isSidebar, setSidebar] = useState(initialTab);

  useEffect(() => {
    setSearchParams({ tab: isSidebar });
  }, [isSidebar, setSearchParams]);

  const renderSidebarContent = () => {
    switch (isSidebar) {
      case 'edit':
        return <UserProfile setSidebar={setSidebar} />;
      case 'journey':
        return <ManageStudentJourney />;
      case 'subscription':
        return <ManageStudentSubscription />;
      case 'notifications':
        return <Notification />;
      case 'preference':
        return <Language />;
      case 'password':
        return <ChangePassword isSidebar={isSidebar} />;
      case 'feedback':
        return <FeedbackForm />;
      case 'support':
        return <SupportForm />;
      default:
        return '';
    }
  };

  return (
    <div className="sidebar-content">
      <ProfileSidebar isSidebar={isSidebar} setSidebar={setSidebar} />
      {renderSidebarContent()}
    </div>
  );
};

export default StudentProfileTab;
