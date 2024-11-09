import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_BACKEND_URL } from 'config';
import { ToastVarient } from 'constants/common.constant';
import {
  FILE_SUPPORTED_FORMATS,
  imageExtension,
  imageSize,
  otherSize,
  videoExtension,
  videoSize,
} from 'constants/filesupport.constant';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setToast } from 'reduxStore/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';
import { EnumFileType } from '../enum';
import '../style/fileInput.css';
import { fileInputProps, IFileFileDisplay } from '../types';

const checkValidImageSize = (value: File | Blob, size: number) => {
  return value.size <= size * 1000000;
};

const FileInput = ({
  SubTitle,
  isMulti = false,
  limit,
  value,
  setValue,
  name,
  Ref,
  size,
  fileType,
  fileInputIcon,
  uploadedMediaClass,
  labelClass,
}: fileInputProps) => {
  const { t } = useTranslation();
  return (
    <>
      <label
        className={`file-input-label-style ${labelClass}`}
        htmlFor="FileInputId"
      >
        {/* {(isMulti || (!isMulti && !value)) && ( */}
        <div
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => Ref?.current && Ref?.current.click()}
          className="flex flex-col justify-center items-center h-full"
        >
          <Button className="upload-media-icon">
            {fileInputIcon ? (
              <Image iconName={fileInputIcon} iconClassName="w-full h-full" />
            ) : (
              <Image iconName="camera" iconClassName="w-full h-full" />
            )}
          </Button>

          {SubTitle ? (
            <span className="upload-small-text">{SubTitle}</span>
          ) : (
            <span className="mt-2.5 block text-sm leading-5 text-grayText">
              {t('FileInputText.dragText')} &nbsp;
              <span className="text-ic_1 underline">
                {t('FileInputText.browseText')}
              </span>
            </span>
          )}
        </div>
        {/* // )} */}
      </label>
      {value && !isMulti && (
        <FileDisplay
          value={value as File | string}
          setValue={setValue}
          name={name}
          Ref={Ref}
          size={size}
          fileType={fileType}
          uploadedMediaClass={uploadedMediaClass}
        />
      )}
      {isMulti && !_.isEmpty(value) && (
        <div className="multi-upload-wrap">
          {Array.isArray(value) &&
            (value as Array<File | string>).map((item, i) => (
              <FileDisplay
                key={`itemFile_${i + 1}`}
                value={item}
                Ref={Ref}
                index={i}
                isMulti={isMulti}
                setValue={setValue}
                Values={value as Array<File | string>}
                name={name}
                size={size}
                fileType={fileType}
                limit={limit}
                uploadedMediaClass={uploadedMediaClass}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default FileInput;

export const FileDisplay = ({
  value,
  setValue,
  index,
  isMulti = false,
  Values = [],
  name,
  Ref,
  size,
  fileType,
  selectedFileIcon,
  uploadedMediaClass,
}: IFileFileDisplay) => {
  const [type, setType] = useState<EnumFileType>(EnumFileType.Document);
  const [source, setSource] = useState<string>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isStringValue = typeof value === 'string';
  const checkExtension = () => {
    if (isStringValue) {
      const format = value.substring(value.lastIndexOf('.')).toLowerCase();
      let tempFileType: EnumFileType;
      if (imageExtension.includes(format)) {
        tempFileType = EnumFileType.Image;
      } else if (videoExtension.includes(format)) {
        tempFileType = EnumFileType.Video;
      } else tempFileType = EnumFileType.Document;

      setType(tempFileType);
      // setSource(value);
      // api for displaying images
      setSource(value);
    } else {
      const fileTypeMap: Record<string, EnumFileType> = {
        image: EnumFileType.Image,
        video: EnumFileType.Video,
        document: EnumFileType.Document,
      };

      const typePrefix = value?.type?.split('/')[0];

      const format = typePrefix?.toLowerCase();
      setType(fileTypeMap[format]);

      setSource(window?.URL?.createObjectURL(value));

      let sizeValue: number;
      if (format === 'image') sizeValue = imageSize;
      else if (format === 'video') sizeValue = videoSize;
      else sizeValue = otherSize;
      const sizeToUse = size ?? sizeValue;
      checkAndRemove(value, fileTypeMap[format] || EnumFileType.Document, sizeToUse);
    }
  };

  useEffect(() => {
    if (value) {
      checkExtension();
    }
  }, [value]);

  const checkAndRemove = (
    fileValue: File,
    checkFileType: EnumFileType,
    fileSize: number
  ) => {
    if (fileType) {
      const fileTypeCheck = !_.isArray(fileType)
        ? fileType !== checkFileType
        : !fileType.includes(checkFileType);
      const isSupported =
        checkFileType === EnumFileType.Document
          ? FILE_SUPPORTED_FORMATS.every((item) => item !== fileValue.type)
          : false;
      if (fileTypeCheck || isSupported) {
        const fileTypeRandom = customRandomNumberGenerator();
        dispatch(
          setToast({
            variant: ToastVarient.ERROR,
            message: `${t('ToastMessage.validFileTypeText')} ${fileType}`,
            type: 'error',
            id: fileTypeRandom,
          })
        );
        removeFile();
      }
    }
    if (!checkValidImageSize(fileValue, fileSize)) {
      const sizeRandom = customRandomNumberGenerator();
      dispatch(
        setToast({
          message: `${checkFileType} ${t(
            'ToastMessage.validFileSizeText'
          )} ${fileSize} MB`,
          type: 'error',
          id: sizeRandom,
          variant: ToastVarient.ERROR,
        })
      );
      removeFile();
    }
  };

  const removeFile = () => {
    if (Ref?.current) Ref.current.value = '';
    if (!isMulti) {
      setValue(name, null);
    } else if (!_.isUndefined(index)) {
      const temp = [...Values];
      temp.splice(index, 1);
      setValue(name, temp);
    }
  };

  const renderNestedType = (fileNestedType: string, defaultSource?: string) => {
    switch (fileNestedType) {
      case EnumFileType.Image:
        return (
          <div className="media-icon">
            <Image
              src={source}
              imgClassName="w-full h-full rounded-md object-contain"
              alt=""
              width={150}
              height={150}
              isFromDataBase={isStringValue}
            />
            <Button
              onClickHandler={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile();
              }}
              className="file-input-button-style"
            >
              <Image iconName="trashIcon" iconClassName="w-full h-full" />
            </Button>
          </div>
        );
      case EnumFileType.Video:
        return (
          <div className="uploaded-video-wrap">
            <video
              key={source}
              controls
              width={150}
              height={150}
              className="w-full h-full rounded-md"
            >
              <track kind="captions" />
              <source
                src={
                  isStringValue ? (REACT_APP_BACKEND_URL as string) + source : source
                }
              />
            </video>
            <Button
              onClickHandler={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile();
              }}
              className="file-input-button-style"
            >
              <Image iconName="trashIcon" iconClassName="w-full h-full" />
            </Button>
          </div>
        );
      default:
        return (
          defaultSource && (
            <div>
              <div className="w-20 h-20 relative bg-primary/10 mx-auto border border-solid border-primary/20 rounded-lg p-2.5 mb-2">
                <Image
                  iconName={selectedFileIcon ?? 'fileIcon'}
                  iconClassName="w-full h-full text-primary"
                />

                <Button
                  onClickHandler={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="file-input-button-style"
                >
                  <Image iconName="crossIcon" iconClassName="w-full h-full" />
                </Button>
              </div>
              <div className="text-sm font-semibold text-dark/50 max-w-[100px] truncate">
                {typeof value !== 'string'
                  ? value.name
                  : (value.split('/')[value.split('/').length - 1] ?? 'file')}
              </div>
            </div>
          )
        );
    }
  };

  return (
    <div className={`uploaded-media-wrap group ${uploadedMediaClass}`}>
      {renderNestedType(type, source)}
    </div>
  );
};
