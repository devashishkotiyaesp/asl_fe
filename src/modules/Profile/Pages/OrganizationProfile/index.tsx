import PageHeader from 'components/PageHeader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrganizationInfo from './components/OrganizationInfo';
import OrganizationProfileStripe from './components/OrganizationProfileStripe';
import OrganizationUserProfile from './components/UserProfile';

import { useSelector } from 'react-redux';
import { getOrganization } from 'reduxStore/slices/authSlice';
import './index.css';

const OrganizationProfile = () => {
  const [showOrganizationProfileDetails, setShowOrganizationProfileDetails] =
    useState<boolean>(false);
  const { t } = useTranslation();
  const organization = useSelector(getOrganization);
  const organizationDetails = organization?.[0];

  const renderProfileComponent = () => {
    return showOrganizationProfileDetails ? (
      <>
        <div onClick={() => setShowOrganizationProfileDetails(false)}>
          <PageHeader title={t`Organization.Profile.Edit.Title`} url="/profile" />
        </div>
        <div className="content-base">
          <OrganizationUserProfile organizationDetails={organizationDetails} />
        </div>
      </>
    ) : (
      <>
        <PageHeader title={t`Organization.Profile.Title`} url="/profile" />
        <div className="content-base">
          <OrganizationProfileStripe
            setShowOrganizationProfileDetails={setShowOrganizationProfileDetails}
          />
          <OrganizationInfo organizationDetails={organizationDetails} />
        </div>
      </>
    );
  };

  return <>{renderProfileComponent()}</>;
};

export default OrganizationProfile;
