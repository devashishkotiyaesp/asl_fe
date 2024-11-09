import { Link } from 'react-router-dom';
import './index.css';

interface BreadcrumbItem {
  url: string;
  label: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  variant?: 'slash' | 'arrow';
  className?: string;
}

const Breadcrumbs = ({
  items = [],
  variant = 'arrow',
  className = '',
}: BreadcrumbsProps) => {
  return (
    <div className={`breadcrumbs ${variant || ''} ${className}`}>
      <ul>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="breadcrumb-item" key={item.url + index}>
              {isLast ? (
                <span className="text-gray-700 font-medium">{item.label}</span>
              ) : (
                <>
                  <Link to={item.url}>{item.label}</Link>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
