import Button from 'components/Button/Button';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { SettingList } from './utils';

const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title={t('Sidebar.Settings')}>
        <SearchComponent
          parentClass="min-w-[320px]"
          placeholder={t('InputSearchPlaceholder')}
        />
      </PageHeader>
      <div className="settings-listing">
        {SettingList.map((e, i) => {
          return (
            <Button
              onClickHandler={() => navigate(e.navigate)}
              className="settings-list-item"
              key={i + 1}
            >
              <span className="settings-list-icon">
                <Image iconName={`${e.icon}`} />
              </span>
              <span className="settings-list-name">{e.name}</span>
              <span className="arrow-icon">
                <Image iconName="chevronRight" />
              </span>
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default AdminSettings;
