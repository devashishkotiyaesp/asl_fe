import { KeysEnum } from 'modules/CmsAdmin/constants';
import { CommonSectionProps } from '../types';
import CommonSection from './CommonSection';
import AddEditCrew from './crew/AddEditCrew';
import AddEditJourney from './journey/AddEditJourney';

const ConditionalComponent = ({
  initialValues,
  setInitialValues,
  activeLanguage,
  nextFormLanguage,
  prevFormLanguage,
  formLanguage,
  setFormLanguage,
  setActionName,
  actionName,
  responseData,
  setActiveLanguage,
  allLanguages,
  BannerFormWithDynamicProps,
  cmsId,
  activeSection,
  showAddEditCrew,
  editId,
  setShowAddEditCrew,
  getEditId,
  handleAddEditJourneyClick,
  showAddEditJourney,
  isLoading,
}: CommonSectionProps) => {
  let content = null;
  if (activeSection === KeysEnum.Crew) {
    content = showAddEditCrew ? (
      <AddEditCrew
        activeLanguage={activeLanguage}
        nextFormLanguage={nextFormLanguage}
        prevFormLanguage={prevFormLanguage}
        formLanguage={formLanguage}
        setFormLanguage={setFormLanguage}
        allLanguages={allLanguages}
        setActiveLanguage={setActiveLanguage}
        cmsId={cmsId}
        editId={editId}
      />
    ) : null;
  } else if (activeSection === KeysEnum.Journey && (showAddEditJourney || editId)) {
    content =
      showAddEditJourney || editId ? (
        <AddEditJourney
          activeLanguage={activeLanguage}
          nextFormLanguage={nextFormLanguage}
          prevFormLanguage={prevFormLanguage}
          formLanguage={formLanguage}
          setFormLanguage={setFormLanguage}
          allLanguages={allLanguages}
          setActiveLanguage={setActiveLanguage}
          cmsId={cmsId}
          editId={editId}
        />
      ) : null;
  }

  return (
    <>
      {content || (
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
          cmsId={cmsId}
          handleAddEditJourneyClick={handleAddEditJourneyClick}
          BannerFormWithDynamicProps={BannerFormWithDynamicProps}
          activeSection={activeSection}
          getEditId={getEditId}
          setShowAddEditCrew={setShowAddEditCrew}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ConditionalComponent;
