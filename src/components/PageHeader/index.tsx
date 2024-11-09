import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface PageHeaderProps {
  title?: string;
  titleClass?: string;
  parentClass?: string;
  className?: string;
  children?: React.ReactElement;
  url?: string;
  addSpace?: boolean;
  passState?: { [key: string]: unknown };
  customHandleBack?: () => void;
  showBackButton?: boolean;
}

const PageHeader = ({
  title,
  parentClass,
  className,
  titleClass,
  children,
  url,
  addSpace,
  passState,
  showBackButton = true,
  customHandleBack,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`${url}`, {
      state: passState,
    });
  };
  const getText = () => {
    if (title) {
      if (addSpace) {
        return title.replace(/([A-Z])/g, ' $1');
      }
      return title;
    }
    return '';
  };
  return (
    <div className={`${parentClass ?? ''} page-header `} id="pageHeader">
      <div className={`page-header__inner ${className || ''}`}>
        <div className="left">
          {showBackButton && url ? (
            <Button
              className="back-icon"
              onClickHandler={customHandleBack ?? handleBack}
            >
              <Image iconName="chevronRight" />
            </Button>
          ) : (
            ''
          )}

          <h2 className={` ${titleClass}`}>{getText()}</h2>
        </div>
        <div className="right">{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
