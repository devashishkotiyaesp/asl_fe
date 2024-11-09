import { IconInputProps } from '../types/icons';

const UserIcon = ({ className }: IconInputProps) => {
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
        d="M21.5802 8.58003V15.42C21.5802 16.54 20.9802 17.58 20.0102 18.15L14.0702 21.58C13.1002 22.14 11.9002 22.14 10.9202 21.58L4.98016 18.15C4.01016 17.59 3.41016 16.55 3.41016 15.42V8.58003C3.41016 7.46003 4.01016 6.41999 4.98016 5.84999L10.9202 2.42C11.8902 1.86 13.0902 1.86 14.0702 2.42L20.0102 5.84999C20.9802 6.41999 21.5802 7.45003 21.5802 8.58003Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4999 11.0001C13.7867 11.0001 14.8299 9.95687 14.8299 8.67004C14.8299 7.38322 13.7867 6.34009 12.4999 6.34009C11.2131 6.34009 10.1699 7.38322 10.1699 8.67004C10.1699 9.95687 11.2131 11.0001 12.4999 11.0001Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 16.6601C16.5 14.8601 14.71 13.4001 12.5 13.4001C10.29 13.4001 8.5 14.8601 8.5 16.6601"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;