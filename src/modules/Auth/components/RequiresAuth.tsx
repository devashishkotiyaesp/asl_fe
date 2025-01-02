import Loaders from 'components/Loaders';
import { Roles } from 'constants/common.constant';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';

const RequiresAuth = ({
  children,
  // fetchUser,
}: {
  children: React.ReactNode;
  // fetchUser: () => Promise<void>;
}) => {
  const authToken = useSelector(getAuthToken);
  const userData = useSelector(getCurrentUser);

  useEffect(() => {
    // For Global BG color
    const element = document.getElementsByTagName('body')[0];
    if (
      userData?.role?.role === Roles.Student ||
      userData?.role?.role === Roles.Teacher
    ) {
      element.style.backgroundColor = '#f2f2f2';
    }
    // For Global BG color
  }, [userData]);

  return (
    <div>
      {authToken && !userData ? <Loaders type="SiteLoader" /> : <></>}
      {children}
    </div>
  );
};

export default RequiresAuth;
