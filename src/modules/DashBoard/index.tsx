import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  return <div className="text-center text-3xl font-bold">{t('Welcome')}</div>;
};

export default Dashboard;
