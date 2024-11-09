import Image from 'components/Image';
import { t } from 'i18next';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { OrganizationType } from 'reduxStore/types';
import './index.css';

interface OrganizationInfoProps {
  organizationDetails?: OrganizationType;
}

const OrganizationInfo: FC<OrganizationInfoProps> = ({ organizationDetails }) => {
  const user = useSelector(getCurrentUser);

  return (
    <div className="org-box-wrap">
      <div className="org-box-item">
        <div className="org-box-item-icon">
          <Image iconName="building" />
        </div>
        <div className="org-box-item-content">
          <span>{t('Organization.ProfileInfo.TypeOrganization.Title')}</span>
          <p>
            {organizationDetails?.organization_type ? (
              organizationDetails?.organization_type
            ) : (
              <>
                <p>Not Specified</p>
              </>
            )}
          </p>
        </div>
      </div>
      <div className="org-box-item">
        <div className="org-box-item-icon">
          <Image iconName="locationPin" />
        </div>
        <div className="org-box-item-content">
          <span>{t('Organization.ProfileInfo.Address.Title')}</span>
          {user?.address ? <p>{user?.address}</p> : <p>Not Specified</p>}
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
