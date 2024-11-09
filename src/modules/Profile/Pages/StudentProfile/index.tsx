import Breadcrumbs from 'components/Breadcrumbs';
import PageHeader from 'components/PageHeader';
import StudentProfileStripe from './components/StudentProfileStripe';
import StudentProfileTab from './components/StudentProfileTab';
import './index.css';

const StudentProfile = () => {
  return (
    <section className="profile-view">
      <div className="container">
        <Breadcrumbs
          items={[
            {
              label: 'Home',
              url: '/home',
            },
            {
              label: 'Profile',
              url: '/profile',
            },
          ]}
          variant="arrow"
        />
        <PageHeader title="Profile" />
        <div className="layout-card">
          <StudentProfileStripe />
          <StudentProfileTab />
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
