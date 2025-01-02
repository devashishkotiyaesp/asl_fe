import Breadcrumbs from 'components/Breadcrumbs';
import Card from 'components/Card';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import { REACT_APP_API_URL } from 'config';
import { LanguagesEnum } from 'constants/common.constant';
import { AdminNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import 'modules/CmsAdmin/styles/index.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { capitalizeFirstCharacter } from 'utils';
import { ActionNameEnum, KeysEnum, OrganizationSection } from '../constants';
import ConditionalComponent from './Components/ConditionalComponent';
import { LangueKeyValueProps, ResponseDataProps } from './types';

const CMSOrganizationAdmin = () => {
  const { t } = useTranslation();

  const [activeSection, setActiveSection] = useState(
    OrganizationSection({ t })?.[0].value
  );
  const { id } = useParams();
  const { allLanguages } = useSelector(useLanguage);
  const [getApi, { isLoading }] = useAxiosGet();
  const [responseData, setResponseData] = useState<ResponseDataProps[]>();
  const [activeLanguage, setActiveLanguage] = useState(0);
  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => lang.name);
  const [formLanguage, setFormLanguage] = useState<string>(LanguagesEnum.ENGLISH);
  const [editId, setEditId] = useState('');
  const [addButtonClick, setAddButtonClick] = useState(false);
  const getEditId = (data: string | undefined) => {
    setEditId(data ?? '');
  };

  const handleTabClick = (section: string) => {
    setActiveSection(section);
    setActiveLanguage(0);
    setFormLanguage(LanguagesEnum.ENGLISH);
    setAddButtonClick(false);
    setEditId('');
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
  const currentTitle = OrganizationSection({ t })?.find(
    (data) => data.value === activeSection
  )?.label;

  const getTitle = () => {
    let title = '';

    // Determine the title based on the section and action (add or edit)
    if (activeSection === KeysEnum.OrgBenefits) {
      if (addButtonClick) {
        title = t('Cms.Benefits.benefitTitle');
      } else {
        title = t('Cms.Benefits.editBenefitTitle');
      }
    } else if (activeSection === KeysEnum.OrgTestimonials) {
      if (addButtonClick) {
        title = t('Cms.Organization.Testimonial.add');
      } else if (editId) {
        title = t('Cms.Benefits.editTestimonialTitle');
      }
    }

    return title;
  };

  return (
    <>
      <PageHeader
        title={t('Sidebar.Organizations')}
        url={AdminNavigation.cms_management.view.path}
      >
        <Breadcrumbs
          items={[
            {
              label: t('Cms.pageHeader.Management.Title'),
              url: '/page-list',
            },
            {
              label: t('Sidebar.Organizations'),
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
        <div className="cms-page-bar-content-wrap">
          <div className="page-bar">
            <div className="page-bar__title">
              <span>{t('Cms.organization.sectionsTitle')}</span>
            </div>
            <nav className="page-bar__list">
              {OrganizationSection({ t })?.map((data) => {
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
            backArrow={!!(addButtonClick || editId)}
            onClickData={() => {
              setAddButtonClick(false);
              setEditId('');
            }}
            headerClass="flex items-center justify-between gap-2 flex-wrap"
            title={!addButtonClick && !editId ? currentTitle : getTitle()}
            isGray
          >
            <ConditionalComponent
              activeSection={activeSection}
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
              getEditId={getEditId}
              editId={editId}
              setAddButtonClick={setAddButtonClick}
              addButtonClick={addButtonClick}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default CMSOrganizationAdmin;
