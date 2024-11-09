import { useState } from 'react';
import ManageStudentFeedback from '../components/StudentProfileSidebar/ManageStudentFeedback';
import ManageStudentJourney from '../components/StudentProfileSidebar/ManageStudentJourney';
import ManageStudentLanguage from '../components/StudentProfileSidebar/ManageStudentLanguage';
import ManageStudentNotification from '../components/StudentProfileSidebar/ManageStudentNotification';
import ManageStudentProfile from '../components/StudentProfileSidebar/ManageStudentProfile';
import ManageStudentResetPassword from '../components/StudentProfileSidebar/ManageStudentResetPassword';
import ManageStudentSubscription from '../components/StudentProfileSidebar/ManageStudentSubscription';
import ManageStudentSupport from '../components/StudentProfileSidebar/ManageStudentSupport';
import ProfileSidebar from '../components/StudentProfileSidebar/StudentProfileSidebar';
import './index.css';

const StudentProfileTab = () => {
  // const { t } = useTranslation();
  // const SelectModal = useModal();

  const [isSidebar, setSidebar] = useState<string>('edit');

  const renderSidebarContent = () => {
    switch (isSidebar) {
      case 'edit':
        return <ManageStudentProfile SetActiveSidebar={setSidebar} />;
      case 'journey':
        return <ManageStudentJourney />;
      case 'subscription':
        return <ManageStudentSubscription />;
      case 'notifications':
        return <ManageStudentNotification />;
      case 'preference':
        return <ManageStudentLanguage />;
      case 'password':
        return <ManageStudentResetPassword />;
      case 'feedback':
        return <ManageStudentFeedback />;
      case 'support':
        return <ManageStudentSupport />;
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
