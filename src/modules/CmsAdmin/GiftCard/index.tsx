import Breadcrumbs from 'components/Breadcrumbs';
import Card from 'components/Card';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import { REACT_APP_API_URL } from 'config';
import { LanguagesEnum } from 'constants/common.constant';
import { AdminNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { t } from 'i18next';
import 'modules/CmsAdmin/styles/index.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { capitalizeFirstCharacter } from 'utils';
import { ActionNameEnum, KeysEnum } from '../constants';
import CommonSection from './Components/CommonSection';
import { InitValuesProps, LangueKeyValueProps, ResponseDataProps } from './types';

const CMSGiftCardAdmin = () => {
  const { id } = useParams();
  const { allLanguages } = useSelector(useLanguage);
  const [getApi, { isLoading }] = useAxiosGet();
  const [responseData, setResponseData] = useState<ResponseDataProps[]>();
  const [activeLanguage, setActiveLanguage] = useState(0);

  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => lang.name);

  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);

  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);

  const nextFormLanguage = formLanguages?.[activeLanguage + 1] || '';
  const prevFormLanguage = formLanguages?.[activeLanguage - 1] || '';
  type InitValuesKeys = keyof InitValuesProps;
  const dataFEtch = async () => {
    const response = await getApi(`${REACT_APP_API_URL}/cms-page-section/${id}`, {
      params: { sectionName: KeysEnum.GiftCard, view: true },
    });
    const initialValues = {} as LangueKeyValueProps;
    setResponseData(response.data[KeysEnum.GiftCard]);

    response.data[KeysEnum.GiftCard].forEach(
      ({
        language,
        field_name,
        field_value,
      }: {
        language: string;
        field_name: string;
        field_value: string;
      }) => {
        if (!initialValues[language]) {
          initialValues[language] = {
            title: '',
            description: '',
          }; // Initialize with empty/default values
        }

        // Use type assertion to ensure field_name is a valid key
        const key = field_name as InitValuesKeys;

        if (typeof field_value === 'string') {
          try {
            const parsedValue = JSON.parse(field_value);
            if (Array.isArray(parsedValue)) {
              initialValues[language][key] = parsedValue;
            } else {
              initialValues[language][key] = field_value;
            }
          } catch {
            initialValues[language][key] = field_value;
          }
        } else {
          initialValues[language][key] = field_value;
        }
      }
    );

    setInitialValues(initialValues);
  };

  const [initialValues, setInitialValues] = useState<LangueKeyValueProps>();

  useEffect(() => {
    if (id) {
      dataFEtch();
    }
  }, [id]);
  return (
    <>
      <PageHeader
        title={t('Cms.GiftCard.title')}
        url={AdminNavigation.cms_management.view.path}
      >
        <Breadcrumbs
          items={[
            {
              label: t('Cms.pageHeader.Management.Title'),
              url: '/page-list',
            },
            {
              label: t('Cms.GiftCard.title'),
              url: '/',
            },
          ]}
          variant="arrow"
        />
      </PageHeader>
      <div className="content-base">
        <div className="step-wrapper">
          {allLanguages?.map((lang, index) => {
            return (
              <div
                key={lang.id}
                className={`step-item ${index <= activeLanguage ? 'active' : ''}`}
              >
                {index >= activeLanguage ? (
                  <span className="step-item__number">{index + 1}</span>
                ) : (
                  <span className="step-item__number">
                    <Image iconClassName="w-10 h-10" iconName="checkIcon" />
                  </span>
                )}
                <span className="step-item__languages">
                  {capitalizeFirstCharacter(lang.name)}
                </span>
              </div>
            );
          })}
        </div>
        <Card title={t('Cms.GiftCard.title')} isGray>
          <CommonSection
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            activeLanguage={activeLanguage}
            nextFormLanguage={nextFormLanguage}
            prevFormLanguage={prevFormLanguage}
            formLanguage={formLanguage}
            setFormLanguage={setFormLanguage}
            setActionName={setActionName}
            actionName={actionName as unknown as string}
            setActiveLanguage={setActiveLanguage}
            responseData={responseData}
            allLanguages={allLanguages}
            cmsId={id}
            isLoading={isLoading}
          />
        </Card>
      </div>
    </>
  );
};

export default CMSGiftCardAdmin;
