import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { ProvidersEnum } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import store from 'reduxStore/store';
import { logout } from 'utils';

interface ProfileSidebarProps {
  isSidebar: string;
  setSidebar: Dispatch<SetStateAction<string>>;
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({ isSidebar, setSidebar }) => {
  const { t } = useTranslation();
  const logOutModal = useModal();
  const userData = useSelector(getCurrentUser);
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
            <Image iconName="notification" />
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

        {userData?.provider_type === ProvidersEnum.EMAIL ? (
          <li
            className={`sidebar-link-item ${isSidebar === 'password' ? 'active' : ''}`}
          >
            <Link to="#!" onClick={() => setSidebar('password')}>
              <Image iconName="key" />
              {t('Profile.Sidebar.ResetPassword')}
            </Link>
          </li>
        ) : (
          <></>
        )}
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
            onClick={() => logOutModal.openModal()}
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
