import Image from 'components/Image';
import { t } from 'i18next';
import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import store from 'reduxStore/store';
import { logout } from 'utils';
import '../StudentProfileTab/index.css';

interface ProfileSidebarProps {
  isSidebar: string;
  setSidebar: Dispatch<SetStateAction<string>>;
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({ isSidebar, setSidebar }) => {
  return (
    <div className="sidebar-wrap">
      <ul>
        <li className={`sidebar-link-item ${isSidebar === 'edit' ? 'active' : ''}`}>
          <Link to="#!" onClick={() => setSidebar('edit')}>
            <Image iconName="userEdit" />
            {t('Profile.Student.Sidebar.EditProfile')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'journey' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('journey')}>
            <Image iconName="bookMark" />
            {t('Profile.Student.Sidebar.YourJourney')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'subscription' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('subscription')}>
            <Image iconName="dollarSquare" />
            {t('Profile.Student.Sidebar.ManageSubscription')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'notifications' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('notifications')}>
            <Image iconName="dollarSquare" />
            {t('Profile.Student.Sidebar.Notifications')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'preference' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('preference')}>
            <Image iconName="translate" />
            {t('Profile.Student.Sidebar.LanguagePreference')}
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
            {t('Profile.Student.Sidebar.FeedbackForm')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'support' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('support')}>
            <Image iconName="headPhone" />
            {t('Profile.Student.Sidebar.Support')}
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
