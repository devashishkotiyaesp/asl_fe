// import ASLIcon from 'components/Icon/assets/ASLIcon';
import BarChart from 'components/Icon/assets/BarChart';
import BookMark from 'components/Icon/assets/BookMark';
import Calendar from 'components/Icon/assets/Calendar';
import DashboardIcon from 'components/Icon/assets/DashboardIcon';
import DollarRounded from 'components/Icon/assets/DollarRounded';
import GlobeEdit from 'components/Icon/assets/GlobeEdit';
import NoteBook from 'components/Icon/assets/NoteBook';
import NoteLog from 'components/Icon/assets/NoteLog';
import Org from 'components/Icon/assets/Org';
import Settings from 'components/Icon/assets/Settings';
import Thumb from 'components/Icon/assets/Thumb';
import UserHexa from 'components/Icon/assets/UserHexa';
import UserIcon from 'components/Icon/assets/UserIcon';
import Users from 'components/Icon/assets/Users';
import Image from 'components/Image';
import { LayoutConstant, Roles } from 'constants/common.constant';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { activeLayoutType, SidebarSelector } from 'reduxStore/slices/layoutSlice';
import {
  AdminNavigation,
  PrivateNavigation,
} from '../../../constants/navigation.constant';

const Sidebar = () => {
  const activeLayout = useSelector(activeLayoutType);
  const isSidebarOpen = useSelector(SidebarSelector);
  const { t } = useTranslation();

  const adminSidebarElements: {
    label: string;
    to: string;
    icon: JSX.Element;
    divider?: boolean;
    dividerTitle?: string;
  }[] = [
    {
      label: t('Sidebar.Dashboard'),
      to: PrivateNavigation.dashboard.view.path,
      icon: <DashboardIcon />,
    },
    {
      label: t('Sidebar.ManageUsers'),
      to: PrivateNavigation.users.view.path,
      icon: <UserHexa />,
    },
    {
      label: t('Sidebar.ManageCourses'),
      to: PrivateNavigation.courses.view.path,
      icon: <NoteBook />,
    },
    {
      label: t('Sidebar.Organizations'),
      to: '/users1',
      icon: <Org />,
    },
    {
      label: t('Sidebar.ManageSubscription'),
      to: '/manage-subscription',
      icon: <DollarRounded />,
    },
    {
      label: t('Sidebar.Calendar'),
      to: '/calendar',
      icon: <Calendar />,
    },
    {
      label: t('Sidebar.ASLDictionary'),
      to: '/dictionary',
      icon: <BookMark />,
    },
    {
      label: t('Sidebar.Community'),
      to: '/community',
      icon: <UserIcon />,
    },
    {
      label: t('Sidebar.CMSManagement'),
      to: AdminNavigation.cms_management.view.path,
      icon: <GlobeEdit />,
    },
    {
      label: t('Sidebar.AuditLog'),
      to: '/users3',
      icon: <NoteLog />,
    },
    {
      label: t('Sidebar.FeedbackAndSupport'),
      to: '/feedback',
      icon: <Thumb />,
    },
    {
      label: t('Sidebar.MetricsAndAnalytics'),
      to: '/metrics-analytics',
      icon: <BarChart />,
    },
    {
      label: t('Sidebar.Settings'),
      to: '/settings',
      icon: <Settings />,
    },
  ];

  const organizationSidebarElements: {
    label: string;
    to: string;
    icon: JSX.Element;
    divider?: boolean;
    dividerTitle?: string;
  }[] = [
    {
      label: t('Sidebar.Dashboard'),
      to: PrivateNavigation.dashboard.view.path,
      icon: <DashboardIcon />,
    },
    {
      label: t('Sidebar.Courses'),
      to: PrivateNavigation.courses.view.path,
      icon: <NoteBook />,
    },
    {
      label: t('Sidebar.Community'),
      to: '/community',
      icon: <Users />,
    },
    {
      label: t('Sidebar.Dictionary'),
      to: '/dictionary',
      icon: <BookMark />,
    },
    {
      label: t('Sidebar.Settings'),
      to: '/settings',
      icon: <Settings />,
      divider: true,
      dividerTitle: t('Sidebar.Settings'),
    },
    {
      label: t('Sidebar.ManageStudent'),
      to: '/manage-student',
      icon: <UserHexa />,
    },
    {
      label: t('Sidebar.Teachers'),
      to: '/teachers',
      icon: <Users />,
    },
    {
      label: t('Sidebar.ManageSubscription'),
      to: '/subscription',
      icon: <DollarRounded />,
    },
    {
      label: t('Sidebar.OrganizationProfile'),
      to: PrivateNavigation.profile.view.path,
      icon: <Org />,
    },
    {
      label: t('Sidebar.ProgressReports'),
      to: '/reports',
      icon: <BarChart />,
    },
    {
      label: t('Sidebar.Feedback'),
      to: '/feedback',
      icon: <Thumb />,
    },
  ];

  const getSidebarElements = () => {
    switch (activeLayout) {
      case LayoutConstant.Admin:
        return adminSidebarElements;
      case LayoutConstant.Organization:
        return organizationSidebarElements;
      default:
        return adminSidebarElements;
    }
  };

  const getTitle = () => {
    switch (activeLayout) {
      case Roles.Admin:
        return Roles.Admin.toUpperCase();
      case Roles.Organization:
        return Roles.Organization.toUpperCase();
      default:
        return '';
    }
  };

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? 'show' : 'hide'}`}>
        <div className="sidebar-logo">
          <Link to="/">
            <Image
              isFromDataBase={false}
              width={isSidebarOpen ? 223 : 56}
              height={isSidebarOpen ? 40 : 56}
              src={`/images/${isSidebarOpen ? 'logo.png' : 'logo-round.png'}`}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="sidebar-title">
          {isSidebarOpen && <span>{getTitle()}</span>}
        </div>
        <nav className="sidebar-list">
          <ul className="scroll-hide">
            {getSidebarElements().map((element, index) => (
              <>
                <li
                  key={`${element.label}_${element.to}_${index}`}
                  className="sidebar-list_item"
                >
                  <NavLink
                    to={element.to}
                    className={({ isActive }) => `
                    ${isActive ? 'active' : ''}
                    ${element?.divider && isSidebarOpen ? 'mb-4' : ''}
                  `}
                  >
                    <span className="icon">{element.icon}</span>
                    <span className="text">
                      {isSidebarOpen ? element.label : ''}
                    </span>
                  </NavLink>
                </li>
                {element.divider && isSidebarOpen && (
                  <div className="sidebar-divider">
                    <span>{element.dividerTitle}</span>
                  </div>
                )}
              </>
            ))}
          </ul>
        </nav>
      </aside>
      {/* <aside className="max-w-64 bg-white h-full border-r border-gray-200">
        <nav className="flex flex-col">
          <div className="p-4">
            <ASLIcon
              className="w-max"
              width={isSidebarOpen ? '223' : '60'}
              height={isSidebarOpen ? '42' : '25'}
            />
          </div>
          <span className="text-PrimaryWood bg-lightGray px-4">ADMIN</span>
          <div className="flex flex-col mt-4 mx-4 text-PrimaryWood">
            {sidebarElements.map((element) => (
              <NavLink
                key={element.label}
                to={element.to}
                className={({ isActive }) =>
                  `p-4 flex items-center font-400 text-PrimaryWood gap-2 ${isActive ? 'bg-black text-white rounded-md' : ''
                  }`
                }
              >
                {element.icon}
                {isSidebarOpen && element.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside> */}
    </>
  );
};

export default Sidebar;
