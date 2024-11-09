import { IconInputProps } from '../types/icons';

const MenuIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      className={className ?? ''}
    >
      <g clipPath="url(#clip0_1808_5618)">
        <path d="M22.5 6C22.5 5.1716 21.8284 4.5 21 4.5H1.5C0.671602 4.5 0 5.1716 0 6C0 6.8284 0.671602 7.5 1.5 7.5H21C21.8284 7.5 22.5 6.82834 22.5 6ZM1.5 13.5H28.5C29.3284 13.5 30 14.1717 30 15C30 15.8284 29.3284 16.5 28.5 16.5H1.5C0.671602 16.5 0 15.8284 0 15C0 14.1717 0.671602 13.5 1.5 13.5ZM1.5 22.5H15C15.8283 22.5 16.5 23.1716 16.5 24C16.5 24.8283 15.8283 25.5 15 25.5H1.5C0.671602 25.5 0 24.8283 0 24C0 23.1716 0.671602 22.5 1.5 22.5Z" />
      </g>
      <defs>
        <clipPath id="clip0_1808_5618">
          <rect width="30" height="30" transform="matrix(-1 0 0 1 30 0)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MenuIcon;
