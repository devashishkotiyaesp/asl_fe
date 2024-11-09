import Card from 'components/Card';
import PageHeader from 'components/PageHeader';
import { REACT_APP_API_URL } from 'config';
import { LanguagesEnum } from 'constants/common.constant';
import { AdminNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { ActionNameEnum, KeysEnum } from '../constants';
import CommonSection from './Components/CommonSection';
import './index.css';
import { InitValuesProps, LangueKeyValueProps, ResponseDataProps } from './types';

const TermsUseAdmin = () => {
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
      params: { sectionName: KeysEnum.TermsOfUse, view: true },
    });
    const initialValues = {} as LangueKeyValueProps;
    setResponseData(response.data[KeysEnum.TermsOfUse]);

    response.data[KeysEnum.TermsOfUse].forEach(
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
            summary_keyPoints: '',
            point_data_array: [],
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
        title={t('Cms.termsOfUse.title')}
        url={AdminNavigation.cms_management.view.path}
      />
      <div className="content-base">
        <div className="step-wrapper flex items-center">
          {allLanguages?.map((lang, index) => {
            return (
              <div
                key={lang.id}
                className={`step-item ${index === activeLanguage ? 'active' : ''}`}
              >
                <span className="step-item__number">{index + 1}</span>
                <span className="step-item__languages"> {lang.name}</span>
              </div>
            );
          })}
        </div>
        <Card title={t('Cms.termsOfUse.title')} isGray>
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

export default TermsUseAdmin;
