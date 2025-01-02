import _ from 'lodash';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// ** redux **

// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import ErrorMessage from './ErrorMessage';

// ** type **

// ** const **
import {
  imageExtension,
  imageSize,
  otherSize,
  videoExtension,
  videoSize,
} from 'constants/filesupport.constant';

// ** Enum **
import { EnumFileType } from './enum';

// ** style **
// import './style/inputFileField.css';

// ** utils **
import { ToastVariant } from 'constants/common.constant';
import { useModal } from 'hooks/useModal';
import CaptureImageModal from 'modules/Community/CaptureImage';
import { removeToast, setToast } from 'reduxStore/slices/toastSlice';
import { customRandomNumberGenerator } from 'utils';
import { FieldValueTye } from './types';

const checkValidImageSize = (value: File | Blob, size: number) => {
  return value.size <= size * 1000000;
};

export interface IInputFileFieldProp {
  name: string;
  value: File | string | Array<File | string> | null;
  acceptTypes?: string;
  size?: number;
  fileType?: EnumFileType | string;
  isMulti?: boolean;
  id?: string;
  limit?: number;
  className?: string;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  isControls?: boolean;
}

const InputFileField = ({
  name,
  value,
  acceptTypes = '*/*',
  size,
  fileType,
  id,
  limit = 5,
  isMulti,
  className,
  setValue,
  isControls = true,
}: IInputFileFieldProp) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    if (isMulti && event?.target?.files) {
      if (event?.target?.files?.length <= limit) {
        const media: File[] = [];
        Array(event.target.files.length)
          .fill(0)
          .forEach((_, index) => {
            if (event.target.files) media.push(event.target.files[index]);
          });

        if ((value as Array<File | string>).length < limit) {
          setValue(name, [...(value as Array<File | string>), ...media]);
        } else {
          const random = customRandomNumberGenerator();
          dispatch(
            setToast({
              variant: 'Error',
              message: `${t('ToastMessage.notUploadMoreFileText')} ${limit} ${t(
                'ToastMessage.items'
              )}`,
              type: 'error',
              id: random,
            })
          );
          setTimeout(() => {
            dispatch(removeToast({ id: random }));
          }, 2000);
        }
      } else {
        const random = customRandomNumberGenerator();
        dispatch(
          setToast({
            variant: 'Error',
            message: `${t('ToastMessage.notUploadMoreFileText')} ${limit} ${t(
              'ToastMessage.items'
            )}`,
            type: 'error',
            id: random,
          })
        );
      }
    } else if (event?.target?.files && event?.target?.files?.length > 0) {
      setValue(name, event.target.files[0]);
    }
  };
  const captureImageModal = useModal();

  const handleCapturedImage = (
    capturedImages: Array<File>,
    value: FieldValueTye
  ) => {
    if (isMulti) {
      const newFiles = Array.isArray(capturedImages)
        ? capturedImages
        : [capturedImages];
      if (newFiles.length + (value as Array<File>).length <= limit) {
        setValue(name, [...(value as Array<File>), ...newFiles]);
      } else {
        const random = customRandomNumberGenerator();
        dispatch(
          setToast({
            variant: ToastVariant.ERROR,
            message: `${t('ToastMessage.notUploadMoreFileText', { FILES: limit })} `,
            type: 'error',
            id: random,
          })
        );
      }
    } else {
      setValue(
        name,
        Array.isArray(capturedImages) ? capturedImages[0] : capturedImages
      );
    }

    captureImageModal.closeModal();
  };

  return (
    <>
      <div className={`sticky-post-icons ${className ?? ''}`}>
        <label htmlFor={id} className="sticky-post-input-attach">
          <Image iconName="plus" />
        </label>

        <Button
          onClickHandler={captureImageModal.openModal}
          className="sticky-post-capture"
        >
          <Image iconName="camera" />
        </Button>

        <input
          id={id}
          type="file"
          ref={inputRef}
          accept={acceptTypes}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChangeEvent(event);
          }}
          multiple={isMulti}
          hidden
        />

        {value && !isMulti && (
          <FileDisplay
            value={value as File | string}
            setValue={setValue}
            name={name}
            Ref={inputRef}
            size={size}
            fileType={fileType}
            isControls={isControls}
          />
        )}

        {isMulti && !_.isEmpty(value) && (
          <div className="sticky-post-uploaded-media-wrap">
            {(value as Array<File | string>).map((item, i) => (
              <>
                {(value as Array<File | string>)[i] && (
                  <FileDisplay
                    value={item}
                    Ref={inputRef}
                    key={`${i + 1}_fileDisplay`}
                    index={i}
                    isMulti={isMulti}
                    setValue={setValue}
                    Values={value as Array<File | string>}
                    name={name}
                    size={size}
                    fileType={fileType}
                    limit={limit}
                    isControls={isControls}
                  />
                )}
              </>
            ))}
          </div>
        )}
      </div>
      <CaptureImageModal
        value={value}
        onCapture={handleCapturedImage}
        modal={captureImageModal}
      />
      <ErrorMessage name={name} />
    </>
  );
};

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
  isControls,
}: any) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [type, setType] = useState<EnumFileType>(EnumFileType.Document);
  const [source, setSource] = useState<string>();
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
    if (fileType && fileType !== checkFileType) {
      dispatch(
        setToast({
          variant: 'Error',
          message: `${t('ToastMessage.validFileTypeText')} ${fileType}`,
          type: 'error',
          id: customRandomNumberGenerator(),
        })
      );
      removeFile();
    }
    if (!checkValidImageSize(fileValue, fileSize)) {
      dispatch(
        setToast({
          variant: 'Error',
          message: `${checkFileType} ${t(
            'ToastMessage.validFileSizeText'
          )} ${fileSize} MB`,
          type: 'error',
          id: customRandomNumberGenerator(),
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

  const renderNestedType = (
    fileNestedType: string,
    defaultSource: string | undefined
  ) => {
    switch (fileNestedType) {
      case EnumFileType.Image:
        return (
          <div className="h-full w-full">
            <Image
              src={source}
              imgClassName={`w-full h-full object-cover rounded-xl bg-black/50 `}
              alt="sourceImage"
              width={120}
              height={60}
              isFromDataBase={isStringValue}
            />
          </div>
        );
      case EnumFileType.Video:
        return (
          <div className="h-full w-full">
            <video
              key={source}
              controls={isControls}
              width="100%"
              height="100%"
              className="rounded-xl w-full h-full object-contain"
            >
              <track kind="captions" />
              <source src={source} />
            </video>
          </div>
        );
      default:
        return (
          defaultSource && (
            <div className="flex gap-2.5 items-center  max-w-[calc(100%_-_50px)]">
              <Image iconName="fileIcon" iconClassName="w-7 h-7 text-primary" />

              <Button className="inline-block truncate h-fit">
                {typeof value !== 'string'
                  ? value.name
                  : (value.split('/')[value.split('/').length - 1] ?? 'file')}
              </Button>
            </div>
          )
        );
    }
  };

  return (
    <div className="sticky-post-uploaded-media">
      {renderNestedType(type, source)}
      <div className="sticky-post-uploaded-media__action">
        <Button
          type="button"
          className="icon"
          onClickHandler={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeFile();
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
        {/* <Button type="button" className="icon">
          <Image iconName="eyeIcon" />
        </Button> */}
      </div>
    </div>
  );
};

export default InputFileField;
