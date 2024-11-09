import React from 'react';
import { SectionProps } from '../types';

const DynamicWrapper = (WrappedComponent: React.ComponentType<SectionProps>) => {
  return function DynamicFormComponent(props: SectionProps) {
    const {
      values,
      setFieldValue,
      isLoading,
      handleAddEditJourneyClick,
      getEditId,
      formLanguage,
      setShowAddEditCrew,
      prevFormLanguage,
      activeLanguage,
      nextFormLanguage,
    } = props;

    return (
      <WrappedComponent
        values={values}
        setFieldValue={setFieldValue}
        isLoading={isLoading}
        handleAddEditJourneyClick={handleAddEditJourneyClick}
        getEditId={getEditId}
        formLanguage={formLanguage}
        setShowAddEditCrew={setShowAddEditCrew}
        prevFormLanguage={prevFormLanguage}
        activeLanguage={activeLanguage}
        nextFormLanguage={nextFormLanguage}
        // prevLanguage={prevLanguage.current ?? ''}
      />
    );
  };
};

export default DynamicWrapper;
