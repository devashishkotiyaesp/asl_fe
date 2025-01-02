import Button from 'components/Button/Button';
import Image from 'components/Image';
import { languageConstant } from 'constants/common.constant';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, useLanguage } from 'reduxStore/slices/languageSlice';
import '../../../index.css';

const Language: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { language } = useSelector(useLanguage);
  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>{t('Profile.Language.LanguagePreference')}</span>
        </div>
        <span className="sidebar-content-small-title">
          {t('Profile.Language.LanguageChoice')}
        </span>
      </div>
      <div className="learn-asl-select-wrap languages-wrap">
        <Button
          onClickHandler={() =>
            dispatch(setLanguage({ language: languageConstant.EN }))
          }
          className={`learn-asl-select-item ${language === languageConstant.EN ? 'active ' : ''}`}
        >
          <span className="flag-icon">
            <Image iconName="flagUSA" iconClassName="w-full h-full" />
          </span>
          <span className="check-name">English</span>
          <span className="check-icon">
            <Image iconName="checkIcon" iconClassName="w-full h-full" />
          </span>
        </Button>
        <Button
          onClickHandler={() =>
            dispatch(setLanguage({ language: languageConstant.ES }))
          }
          className={`learn-asl-select-item ${language === languageConstant.ES ? 'active ' : ''}`}
        >
          <span className="flag-icon">
            <Image iconName="flagEspanol" iconClassName="w-full h-full" />
          </span>
          <span className="check-name">Español</span>
          <span className="check-icon">
            <Image iconName="checkIcon" iconClassName="w-full h-full" />
          </span>
        </Button>
      </div>
      {/* <div className="learn-asl-select-wrap languages-wrap">
        <div className="learn-asl-select-item active">
          <span className="flag-icon">
            <Image iconName="flagUSA" iconClassName="w-full h-full" />
          </span>
          <span className="check-name">English</span>
          <span className="check-icon">
            <Image iconName="checkIcon" iconClassName="w-full h-full" />
          </span>
        </div>
        <div className="learn-asl-select-item ">
          <span className="flag-icon">
            <Image iconName="flagEspanol" iconClassName="w-full h-full" />
          </span>
          <span className="check-name">Español</span>
          <span className="check-icon">
            <Image iconName="checkIcon" iconClassName="w-full h-full" />
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default Language;
