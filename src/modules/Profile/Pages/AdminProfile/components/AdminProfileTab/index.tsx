import ChangePassword from 'modules/Profile/common/components/ChangePassword';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminProfileSidebar from '../AdminProfileSidebar/AdminProfileSidebar';
import AdminUserProfile from '../UserProfile';

const AdminProfileTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') ?? 'edit';
  const [isSidebar, setSidebar] = useState(initialTab);

  useEffect(() => {
    setSearchParams({ tab: isSidebar });
  }, [isSidebar, setSearchParams]);

  return (
    <div className="sidebar-content">
      <AdminProfileSidebar isSidebar={isSidebar} setSidebar={setSidebar} />
      <AdminUserProfile isSidebar={isSidebar} />
      <ChangePassword isSidebar={isSidebar} />
    </div>
  );
};

export default AdminProfileTab;
