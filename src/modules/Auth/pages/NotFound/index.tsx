import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useTranslation } from 'react-i18next';
import './index.css';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="no-data-sec">
      <div className="inner">
        <div className="img-wrap">
          <Image src="images/no-data-image.png" isFromDataBase={false} />
        </div>
        <div className="title">{t('NotFound.Title')}</div>
        <p>{t('NotFound.Description')}</p>
        <Button className="no-data-button" variants="black">
          {t('NotFound.Home.ButtonTitle')}
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
