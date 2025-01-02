/* eslint-disable react/no-danger */
import Button from 'components/Button/Button';
import { IButtonProps } from 'components/Button/types';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { Link } from 'react-router-dom';
import './index.css';

type PopUpProps = {
  modal: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  confirmButtonVariant?: IButtonProps['variants'];
  bodyText?: string;
  linkText?: string;
  navigateTo?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonFunction?: () => Promise<void> | void;
  cancelButtonFunction?: () => void;
  deleteTitle?: string;
  showCloseIcon?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isCheckBox?: boolean;
  setProfile?: React.Dispatch<React.SetStateAction<boolean>>;

  popUpType?: 'success' | 'danger' | 'warning' | 'info' | 'logout';
  optionalComponent?: () => JSX.Element;
};

const PopupBody = ({ popUpType, ...rest }: Omit<PopUpProps, 'modal'>) => {
  let renderIcon;
  switch (popUpType) {
    case 'success':
      renderIcon = (
        <div className="icon-wrap success  ">
          <Image iconClassName="w-ful h-full" iconName="checkIcon" />
        </div>
      );
      break;
    case 'warning':
      renderIcon = (
        <div className="icon-wrap warning ">
          <Image iconName="exclamationMarkIcon" iconClassName="w-full h-full" />
        </div>
      );
      break;
    case 'danger':
      renderIcon = (
        <div className="icon-wrap danger ">
          <Image iconClassName="w-full h-full" iconName="trashIcon" />
        </div>
      );
      break;
    case 'info':
      renderIcon = (
        <div className="icon-wrap info ">
          <Image iconName="exclamationMarkIcon" iconClassName="w-full h-full" />
        </div>
      );
      break;
    case 'logout':
      renderIcon = (
        <div className="logout-icon">
          <Image iconName="logoutIcon2" />
        </div>
      );
      break;
    default:
      renderIcon = (
        <div className="icon-wrap danger">
          <Image iconClassName="w-full h-full" iconName="trashIcon" />
        </div>
      );
  }

  function getButtonVariant(popUpType: string) {
    if (popUpType === 'success') {
      return 'Green';
    }
    if (popUpType === 'warning') {
      return 'Orange';
    }
    if (popUpType === 'danger') {
      return 'Red';
    }
    if (popUpType === 'info') {
      return 'Blue';
    }
    if (popUpType === 'logout') {
      return 'Red';
    }
    return 'Green';
  }

  return (
    <>
      <div className="confirmation-wrap">
        <div className="confirmation-close-btn">
          {rest.showCloseIcon && (
            <Button onClickHandler={rest.cancelButtonFunction}>
              <Image iconName="crossIcon" iconClassName="w-full h-full" />
            </Button>
          )}
        </div>
        {renderIcon}
        <p className="confirmation-title">{rest.deleteTitle}</p>
        {rest.bodyText && (
          <>
            <span
              className="confirmation-sub-title "
              dangerouslySetInnerHTML={{ __html: rest.bodyText }}
            />
            {rest.linkText && rest.navigateTo ? (
              <Link
                className="confirmation-text-extra"
                to={rest.navigateTo ?? ''}
                target="_blank"
              >
                {rest.linkText}
              </Link>
            ) : (
              <>
                <span className="confirmation-text-extra ">{rest.linkText}</span>
              </>
            )}
          </>
        )}

        {rest.isCheckBox ? (
          <Checkbox
            parentClass="justify-center"
            text="I Agree"
            onChange={(e) => {
              return rest.setProfile && rest.setProfile(e.target.checked);
            }}
          />
        ) : (
          ''
        )}
        {rest?.optionalComponent !== undefined ? rest?.optionalComponent() : ''}
        <div className="confirmation-btn-wrap">
          {rest.cancelButtonText && (
            <Button
              className=""
              onClickHandler={rest.cancelButtonFunction}
              variants="PrimaryWoodBorder"
            >
              {rest.cancelButtonText}
            </Button>
          )}
          {rest.confirmButtonText && (
            <Button
              className=""
              onClickHandler={rest.confirmButtonFunction}
              variants={getButtonVariant(popUpType as string)}
              isLoading={rest.isLoading}
              disabled={rest.isDisabled}
            >
              {rest.confirmButtonText}
            </Button>
          )}
        </div>
      </div>
      <p className="hidden">{rest.bodyText}</p>
    </>
  );
};

export const ConfirmationPopup = ({
  modal,
  popUpType = 'danger',
  ...rest
}: PopUpProps) => {
  return (
    <Modal modal={modal} closeOnOutsideClick width="!max-w-[450px]">
      <PopupBody popUpType={popUpType} {...rest} />
    </Modal>
  );
};
