import Image from 'components/Image';
import { INoDataFoundProps } from './types';

const NoDataFound = ({
  message,
  className,
  desc,
  iconName,
  noDataClass,
}: INoDataFoundProps) => {
  const imageProps = iconName
    ? { iconName, iconClassName: 'w-[100px] m-auto mb-4' }
    : {
        src: 'https://cdn-icons-png.flaticon.com/512/7486/7486754.png',
        imgClassName: 'w-[100px] m-auto mb-4',
      };

  return (
    <div className={`py-4 text-center rounded-10px ${className ?? ''}`}>
      <div>
        <Image {...imageProps} alt="No Data Found" />

        <p
          className={`${
            noDataClass ?? 'text-dark text-xl font-semibold max-w-[345px] mx-auto'
          }`}
        >
          {message ?? 'No Data Found'}
        </p>
        <p className="max-w-[345px] mx-auto mt-2.5 text-base text-navText px-4 text-balance">
          {desc ?? 'No Data Found Desc'}
        </p>
      </div>
    </div>
  );
};

export default NoDataFound;
