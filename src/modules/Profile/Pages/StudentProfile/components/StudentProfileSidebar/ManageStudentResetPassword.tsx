import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import { Form, Formik, FormikValues } from 'formik';
import { ResetUserPasswordValidationSchema } from 'modules/Auth/validationSchema';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import supabase from 'supabase';

const ManageStudentResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrnetPassword, setShowCurrnetPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  const user: any = useSelector(getCurrentUser);

  const OnResetSubmit = async (userData: FormikValues) => {
    const toastId = new Date().getTime();

    if (userData) {
      const response = await supabase.rpc('changepassword', {
        current_plain_password: userData.currentpassword,
        new_plain_password: userData.password,
        current_id: user.sub,
      });
      if (response.data === 'success') {
        dispatch(
          setToast({
            variant: 'Success',
            message: 'Password changed Successfully',
            type: 'success',
            id: toastId,
          })
        );
      } else if (response.data === 'incorrect') {
        dispatch(
          setToast({
            variant: 'Warning',
            message: response.error?.message ?? 'Something went wrong',
            type: 'error',
            id: toastId,
          })
        );
      }
    }
  };

  const resetInitialValue = {
    currentpassword: '',
    password: '',
    confirmpasswod: '',
  };

  return (
    <div className="sidebar-content-wrap">
      <div className="sidebar-content-title-wrap">
        <div className="sidebar-content-title">
          <span>Reset Password</span>
        </div>
        {/* <span className="sidebar-content-small-title">
      Select your language for written text
  </span> */}
      </div>

      <div className="reset-pswd-wrap">
        <Formik
          initialValues={resetInitialValue}
          validationSchema={ResetUserPasswordValidationSchema()}
          onSubmit={(values) => OnResetSubmit(values)}
        >
          <Form className="student-profile-form">
            <InputField
              icon={
                <Button
                  className="cursor-pointer w-5 h-5 text-grayText"
                  onClickHandler={() => setShowCurrnetPassword(!showCurrnetPassword)}
                >
                  <Image
                    iconClassName="w-full h-full"
                    iconName={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                  />
                </Button>
              }
              name="currentpassword"
              type={showCurrnetPassword ? 'text' : 'password'}
              label="Current password"
              placeholder="Enter Password"
            />
            <InputField
              icon={
                <Button
                  className="cursor-pointer w-5 h-5 text-grayText"
                  onClickHandler={() => setShowPassword(!showPassword)}
                >
                  <Image
                    iconClassName="w-full h-full"
                    iconName={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                  />
                </Button>
              }
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              placeholder="Enter Password"
            />
            <InputField
              icon={
                <Button
                  className="cursor-pointer w-5 h-5 text-grayText"
                  onClickHandler={() => setConfirmShowPassword(!showConfirmPassword)}
                >
                  <Image
                    iconClassName="w-full h-full"
                    iconName={showConfirmPassword ? 'eyeIcon' : 'eyeCrossIcon'}
                  />
                </Button>
              }
              name="confirmpasswod"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Re-Type New Password"
              placeholder="Enter Password"
            />
            <Button type="submit" variants="black" className="w-fit">
              Update
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ManageStudentResetPassword;
