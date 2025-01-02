import Button from 'components/Button/Button';
import Image from 'components/Image';
import { REACT_APP_BACKEND_URL } from 'config';
import { ToastVariant } from 'constants/common.constant';
import { IMAGE_SUPPORTED_FORMATS } from 'constants/filesupport.constant';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToast } from 'reduxStore/slices/toastSlice';
import { getPresignedImageUrl } from 'services/aws.service';
import { customRandomNumberGenerator } from 'utils';
import '../style/ProfilePictureUpload.css';

interface FileInputProps {
  acceptTypes?: string;
  parentClass?: string;
  setValue: (
    field: string,
    value: (string | File)[] | File | null,
    shouldValidate?: boolean
  ) => void;
  name: string;
  value: File | string | null;
  label?: string;
  isCompulsory?: boolean;
  isBig?: boolean;
}

const ProfilePictureUpload = ({
  parentClass,
  setValue,
  name,
  value,
  label,
  acceptTypes,
  isCompulsory = false,
  isBig,
}: FileInputProps) => {
  const maxSize = 5 * 1024 * 1024;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [source, setSource] = useState<string>('');
  const [loading, setLoading] = useState(false);
  // const [isCurrentFromDataBase, setIsCurrentFromDataBase] = useState(false);
  const dispatch = useDispatch();
  const [isFromDataBase, setIsFromDatabase] = useState(true);

  const removeFile = () => {
    if (inputRef?.current) inputRef.current.value = '';
    setValue(name, null);
  };
  const getUrl = async (path: string) => {
    const url = await getPresignedImageUrl(path, undefined, undefined, true);
    return url;
  };
  useEffect(() => {
    fetchUrl();
  }, [value]);

  const fetchUrl = async () => {
    try {
      let url = '';
      if (typeof value === 'string') {
        if (!isFromDataBase) {
          url = await getUrl(value);
        } else {
          setIsFromDatabase(true);
          if (value.toString().includes('https://')) {
            url = value;
          } else {
            url = `${(REACT_APP_BACKEND_URL as string) + value}`;
          }
        }
      } else if (value instanceof File) {
        url = window.URL.createObjectURL(value);
        // setIsCurrentFromDataBase(false);
      } else {
        url = '/images/no-image.png';
      }
      setSource(url);
    } catch (error) {
      setSource('/images/no-image.png');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`relative ${isBig && 'profile-big'} ${parentClass ?? ''}`}>
      {label && (
        <label className="input-label">
          {label}
          {isCompulsory && <span className="text-darkred">*</span>}
        </label>
      )}
      <div className="upload-profile-wrap   ">
        <label htmlFor={`${!value ? 'ProfileIMG' : ''}`} className="block w-full">
          <Link
            className={`upload-profile-link  ${value ? '' : 'pointer-events-none'}`}
            to={source}
            target="_blank"
            data-fancybox
          >
            {loading && (
              <div className="upload-profile-loader ">
                <Image loaderType="Spin" />
              </div>
            )}
            <span className="block w-full h-full">
              <img src={source} className="profile-image" alt="" />
            </span>
          </Link>
          <input
            type="file"
            name=""
            hidden
            ref={inputRef}
            accept={acceptTypes}
            id="ProfileIMG"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              // setIsCurrentFromDataBase(false);
              setLoading(true);
              if (
                !IMAGE_SUPPORTED_FORMATS.includes(
                  event?.target?.files?.[0]?.type as string
                )
              ) {
                const random = customRandomNumberGenerator();
                dispatch(
                  setToast({
                    variant: ToastVariant.ERROR,
                    message: `Image type is invalid`,
                    type: 'error',
                    id: random,
                  })
                );
                setLoading(false);
                return;
              }
              if (event?.target?.files && event?.target?.files.length) {
                if (event.target.files[0].size > maxSize) {
                  const random = customRandomNumberGenerator();

                  dispatch(
                    setToast({
                      variant: ToastVariant.ERROR,
                      message: `Profile image size should be less than 5 mb`,
                      type: 'error',
                      id: random,
                    })
                  );
                  setLoading(false);
                } else {
                  setValue(name, event.target.files[0]);
                }
              }
            }}
            className="w-[95px]"
          />
          {!value && (
            <Button className="upload-icon-btn">
              <Image iconName="camera" iconClassName="w-full h-full" />
            </Button>
          )}
        </label>

        {value && (
          <span className="upload-icon-remove-btn ">
            <span onKeyDown={(e) => e.preventDefault()} onClick={removeFile}>
              <Image iconName="crossIcon" iconClassName="w-full h-full" />
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
