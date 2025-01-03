import Button from 'components/Button/Button';
// import LogoutIcon from 'components/Icon/assets/LogoutIcon';
// import MenuIcon from 'components/Icon/assets/Menu';
// import NotificationIcon from 'components/Icon/assets/NotificationIcon';
// import Profile from 'components/Icon/assets/Profile';
// import UserIcon2 from 'components/Icon/assets/UserIcon2';
import Image from 'components/Image';
import Modal from 'components/Modal';
import { languageConstant } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth } from 'reduxStore/slices/authSlice';
import { setLanguage, useLanguage } from 'reduxStore/slices/languageSlice';
import { toggleSidebar } from 'reduxStore/slices/layoutSlice';
import store from 'reduxStore/store';
import { logout } from 'utils';

const Header = () => {
  const { language, defaultLanguage } = useSelector(useLanguage);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const { user } = useSelector(getAuth);
  const { t } = useTranslation();

  const [getApi] = useAxiosGet();

  const handleLogout = async () => {
    await getApi('auth/login', {
      params: {
        status: 'logout',
      },
    });
  };

  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  // const isSidebarOpen = useSelector(SidebarSelector);
  return (
    <>
      <header className="admin-header">
        <div className="admin-header__inner">
          <div onClick={() => dispatch(toggleSidebar())} className="sidebar-trigger">
            <Image iconName="menuIcon" />
          </div>
          <div className="flex items-center ml-auto">
            <div className="flex items-center w-[90px] rounded-full bg-LightGray relative z-1 mr-5">
              <span
                className={`block w-[45px] aspect-square rounded-full absolute top-0 bg-LightWood -z-1 transition-all duration-300 ${
                  language === languageConstant.EN ||
                  (!language && defaultLanguage === languageConstant.EN)
                    ? 'left-0'
                    : 'left-1/2'
                }`}
              />
              <span
                className="w-[45px] aspect-square rounded-full cursor-pointer flex items-center justify-center text-black text-base leading-normal"
                onClick={() =>
                  dispatch(setLanguage({ language: languageConstant.EN }))
                }
              >
                EN
              </span>
              <span
                className="w-[45px] aspect-square rounded-full cursor-pointer flex items-center justify-center text-black text-base leading-normal"
                onClick={() =>
                  dispatch(setLanguage({ language: languageConstant.ES }))
                }
              >
                ES
              </span>
            </div>
            <div className="header-notification-wrap">
              <Button
                onClickHandler={() => setIsNotification(true)}
                className="header-notification"
              >
                <Image iconName="notification" />
                <span className="update" />
              </Button>
              {isNotification && (
                <div ref={modalRef} className="header-notification-list-wrap">
                  <div className="header-notification-list-header">
                    <div className="header-notification-title">
                      {t(`Header.Notification.Dialog.Title`)}{' '}
                    </div>
                    <div className="header-notification-mark">
                      <Image iconName="doubleCheck" />
                      {t(`Header.Notification.Dialog.MarkAsRead`)}{' '}
                    </div>
                  </div>
                  <div className="notification-items scroll-hide">
                    {/* REPEAT */}
                    <div className="notification-item">
                      <div className="notification-item__img">
                        <Image isFromDataBase={false} src="/images/profile.png" />
                      </div>
                      <div className="notification-item__content">
                        <p className="title">Cameron Williamson</p>
                        <span className="desc">
                          orem ipsum dolor sit amet, consectetur adipiscing elit,
                        </span>
                        <span className="duration">2 min ago</span>
                      </div>
                      <div className="notification-item__status" />
                    </div>
                    {/* REPEAT */}
                    <div className="notification-item">
                      <div className="notification-item__img">
                        <Image isFromDataBase={false} src="/images/profile.png" />
                      </div>
                      <div className="notification-item__content">
                        <p className="title">Cameron Williamson</p>
                        <span className="desc">
                          orem ipsum dolor sit amet, consectetur adipiscing elit,
                        </span>
                        <span className="duration">2 min ago</span>
                      </div>
                      <div className="notification-item__status" />
                    </div>
                  </div>

                  <div className="notification-clear mt-5">
                    <Link to="#!">Clear All</Link>
                  </div>
                </div>
              )}
            </div>
            <div className="header-user-profile">
              <Button
                onClickHandler={() => setIsOpen(true)}
                className="header-profile"
              >
                <Image
                  isFromDataBase={!!user?.profile_image}
                  src={user?.profile_image || '/images/no-image.png'}
                />
              </Button>
              {isOpen && (
                <div className={`header-profile-menu `} ref={modalRef}>
                  <div className="header-profile-menu__title">
                    <span>{t(`Header.Profile.Dialog.Title`)}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="header-profile-wrap"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="header-profile-menu__img">
                      <Image
                        isFromDataBase={!!user?.profile_image}
                        src={user?.profile_image || '/images/no-image.png'}
                      />
                    </div>
                    <div className="header-profile-name">
                      <span
                        className="name"
                        title={`${user?.first_name ?? 'Profile'} ${user?.last_name || ''}`}
                      >
                        {user?.first_name ?? 'Profile'} {user?.last_name}
                      </span>
                      <span className="email" title="email">
                        {user?.email}
                      </span>
                      <Image iconName="chevronRight" iconClassName="more-icon" />
                    </div>
                  </Link>

                  <Button
                    onClickHandler={async () => {
                      setIsOpen(!isOpen);
                      await handleLogout();
                      await logout(store);
                    }}
                    className="button RedOpacity w-full"
                  >
                    {t(`Header.Profile.Dialog.Signout`)}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <Modal modalEl={modalRef} setIsOpen={setIsOpen} />
      <Modal modalEl={modalRef} setIsOpen={setIsNotification} />
    </>
  );
};

export default Header;
