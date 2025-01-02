import Button from 'components/Button/Button';
import Image from 'components/Image';
import Modal from 'components/Modal';
import { languageConstant, LayoutConstant } from 'constants/common.constant';
import { CmsNavigation, PublicNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { setLanguage, useLanguage } from 'reduxStore/slices/languageSlice';
import { activeLayoutType } from 'reduxStore/slices/layoutSlice';
import store from 'reduxStore/store';
import { logout } from 'utils';
import './index.css';

const Header = () => {
  const { t } = useTranslation();
  const activeLayout = useSelector(activeLayoutType);
  const user = useSelector(getCurrentUser);
  const { language, defaultLanguage } = useSelector(useLanguage);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [getApi] = useAxiosGet();

  const cmsOptions = [
    { title: t('Header.CMS.Home'), link: CmsNavigation.Home },
    { title: t('Header.CMS.Course'), link: CmsNavigation.Course },
    { title: t('Header.CMS.Shop'), link: '/shop' },
    { title: t('Header.CMS.Dictionary'), link: CmsNavigation.Dictionary },
    { title: t('Header.CMS.Organizations'), link: CmsNavigation.Org },
  ];

  const studentOptions = [
    { title: t('Header.Student.Home'), link: '/' },
    { title: t('Header.Student.Courses'), link: '/courses' },
    { title: t('Header.Student.Community'), link: '/community' },
    { title: t('Header.Student.Dictionary'), link: '/dictionary' },
  ];

  const teacherOptions = [
    { title: t('Header.Teacher.Home'), link: '/' },
    { title: t('Header.Teacher.Courses'), link: '/courses' },
    { title: t('Header.Teacher.Community'), link: '/community' },
    { title: t('Header.Teacher.Dictionary'), link: '/dictionary' },
  ];

  const getTopMenuOptions = () => {
    switch (activeLayout) {
      case LayoutConstant.Student:
        return studentOptions;
      case LayoutConstant.Teacher:
        return teacherOptions;
      default:
        return cmsOptions;
    }
  };
  const handleLogout = async () => {
    await getApi('auth/login', {
      params: {
        status: 'logout',
      },
    });
  };
  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="wrapper">
            <Link to="./" className="">
              <img src="/images/logo.png" width={220} height={41} alt="" />
            </Link>
            <div className="mx-auto">
              {/* <li className="menu-item">
                <Link to="./" className="active">
                  Home
                </Link>
              </li> */}
              <ul className="menu">
                {getTopMenuOptions().map((navData) => (
                  <li className="menu-item" key={navData.title}>
                    <NavLink to={navData.link} className="">
                      {navData.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lang-wrap">
              <div className="lang-wrap__inner">
                <span
                  // className="block w-[45px] aspect-square rounded-full absolute top-0 bg-LightWood -z-1 transition-all duration-300 left-0"
                  className={`active-circle ${
                    language === languageConstant.EN ||
                    (!language && defaultLanguage === languageConstant.EN)
                      ? ''
                      : ' active'
                  }`}
                />
                <button
                  className="w-[45px] aspect-square rounded-full cursor-pointer flex items-center justify-center text-black text-base leading-normal"
                  onClick={() =>
                    dispatch(setLanguage({ language: languageConstant.EN }))
                  }
                >
                  EN
                </button>
                <button
                  className="w-[45px] aspect-square rounded-full cursor-pointer flex items-center justify-center text-black text-base leading-normal"
                  onClick={() =>
                    dispatch(setLanguage({ language: languageConstant.ES }))
                  }
                >
                  ES
                </button>
              </div>
            </div>

            {user ? (
              <div className="header-user-profile">
                <Button
                  onClickHandler={() => setIsOpen(!isOpen)}
                  className="header-profile"
                >
                  <Image
                    isFromDataBase={!!user?.profile_image}
                    src={user?.profile_image || '/images/no-image.png'}
                  />
                </Button>
                {isOpen && (
                  <div className="header-profile-menu" ref={modalRef}>
                    <div className="header-profile-menu__title">
                      <span>{t('Header.Profile.Dialog.Title')}</span>
                    </div>
                    <Link
                      to={
                        activeLayout === LayoutConstant.Admin ? '/admin' : '/profile'
                      }
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
                        <span className="name">
                          {`${user?.first_name ?? 'Profile'} ${user?.last_name || ''}`}
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
                      {t('Header.Profile.Dialog.Signout')}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="btn btn-black">
                <Link to={PublicNavigation.login}>
                  {t('Header.Profile.Dialog.Login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <Modal modalEl={modalRef} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
