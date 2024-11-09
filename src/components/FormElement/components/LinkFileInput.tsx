import Button from 'components/Button/Button';
import LinkFileDisplay from '../LinkFileDisplay';

// ** style **
import '../style/fileInput.css';

// ** type **
import Image from 'components/Image';
import _ from 'lodash';
import { fileInputProps } from '../types';

const LinkFileInput = ({
  isMulti = false,
  value,
  setValue,
  limit,
  name,
  Ref,
  isSendMail,
  isBlack = false,
  Title,
}: fileInputProps) => {
  // const { t } = useTranslation();

  return (
    <div>
      <label className="file-input-link-label-style" htmlFor="FileInputId">
        {(isMulti || (!isMulti && !value)) && (
          <div
            className="link-file-input-wrap "
            onKeyDown={(e) => e.preventDefault()}
            onClick={() => Ref?.current && Ref?.current.click()}
          >
            <Button className="link-file-input-icon">
              <Image iconName="linkIcon" iconClassName="w-full h-full" />
            </Button>
            <span className="block text-sm leading-5 text-grayText">
              {Title}
              {/* {t('FileInputLink.selectText')} */}
            </span>
          </div>
        )}
        {(value as File | string) && !isMulti && (
          <LinkFileDisplay
            name={name}
            Ref={Ref}
            isMulti={isMulti}
            setValue={setValue}
            filename={name}
            crossButton
            filepath={value as File | string}
            isSendMail={isSendMail}
            isBlack={isBlack}
          />
        )}
      </label>
      <div className="flex flex-col gap-3 rounded-xl mt-4 empty:hidden">
        {isMulti &&
          !_.isEmpty(value) &&
          [...Array(isMulti ? limit : 1)].map(
            (_, i) =>
              (value as Array<File | string>)[i] && (
                <LinkFileDisplay
                  key={`file_${i + 1}`}
                  name={name}
                  Ref={Ref}
                  isMulti={isMulti}
                  setValue={setValue}
                  index={i}
                  Values={value as Array<File | string>}
                  filename={name}
                  crossButton
                  filepath={(value as Array<File | string>)[i]}
                  id={i}
                  isSendMail={isSendMail}
                  isBlack={isBlack}
                />
              )
          )}
      </div>
    </div>
  );
};

export default LinkFileInput;
