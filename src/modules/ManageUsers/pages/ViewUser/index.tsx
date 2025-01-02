import PageHeader from 'components/PageHeader';
import { PrivateNavigation } from 'constants/navigation.constant';
import { useParams } from 'react-router-dom';
import ViewStudent from './ViewStudent';

const ViewUser = () => {
  const { role } = useParams();

  return (
    <>
      <PageHeader
        className="capitalize"
        title={role}
        url={PrivateNavigation.users.view.path}
      />
      <ViewStudent />
    </>
  );
};
export default ViewUser;
