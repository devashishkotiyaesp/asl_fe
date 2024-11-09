import { ToastVarient } from 'constants/common.constant';
import { ChangeEvent, DragEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setToast } from 'reduxStore/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';
import { fileInputEnum } from './enum';
import ErrorMessage from './ErrorMessage';
import FileUploadVariants from './FileUploadVariants';
import './style/dropzone.css';
import { IInputFileField } from './types';

const DropZone = ({
  SubTitle,
  setValue,
  variant = fileInputEnum.FileInput,
  name,
  value,
  acceptTypes = '*/*',
  size,
  fileType,
  label,
  id,
  isCompulsory,
  parentClass,
  isMulti,
  Title,
  limit = 5,
  labelClass,
  fileInputIcon,
  isLoading = false,
  isSendMail = false,
  selectedFileIcon,
  dropdownInnerClass,
  uploadedMediaClass,
}: IInputFileField) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement> | DragEvent) => {
    const droppedFiles =
      'dataTransfer' in event
        ? event.dataTransfer?.files
        : (event.target as HTMLInputElement).files;

    if (droppedFiles) {
      if (isMulti) {
        if (droppedFiles.length <= limit) {
          const media = Array.from(droppedFiles);
          if (media.length + (value as Array<File>).length <= limit) {
            setValue(name, [...(value as Array<File>), ...media]);
          } else {
            const random = customRandomNumberGenerator();
            dispatch(
              setToast({
                variant: ToastVarient.ERROR,
                message: `${t('ToastMessage.notUploadMoreFileText')} ${limit} ${t(
                  'ToastMessage.items'
                )}`,
                type: 'error',
                id: random,
              })
            );
          }
        } else {
          const random = customRandomNumberGenerator();
          dispatch(
            setToast({
              variant: ToastVarient.ERROR,
              message: `${t('ToastMessage.notUploadMoreFileText')} ${limit} ${t(
                'ToastMessage.items'
              )}`,
              type: 'error',
              id: random,
            })
          );
        }
      } else {
        // For single file selection
        setValue(name, droppedFiles[0]);
      }
    }

    if (event.preventDefault) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div
        className={`w-full drop-box ${parentClass ?? ''}`}
        id="drop-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e: DragEvent) => {
          handleFileChange(e);
        }}
      >
        {isLoading ? (
          <div
            className={`lazy ${
              variant === fileInputEnum.FileInput ? 'h-[120px]' : ''
            }
              ${variant === fileInputEnum.FileInputXLS ? 'h-[220px]' : ''}
              ${variant === fileInputEnum.LinkFileInput ? 'h-[50px]' : ''}
            }`}
          />
        ) : (
          <div>
            {label && (
              <label
                className={`drop-box-label input-label ${labelClass ?? ''}`}
                htmlFor={name}
              >
                {label}
                {isCompulsory && <span className="text-red-700">*</span>}
              </label>
            )}
            <div>
              <div className="hidden">
                <input
                  id={id}
                  type="file"
                  style={{ display: 'none' }}
                  ref={inputRef}
                  accept={acceptTypes}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleFileChange(event);
                  }}
                  multiple={isMulti}
                />
              </div>
              <div className={`${dropdownInnerClass} input-file-wrapper`}>
                {FileUploadVariants(variant, {
                  isMulti,
                  limit,
                  value: value as File | string,
                  setValue,
                  name,
                  Ref: inputRef,
                  size,
                  fileType,
                  fileInputIcon,
                  SubTitle,
                  Title,
                  isSendMail,
                  selectedFileIcon,
                  uploadedMediaClass,
                  labelClass,
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <ErrorMessage name={name} />
    </>
  );
};

export default DropZone;
