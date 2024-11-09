import { MouseEventHandler } from 'react';

export interface IButtonProps {
  parentClass?: string;
  type?: 'button' | 'submit' | 'reset';
  value?: string;
  className?: string;
  spanClass?: string;
  small?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClickHandler?: MouseEventHandler<HTMLElement>;
  name?: string;
  isLoading?: boolean;
  isIcon?: boolean;
  customStyle?: React.CSSProperties;
  variants?:
    | 'black'
    | 'blackBorder'
    | 'OffWhite'
    | 'PrimaryWood'
    | 'PrimaryWoodBorder'
    | 'PrimaryWoodLight'
    | 'PrimaryWoodLightBorder'
    | 'Green'
    | 'GreenOpacity'
    | 'Red'
    | 'Orange'
    | 'Blue'
    | 'White'
    | 'RedOpacity';
  tooltipText?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}
