import { KeysEnum } from 'modules/CmsAdmin/constants';
import { CommonSectionProps } from '../types';
import AddEditBenefits from './benefits/AddEditBenefit';
import CommonSection from './CommonSection';
import AddEditTestimonial from './testimonial/AddEditTestimonial';

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
  editId,
  getEditId,
  isLoading,
  addButtonClick,
  setAddButtonClick,
}: CommonSectionProps) => {
  let content = null;
  if (activeSection === KeysEnum.OrgTestimonials) {
    content =
      addButtonClick || editId ? (
        <AddEditTestimonial
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
  } else if (activeSection === KeysEnum.OrgBenefits) {
    content =
      addButtonClick || editId ? (
        <AddEditBenefits
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
          BannerFormWithDynamicProps={BannerFormWithDynamicProps}
          activeSection={activeSection}
          getEditId={getEditId}
          isLoading={isLoading}
          setAddButtonClick={setAddButtonClick}
        />
      )}
    </>
  );
};

export default ConditionalComponent;
