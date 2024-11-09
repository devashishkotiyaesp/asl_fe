import ChangePassword from 'modules/Profile/common/components/ChangePassword';
import { useState } from 'react';
import AdminProfileSidebar from '../AdminProfileSidebar/AdminProfileSidebar';
import AdminUserProfile from '../UserProfile';

const AdminProfileTab = () => {
  const [isSidebar, setSidebar] = useState('edit');
  return (
    <div className="sidebar-content">
      <AdminProfileSidebar isSidebar={isSidebar} setSidebar={setSidebar} />
      <AdminUserProfile isSidebar={isSidebar} />
      <ChangePassword isSidebar={isSidebar} />
    </div>
  );
};

export default AdminProfileTab;
