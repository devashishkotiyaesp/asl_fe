import Button from 'components/Button/Button';
import Image from 'components/Image';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import '../style/fileInput.css';
import { fileInputProps } from '../types';
import { FileDisplay } from './FileInput';

const FileInputXLS = ({
  value,
  Ref,
  isMulti,
  limit,
  setValue,
  name,
  index,
  size,
  fileType,
  fileInputIcon,
  Title,
  SubTitle,
  selectedFileIcon,
}: fileInputProps) => {
  const removeFile = () => {
    if (Ref?.current) Ref.current.value = '';
    if (!isMulti) {
      setValue(name, null);
    } else if (!_.isUndefined(index)) {
      const temp = [...(value as Array<File | string>)];
      temp.splice(index, 1);
      setValue(name, temp);
    }
  };
  const { t } = useTranslation();
  const FileName = isMulti ? (value as Array<File>)[0]?.name : (value as File)?.name;
  return (
    <div>
      <label className="file-input-xls-label-style" htmlFor="FileInputId">
        {(isMulti || (!isMulti && !value)) && (
          <div
            className="flex flex-col justify-center items-center h-full"
            onKeyDown={(e) => e.preventDefault()}
            onClick={() => Ref?.current && Ref?.current.click()}
          >
            <Button className="xls-icon-wrap ">
              <div className="icon">
                <Image
                  iconClassName="w-6 h-6"
                  iconName={fileInputIcon ?? 'xlsFile'}
                />
              </div>
            </Button>
            <p className="mt-4 text-base font-semibold leading-5">
              {t('FileInputXLS.dragText')}
            </p>
            <p className="mt-2 text-xs text-grayText leading-4">
              {SubTitle ?? t('FileInputXLS.maxFileSize')}
            </p>
            <Button className="upload-small-text">
              {Title ?? t('FileInputXLS.browseText')}
            </Button>
          </div>
        )}
        {value && !isMulti && (
          <div className="xls-inner">
            <Button className="xls-icon-wrap ">
              <div className="icon">
                <Image
                  iconName={fileInputIcon ?? 'xlsFile'}
                  width={64}
                  height={64}
                  iconClassName="w-6 h-6"
                  alt="File Icon"
                />
              </div>
            </Button>
            <p className="xls-uploaded-file">{FileName}</p>
            <Button
              className="xls-file-remove-btn"
              onClickHandler={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile();
              }}
            >
              Remove
              {/* {t('FileInputXLS.removeFile')} */}
            </Button>
          </div>
        )}
      </label>
      {isMulti && !_.isEmpty(value) && (
        <div className="flex flex-wrap gap-3 p-4 border border-solid border-gray-200 rounded-xl mt-3">
          {(value as Array<File | string>).map((item, i) => (
            <div key={`fileUploadXls_${i + 1}`}>
              <FileDisplay
                value={item}
                Ref={Ref}
                key={`fileUpload_${i + 1}`}
                index={i}
                isMulti={isMulti}
                setValue={setValue}
                Values={value as Array<File | string>}
                name={name}
                size={size}
                fileType={fileType}
                limit={limit}
                selectedFileIcon={selectedFileIcon}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInputXLS;
