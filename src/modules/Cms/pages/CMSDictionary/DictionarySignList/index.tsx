import Image from 'components/Image';
import Loaders from 'components/Loaders';
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import '../../../../../components/FormElement/style/inputField.css';
import './index.css';

const DictionarySignList = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const [vocabularies, setVocabularies] = useState<
    { id: string; name: string; sign_photo: string }[]
  >([]);
  const { language } = useSelector(useLanguage);
  const { t } = useTranslation();
  const getVocabularies = async () => {
    const response = await callApi('/vocab');
    setVocabularies(response.data);
  };

  useEffect(() => {
    getVocabularies();
  }, [language]);

  return (
    <section className="dictionary-sign">
      {isLoading && <Loaders />}
      <div className="container">
        <div className="dictionary-filter-wrap">
          <p className="dictionary-filter-title">
            {t('Cms.Dictionary.SignList.Title')}
          </p>
        </div>
        <div className="dictionary-sign-list">
          {vocabularies?.map((vocabulary) => (
            <div key={vocabulary.id} className="dictionary-sign-item">
              <div className="dictionary-sign-name">
                <span>{vocabulary.name}</span>
              </div>
              <Image src={vocabulary.sign_photo ?? '/images/no-image.png'} />
            </div>
          ))}
          {vocabularies?.slice(0, 2)?.map((vocabulary) => (
            <div key={`${vocabulary.id}2`} className="dictionary-sign-item isLocked">
              <span>{vocabulary.name}</span>
              <Image src={vocabulary.sign_photo ?? ''} />
              <span className="lock-icon">
                <Image iconName="lock" />
              </span>
            </div>
          ))}
        </div>
        <div className="btn btn-black-border">
          <Link to="/dictionary">
            {t('Cms.Dictionary.SignList.LearnMoreVocabulary')}
            <Image iconName="arrowRight" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DictionarySignList;
