import React from 'react';
import { SectionProps } from '../types';

const DynamicWrapper = (WrappedComponent: React.ComponentType<SectionProps>) => {
  return function DynamicFormComponent(props: SectionProps) {
    const { values, setFieldValue, isLoading } = props;
    return (
      <WrappedComponent
        values={values}
        setFieldValue={setFieldValue}
        isLoading={isLoading}
      />
    );
  };
};

export default DynamicWrapper;
