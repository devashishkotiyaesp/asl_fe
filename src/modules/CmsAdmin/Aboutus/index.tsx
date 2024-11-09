import Button from 'components/Button/Button';
import Card from 'components/Card';
import PageHeader from 'components/PageHeader';
import { REACT_APP_API_URL } from 'config';
import { LanguagesEnum } from 'constants/common.constant';
import { AdminNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { AboutPageSection, ActionNameEnum, KeysEnum } from '../constants';
import ConditionalComponent from './Components/ConditionalComponent';
import './index.css';
import { LangueKeyValueProps, ResponseDataProps } from './types';

const CMSAboutAdmin = () => {
  const { t } = useTranslation();

  const [activeSection, setActiveSection] = useState(
    AboutPageSection({ t })?.[0].value
  );
  const { id } = useParams();
  const { allLanguages } = useSelector(useLanguage);
  const [getApi, { isLoading }] = useAxiosGet();
  const [responseData, setResponseData] = useState<ResponseDataProps[]>();
  const [activeLanguage, setActiveLanguage] = useState(0);
  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => lang.name);
  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);
  const [showAddEditCrew, setShowAddEditCrew] = useState(false);
  const [showAddEditJourney, setShowAddEditJourney] = useState(false);
  const [editId, setEditId] = useState('');

  const handleAddEditCrewClick = () => {
    setEditId('');
    setShowAddEditCrew(true);
    setActiveLanguage(0);
    setFormLanguage(LanguagesEnum.ENGLISH);
  };

  const handleAddEditJourneyClick = (data: boolean) => {
    setShowAddEditJourney(data);
  };

  const getEditId = (data: string | undefined) => {
    setEditId(data ?? '');
  };

  const handleTabClick = (section: string) => {
    setActiveSection(section);
    setActiveLanguage(0);
    setFormLanguage(LanguagesEnum.ENGLISH);
    setShowAddEditCrew(false);
    setShowAddEditJourney(false);
  };

  const [actionName, setActionName] = useState<string | null>(ActionNameEnum.NEXT);
  const nextFormLanguage = formLanguages?.[activeLanguage + 1] || '';
  const prevFormLanguage = formLanguages?.[activeLanguage - 1] || '';

  const dataFEtch = async (sectionName: string) => {
    const response = await getApi(`${REACT_APP_API_URL}/cms-page-section/${id}`, {
      params: {
        sectionName,
        view: true,
      },
    });
    const initialValues = {} as LangueKeyValueProps;
    setResponseData(response.data[sectionName]);
    response.data[sectionName]?.forEach(
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
    if (id && activeSection !== KeysEnum.Crew) {
      dataFEtch(activeSection);
    }
  }, [id, activeSection]);
  const currentTitle = AboutPageSection({ t })?.find(
    (data) => data.value === activeSection
  )?.label;

  const getTitle = (isJourney: boolean) => {
    let title = ''; // Default to an empty string to ensure the type is always string.

    if (isJourney) {
      if (showAddEditJourney) {
        if (editId) {
          title = t('Cms.journey.editJourney');
        } else {
          title = t('Cms.journey.addJourney');
        }
      } else {
        title = currentTitle ?? ''; // Fallback to empty string if currentTitle is undefined
      }
    } else if (showAddEditCrew) {
      if (editId) {
        title = t('Cms.crew.editCrew');
      } else {
        title = t('Cms.crew.addCrew');
      }
    } else {
      title = currentTitle ?? ''; // Fallback to empty string if currentTitle is undefined
    }

    return title;
  };

  return (
    <>
      <PageHeader
        title={t('Cms.about.title')}
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
              {AboutPageSection({ t })?.map((data) => {
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
            backArrow={!!(showAddEditCrew || showAddEditJourney || editId)}
            onClickData={() => {
              setShowAddEditCrew(false);
              setShowAddEditJourney(false);
              setEditId('');
            }}
            headerClass="flex items-center justify-between gap-2 flex-wrap"
            title={
              activeSection === KeysEnum.Crew ? getTitle(false) : getTitle(true)
            }
            headerExtra={
              <div>
                {activeSection === KeysEnum.Crew && !showAddEditCrew ? (
                  <Button variants="black" onClickHandler={handleAddEditCrewClick}>
                    {t('Community.Table.Add')}
                  </Button>
                ) : (
                  ''
                )}
              </div>
            }
            isGray
          >
            <ConditionalComponent
              activeSection={activeSection}
              showAddEditCrew={showAddEditCrew}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              activeLanguage={activeLanguage}
              nextFormLanguage={nextFormLanguage}
              prevFormLanguage={prevFormLanguage}
              formLanguage={formLanguage}
              setShowAddEditCrew={setShowAddEditCrew}
              setFormLanguage={setFormLanguage}
              setActionName={setActionName}
              actionName={actionName as unknown as string}
              setActiveLanguage={setActiveLanguage}
              responseData={responseData}
              allLanguages={allLanguages}
              cmsId={id}
              handleAddEditJourneyClick={handleAddEditJourneyClick}
              showAddEditJourney={showAddEditJourney}
              isLoading={isLoading}
              getEditId={getEditId}
              editId={editId}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default CMSAboutAdmin;
