import AdminIcon from '../assets/AdminIcon';
import Apple from '../assets/Apple';
import AppointmentCourse from '../assets/AppointmentCourse';
import ArrowDownRounded from '../assets/ArrowDownRounded';
import ArrowRightIcon from '../assets/ArrowRightIcon';
import ASLLevel from '../assets/ASLLevel';
import ASLMiniLesson from '../assets/ASLMiniLesson';
import Ban from '../assets/Ban';
import BarChart from '../assets/BarChart';
import BlockIcon from '../assets/BlockIcon';
import BookMark from '../assets/BookMark';
import BookMarkBlock from '../assets/BookMarkBlock';
import Building from '../assets/Building';
import Calendar from '../assets/Calendar';
import Camera from '../assets/Camera';
import CelebrationPop from '../assets/CelebrationPop';
import CheckIcon from '../assets/CheckIcon';
import CheckZigzag from '../assets/CheckZigzag';
import ChevronLeft from '../assets/ChevronLeft';
import ChevronRight from '../assets/ChevronRight';
import Clock from '../assets/Clock';
import Community from '../assets/Community';
import CopyFile from '../assets/CopyFile';
import CopyIcon from '../assets/CopyIcon';
import CourseCategory from '../assets/CourseCategory';
import CrossIcon from '../assets/CrossIcon';
import DashboardIcon from '../assets/DashboardIcon';
import Dictionary from '../assets/Dictionary';
import Direction from '../assets/Direction';
import DNDIcon from '../assets/DNDIcon';
import DollarRounded from '../assets/DollarRounded';
import DollarSquare from '../assets/DollarSquare';
import DoubleCheck from '../assets/DoubleCheck';
import EditPen from '../assets/EditPen';
import Editpen2 from '../assets/Editpen2';
import ExclamationMarkIcon from '../assets/ExclamationMarkIcon';
import EyeCrossIcon from '../assets/EyeCrossIcon';
import EyeIcon from '../assets/EyeIcon';
import Facebook from '../assets/Facebook';
import FaceBookFill from '../assets/FaceBookFill';
import FileCSV from '../assets/FileCSV';
import FileIcon from '../assets/FileIcon';
import FileJPG from '../assets/FileJPG';
import FilePDF from '../assets/FilePDF';
import FilePNG from '../assets/FilePNG';
import FileXLS from '../assets/FileXLS';
import Filter from '../assets/Filter';
import FingerspellingReceptiveCourse from '../assets/FingerspellingReceptiveCourse';
import FingringCourse from '../assets/FingringCourse';
import FlagEspanol from '../assets/FlagEspanol';
import FlagUSA from '../assets/FlagUSA';
import FullCourse from '../assets/FullCourse';
import GeneralCourse from '../assets/GeneralCourse';
import GlobeEdit from '../assets/GlobeEdit';
import Google from '../assets/Google';
import HeadPhone from '../assets/HeadPhone';
import HomeIcon from '../assets/HomeIcon';
import ImageIcon from '../assets/imageIcon';
import ImageIcon2 from '../assets/ImageIcon2';
import InfoIcon from '../assets/InfoIcon';
import InfoIconI from '../assets/InfoIconI';
import InPersonClass from '../assets/InPersonClass';
import InPersonCourse from '../assets/InPersonCourse';
import Instagram from '../assets/Instagram';
import InstagramFill from '../assets/InstagramFill';
import Key from '../assets/Key';
import LeftDoubleArrows from '../assets/LeftDoubleArrows';
import LinkedIn from '../assets/LinkedIn';
import LinkIcon from '../assets/LinkIcon';
import LinkIcon2 from '../assets/LinkIcon2';
import LocationPin from '../assets/LocationPin';
import Lock from '../assets/Lock';
import Logout from '../assets/Logout';
import LogoutIcon from '../assets/LogoutIcon';
import LogoutIcon2 from '../assets/LogoutIcon2';
import Mail from '../assets/Mail';
import MenuIcon from '../assets/Menu';
import Message from '../assets/Message';
import Message2 from '../assets/Message2';
import Microsoft from '../assets/Microsoft';
import MiniLessons from '../assets/MiniLessons';
import Minus from '../assets/Minus';
import NoteBook from '../assets/NoteBook';
import NoteBookmark from '../assets/NoteBookmark';
import NoteLog from '../assets/NoteLog';
import Notification from '../assets/Notification';
import OneTimepaymentIcon from '../assets/OneTimepaymentIcon';
import Org from '../assets/Org';
import OrganizationIcon from '../assets/OrganizationIcon';
import OrganizationType from '../assets/OrganizationType';
import Palm from '../assets/Palm';
import Palm2 from '../assets/Palm2';
import PalmFilled from '../assets/PalmFill';
import PasswordEyeSD from '../assets/passwordShow';
import Pause from '../assets/Pause';
import Phone from '../assets/Phone';
import PlayButton from '../assets/PlayButton';
import PlayButtonRound from '../assets/PlayButtonRound';
import Plus from '../assets/Plus';
import PlusSquare from '../assets/PlusSquare';
import Quote from '../assets/Quote';
import RedExclamationMarkIcon from '../assets/RedExclamationMarkIcon';
import Reply from '../assets/Reply';
import RightDoubleArrows from '../assets/RightDoubleArrows';
import SearchStrokeSD from '../assets/searchStroke';
import SelfpacedCourse from '../assets/SelfpacedCourse';
import Send from '../assets/Send';
import SendIcon from '../assets/SendIcon';
import Settings from '../assets/Settings';
import ShareIcon from '../assets/ShareIcon';
import SparkIcon from '../assets/SparkIcon';
import SpecializedCourse from '../assets/SpecializedCourse';
import StarRounded from '../assets/StarRounded';
import StarSpeed from '../assets/StarSpeed';
import StudentIcon from '../assets/StudentIcon';
import SupportFaq from '../assets/SupportFaq';
import Tags from '../assets/Tag';
import TeacherIcon from '../assets/TeacherIcon';
import ThreeMoreDots from '../assets/ThreeMoreDots';
import Thumb from '../assets/Thumb';
import ToastBubbleIcon from '../assets/ToastBubbleIcon';
import ToastErrorIcon from '../assets/ToastErrorIcon';
import ToastInfoIcon from '../assets/ToastInfoIcon';
import ToastSuccessIcon from '../assets/ToastSuccessIcon';
import ToastWarning from '../assets/ToastWarning';
import Translate from '../assets/Translate';
import TrashIcon from '../assets/trashIcon';
import University from '../assets/University';
import UserEdit from '../assets/UserEdit';
import UserHexa from '../assets/UserHexa';
import UserIcon2 from '../assets/UserIcon2';
import UserProfile from '../assets/UserProfile';
import Users from '../assets/Users';
import VideoRecord from '../assets/VideoRecord';
import VideoRounded from '../assets/VideoRounded';
import WhatsApp from '../assets/WhatsApp';
import X from '../assets/X';
import XlsFile from '../assets/XlsFile';
import Youtube from '../assets/Youtube';
import ZoomClassCourse from '../assets/ZoomClassCourse';
import ZoomCourses from '../assets/ZoomCourses';
import ZoomIcon from '../assets/ZoomIcon';
import { IconInputProps } from '../types/icons';

