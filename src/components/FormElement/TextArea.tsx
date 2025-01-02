import { useField } from 'formik';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import './style/inputField.css';
import { ITextAreaProps } from './types';

const TextArea: React.FC<ITextAreaProps> = ({
  name,
  label,
  id,
  rows,
  cols,
  placeholder,
  parentClass,
  isCompulsory,
  disabled,
  icon,
  maxLength,
  labelClass,
  className,
  onChange,
}) => {
  const [field] = useField(name);
  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   field.onChange(e);
  //   if (onChange) onChange(e);
  // };
  return (
    <div className={`w-full ${parentClass ?? ''}`}>
      {label && (
        <label className={`input-label ${labelClass || ''}`} htmlFor={name}>
          {label}
          {isCompulsory && <span className="text-red-700">*</span>}
        </label>
      )}
      <textarea
        className={`inputField ${className ?? ''}`}
        maxLength={maxLength}
        {...field}
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        disabled={disabled ?? false}
        value={field.value ?? ''}
        placeholder={placeholder}
        onChange={onChange ?? field.onChange}
      />
      <ErrorMessage name={name} />
      {icon}
    </div>
  );
};

export default TextArea;
