import Button from 'components/Button/Button';
import Image from 'components/Image';
import { format, parseISO } from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { User } from 'modules/ManageUsers/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import '../../index.css';

const StudentPersonalDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();

  const { language } = useSelector(useLanguage);

  const [fetchUserData, { isLoading }] = useAxiosGet();

  const getUserData = async () => {
    const { data } = await fetchUserData(`/users/view`, {
      params: {
        user_id: userId,
      },
    });
    setUser(data);
  };

  useEffect(() => {
    getUserData();
  }, [language]);

  return (
    <>
      {isLoading || !user ? (
        <Image loaderType="Spin" />
      ) : (
        user && (
          <>
            <div className="student-profile-preview">
              <div className="left-part">
                <div className="student-profile-image">
                  <div className="image-wrap">
                    <Image src={user?.profile_image ?? '/images/no-image.png'} />
                  </div>
                  <div className="student-profile-name">
                    <span>{user?.full_name}</span>
                  </div>
                </div>
              </div>
              <div className="right-part">
                <div className="student-profile-status">
                  <div className="student-profile-created">
                    <p>
                      <span>Account Created : </span>
                      <span>
                        {user?.created_at
                          ? format(parseISO(user?.created_at), 'MMM dd yyyy hh:mm a')
                          : '-'}
                      </span>
                    </p>
                    <p>
                      <span>Last Sign In : </span>
                      <span>
                        {user?.last_logged_in
                          ? format(
                              parseISO(user?.last_logged_in),
                              'MMM dd yyyy hh:mm a'
                            )
                          : '-'}
                      </span>
                    </p>
                  </div>
                  <div className="student-profile-status-icon">
                    <Image iconName="clock" />
                  </div>
                </div>
                <Button
                  className="pointer-events-none select-none"
                  variants="PrimaryWoodLight"
                >
                  <Image iconName="bookMarkBlock" />
                  Block from community
                </Button>
              </div>
            </div>
            <div>
              <span>Joined Organization</span>
              {user.member_of_organizations.map(({ organizationInfo }) => (
                <div className="user-profile-data" key={organizationInfo.id}>
                  <div className="user-profile-image">
                    <Image
                      src={organizationInfo?.profile_image ?? '/images/no-image.png'}
                    />
                  </div>
                  <div className="user-profile-name ">
                    <span>{organizationInfo?.full_name}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      )}
    </>
  );
};

export default StudentPersonalDetails;
