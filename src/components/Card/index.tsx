import Button from 'components/Button/Button';
import ChevronLeft from 'components/Icon/assets/ChevronLeft';
import './index.css';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  headerExtra?: React.ReactNode;
  className?: string;
  headerClass?: string;
  bigTitle?: boolean;
  isGray?: boolean;
  minimal?: boolean;
  backArrow?: boolean;
  onClickData?: () => void;
}

const Card = ({
  title,
  children,
  headerExtra,
  className,
  isGray,
  minimal,
  bigTitle,
  headerClass,
  backArrow,
  onClickData,
}: CardProps) => {
  return (
    <div
      className={`c-card ${className ?? ''} ${isGray ? 'card-gray' : ''} ${minimal ? 'card-minimal' : ''}`}
    >
      {title || headerExtra ? (
        <div className={`c-card__header  ${headerClass}`}>
          {title ? (
            <div
              className={`c-card__title flex items-center gap-[14px] leading-none ${bigTitle ? 'big-text' : ''}`}
            >
              {backArrow && (
                <Button
                  className="w-6 h-6 rounded-full bg-PrimaryWood flex items-center justify-center"
                  onClickHandler={onClickData}
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </Button>
              )}
              <span>{title}</span>
            </div>
          ) : (
            ''
          )}
          {headerExtra ? (
            <div className="c-card__header-extra">{headerExtra}</div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {children ? (
        <div className={`c-card__body ${!title && !headerExtra ? 'no-header' : ''}`}>
          {children}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Card;
