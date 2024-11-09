import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';
import { PublicNavigation } from 'constants/navigation.constant';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { StudentUserValidationSchema } from 'modules/Profile/validation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { clearToken } from 'reduxStore/slices/tokenSlice';
import store from 'reduxStore/store';
import supabase from 'supabase';
import { ManageStudentProps } from './StudentProps';

const ManageStudentProfile = ({ SetActiveSidebar }: ManageStudentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [callApi, { isLoading }] = useAxiosPost();
  const user: any = useSelector(getCurrentUser);
  const [selectedValue, setSelectedValue] = useState('Beginner 1');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const SelectModal = useModal();

  const deleteUser = async () => {
    const res = await callApi('/users/delete-user', { id: user.id });
    const toastId = new Date().getTime();
    if (res.data === 1) {
      supabase.auth.signOut();
      store.dispatch(clearToken());
      dispatch(
        setToast({
          variant: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          id: toastId,
        })
      );
      navigate(PublicNavigation.login);
    } else {
      dispatch(
        setToast({
          variant: 'Warning',
          message: res.error?.message ?? 'Something went wrong',
          type: 'error',
          id: toastId,
        })
      );
    }
  };

  const editInitialValue = {
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    profileUpdate: user?.profileImage || null,
    email: user?.email || null,
    bio: user?.bio || null,
  };

  const OnSubmit = async (userData: FormikValues) => {
    if (userData) {
      const formData = new FormData();

      // Append form data fields
      formData.append('id', user.id);
      formData.append('first_name', userData.first_name);
      formData.append('last_name', userData.last_name);
      formData.append('email', userData.email);
      formData.append('bio', userData.bio);
      formData.append('aslLevel', selectedValue); // Appending non-file data

      // Append file (if a file was selected)
      if (userData.profileUpdate) {
        formData.append('profileImage', userData.profileUpdate); // Assuming this holds the file
      }

      // Call your API with FormData
      const res = await callApi('/users/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Required for file uploads
      });
      if (res.data) {
        const toastId = new Date().getTime();
        dispatch(
          setToast({
            variant: 'Success',
            message: 'Update  Successfully',
            type: 'success',
            id: toastId,
          })
        );
      }
    }
  };

  const options = [
    { value: 'Beginner 1', label: 'Beginner 1' },
    { value: 'Beginner 2', label: 'Beginner 2' },
    { value: 'Beginner 3', label: 'Beginner 3' },
  ];
  const handleSelectChange = (value: any) => {
    setSelectedValue(value.value);
  };

  useEffect(() => {
    if (user) {
      // When user data changes, update the form fields
      if (user.aslLevel) {
        setSelectedValue(user.aslLevel);
      }
      setPreviewImage(user?.profile_image);
      editInitialValue.first_name = user.first_name || '';
      editInitialValue.last_name = user.last_name || '';
      editInitialValue.profileUpdate = user.profileImage || null;
      editInitialValue.email = user.email || '';
      editInitialValue.bio = user.bio || '';
    }
  }, [user]);

  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>Edit Profile</span>
        </div>
      </div>
      <div className="sidebar-content-left">
        <Formik
          initialValues={editInitialValue}
          enableReinitialize
          validationSchema={StudentUserValidationSchema()}
          onSubmit={(values) => OnSubmit(values)}
        >
          {({ values, setFieldValue }) => {
            // console.log(errors, '::::Error');
            return (
              <Form className="student-profile-form">
                <div className="student-profile-img">
                  {previewImage ? (
                    <Image src={previewImage} />
                  ) : (
                    <Image src="/images/profile.png" isFromDataBase={false} />
                  )}
                  <label htmlFor="image" className="profile-update">
                    <Image iconName="camera" />
                    <input
                      id="image"
                      type="file"
                      name="profileUpdate"
                      onChange={(event) => {
                        const file = event.target.files
                          ? event.target.files[0]
                          : null;
                        if (file) {
                          setFieldValue('profileUpdate', file); // Set the file value in Formik state
                          const fileUrl = URL.createObjectURL(file); // Create a temporary URL for the image
                          setPreviewImage(fileUrl);
                        }
                      }}
                    />
                  </label>
                </div>

                <InputField
                  label="User Name"
                  name="username"
                  value={`${values.first_name} ${values.last_name}`}
                />
                <InputField
                  type="email"
                  label="Email"
                  name="email"
                  value={values.email}
                />
                <ReactSelect
                  width="100%"
                  className="[&_:nth-child(3)]:w-full"
                  options={options}
                  label="ASL Level"
                  name="aslLevel"
                  onChange={handleSelectChange}
                  placeholder="Select an option"
                  selectedValue={selectedValue}
                />
                <TextArea
                  name="bio"
                  label="Bio for Our Community"
                  rows={8}
                  value={values.bio}
                />
                <Link
                  className="reset-text"
                  to=""
                  onClick={() => SetActiveSidebar('password')}
                >
                  Reset Password?
                </Link>

                <Button
                  onClickHandler={() => SelectModal.openModal()}
                  type="button"
                  variants="black"
                  className="w-fit"
                  value="Add your Interest "
                />

                <Button
                  isLoading={isLoading}
                  variants="black"
                  type="submit"
                  className="w-fit"
                  value="Update"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="sidebar-content-right">
        <div className="btn btn-red">
          <Link to="#!" onClick={() => deleteUser()}>
            <Image iconName="trashIcon" />
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentProfile;
