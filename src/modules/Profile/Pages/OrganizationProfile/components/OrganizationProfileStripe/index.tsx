import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import ChangePassword from 'modules/Profile/common/components/ChangePassword';
import { Dispatch, FC, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import './index.css';

interface OrganizationProfileStripeProps {
  setShowOrganizationProfileDetails: Dispatch<SetStateAction<boolean>>;
}

const OrganizationProfileStripe: FC<OrganizationProfileStripeProps> = ({
  setShowOrganizationProfileDetails,
}) => {
  const user = useSelector(getCurrentUser);
  const ResetPasswordModal = useModal();

  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  return (
    <div className="organization-profile-stripe">
      <div className="top-part">
        <div className="org-image">
          <Image
            src={(user?.profile_image as string) || '/images/no-image.png'}
            isFromDataBase={!!user?.profile_image}
          />
        </div>
        <div className="org-edit-btn">
          <Button
            variants="PrimaryWood"
            className="p-2.5 text-white"
            onClickHandler={() => {
              setShowOrganizationProfileDetails(true);
            }}
          >
            <Image iconName="editPen" iconClassName="w-5 h-5" />
            {t('Organization.Profile.Edit.Button')}
          </Button>
        </div>
      </div>
      <div className="bottom-part">
        <div className="org-details">
          <p>{fullName}</p>
          <span>
            <Image iconName="mail" />
            {user?.email}
          </span>
        </div>
        <div className="org-change-paswd">
          <span
            onClick={() => {
              ResetPasswordModal.openModal();
            }}
          >
            {t('Organization.Profile.Ask.ChangePassword')}
          </span>
        </div>
        {ResetPasswordModal.isOpen && (
          <ChangePassword modal={ResetPasswordModal} withModal />
        )}
      </div>
    </div>
  );
};

export default OrganizationProfileStripe;
