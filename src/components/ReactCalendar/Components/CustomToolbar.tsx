import Button from 'components/Button/Button';
import Image from 'components/Image';
import React from 'react';
import { NavigateAction, ToolbarProps, View } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import { CalendarEvent } from '../types';

// Define the prop types for CustomToolbar
// Extend the ToolbarProps and use the View type for views

interface CustomToolbarProps extends ToolbarProps<CalendarEvent, object> {
  label: string;
  onNavigate: (navigate: NavigateAction, date?: Date) => void; // Match the expected type
  views: View[]; // Correctly type views as an array of View objects
  view: View; // Correctly type view as a View object
  onView: (view: View) => void; // Correctly type the onView function
}
export const CustomToolbar: React.FC<CustomToolbarProps> = ({
  label,
  onNavigate,
  views,
  view,
  onView,
}: CustomToolbarProps) => {
  const { t } = useTranslation();

  // Define custom titles for views
  const customViewTitles = [
    t('Calendar.monthTitle'),
    t('Calendar.weekTitle'),
    t('Calendar.dayTitle'),
  ];

  // Slice the views array if needed
  const newViews = views.slice(0, -1); // Remove last view (if necessary)

  return (
    <div className="rbc-toolbar">
      {/* Navigation Buttons */}
      <div className="rbc-today-button">
        <Button
          variants="PrimaryWoodBorder"
          className="today"
          onClickHandler={() => onNavigate('TODAY')}
        >
          {t('Calendar.todayTitle')}
        </Button>
      </div>

      {/* Label */}
      <div className="rbc-current-content">
        <Button className="prev" onClickHandler={() => onNavigate('PREV')}>
          <Image iconName="chevronLeft" iconClassName="w-8 h-8 stroke-2" />
        </Button>
        <span className="rbc-toolbar-label ">{label}</span>
        <Button className="next" onClickHandler={() => onNavigate('NEXT')}>
          <Image iconName="chevronRight" iconClassName="w-8 h-8 stroke-2" />
        </Button>
      </div>

      {/* View Buttons */}
      <div className="flex flex-wrap gap-2">
        <div className="rbc-btn-group view-group flex items-center view-switch-btn-wrap">
          {newViews.map((viewData, index) => (
            <Button
              key={viewData}
              className={`rbc-btn ${view === viewData ? 'rbc-active' : ''}`}
              onClickHandler={() => onView(viewData)} // Pass the correct View type
            >
              {customViewTitles[index]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
