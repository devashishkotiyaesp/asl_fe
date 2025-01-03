import { IconInputProps } from '../types/icons';

const DashboardIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? 'stroke-current'}
    >
      <path
        d="M5.5 10H7.5C9.5 10 10.5 9 10.5 7V5C10.5 3 9.5 2 7.5 2H5.5C3.5 2 2.5 3 2.5 5V7C2.5 9 3.5 10 5.5 10Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 10H19.5C21.5 10 22.5 9 22.5 7V5C22.5 3 21.5 2 19.5 2H17.5C15.5 2 14.5 3 14.5 5V7C14.5 9 15.5 10 17.5 10Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 22H19.5C21.5 22 22.5 21 22.5 19V17C22.5 15 21.5 14 19.5 14H17.5C15.5 14 14.5 15 14.5 17V19C14.5 21 15.5 22 17.5 22Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 22H7.5C9.5 22 10.5 21 10.5 19V17C10.5 15 9.5 14 7.5 14H5.5C3.5 14 2.5 15 2.5 17V19C2.5 21 3.5 22 5.5 22Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;
