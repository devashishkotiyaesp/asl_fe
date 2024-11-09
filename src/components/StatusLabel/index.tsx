import Button from 'components/Button/Button';
import './index.css';

interface StatusLabelProps {
  className?: string;
  text?: string;
  variants?: 'green' | 'gray' | 'LightWood';
  style?: React.CSSProperties;
}

const getLabelvariant = (variant: string) => {
  switch (variant) {
    case 'green':
      return 'green';
    case 'gray':
      return 'gray';
    case 'LightWood':
      return 'LightWood';
    default:
      return 'gray';
  }
};

const StatusLabel = ({ text, variants, className, style }: StatusLabelProps) => {
  return (
    <Button
      customStyle={style}
      className={`status-label ${className ?? ''} ${
        variants
          ? getLabelvariant(variants)
          : 'ring-1 ring-gray-200 bg-white text-dark'
      }`}
    >
      <span className="capitalize">{text}</span>
    </Button>
  );
};

export default StatusLabel;
