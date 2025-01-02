import PageHeader from 'components/PageHeader';
import { OrganizationNavigation } from 'constants/navigation.constant';
import { t } from 'i18next';

const InviteStudents = () => {
  return (
    <>
      <PageHeader
        title={t('Organization.InviteStudent.PageHeading')}
        url={OrganizationNavigation.manageStudent.view.path}
      />
    </>
  );
};

export default InviteStudents;
