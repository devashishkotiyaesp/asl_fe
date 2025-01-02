import Button from 'components/Button/Button';
import { useAxiosGet } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';

const InterComAuth = () => {
  const { t } = useTranslation();
  const [getApi] = useAxiosGet();

  const getData = async () => {
    const response = await getApi('/support-request/connect');
    const query = response?.data;
    window.location.href = query;
  };

  return (
    <div className="ml-2 absolute top-0 right-0 mx-5 my-2 z-1">
      <Button
        variants="black"
        className="gap-1 !flex !py-2.5 !px-3.5 no-wrap"
        onClickHandler={() => getData()}
      >
        {t('InterCom.Authentication.Button')}
      </Button>
    </div>
  );
};

export default InterComAuth;
