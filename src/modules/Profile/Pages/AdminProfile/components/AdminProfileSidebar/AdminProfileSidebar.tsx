import Image from 'components/Image';
import { useTranslation } from 'react-i18next';
import store from 'reduxStore/store';
import { logout } from 'utils';
import '../AdminProfileTab/index.css';

const AdminProfileSidebar = ({ isSidebar, setSidebar }: any) => {
  const { t } = useTranslation();
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

export default AdminProfileSidebar;
