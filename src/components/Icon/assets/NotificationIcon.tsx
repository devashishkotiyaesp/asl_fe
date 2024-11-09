import { IconInputProps } from '../types/icons';

const NotificationIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? 'stroke-current'}
    >
      <path
        d="M15.0252 3.63745C10.8877 3.63745 7.52523 6.99995 7.52523 11.1375V14.75C7.52523 15.5125 7.20023 16.6749 6.81273 17.3249L5.37523 19.7125C4.48773 21.1875 5.10023 22.825 6.72523 23.375C12.1127 25.175 17.9252 25.175 23.3127 23.375C24.8252 22.875 25.4877 21.0875 24.6627 19.7125L23.2252 17.3249C22.8502 16.6749 22.5252 15.5125 22.5252 14.75V11.1375C22.5252 7.01245 19.1502 3.63745 15.0252 3.63745Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17.3374 4.00005C16.9499 3.88755 16.5499 3.80005 16.1374 3.75005C14.9374 3.60005 13.7874 3.68755 12.7124 4.00005C13.0749 3.07505 13.9749 2.42505 15.0249 2.42505C16.0749 2.42505 16.9749 3.07505 17.3374 4.00005Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7749 23.825C18.7749 25.8875 17.0874 27.575 15.0249 27.575C13.9999 27.575 13.0499 27.15 12.3749 26.475C11.6999 25.8 11.2749 24.85 11.2749 23.825"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default NotificationIcon;
