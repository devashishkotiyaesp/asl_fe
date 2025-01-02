import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import store from 'reduxStore/store';
import { logout } from 'utils';
import '../index.css';

interface ProfileSidebarProps {
  isSidebar: string;
  setSidebar: (state: string) => void;
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({ isSidebar, setSidebar }) => {
  const { t } = useTranslation();
  const logOutModal = useModal();
  const [getApi] = useAxiosGet();

  const handleLogout = async () => {
    await getApi('auth/login', {
      params: {
        status: 'logout',
      },
    });
  };

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
          className={`sidebar-link-item ${isSidebar === 'availability' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('availability')}>
            <Image iconName="bookMark" />
            {t('Profile.Teacher.Sidebar.Availability')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'subscription' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('subscription')}>
            <Image iconName="noteBook" />
            {t('Profile.Teacher.Sidebar.Courses')}
          </Link>
        </li>
        <li
          className={`sidebar-link-item ${isSidebar === 'notifications' ? 'active' : ''}`}
        >
          <Link to="#!" onClick={() => setSidebar('notifications')}>
            <Image iconName="notification" />
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
            onClick={() => {
              logOutModal.openModal();
              // logout(store)
            }}
            className="sidebar-link"
          >
            <Image iconName="logout" />
            {t(`Profile.Sidebar.Logout`)}
          </span>
        </li>
      </ul>
      <ConfirmationPopup
        showCloseIcon
        modal={logOutModal}
        deleteTitle={t('Profile.Sidebar.Logout')}
        bodyText={t('Event.ConfirmationPopup.LogOutBody')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Continue')}
        cancelButtonFunction={() => logOutModal.closeModal()}
        confirmButtonFunction={async () => {
          await handleLogout();
          await logout(store);
        }}
        popUpType="logout"
      />
    </div>
  );
};

export default ProfileSidebar;