const iconComponents: {
  [key: string]: ({ className }: IconInputProps) => JSX.Element;
} = {
  searchStrokeSD: SearchStrokeSD,
  rightTickFillSD: PasswordEyeSD,
  noImgStrokeSD: PasswordEyeSD,
  eyeIcon: EyeIcon,
  arrowRightIcon: ArrowRightIcon,
  crossIcon: CrossIcon,
  chevronRight: ChevronRight,
  trashIcon: TrashIcon,
  chevronLeft: ChevronLeft,
  infoIcon: InfoIcon,
  userProfile: UserProfile,
  arrowRight: ArrowRightIcon,
  logoutIcon: LogoutIcon,
  rightDoubleArrows: RightDoubleArrows,
  leftDoubleArrows: LeftDoubleArrows,
  toastBubbleIcon: ToastBubbleIcon,
  toastSuccessIcon: ToastSuccessIcon,
  toastErrorIcon: ToastErrorIcon,
  toastInfoIcon: ToastInfoIcon,
  toastWarning: ToastWarning,
  eyeCrossIcon: EyeCrossIcon,
  userIcon2: UserIcon2,
  exclamationMarkIcon: ExclamationMarkIcon,
  redExclamationMarkIcon: RedExclamationMarkIcon,
  checkIcon: CheckIcon,
  editpen2: Editpen2,
  sendIcon: SendIcon,
  playButtonRound: PlayButtonRound,
  starRounded: StarRounded,
  videoRounded: VideoRounded,
  noteBookmark: NoteBookmark,
  plus: Plus,
  minus: Minus,
  quote: Quote,
  palm: Palm,
  community: Community,
  starSpeed: StarSpeed,
  dictionary: Dictionary,
  mail: Mail,
  phone: Phone,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedIn: LinkedIn,
  clock: Clock,
  calendar: Calendar,
  imageIcon: ImageIcon,
  filter: Filter,
  lock: Lock,
  homeIcon: HomeIcon,
  university: University,
  building: Building,
  arrowDownRounded: ArrowDownRounded,
  editPen: EditPen,
  x: X,
  bookMark: BookMark,
  userEdit: UserEdit,
  dollarSquare: DollarSquare,
  notification: Notification,
  key: Key,
  thumb: Thumb,
  headPhone: HeadPhone,
  logout: Logout,
  translate: Translate,
  camera: Camera,
  flagUSA: FlagUSA,
  flagEspanol: FlagEspanol,
  direction: Direction,
  copyIcon: CopyIcon,
  faceBookFill: FaceBookFill,
  whatsApp: WhatsApp,
  instagramFill: InstagramFill,
  shareIcon: ShareIcon,
  send: Send,
  dashboardIcon: DashboardIcon,
  checkZigzag: CheckZigzag,
  userHexa: UserHexa,
  menuIcon: MenuIcon,
  doubleCheck: DoubleCheck,
  noteBook: NoteBook,
  org: Org,
  dollarRounded: DollarRounded,
  users: Users,
  globeEdit: GlobeEdit,
  noteLog: NoteLog,
  barChart: BarChart,
  settings: Settings,
  google: Google,
  message: Message,
  message2: Message2,
  palm2: Palm2,
  linkIcon2: LinkIcon2,
  linkIcon: LinkIcon,
  threeMoreDots: ThreeMoreDots,
  blockIcon: BlockIcon,
  reply: Reply,
  imageIcon2: ImageIcon2,
  xlsFile: XlsFile,
  fileIcon: FileIcon,
  dNDIcon: DNDIcon,
  copyFile: CopyFile,
  plusSquare: PlusSquare,
  palmFill: PalmFilled,
  pause: Pause,
  locationPin: LocationPin,
  microsoft: Microsoft,
  apple: Apple,
  playButton: PlayButton,
  infoIconI: InfoIconI,
  filePDF: FilePDF,
  fileXLS: FileXLS,
  fileCSV: FileCSV,
  fileJPG: FileJPG,
  filePNG: FilePNG,
  selfPacedCourse: SelfpacedCourse,
  inPersonCourse: InPersonCourse,
  zoomClassCourse: ZoomClassCourse,
  appointmentCourse: AppointmentCourse,
  generalCourse: GeneralCourse,
  specializedCourse: SpecializedCourse,
  fingerspellingReceptiveCourse: FingerspellingReceptiveCourse,
  fullCourse: FullCourse,
  miniLessons: MiniLessons,
  videoRecord: VideoRecord,
  aSLLevel: ASLLevel,
  courseCategory: CourseCategory,
  organizationType: OrganizationType,
  adminIcon: AdminIcon,
  organizationIcon: OrganizationIcon,
  teacherIcon: TeacherIcon,
  studentIcon: StudentIcon,
  logoutIcon2: LogoutIcon2,
  supportFaq: SupportFaq,
  bookMarkBlock: BookMarkBlock,
  tags: Tags,
  ban: Ban,
  oneTimepaymentIcon: OneTimepaymentIcon,
  sparkIcon: SparkIcon,
  selfpacedCourse: SelfpacedCourse,
  zoomCourses: ZoomCourses,
  aSLMiniLesson: ASLMiniLesson,
  fingringCourse: FingringCourse,
  inPersonClass: InPersonClass,
  celebrationPop: CelebrationPop,
  zoomIcon: ZoomIcon,
};

export default iconComponents;
