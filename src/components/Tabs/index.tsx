import Image from 'components/Image';
import SearchComponent from 'components/search';
import React, { Children, cloneElement, useState } from 'react';
import './style/style.css';
import { TabComponentProps, TabProps } from './types';

const TabComponent: React.FC<TabComponentProps> & { Tab: React.FC<TabProps> } = ({
  current,
  children,
  searchable,
  onSearch,
  onTabChange,
  sideComponent,
}: TabComponentProps) => {
  const [currentTabKey, setCurrentTabKey] = useState<string | undefined>(current);

  const handleTabClick = (tabKey: string) => {
    setCurrentTabKey(tabKey);
    if (onTabChange) {
      onTabChange(tabKey);
    }
  };

  const getActiveTabTitle = (): string => {
    const activeTabElement = Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && child.props.uniqueKey === currentTabKey
    );

    if (React.isValidElement<TabProps>(activeTabElement)) {
      return activeTabElement.props.title ?? '';
    }

    return '';
  };

  return (
    <div className="tab-wrapper">
      <div className="tab-header">
        <div className="tab-items">
          {Children.map(children, (child) =>
            React.isValidElement<TabProps>(child)
              ? cloneElement(child, {
                  isActive: child.props.uniqueKey === currentTabKey,
                  onClick: () => handleTabClick(child.props.uniqueKey),
                })
              : null
          )}
        </div>
        {sideComponent}
        {searchable && (
          <SearchComponent
            parentClass="mb-2.5 max-w-[320px]"
            onSearch={onSearch}
            placeholder={`Search ${getActiveTabTitle()}`}
          />
        )}
      </div>
      <div className="tab-content">
        {Children.map(children, (child) =>
          React.isValidElement<TabProps>(child) &&
          child.props.uniqueKey === currentTabKey
            ? child.props.children
            : null
        )}
      </div>
    </div>
  );
};

const Tab: React.FC<TabProps> = ({
  title,
  isActive,
  onClick,
  icon,
  variant,
}: Omit<TabProps, 'children'>) => {
  return (
    <div
      className={`tab-item ${variant || ''} ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon && (
        <span className="inline-block w-4 h-4 me-1">
          <Image iconClassName="w-full h-full" iconName={icon} />
        </span>
      )}
      {title}
    </div>
  );
};

TabComponent.Tab = Tab;

export default TabComponent;
