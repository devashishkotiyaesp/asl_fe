import Button from 'components/Button/Button';
import './index.css';

interface StatusLabelProps {
  className?: string;
  text?: string;
  variants?:
    | 'green'
    | 'gray'
    | 'LightWood'
    | 'lightgray'
    | 'lightwoodBorder'
    | 'red';
  style?: React.CSSProperties;
  onClickHandler?: () => Promise<void>;
}

const getLabelvariant = (variant: string) => {
  switch (variant) {
    case 'green':
      return 'green';
    case 'lightgray':
      return 'lightgray';
    case 'lightwoodBorder':
      return 'lightwoodBorder';
    case 'gray':
      return 'gray';
    case 'LightWood':
      return 'LightWood';
    case 'red':
      return 'red';
    default:
      return 'gray';
  }
};

const StatusLabel = ({
  text,
  variants,
  className,
  style,
  onClickHandler,
}: StatusLabelProps) => {
  return (
    <Button
      customStyle={style}
      className={`status-label ${className ?? ''} ${
        variants
          ? getLabelvariant(variants)
          : 'ring-1 ring-gray-200 bg-white text-dark'
      }`}
      onClickHandler={onClickHandler}
    >
      <span className="capitalize">{text}</span>
    </Button>
  );
};

export default StatusLabel;
