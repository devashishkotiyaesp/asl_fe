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
import { ActionNameEnum, GlobalSection } from '../constants';
import AppDownloadForm from './Components/AppDownloadForm';
import CommonSection from './Components/CommonSection';
import CtaTwoForm from './Components/CtaTwoFrom';
import DynamicWrapper from './Components/DynamicWrapper';
import Footer from './Components/Footer';
import './index.css';
import { LangueKeyValueProps, ResponseDataProps } from './types';

const CMSGlobalAdmin = () => {
  const [activeSection, setActiveSection] = useState(GlobalSection()?.[0].value);
  const { id } = useParams();
  const { allLanguages } = useSelector(useLanguage);
  const [getApi, { isLoading }] = useAxiosGet();
  const [responseData, setResponseData] = useState<ResponseDataProps[]>();
  const [activeLanguage, setActiveLanguage] = useState(0);

  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => lang.name);

  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);

  const handleTabClick = (section: string) => {
    setActiveSection(section);
    setActiveLanguage(0);
    setFormLanguage(LanguagesEnum.ENGLISH);
  };

  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);

  const nextFormLanguage = formLanguages?.[activeLanguage + 1] || '';
  const prevFormLanguage = formLanguages?.[activeLanguage - 1] || '';

  const dataFEtch = async (sectionName: string) => {
    const response = await getApi(`${REACT_APP_API_URL}/cms-page-section/${id}`, {
      params: { sectionName, view: true },
    });
    const initialValues = {} as LangueKeyValueProps;
    setResponseData(response.data[sectionName]);
    response.data[sectionName].forEach(
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
          initialValues[language] = {};
        }
        if (typeof field_value === 'string') {
          try {
            const parsedValue = JSON.parse(field_value);
            initialValues[language][field_name] = Array.isArray(parsedValue)
              ? parsedValue
              : field_value;
          } catch {
            initialValues[language][field_name] = field_value;
          }
        } else {
          initialValues[language][field_name] = field_value;
        }
      }
    );

    setInitialValues(initialValues);
  };
  const [initialValues, setInitialValues] = useState<LangueKeyValueProps>();

  useEffect(() => {
    if (id) {
      dataFEtch(activeSection);
    }
  }, [id, activeSection]);

  const renderFormComponent = () => {
    switch (activeSection) {
      case 'appDownload':
        return DynamicWrapper(AppDownloadForm);
      case 'ctaTwo':
        return DynamicWrapper(CtaTwoForm);
      case 'footer':
        return DynamicWrapper(Footer);
      default:
        return null;
    }
  };
  return (
    <>
      <PageHeader
        title={t('Cms.globalSection.title')}
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
        <div className="cms-page-bar-content-wrap">
          <div className="page-bar">
            <div className="page-bar__title">
              <span>{t('Cms.homepage.sectionsTitle')}</span>
            </div>
            <nav className="page-bar__list">
              {GlobalSection()?.map((data) => {
                return (
                  <ul key={`section_${data.value}`}>
                    <li className="page-bar__item">
                      <span
                        onClick={() => handleTabClick(data.value)}
                        className={data.value === activeSection ? 'active' : ''}
                      >
                        {data.label}
                      </span>
                    </li>
                  </ul>
                );
              })}
            </nav>
          </div>
          <Card
            title={
              GlobalSection()?.find((data) => data.value === activeSection)?.label
            }
            isGray
          >
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
              BannerFormWithDynamicProps={
                renderFormComponent() as unknown as (props: any) => JSX.Element
              }
              activeSection={activeSection}
              isLoading={isLoading}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default CMSGlobalAdmin;
