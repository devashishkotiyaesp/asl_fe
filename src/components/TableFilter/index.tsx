import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';
import { FilterConfig, FilterProps, FilterValues } from './types';

const DynamicFilter: React.FC<FilterProps> = ({
  configs,
  initialValues = {},
  onChange,
  className = '',
  showApplyButton = true,
}) => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<FilterValues>(initialValues);
  const [activeConfig, setActiveconfig] = useState<FilterConfig>(configs[0]);

  const handleSubmit = (values: FilterValues) => {
    setFilterValues(values);
    onChange(values);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filterValues).reduce(
      (count, values) =>
        count +
        (values && (Array.isArray(values) ? values.length > 0 : values !== '')
          ? 1
          : 0),
      0
    );
  };

  const handleClear = () => {
    const clearedValues: FilterValues = Object.fromEntries(
      configs.map((config) => [config.key, config.type === 'radio' ? '' : []])
    );
    setFilterValues(clearedValues);
    onChange(clearedValues);
  };

  const renderFilterInput = (config: FilterConfig) => {
    switch (config.type) {
      case 'checkbox':
        return (
          <>
            {config.options.map((option) => {
              const currentValues = (filterValues[config.key] || []) as (
                | string
                | number
              )[];
              const isChecked = currentValues.includes(option.value);

              return (
                <Checkbox
                  key={`${config.key}-${option.value}`}
                  id={`${config.key}-${option.value}`}
                  name={`${config.key}`}
                  text={option.label}
                  value={option.value}
                  check={isChecked}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v) => v !== option.value);
                    if (!showApplyButton) {
                      onChange({ ...filterValues, [config.key]: newValues });
                    } else {
                      setFilterValues((prev) => ({
                        ...prev,
                        [config.key]: newValues,
                      }));
                    }
                  }}
                  parentClass="items-center"
                  labelClass="text-sm text-gray-700"
                  showError={false}
                />
              );
            })}
          </>
        );

      case 'radio':
        return (
          <RadioButtonGroup
            name={config.key}
            options={config.options}
            label=""
            parentClass="radio-group"
            optionWrapper="flex flex-col gap-2"
            selectedValue={filterValues[config.key] as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;
              if (!showApplyButton) {
                onChange({ ...filterValues, [config.key]: newValue });
              } else {
                setFilterValues((prev) => ({
                  ...prev,
                  [config.key]: newValue,
                }));
              }
            }}
            isCompulsory={config.isCompulsory}
          />
        );

      case 'select':
        return (
          <ReactSelect
            isMulti={config.multiple}
            options={config.options}
            name={config.key}
            label={config.label}
            isSearchable={config.isSearchable}
            selectedValue={filterValues[config.key]}
            isCompulsory={config.isCompulsory}
            onChange={(selected) => {
              const newValue = (selected as IOptions[]).map(
                (item: IOptions) => item.value
              );
              if (!showApplyButton) {
                onChange({ ...filterValues, [config.key]: newValue });
              } else {
                setFilterValues((prev) => ({
                  ...prev,
                  [config.key]: newValue,
                }));
              }
            }}
            className="w-full"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`student-filter-inner ${className}`}>
      <div className="filter-title">
        <p>
          {t('Coursemanagement.CommonText.Filter')}
          {getActiveFiltersCount() > 0 && (
            <span className="filter-count">{getActiveFiltersCount()}</span>
          )}
        </p>

        {getActiveFiltersCount() > 0 && (
          <Button onClickHandler={handleClear} className="clear-filter">
            {t('CoursesManagement.Admin.Course.Table.ClearFilter')}
          </Button>
        )}
      </div>
      <div className="filter-tab-wrap">
        <div className="filter-tab-list">
          <ul>
            {configs.map((config) => (
              <li>
                <Button
                  className={`filter-tab-list-item ${activeConfig.label === config.label ? 'active' : ''}`}
                  onClickHandler={() => setActiveconfig(config)}
                >
                  {config.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter-tab-content">
          <Formik
            initialValues={filterValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form>
                <div className="filter-checkbox-list">
                  {renderFilterInput(activeConfig)}
                </div>

                {showApplyButton && (
                  <div className="filter-tab-question">
                    {/* <p className="question-item">Unsure of your level?</p> */}
                    <div className="btn-wrap">
                      <Button type="submit" variants="black">
                        {t('CoursesManagement.Admin.Course.Table.ApplyFilter')}
                      </Button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DynamicFilter;
