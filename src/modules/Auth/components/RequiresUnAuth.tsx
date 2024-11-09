import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getAuthToken } from 'reduxStore/slices/tokenSlice';
import AuthLayout from './AuthLayout';

// Layout for Public Pages
const RequiresUnAuth = () => {
  // const RequiresUnAuth = () => {
  // const authToken = useSelector(getAuthToken);

  // if (authToken) {
  //   return <Navigate to="/" />;
  // }
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default RequiresUnAuth;
