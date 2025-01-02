import { IconInputProps } from '../types/icons';

const StudentIcon = ({ className }: IconInputProps) => {
  return (
    <svg
      width="82"
      height="82"
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <path
        d="M60.5429 50.1802L55.6921 49.0719C55.5009 47.7213 54.8879 46.4658 53.9406 45.4844C53.3469 44.8726 52.6357 44.387 51.8497 44.0568C51.0637 43.7265 50.2191 43.5584 49.3666 43.5625H47.4063V41.829C49.3515 40.7059 50.9673 39.0911 52.0917 37.1466C53.2161 35.2021 53.8095 32.9962 53.8125 30.75V28.1875C54.9395 28.1914 56.0361 27.8225 56.9315 27.1383C57.827 26.4541 58.4711 25.493 58.7635 24.4047C59.0559 23.3163 58.9803 22.1618 58.5482 21.1209C58.1162 20.0801 57.3522 19.2113 56.375 18.6499V15.375C56.375 7.59141 50.3403 2.5625 41 2.5625C31.6597 2.5625 25.625 7.59141 25.625 15.375V18.6499C24.6479 19.2113 23.8838 20.0801 23.4518 21.1209C23.0198 22.1618 22.9441 23.3163 23.2365 24.4047C23.5289 25.493 24.173 26.4541 25.0685 27.1383C25.964 27.8225 27.0606 28.1914 28.1875 28.1875V30.75C28.1905 32.9962 28.7839 35.2021 29.9083 37.1466C31.0327 39.0911 32.6485 40.7059 34.5938 41.829V43.5625H32.6335C31.7809 43.5584 30.9363 43.7265 30.1504 44.0568C29.3644 44.387 28.6532 44.8726 28.0594 45.4844C27.1131 46.4663 26.5006 47.7217 26.3092 49.0719L21.525 50.1673C19.4421 50.5267 17.5535 51.6113 16.1934 53.2293C14.8334 54.8473 14.0896 56.8943 14.0938 59.008V78.1562C14.0938 78.4961 14.2288 78.822 14.469 79.0622C14.7093 79.3025 15.0352 79.4375 15.375 79.4375H66.625C66.9648 79.4375 67.2907 79.3025 67.531 79.0622C67.7713 78.822 67.9063 78.4961 67.9063 78.1562V59.0016C67.9132 56.8998 67.1787 54.8629 65.8318 53.2493C64.485 51.6357 62.6121 50.5489 60.5429 50.1802ZM58.9375 71.75H56.375V69.1875H58.9375V71.75ZM23.0625 69.1875H25.625V71.75H23.0625V69.1875ZM28.1875 69.1875C28.5273 69.1875 28.8532 69.0525 29.0935 68.8122C29.3338 68.572 29.4688 68.2461 29.4688 67.9062V57.9663L32.0313 63.0913V76.875H28.1875V69.1875ZM34.5938 54.9515C35.4268 55.8074 36.4228 56.4878 37.5231 56.9523C38.6234 57.4168 39.8057 57.6562 41 57.6562C42.1944 57.6562 43.3766 57.4168 44.4769 56.9523C45.5772 56.4878 46.5733 55.8074 47.4063 54.9515V76.875H34.5938V54.9515ZM49.9688 63.0849L52.5313 57.9599V67.9062C52.5313 68.2461 52.6663 68.572 52.9065 68.8122C53.1468 69.0525 53.4727 69.1875 53.8125 69.1875V76.875H49.9688V63.0849ZM60.2188 52.7401V66.625H55.0938V52.8477L55.1091 52.8182C55.2859 52.4473 55.4296 52.0614 55.5384 51.6651L60.0368 52.6901C60.0996 52.7029 60.1573 52.7273 60.2188 52.7401ZM49.3666 46.125C49.8773 46.1226 50.3833 46.2236 50.854 46.4217C51.3248 46.6199 51.7506 46.9112 52.1059 47.2781C52.6684 47.8489 53.0385 48.5811 53.1644 49.3725C53.2903 50.164 53.1657 50.9749 52.808 51.692L49.9688 57.3603V48.6875C49.9689 48.3538 49.8388 48.0332 49.6063 47.794C49.3737 47.5547 49.0569 47.4156 48.7234 47.4062L48.398 47.3973C48.1162 47.3319 47.8649 47.1731 47.6848 46.9468C47.5048 46.7205 47.4066 46.4398 47.4063 46.1506V46.125H49.3666ZM53.8125 25.625V20.5C54.4921 20.5 55.1439 20.77 55.6245 21.2505C56.105 21.7311 56.375 22.3829 56.375 23.0625C56.375 23.7421 56.105 24.3939 55.6245 24.8745C55.1439 25.355 54.4921 25.625 53.8125 25.625ZM28.1875 15.375C28.1875 7.81562 34.8065 5.125 41 5.125C47.1936 5.125 53.8125 7.81562 53.8125 15.375V17.8529C51.7817 17.6133 48.6183 16.8049 47.191 14.6639C47.0179 14.4044 46.756 14.217 46.4546 14.1368C46.1531 14.0566 45.8328 14.0891 45.5536 14.2283C40.0643 16.5899 34.1628 17.8447 28.1875 17.9208V15.375ZM25.625 23.0625C25.625 22.3829 25.895 21.7311 26.3756 21.2505C26.8561 20.77 27.5079 20.5 28.1875 20.5V25.625C27.5079 25.625 26.8561 25.355 26.3756 24.8745C25.895 24.3939 25.625 23.7421 25.625 23.0625ZM30.75 30.75V20.3578C35.8965 20.0309 40.9575 18.882 45.7406 16.9548C47.2446 18.4754 49.1591 19.5248 51.25 19.9747V30.75C51.25 33.4685 50.1701 36.0756 48.2479 37.9978C46.3256 39.9201 43.7185 41 41 41C38.2815 41 35.6744 39.9201 33.7522 37.9978C31.8299 36.0756 30.75 33.4685 30.75 30.75ZM41 43.5625C42.3039 43.5626 43.6001 43.3634 44.8438 42.9718V46.1506C44.8444 46.9249 45.0796 47.6809 45.5182 48.319C45.9569 48.9571 46.5785 49.4474 47.3012 49.7253C47.0607 51.2233 46.2943 52.5867 45.1395 53.5708C43.9848 54.5549 42.5172 55.0954 41 55.0954C39.4828 55.0954 38.0152 54.5549 36.8605 53.5708C35.7057 52.5867 34.9394 51.2233 34.6988 49.7253C35.4215 49.4474 36.0431 48.9571 36.4818 48.319C36.9205 47.6809 37.1556 46.9249 37.1563 46.1506V42.9718C38.3999 43.3634 39.6962 43.5626 41 43.5625ZM29.8941 47.2781C30.2494 46.9112 30.6753 46.6199 31.146 46.4217C31.6168 46.2236 32.1227 46.1226 32.6335 46.125H34.5938V46.1506C34.5934 46.4398 34.4953 46.7205 34.3152 46.9468C34.1352 47.1731 33.8838 47.3319 33.6021 47.3973L33.2766 47.4062C32.9431 47.4156 32.6263 47.5547 32.3938 47.794C32.1612 48.0332 32.0311 48.3538 32.0313 48.6875V57.3603L29.201 51.7061C28.8383 50.988 28.7101 50.1741 28.8345 49.3793C28.9588 48.5844 29.3295 47.8486 29.8941 47.2756V47.2781ZM26.463 51.6664C26.5738 52.0689 26.72 52.4608 26.8999 52.8375V52.8503V66.625H21.7813V52.7427C21.8658 52.7247 21.9427 52.6927 22.0273 52.6773L26.463 51.6664ZM16.6563 59.0016C16.657 58.0117 16.889 57.0357 17.3339 56.1514C17.7788 55.2671 18.4243 54.4991 19.2188 53.9086V67.9062C19.2188 68.2461 19.3538 68.572 19.594 68.8122C19.8343 69.0525 20.1602 69.1875 20.5 69.1875V76.875H16.6563V59.0016ZM23.0625 76.875V74.3125H25.625V76.875H23.0625ZM56.375 76.875V74.3125H58.9375V76.875H56.375ZM65.3438 76.875H61.5V69.1875C61.8398 69.1875 62.1657 69.0525 62.406 68.8122C62.6463 68.572 62.7813 68.2461 62.7813 67.9062V53.8983C63.5758 54.4911 64.2211 55.2611 64.666 56.1469C65.1108 57.0328 65.3429 58.0103 65.3438 59.0016V76.875Z"
        fill="currentColor"
      />
      <path
        d="M35.875 26.9062C36.5826 26.9062 37.1562 25.759 37.1562 24.3438C37.1562 22.9285 36.5826 21.7812 35.875 21.7812C35.1674 21.7812 34.5938 22.9285 34.5938 24.3438C34.5938 25.759 35.1674 26.9062 35.875 26.9062Z"
        fill="currentColor"
      />
      <path
        d="M46.125 26.9062C46.8326 26.9062 47.4062 25.759 47.4062 24.3438C47.4062 22.9285 46.8326 21.7812 46.125 21.7812C45.4174 21.7812 44.8438 22.9285 44.8438 24.3438C44.8438 25.759 45.4174 26.9062 46.125 26.9062Z"
        fill="currentColor"
      />
      <path
        d="M43.9366 35.1987L45.4165 34.4595L44.271 32.166L42.7899 32.9066C42.2565 33.1734 41.6682 33.3125 41.0717 33.3127H37.1562V35.8752H41.0717C42.0661 35.8739 43.0467 35.6423 43.9366 35.1987Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default StudentIcon;
