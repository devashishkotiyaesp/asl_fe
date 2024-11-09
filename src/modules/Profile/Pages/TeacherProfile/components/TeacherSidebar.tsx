import Image from 'components/Image';
import { t } from 'i18next';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import store from 'reduxStore/store';
import { logout } from 'utils';
import '../index.css';

interface ProfileSidebarProps {
  isSidebar: string;
  setSidebar: (state: string) => void;
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({ isSidebar, setSidebar }) => {
  return (
    <div className="sidebar-wrap">
      <ul>
        <li className={`sidebar-link-item ${isSidebar === 'edit' ? 'active' : ''}`}>
          <Link to="#!" onClick={() => setSidebar('edit')}>
            <Image iconName="userEdit" />
            {t('Profile.Teacher.Sidebar.EditProfile')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'journey' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('journey')}>
            <Image iconName="bookMark" />
            {t('Profile.Teacher.Sidebar.Availability')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'subscription' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('subscription')}>
            <Image iconName="dollarSquare" />
            {t('Profile.Teacher.Sidebar.Courses')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'notifications' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('notifications')}>
            <Image iconName="dollarSquare" />
            {t('Profile.Teacher.Sidebar.Notifications')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'preference' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('preference')}>
            <Image iconName="translate" />

            {t('Profile.Teacher.Sidebar.LanguagePreference')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'password' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('password')}>
            <Image iconName="key" />
            {t('Profile.Sidebar.ResetPassword')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'feedback' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('feedback')}>
            <Image iconName="thumb" />
            {t('Profile.Teacher.Sidebar.FeedbackForm')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'support' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('support')}>
            <Image iconName="headPhone" />
            {t('Profile.Teacher.Sidebar.Support')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'logout' ? 'active' : ''}`}
        >
          <span
            role="button"
            tabIndex={0}
            onClick={() => logout(store)}
            className="sidebar-link"
          >
            <Image iconName="logout" />
            {t(`Profile.Sidebar.Logout`)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
