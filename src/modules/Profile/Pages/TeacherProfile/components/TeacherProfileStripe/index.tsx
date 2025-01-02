import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useAxiosGet } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';
import './index.css';

const TeacherProfileStripe = () => {
  const user = useSelector(getCurrentUser);
  const [zoomConnectApi, { isLoading }] = useAxiosGet();
  const { t } = useTranslation();
  const authToken = useSelector(getAuthToken);
  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const zoomConnection = async () => {
    const response = await zoomConnectApi(`/auth/zoom/connect`, {
      params: { stateToken: authToken },
    });
    const zoomUrl = response.data.data; // Make sure this is the full URL starting with 'https://'

    // Redirect to the Zoom URL
    window.location.href = zoomUrl;
  };
  return (
    <div className="teacher-profile-stripe">
      <div className="wrapper">
        <div className="left-part">
          <div className="teacher-profile-img">
            <Image
              src={user?.profile_image || '/images/no-image.png'}
              isFromDataBase={!!user?.profile_image}
            />
          </div>
          <div className="teacher-profile-content">
            <p>{fullName}</p>
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="right-part">
          <div className="icon">
            <Image iconName="bookMark" />
          </div>
          <Button
            variants="PrimaryWood"
            onClickHandler={zoomConnection}
            isLoading={isLoading}
          >
            {t('LiveAssessment.zoom.connection')}
          </Button>
          <div className="">
            <p>Your Subscription Plan expires on</p>
            <span>28 March 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileStripe;
