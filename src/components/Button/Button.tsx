import Loaders from '../Loaders';
import './style/index.css';
import { IButtonProps } from './types';

const getButtonClasses = (variant: string) => {
  switch (variant) {
    case 'black':
      return 'button black ';
    case 'blackBorder':
      return 'button blackBorder ';
    case 'PrimaryWoodBorder':
      return 'button PrimaryWoodBorder ';
    case 'PrimaryWood':
      return 'button PrimaryWood ';
    case 'PrimaryWoodLight':
      return 'button PrimaryWoodLight ';
    case 'PrimaryWoodLightBorder':
      return 'button PrimaryWoodLightBorder ';
    case 'RedOpacity':
      return 'button RedOpacity ';
    case 'Red':
      return 'button Red ';
    case 'GreenOpacity':
      return 'button GreenOpacity ';
    case 'Green':
      return 'button Green ';
    case 'OffWhite':
      return 'button OffWhite ';
    case 'Orange':
      return 'button Orange ';
    case 'Blue':
      return 'button Blue ';
    case 'White':
      return 'button White ';
    default:
      return '';
  }
};

const Button = ({
  small,
  className,
  children,
  type = 'button',
  disabled,
  onClickHandler,
  variants,
  value,
  name,
  isLoading,
  customStyle,
  tooltipText,
  isIcon,
  // parentClass,
}: IButtonProps) => {
  return (
    <>
      {onClickHandler || type !== 'button' ? (
        <button
          type={type}
          style={customStyle}
          disabled={disabled || isLoading}
          className={`${tooltipText ? 'relative group' : ''} 
          ${variants ? getButtonClasses(variants) : ''}  
          ${small ? ' !py-1.5 !px-2.5 !font-normal ' : ''} 
          ${isIcon ? ' !px-2.5 h-fit !font-normal ' : ''} 
          ${isLoading ? 'flex justify-center items-center gap-0.5' : ''}  
          ${className ?? ''}`}
          onClick={onClickHandler}
          name={name}
        >
          {value}
          {children}
          {isLoading && <Loaders className="ms-1" />}
        </button>
      ) : (
        <span
          style={customStyle}
          className={` ${tooltipText ? 'relative group' : ''} ${
            variants ? getButtonClasses(variants) : ''
          } ${isIcon ? ' !px-2.5 h-fit !font-normal ' : ''}  ${className ?? ''}`}
        >
          {value}
          {children}
        </span>
      )}
      {/* <div className={parentClass || ''}>
    </div> */}
    </>
  );
};

export default Button;
