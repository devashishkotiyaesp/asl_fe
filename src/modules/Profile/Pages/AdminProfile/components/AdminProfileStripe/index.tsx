import Image from 'components/Image';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import './index.css';

const AdminProfileStripe = () => {
  const user = useSelector(getCurrentUser);

  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const email = user?.email || 'No email available';

  return (
    <div className="admin-profile-stripe">
      <div className="wrapper">
        <div className="left-part">
          <div className="admin-profile-img">
            <Image
              src={(user?.profile_image as string) || '/images/no-image.png'}
              isFromDataBase={!!user?.profile_image}
            />
          </div>
          <div className="admin-profile-content">
            <p>{fullName}</p>
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileStripe;
