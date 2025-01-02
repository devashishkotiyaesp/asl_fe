import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useTranslation } from 'react-i18next';
import store from 'reduxStore/store';
import { logout } from 'utils';
import '../AdminProfileTab/index.css';

const AdminProfileSidebar = ({ isSidebar, setSidebar }: any) => {
  const { t } = useTranslation();
  const [getApi] = useAxiosGet();

  const logOutModal = useModal();

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
          <span
            role="button"
            tabIndex={0} // makes it focusable
            onClick={() => setSidebar('edit')}
            onKeyPress={(e) => e.key === 'Enter' && setSidebar('edit')} // handles keyboard accessibility
            className="sidebar-link"
          >
            <Image iconName="userEdit" />
            {t(`Profile.Sidebar.EditProfile`)}
          </span>
        </li>

        <li
          className={`sidebar-link-item ${isSidebar === 'password' ? 'active' : ''}`}
        >
          <span
            role="button"
            tabIndex={0}
            onClick={() => setSidebar('password')}
            onKeyPress={(e) => e.key === 'Enter' && setSidebar('password')}
            className="sidebar-link"
          >
            <Image iconName="key" />
            {t(`Profile.Sidebar.ResetPassword`)}
          </span>
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

export default AdminProfileSidebar;
