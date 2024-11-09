import { IconInputProps } from '../types/icons';

const Phone = ({ className }: IconInputProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M14.6467 12.2202C14.6467 12.4602 14.5934 12.7068 14.48 12.9468C14.3667 13.1868 14.22 13.4135 14.0267 13.6268C13.7 13.9868 13.34 14.2468 12.9334 14.4135C12.5334 14.5802 12.1 14.6668 11.6334 14.6668C10.9534 14.6668 10.2267 14.5068 9.46004 14.1802C8.69337 13.8535 7.92671 13.4135 7.16671 12.8602C6.40004 12.3002 5.67337 11.6802 4.98004 10.9935C4.29337 10.3002 3.67337 9.5735 3.12004 8.8135C2.57337 8.0535 2.13337 7.2935 1.81337 6.54016C1.49337 5.78016 1.33337 5.0535 1.33337 4.36016C1.33337 3.90683 1.41337 3.4735 1.57337 3.0735C1.73337 2.66683 1.98671 2.2935 2.34004 1.96016C2.76671 1.54016 3.23337 1.3335 3.72671 1.3335C3.91337 1.3335 4.10004 1.3735 4.26671 1.4535C4.44004 1.5335 4.59337 1.6535 4.71337 1.82683L6.26004 4.00683C6.38004 4.1735 6.46671 4.32683 6.52671 4.4735C6.58671 4.6135 6.62004 4.7535 6.62004 4.88016C6.62004 5.04016 6.57337 5.20016 6.48004 5.3535C6.39337 5.50683 6.26671 5.66683 6.10671 5.82683L5.60004 6.3535C5.52671 6.42683 5.49337 6.5135 5.49337 6.62016C5.49337 6.6735 5.50004 6.72016 5.51337 6.7735C5.53337 6.82683 5.55337 6.86683 5.56671 6.90683C5.68671 7.12683 5.89337 7.4135 6.18671 7.76016C6.48671 8.10683 6.80671 8.46016 7.15337 8.8135C7.51337 9.16683 7.86004 9.4935 8.21337 9.7935C8.56004 10.0868 8.84671 10.2868 9.07337 10.4068C9.10671 10.4202 9.14671 10.4402 9.19337 10.4602C9.24671 10.4802 9.30004 10.4868 9.36004 10.4868C9.47337 10.4868 9.56004 10.4468 9.63337 10.3735L10.14 9.8735C10.3067 9.70683 10.4667 9.58016 10.62 9.50016C10.7734 9.40683 10.9267 9.36016 11.0934 9.36016C11.22 9.36016 11.3534 9.38683 11.5 9.44683C11.6467 9.50683 11.8 9.5935 11.9667 9.70683L14.1734 11.2735C14.3467 11.3935 14.4667 11.5335 14.54 11.7002C14.6067 11.8668 14.6467 12.0335 14.6467 12.2202Z"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="M12.3333 6.00033C12.3333 5.60033 12.02 4.98699 11.5533 4.48699C11.1267 4.02699 10.56 3.66699 10 3.66699"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 6.00016C14.6667 3.42016 12.58 1.3335 10 1.3335"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Phone;