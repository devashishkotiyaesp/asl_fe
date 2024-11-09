import PageHeader from 'components/PageHeader';
import AdminProfileStripe from './components/AdminProfileStripe';
import AdminProfileTab from './components/AdminProfileTab';
import './index.css';

const AdminProfile = () => {
  return (
    <div>
      <PageHeader title="Profile" />
      <div className="layout-card">
        <AdminProfileStripe />
        <AdminProfileTab />
      </div>
    </div>
  );
};

export default AdminProfile;
