import { useField } from 'formik';
import ErrorMessage from './ErrorMessage';
import './style/checkbox.css';
import { ICheckboxProps } from './types/index';

const Checkbox = ({
  text,
  name,
  parentClass,
  disabled = false,
  value,
  onChange,
  customClass,
  check,
  showError = true,
  reverse,
  id,
  labelClass,
}: ICheckboxProps) => {
  const [field] = name ? useField(name) : [];
  return (
    <>
      <div className={`checkbox-wrap flex gap-2 ${parentClass}`}>
        {reverse && text && (
          <label className="input-label !mb-0" htmlFor={id}>
            {text}
          </label>
        )}
        <input
          type="checkbox"
          className={`checkbox-input ${customClass ?? ''}  ${
            disabled ? '!cursor-default' : ''
          } `}
          id={id}
          name={name}
          disabled={disabled}
          value={value}
          onChange={!disabled ? (onChange ?? field?.onChange) : undefined}
          checked={check}
        />
        {!reverse && text && (
          <label className={`input-label !mb-0 ${labelClass || ''}`} htmlFor={id}>
            {text}
          </label>
        )}
      </div>
      {name && showError ? <ErrorMessage name={name} /> : ''}
    </>
  );
};

export default Checkbox;
