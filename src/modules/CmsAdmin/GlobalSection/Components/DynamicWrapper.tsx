import React from 'react';
import { SectionProps } from '../types';

const DynamicWrapper = (WrappedComponent: React.ComponentType<SectionProps>) => {
  return function DynamicFormComponent(props: SectionProps) {
    const { values, setFieldValue, isLoading, formLanguage } = props;

    return (
      <WrappedComponent
        values={values}
        setFieldValue={setFieldValue}
        isLoading={isLoading}
        formLanguage={formLanguage}
      />
    );
  };
};

export default DynamicWrapper;
