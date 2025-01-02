import ChevronLeft from 'components/Icon/assets/ChevronLeft';
import ChevronRight from 'components/Icon/assets/ChevronRight';
import { CustomToolbarProps } from '../types';

export const CustomToolbar: React.FC<CustomToolbarProps> = ({
  label,
  onNavigate,
}: CustomToolbarProps) => {
  return (
    <>
      <div className="rbc-toolbar ">
        <div className="rbc-nav-buttons">
          <button className="prev group" onClick={() => onNavigate('PREV')}>
            <ChevronLeft className="w-full h-full stroke-2" />
          </button>
        </div>
        <span className="rbc-toolbar-label ">{label}</span>
        <button className="next group" onClick={() => onNavigate('NEXT')}>
          <ChevronRight className="w-full h-full stroke-2" />
        </button>
      </div>
    </>
  );
};
