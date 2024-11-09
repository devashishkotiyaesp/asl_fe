import Button from 'components/Button/Button';
import ErrorMessage from 'components/FormElement/ErrorMessage';
import Image from 'components/Image';
import { RefObject } from 'react';
import './index.css';

interface SearchInputProps {
  placeholder?: string;
  value?: string | number;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurOut?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onClear?: () => void;
  parentClass?: string;
  IconparentClass?: string;
  inputClass?: string;
  ref?: RefObject<HTMLDivElement>;
  isSearchIcon?: boolean;
  loading?: boolean;
  name?: string;
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
}: SearchInputProps) => {
  return (
    <>
      <div
        className={`search-bar ${parentClass ?? ''}  ${loading ? 'lazy' : ''}`}
        ref={ref}
      >
        {isSearchIcon && (
          <span className={`search-bar__icon  ${IconparentClass ?? ''}`}>
            <Image iconName="searchStrokeSD" iconClassName="w-full h-full" />
          </span>
        )}
        <input
          type="search"
          placeholder={placeholder}
          name={name ?? 'search'}
          value={value}
          onBlur={onBlurOut}
          onChange={onSearch}
          autoComplete="off"
          className={` ${inputClass ?? ''}`}
        />

        {value && (
          <Button onClickHandler={onClear} className="searc-bar__clear">
            <Image iconName="crossIcon" iconClassName="w-full h-full" />
          </Button>
        )}
      </div>
      {name && <ErrorMessage name={name} />}
    </>
  );
};
export default SearchComponent;
