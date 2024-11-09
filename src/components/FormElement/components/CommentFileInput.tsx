import Button from 'components/Button/Button';
import Image from 'components/Image';
import _ from 'lodash';
import '../style/fileInput.css';
import { fileInputProps } from '../types';
import { FileDisplay } from './FileInput';

const CommentFileInput = ({
  isMulti = false,
  limit,
  value,
  setValue,
  name,
  Ref,
  size,
  fileType,
  fileInputIcon,
}: fileInputProps) => {
  return (
    <>
      <label htmlFor="FileInputId">
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
              />
            ))}
        </div>
      )}
    </>
  );
};

export default CommentFileInput;
