// ** Components **
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';

// ** Constants **
import { Roles } from 'constants/common.constant';

// ** Form Libraries **
import { Form, Formik, FormikValues } from 'formik';

// ** Hooks **
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** Redux **
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';

// ** Types **
import { User } from 'modules/ManageUsers/types';

// ** Utils **
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import { PrivateNavigation } from 'constants/navigation.constant';
import { useNavigate, useParams } from 'react-router-dom';
import { RoleType } from 'types/comman';
import { getValidationSchema } from './validationSchema';

import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import TextArea from 'components/FormElement/TextArea';
import _ from 'lodash';
import '../../index.css';

const InviteUserForm = () => {
  const { role: paramRole } = useParams();

  const role = `${paramRole?.charAt(0).toUpperCase()}${paramRole?.slice(1)?.toLocaleLowerCase()}`;

  // ** Initial Values **
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    role,
    ...(role === Roles.Organization
      ? { organizationType: '', profile_image: '' }
      : {}),
    ...(role === Roles.Student || role === Roles.Teacher
      ? { organizationIds: [] }
      : {}),
  };

  // ** Hooks **
  const { t } = useTranslation();
  const { language } = useSelector(useLanguage);
  const [teacherOptions, setTeacherOptions] = useState<Array<IOptions>>();
  const [fetchTeachers] = useAxiosGet();
  const [getOrganizationType] = useAxiosGet();
  const [inviteUsers, { isLoading: isInviting }] = useAxiosPost();
  const [organizationType, setOrganizationType] = useState();
  const navigate = useNavigate();
  // ** Fetch Data **
  const fetchData = async () => {
    const { data } = await fetchTeachers('/users', {
      params: {
        roleName: role === Roles.Organization ? Roles.Teacher : Roles.Organization,
      },
    });

    const options = data?.data.map((item: User) => ({
      label: item.full_name,
      value: item.id,
    }));
    setTeacherOptions(options);
  };

  const handleGetType = async () => {
    const tag = await getOrganizationType('/organization_type', {
      params: {
        dropdown: true,
        label: 'type',
        value: 'id',
      },
    });
    setOrganizationType(tag?.data);
  };

  // ** Effects **
  useEffect(() => {
    if (role !== Roles.Admin) {
      fetchData();
    }
  }, [language]);

  useEffect(() => {
    handleGetType();
  }, []);

  // ** Handlers **
  const handleSubmit = async (values: FormikValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== '') {
        if (_.isArray(value) && value.length === 0) {
          return;
        }
        return formData.append(key, value);
      }
    });

    const { error } = await inviteUsers('/users/invite', formData);
    if (!error) {
      navigate(PrivateNavigation.users.view.path);
    }
  };

  return (
    <>
      <PageHeader
        className="capitalize"
        title={t('UserManagement.PageHeader.Add', {
          ROLE: role,
        })}
        url={PrivateNavigation.users.add.path}
      />
      <div className="step-wrapper primary">
        {Array(2)
          ?.fill('')
          ?.map((_, index) => {
            return (
              <div
                key={`Add_User_Tab${index + 1}`}
                className={`step-item ${index <= 1 ? 'active' : ''}`}
              >
                {index >= 1 ? (
                  <span className="step-item__number">{index + 1}</span>
                ) : (
                  <span className="step-item__number">
                    <Image iconClassName="w-10 h-10" iconName="checkIcon" />
                  </span>
                )}
              </div>
            );
          })}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getValidationSchema(role as RoleType)}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <div className="add-user-type-form">
                {role === Roles.Organization ? (
                  <DropZone
                    parentClass=" col-span-2"
                    className="xl:max-w-[330px]"
                    label={t('Cms.homepage.imageLabel')}
                    name="profile_image"
                    SubTitle={t('Cms.homepage.imageLabel')}
                    setValue={setFieldValue}
                    value={values.profile_image ?? ''}
                    acceptTypes="image/*"
                    fileType={EnumFileType.Image}
                  />
                ) : (
                  <></>
                )}
                <InputField
                  isCompulsory
                  name="first_name"
                  label={t('UserManagement.Form.Label.FirstName')}
                  placeholder={t('UserManagement.Form.PlaceHolder.FirstName')}
                />
                <InputField
                  isCompulsory
                  name="last_name"
                  label={t('UserManagement.Form.Label.LastName')}
                  placeholder={t('UserManagement.Form.PlaceHolder.LastName')}
                />
                <InputField
                  isCompulsory
                  name="email"
                  label={t('UserManagement.Form.Label.Email')}
                  placeholder={t('UserManagement.Form.PlaceHolder.Email')}
                />

                {role === Roles.Organization && (
                  <>
                    <ReactSelect
                      isCompulsory
                      name="organizationType"
                      options={organizationType}
                      label={t('UserManagement.Form.Label.OrganizationType')}
                      placeholder={t(
                        'UserManagement.Form.PlaceHolder.OrganizationType'
                      )}
                    />
                    <ReactSelect
                      isMulti
                      name="teacherIds"
                      options={teacherOptions}
                      label={t('UserManagement.Form.Label.AssignTeacher')}
                      placeholder={t(
                        'UserManagement.Form.PlaceHolder.SelectTeacher'
                      )}
                    />
                    <TextArea
                      parentClass=" col-span-2"
                      name="address"
                      rows={6}
                      label={t('UserManagement.Form.Label.Address')}
                      placeholder={t('UserManagement.Form.PlaceHolder.Address')}
                    />
                  </>
                )}

                {(role === Roles.Student || role === Roles.Teacher) && (
                  <ReactSelect
                    isMulti
                    name="organizationIds"
                    options={teacherOptions}
                    label={t('UserManagement.Form.Label.AssignOrganization')}
                    placeholder={t(
                      'UserManagement.Form.PlaceHolder.SelectOrganization'
                    )}
                  />
                )}
                <div className="btn-wrap capitalize col-span-2">
                  <Button
                    type="submit"
                    variants="PrimaryWood"
                    isLoading={isInviting}
                  >
                    {t('UserManagement.Form.Button.Invite', { ROLE: role })}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default InviteUserForm;
