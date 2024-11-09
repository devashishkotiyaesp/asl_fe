import { LayoutConstant } from 'constants/common.constant';
import NotFound from 'modules/Auth/pages/NotFound';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { activeLayoutType } from 'reduxStore/slices/layoutSlice';
import AdminProfile from './Pages/AdminProfile';
import OrganizationProfile from './Pages/OrganizationProfile';
import StudentProfile from './Pages/StudentProfile';
import TeacherProfile from './Pages/TeacherProfile';

const Profile: FC = () => {
  const activeLayout = useSelector(activeLayoutType);
  const [ProfileComponent, setProfileComponent] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    switch (activeLayout) {
      case LayoutConstant.Admin:
        setProfileComponent(() => AdminProfile);
        break;
      case LayoutConstant.Organization:
        setProfileComponent(() => OrganizationProfile);
        break;
      case LayoutConstant.Teacher:
        setProfileComponent(() => TeacherProfile);
        break;
      case LayoutConstant.Student:
        setProfileComponent(() => StudentProfile);
        break;
      default:
        setProfileComponent(() => NotFound);
    }
  }, [activeLayout]);

  if (!ProfileComponent) {
    return <NotFound />;
  }

  return (
    <div className="profile-container">
      <ProfileComponent />
    </div>
  );
};

export default Profile;
