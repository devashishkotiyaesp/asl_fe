import { IconTypes } from 'components/Icon/types';
import Image from 'components/Image';
import { REACT_APP_BACKEND_URL } from 'config';
import { useTranslation } from 'react-i18next';
import './index.css';

interface MaterialsBoxProps {
  fileName?: string;
  date?: string;
  // boxVariant?: IconTypes;
  // boxVariant?: 'PDF' | 'XLS' | 'CSV' | 'JPG' | 'PNG';
  boxVariant?: 'filePDF' | 'fileXLS' | 'fileCSV' | 'fileJPG' | 'filePNG';
  isDownload?: boolean;
  fileUrl?: string;
}

const MaterialsBox = ({
  isDownload,
  boxVariant,
  fileName,
  date,
  fileUrl,
}: MaterialsBoxProps) => {
  const { t } = useTranslation();
  const iconName: IconTypes = boxVariant || 'filePDF';
  return (
    <div className="materials-box">
      <div className="inner">
        <div className="materials-box-more-option">
          <Image iconName="threeMoreDots" />
        </div>
        <Image iconName={iconName} />
        <div className="content">
          <p>{fileName || ''}</p>
          <span>{date}</span>
        </div>
      </div>
      {isDownload && (
        <a
          href={`${REACT_APP_BACKEND_URL}${fileUrl}`}
          download={fileName}
          className="materials-box-download"
        >
          {t('MaterialBox.Download')}
          <Image iconName="arrowRight" iconClassName="rotate-90" />
        </a>
      )}
    </div>
  );
};

export default MaterialsBox;
