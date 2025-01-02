import Button from 'components/Button/Button';
import ErrorMessage from 'components/FormElement/ErrorMessage';
import Image from 'components/Image';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';

interface SearchInputProps {
  placeholder?: string;
  value?: string | number;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurOut?: React.FocusEventHandler<HTMLInputElement>;
  onClear?: () => void;
  parentClass?: string;
  IconparentClass?: string;
  inputClass?: string;
  ref?: RefObject<HTMLDivElement>;
  isSearchIcon?: boolean;
  loading?: boolean;
  name?: string;
  IsFilter?: boolean;
  SearchBarChildren?:
    | React.ReactNode
    | ((setFilterVisible: (filterVisible: boolean) => void) => React.ReactNode);
}

const SearchComponent = ({
  value,
  placeholder,
  onSearch,
  onClear,
  parentClass,
  IconparentClass,
  inputClass,
  onBlurOut,
  ref,
  isSearchIcon = true,
  loading = false,
  name,
  IsFilter,
  SearchBarChildren,
}: SearchInputProps) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const { t } = useTranslation();
  const filterRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setFilterVisible(false);
    }
  };

  useEffect(() => {
    if (filterRef) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [filterRef]);

  return (
    <>
      <div
        className={`search-bar ${parentClass ?? ''} ${IsFilter && 'search-filter'} ${loading ? 'lazy' : ''}`}
        ref={ref}
      >
        {isSearchIcon && (
          <span className={`search-bar__icon  ${IconparentClass ?? ''}`}>
            <Image iconName="searchStrokeSD" iconClassName="w-full h-full" />
          </span>
        )}
        <input
          type="search"
          placeholder={placeholder || t('InputSearchPlaceholder')}
          name={name ?? 'search'}
          value={value}
          onBlur={onBlurOut}
          onChange={onSearch}
          autoComplete="off"
          className={` ${inputClass ?? ''}`}
        />

        {value && (
          <Button onClickHandler={onClear} className="search-bar__clear">
            <Image iconName="crossIcon" iconClassName="w-full h-full" />
          </Button>
        )}

        {IsFilter && (
          <div className="search-bar__filter z-1" ref={filterRef}>
            <Button
              onClickHandler={() => {
                setFilterVisible(!filterVisible);
              }}
              className="search-bar__filter-button"
            >
              <Image iconName="filter" />
            </Button>
            {filterVisible && (
              // <div className="searchbar-filter-box">{SearchBarChildren}</div>
              <div className="searchbar-filter-box">
                {typeof SearchBarChildren === 'function'
                  ? SearchBarChildren(setFilterVisible)
                  : SearchBarChildren}
              </div>
            )}
          </div>
        )}
      </div>
      {name && <ErrorMessage name={name} />}
    </>
  );
};
export default SearchComponent;
