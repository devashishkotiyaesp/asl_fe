import { IconInputProps } from '../types/icons';

const VideoRecord = ({ className }: IconInputProps) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M6.265 10.21H3.105C1.525 10.21 1 9.16004 1 8.10504V3.89504C1 2.31504 1.525 1.79004 3.105 1.79004H6.265C7.845 1.79004 8.37 2.31504 8.37 3.89504V8.10504C8.37 9.68504 7.84 10.21 6.265 10.21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.76012 8.55007L8.37012 7.57507V4.42007L9.76012 3.44507C10.4401 2.97007 11.0001 3.26007 11.0001 4.09507V7.90507C11.0001 8.74007 10.4401 9.03007 9.76012 8.55007Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 5.5C6.16421 5.5 6.5 5.16421 6.5 4.75C6.5 4.33579 6.16421 4 5.75 4C5.33579 4 5 4.33579 5 4.75C5 5.16421 5.33579 5.5 5.75 5.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VideoRecord;
