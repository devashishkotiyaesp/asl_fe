// ** Components **
import { Link } from 'react-router-dom';

// ** Constants
import { languageConstant } from 'constants/common.constant';
import { PublicNavigation } from 'constants/navigation.constant';

// ** Hooks **
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// ** Slices **
import GlobalSection from 'components/GlobalSection';
import { setLanguage, useLanguage } from 'reduxStore/slices/languageSlice';

export type Props = {
  children: React.ReactNode;
};

// Layout for Auth Pages
const AuthLayout = ({ children }: Props) => {
  const { t } = useTranslation();
  const { language, defaultLanguage } = useSelector(useLanguage);
  const dispatch = useDispatch();
  return (
    <div className="site-wrapper">
      {/* bg-LightGray */}
      <header className="absolute top-0 left-0 w-full bg-white flex justify-between py-27px border-b border-solid border-LightWood">
        <div className="container">
          <div className="flex items-center">
            <Link to="/" className="">
              <img src="/images/logo.png" width={220} height={41} alt="" />
            </Link>
            <div className="flex items-center ml-auto">
              <div className="flex items-center w-[90px] rounded-full bg-LightGray relative z-1 mr-12">
                <span
                  //  shadow-[inset_2px_1px_10px_#0000004d]
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

              <Link
                to={PublicNavigation.login}
                className="text-base text-black leading-tight"
              >
                {t('Header.Auth.LoginOrSignup')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="site-content  bg-LightGray">{children}</div>
      <GlobalSection />
    </div>
  );
};

export default AuthLayout;
