import NameBadge from 'components/Badge/NameBadge';
import Icon from 'components/Icon';
import Loaders from 'components/Loaders';
import { REACT_APP_BACKEND_URL } from 'config';
import { useEffect, useState } from 'react';
import { IImageProps } from './interface';

const Image = (props: IImageProps) => {
  const {
    src = '',
    alt,
    imgClassName = '',
    NameBadgeParentClass,
    serverPath = false,
    firstName,
    lastName,
    disableLoader = false,
    iconClassName,
    iconName = 'noImgStrokeSD',
    loaderType = '',
    height,
    width,
    loaderClassName,
    showImageLoader = false,
    isFromDataBase = true,
  } = props;

  const [fetchError, setFetchError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [imageURL, setImageURL] = useState<string | File>('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setImageURL(src || '');
    setIsLoading(false);
  }, [src, height, width, serverPath]);

  const imgComponent = () => {
    if (imageURL) {
      if (fetchError) {
        return (
          <img
            className={`block ${imgClassName}`}
            src="/images/no-image.png"
            alt={`${alt ?? src}`}
          />
        );
      }

      return (
        <img
          className={`${!isImageLoaded ? 'hidden' : 'block'} ${imgClassName}`}
          src={
            isFromDataBase
              ? `${(REACT_APP_BACKEND_URL as string) + imageURL}`
              : (imageURL as string)
          }
          alt={`${alt ?? src}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setFetchError(true);
            setIsImageLoaded(true);
          }}
          height={height}
          width={width}
        />
      );
    }
    return <Icon className={iconClassName} name={iconName} />;
  };

  return (
    <>
      {!disableLoader && loaderType && <Loaders className={loaderClassName} />}
      {(firstName || lastName) && (
        <NameBadge
          parentClass={NameBadgeParentClass}
          FirstName={firstName ?? ''}
          LastName={lastName ?? ''}
        />
      )}
      {isLoading ||
        (!disableLoader && !isImageLoaded && imageURL && showImageLoader && (
          <Loaders className={loaderClassName} />
        ))}
      {imgComponent()}
    </>
  );
};

export default Image;
