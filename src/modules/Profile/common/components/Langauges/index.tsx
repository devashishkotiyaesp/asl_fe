import Image from 'components/Image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../index.css';

interface LanguageProps {
  isSidebar: string;
}

const Language: FC<LanguageProps> = ({ isSidebar }) => {
  const { t } = useTranslation();
  return (
    <div
      className="sidebar-content-wrap"
      style={isSidebar === 'preference' ? { display: '' } : { display: 'none' }}
    >
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>{t('Profile.Language.LanguagePreference')}</span>
        </div>
        <span className="sidebar-content-small-title">
          {t('Profile.Language.LanguageChoice')}
        </span>
      </div>
      <div className="learn-asl-select-wrap languages-wrap">
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
      </div>
    </div>
  );
};

export default Language;
