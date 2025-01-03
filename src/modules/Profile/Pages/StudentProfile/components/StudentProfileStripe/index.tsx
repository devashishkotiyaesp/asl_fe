import Image from 'components/Image';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import './index.css';

const StudentProfileStripe = () => {
  const user = useSelector(getCurrentUser);
  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  return (
    <div className="student-profile-stripe">
      <div className="wrapper">
        <div className="left-part">
          <div className="student-profile-img">
            <Image
              src={user?.profile_image || '/images/no-image.png'}
              isFromDataBase={!!user?.profile_image}
            />
          </div>
          <div className="student-profile-content">
            <p>{fullName}</p>
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="right-part">
          <div className="icon">
            <Image iconName="bookMark" />
          </div>
          <div className="">
            <p>Your Subscription Plan expires on</p>
            <span>28 March 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileStripe;
