import Breadcrumbs from 'components/Breadcrumbs';
import PageHeader from 'components/PageHeader';
import TeacherProfileStripe from './components/TeacherProfileStripe';
import TeacherProfileTab from './components/TeacherProfileTab';
import './index.css';

const TeacherProfile = () => {
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
          <TeacherProfileStripe />
          <TeacherProfileTab />
        </div>
      </div>
    </section>
  );
};

export default TeacherProfile;
