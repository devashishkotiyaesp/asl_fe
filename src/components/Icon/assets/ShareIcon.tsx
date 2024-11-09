import { IconInputProps } from '../types/icons';

const ShareIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <g>
        <path
          d="M3.75691e-05 11.9859C-0.0101686 14.5503 2.06043 16.6374 4.62486 16.6476C5.80587 16.6523 6.94433 16.2068 7.80844 15.4017L14.7279 18.5259C14.6798 18.7846 14.6535 19.0468 14.649 19.31C14.6409 21.892 16.7274 23.9918 19.3095 24C21.8916 24.0082 23.9913 21.9216 23.9995 19.3395C24.0077 16.7575 21.9212 14.6577 19.3391 14.6495C17.7964 14.6446 16.3506 15.4011 15.475 16.6712L8.97401 13.7358C9.43577 12.6208 9.43755 11.3684 8.97902 10.252L15.4711 7.30165C16.9329 9.41597 19.832 9.94482 21.9463 8.48295C24.0607 7.02107 24.5895 4.12204 23.1276 2.00771C21.6657 -0.10661 18.7666 -0.63546 16.6523 0.826416C15.3932 1.69703 14.6426 3.1311 14.645 4.66194C14.6492 4.92543 14.676 5.18803 14.7249 5.44697L7.82343 8.58309C5.95358 6.82729 3.01443 6.91976 1.25863 8.7896C0.446021 9.65507 -0.00436327 10.7988 3.75691e-05 11.9859Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default ShareIcon;