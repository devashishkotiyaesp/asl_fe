// ** Components **
import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import PrivacySettingCard from './PrivacySettingCard';

// ** Constants **
import { REACT_APP_API_URL } from 'config';
import { Roles, TABLE_DATA_LIMIT } from 'constants/common.constant';

// ** Types **
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import { IUserListResponse, User } from 'modules/ManageUsers/types';
import {
  CourseVisibilityField,
  SetCourseVisibilityProps,
} from '../../types/courseVisibilitySetting.types';

// ** Form Libraries & Validation **
import { Form, Formik } from 'formik';
import CourseVisibilitySchema from '../../validations/courseVisibilitySchema';

// ** Hooks **
import { useAxiosGet } from 'hooks/useAxios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// ** Utilities **
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { useDebounce } from 'utils';
import { removeEmptyKeys, updateParamActiveStep } from '../../helper/form.helper';

const CourseVisibilitySetting = ({
  onSubmit,
  isLoading,
}: SetCourseVisibilityProps) => {
  // ** State Management **
  const [userData, setUserData] = useState<IUserListResponse>();
  const [search, setSearch] = useState<string>('');
  const [limit, setLimit] = useState(TABLE_DATA_LIMIT);
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [initialValues, setInitialValues] = useState<CourseVisibilityField>();
  const [isEdit, setIsEdit] = useState(false);
  const [role, setRole] = useState('');

  // ** Selectors **
  const { currentPage } = useSelector(currentPageSelector);

  // ** Hooks **
  const { t } = useTranslation();
  const { common_id } = useParams();
  const [fetchUserData, { isLoading: gettingUserData }] = useAxiosGet();
  const [getCourseVisibilityData, { isLoading: gettingCourseVisibilityData }] =
    useAxiosGet();
  const debounceSearch = useDebounce(search, 300);
  const navigate = useNavigate();

  // ** Fetch Visibility data for edit **
  const fetchCourseVisibilityData = async () => {
    const { data } = await getCourseVisibilityData(`/courses/course-visibility`, {
      params: {
        ...(common_id ? { common_id } : {}),
      },
    });
    if (data) {
      const selectedUsers =
        data?.course_visibility?.map((item: { user_id: string }) => item.user_id) ??
        [];
      setIsEdit(data.is_public !== null || data?.visibility_to !== null);
      const initialValue = {
        is_public: String(data?.is_public ?? ''),
        can_teacher_view: String(data?.can_teacher_view ?? ''),
        visibility_to: String(data?.visibility_to ?? ''),
        user_ids: selectedUsers,
      };
      setInitialValues(initialValue);
      if (selectedUsers.length > 0) {
        setRole(data?.visibility_to);
        setSelectedUsers(selectedUsers);
      }
    }
  };

  useEffect(() => {
    fetchCourseVisibilityData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchCourseVisibilityData();
    }
  }, [isLoading]);

  // ** Get User List **
  const getUserDetails = async () => {
    const { data } = await fetchUserData(`${REACT_APP_API_URL}/users`, {
      params: {
        page: currentPage,
        limit,
        ...(search !== '' ? { search } : {}),
        ...(role !== '' ? { roleName: role } : {}),
      },
    });
    setUserData(data);
    setLimit(data?.limit);
  };

  useEffect(() => {
    getUserDetails();
  }, [search, limit, currentPage, role]);

  // ** Render Methods for Table **
  const handleUserProfile = (user: User) => {
    return (
      <div className="user-profile-data">
        <div className="user-profile-image">
          <Image src={user?.profile_image ?? '/images/no-image.png'} />
        </div>
        <div className="user-profile-name">
          <span>{user?.full_name}</span>
        </div>
      </div>
    );
  };
  const handleCheckBox = (user: User) => {
    return (
      <Checkbox
        value={user.id}
        check={selectedUsers.filter((item) => item === user.id).length > 0}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedUsers((prev) => [...prev, user.id]);
          } else {
            const disSelectedUser = selectedUsers.filter((item) => item !== user.id);
            setSelectedUsers(disSelectedUser);
            setIsAllSelected(false);
          }
        }}
      />
    );
  };

  const renderSwitches = (user: User) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        {user.status ? 'Active' : 'In-Active'}
      </label>
    );
  };
  const handleSelectAll = () => {
    const userIds =
      userData?.data
        ?.filter((item) => item.role.role !== Roles.Admin)
        .map((item) => item.id) ?? [];

    if (userIds.length !== selectedUsers.length) {
      setSelectedUsers(userIds);
      setIsAllSelected(true);
    } else {
      setSelectedUsers([]);
      setIsAllSelected(false);
    }
  };

  const columnData: ITableHeaderProps[] = [
    {
      header: '',
      isCheckBox: true,
      cell: (props) => handleCheckBox(props as unknown as User),
    },
    {
      header: 'No',
      name: 'no',
      option: {
        isIndex: true,
      },
    },
    {
      header: t('UserManagement.Table.Column.Name'),
      name: 'first_name',
      cell: (props) => handleUserProfile(props as unknown as User),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('UserManagement.Table.Column.Email'),
      name: 'email',
      option: {
        sort: true,
      },
    },
    {
      header: t('UserManagement.Table.Column.Status'),
      cell: (props: CellProps) => renderSwitches(props as unknown as User),
    },
  ];

  // ** Submit Handler **
  const handleSubmit = async (values: CourseVisibilityField) => {
    if (values.visibility_to !== '' && selectedUsers.length > 0) {
      values.user_ids = selectedUsers;
    }
    const nonEmptObj = removeEmptyKeys(values);
    onSubmit(nonEmptObj);
  };

  return (
    <>
      {gettingCourseVisibilityData || !initialValues ? (
        <Image loaderType="Spin" />
      ) : (
        initialValues && (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={CourseVisibilitySchema(t)}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <PrivacySettingCard
                    isEdit={isEdit}
                    setFieldValue={setFieldValue}
                    setIsAllSelected={setIsAllSelected}
                    setRole={setRole}
                    setSelectedUsers={setSelectedUsers}
                    values={values}
                  />
                  {role !== '' && (
                    <Card className="course-inner-card">
                      <PageHeader title={role}>
                        <SearchComponent
                          parentClass="min-w-[300px]"
                          onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearch(e?.target?.value);
                          }}
                          value={debounceSearch}
                          placeholder={t('InputSearchPlaceholder')}
                          onClear={() => {
                            setSearch('');
                          }}
                        />
                      </PageHeader>
                      <Table
                        headerData={columnData}
                        loader={gettingUserData}
                        bodyData={userData?.data ?? []}
                        pagination
                        dataPerPage={limit}
                        setLimit={setLimit}
                        totalPage={userData?.lastPage ?? 0}
                        dataCount={userData?.count ?? 0}
                        handleSelectAll={handleSelectAll}
                        isAllSelected={isAllSelected}
                      />
                    </Card>
                  )}
                  <div className="btn-wrap">
                    <Button
                      variants="PrimaryWoodLight"
                      onClickHandler={() => updateParamActiveStep(false, navigate)}
                    >
                      {t('CourseContentManager.Form.Button.Back')}
                    </Button>
                    <Button variants="black" type="submit" isLoading={isLoading}>
                      {t('PrivacySettingCard.Button.Save')}
                    </Button>
                    <Button variants="PrimaryWoodLight">
                      {t('PrivacySettingCard.Button.SaveAndPublish')}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )
      )}
    </>
  );
};

export default CourseVisibilitySetting;
