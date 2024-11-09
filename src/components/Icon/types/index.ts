import { SVGAttributes } from 'react';

export type IconProps = {
  name: IconTypes;
  iconType?: 'default' | 'custom';
  className?: string;
} & SVGAttributes<SVGElement>;

export type IconTypes =
  | 'searchStrokeSD'
  | 'noImgStrokeSD'
  | 'userOutlineSD'
  | 'arrowLeftStrokeSD'
  | 'arrowSquareOutStrokeSD'
  | 'rightTickFillSD'
  | 'crossStrokeSD'
  | 'eyeIcon'
  | 'userProfile'
  | 'arrowRightIcon'
  | 'logoutIcon'
  | 'crossIcon'
  | 'rightDoubleArrows'
  | 'leftDoubleArrows'
  | 'chevronRight'
  | 'chevronLeft'
  | 'trashIcon'
  | 'infoIcon'
  | 'arrowRight'
  | 'toastBubbleIcon'
  | 'toastSuccessIcon'
  | 'toastErrorIcon'
  | 'toastInfoIcon'
  | 'toastWarning'
  | 'eyeCrossIcon'
  | 'userIcon2'
  | 'exclamationMarkIcon'
  | 'redExclamationMarkIcon'
  | 'checkIcon'
  | 'editpen2'
  | 'sendIcon'
  | 'playButtonRound'
  | 'starRounded'
  | 'videoRounded'
  | 'noteBookmark'
  | 'plus'
  | 'minus'
  | 'quote'
  | 'palm'
  | 'community'
  | 'starSpeed'
  | 'dictionary'
  | 'mail'
  | 'phone'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'linkedIn'
  | 'clock'
  | 'calendar'
  | 'imageIcon'
  | 'filter'
  | 'lock'
  | 'homeIcon'
  | 'university'
  | 'building'
  | 'arrowDownRounded'
  | 'editPen'
  | 'x'
  | 'bookMark'
  | 'userEdit'
  | 'dollarSquare'
  | 'notification'
  | 'key'
  | 'thumb'
  | 'headPhone'
  | 'logout'
  | 'translate'
  | 'camera'
  | 'flagUSA'
  | 'flagEspanol'
  | 'direction'
  | 'copyIcon'
  | 'faceBookFill'
  | 'whatsApp'
  | 'instagramFill'
  | 'shareIcon'
  | 'send'
  | 'dashboardIcon'
  | 'checkZigzag'
  | 'userHexa'
  | 'menuIcon'
  | 'doubleCheck'
  | 'noteBook'
  | 'org'
  | 'dollarRounded'
  | 'users'
  | 'globeEdit'
  | 'noteLog'
  | 'barChart'
  | 'settings'
  | 'google'
  | 'message'
  | 'message2'
  | 'palm2'
  | 'linkIcon2'
  | 'linkIcon'
  | 'threeMoreDots'
  | 'blockIcon'
  | 'reply'
  | 'imageIcon2'
  | 'xlsFile'
  | 'fileIcon'
  | 'dNDIcon'
  | 'copyFile'
  | 'plusSquare'
  | 'palmFill'
  | 'pause'
  | 'locationPin';

export type DynamicIconProps = {
  className?: string;
};