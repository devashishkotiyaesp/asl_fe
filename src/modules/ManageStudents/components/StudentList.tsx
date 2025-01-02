// ** Components **
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Switch from 'components/FormElement/Switch';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';
import OrganizationModal from 'modules/ManageUsers/components/OrganizationModal';

// ** Constants **
import { REACT_APP_API_URL } from 'config';
import { Roles, TABLE_DATA_LIMIT } from 'constants/common.constant';

// ** Hooks **
import { useAxiosDelete, useAxiosGet, useAxiosPatch } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** Redux **
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';

// ** Types **
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import {
  IUserListResponse,
  Organization,
  User,
  UserListProps,
} from 'modules/ManageUsers/types';

const StudentList = ({
  search,
  searchOn,
  isDeletedUser,
  isTeacher,
}: UserListProps) => {
  // ** Redux **
  const { t } = useTranslation();
  const { currentPage } = useSelector(currentPageSelector);
  const { language } = useSelector(useLanguage);

  // ** State & Variables **
  const [userData, setUserData] = useState<IUserListResponse>();
  const [limit, setLimit] = useState(TABLE_DATA_LIMIT);
  const [sort, setSort] = useState<string>(
    isDeletedUser ? '-deleted_at' : 'created_at'
  );
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // ** API **
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const [updateUser] = useAxiosPatch();
  const [deleteUser] = useAxiosDelete();

  const selectOrganizationModal = useModal();
  const deleteUserModal = useModal();

  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/users`, {
      params: {
        page: currentPage,
        sort,
        limit,
        search,
        roleName: isTeacher ? Roles.Teacher : Roles.Student,
        ...(isDeletedUser && { isDeletedUser }),
        ...(searchOn?.length && { searchParams: searchOn?.join(',') }),
      },
    });
    setUserData(data?.data);
    setLimit(data?.data?.limit);
  };
  useEffect(() => {
    fetchData();
    setIsAllSelected(false);
    setSelectedUsers([]);
  }, [language, currentPage, sort, search, limit]);

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

  const renderSwitches = (user: User) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <Switch
          checked={user.status ?? false}
          onChangeHandler={() => handleSwitchChanges(user)}
        />
      </label>
    );
  };

  const handleSwitchChanges = async (user: User) => {
    const { error } = await updateUser('/admin/update-user', {
      user_id: user.id,
      status: !user.status,
    });
    if (!error) {
      setUserData((prev) => {
        const data =
          prev?.data?.map((item) => {
            if (user.id === item.id) {
              return { ...item, status: !user.status };
            }
            return item;
          }) ?? [];

        return { ...prev, data };
      });
    }
  };

  const handleDeleteUser = async () => {
    const { error } = await deleteUser('/admin/organization/remove_user', {
      params: {
        user_ids: selectedUsers.join(','),
      },
    });
    if (!error) {
      const data =
        userData?.data?.filter((item) => !selectedUsers.includes(item.id)) ?? [];
      setUserData((prev) => ({ ...prev, data }));
      setSelectedUsers([]);
    }
    deleteUserModal.closeModal();
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

  const handleCheckBox = (user: User) => {
    return (
      <Checkbox
        value={user.id}
        check={selectedUsers.filter((item) => item === user.id).length > 0}
        disabled={isDeletedUser || user.role.role === Roles.Admin}
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

  const renderOrganizationData = (organizations: Organization[]) => {
    let suffixString = '';
    if (organizations.length > 1) {
      suffixString = ` +${organizations.length - 1} more`;
    }
    const user = organizations[0].organizationInfo;
    return (
      <div className="user-profile-data">
        <div className="user-profile-image">
          <Image src={user?.profile_image ?? '/images/no-image.png'} />
        </div>
        <div className="user-profile-name">
          <span>{`${user?.full_name} ${suffixString}`}</span>
        </div>
      </div>
    );
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

    ...(isTeacher
      ? [
          {
            header: t('StudentManagement.Table.Column.TeacherOrganization'),
            name: 'member_of_organizations',
            cell: (props: CellProps) =>
              renderOrganizationData(
                (props as unknown as User).member_of_organizations
              ),
          },
        ]
      : [
          {
            header: t('StudentManagement.Table.Column.CodeInvite'),
            option: {
              sort: true,
            },
            cell: () => t('StudentManagement.Table.Column.CodeInvite'),
          },
          {
            header: t('StudentManagement.Table.Column.SubscriptionType'),
            cell: () => t('StudentManagement.Table.Column.SubscriptionType'),
          },
        ]),

    ...(!isDeletedUser && !isTeacher
      ? [
          {
            header: t('UserManagement.Table.Column.Status'),
            cell: (props: CellProps) => renderSwitches(props as unknown as User),
          },
        ]
      : []),

    ...(isDeletedUser
      ? [
          {
            header: t('StudentManagement.Table.Column.Action'),
            cell: () => <Image iconName="apple" />,
          },
        ]
      : [
          {
            header: '',
            cell: () => <Image iconName="eyeIcon" />,
          },
        ]),
  ];

  return (
    <>
      {apiLoading && !userData ? (
        <Image loaderType="SiteLoader" />
      ) : (
        userData && (
          <>
            {selectedUsers.length > 0 && (
              <div className="bulk-select-bar">
                <span className="bulk-select-count">
                  {t('UserManagement.UserList.LabelText', {
                    USERS: selectedUsers.length,
                  })}
                </span>
                <Button>
                  {t('UserManagement.UserList.Button.ChangeSubScripiton')}
                </Button>
                <Button>{t('UserManagement.UserList.Button.ResendInvite')}</Button>
                <Button onClickHandler={() => deleteUserModal.openModal()}>
                  {t('UserManagement.UserList.Button.DeleteSubscription')}
                </Button>
                <Button>
                  {t('UserManagement.UserList.Button.RemoveFromOrganization')}
                </Button>
              </div>
            )}
            <Table
              headerData={columnData}
              loader={apiLoading}
              bodyData={userData?.data ?? []}
              pagination
              dataPerPage={limit}
              setLimit={setLimit}
              totalPage={userData?.lastPage ?? 0}
              dataCount={userData?.count ?? 0}
              setSort={setSort}
              sort={sort}
              handleSelectAll={handleSelectAll}
              isAllSelected={isAllSelected}
            />
            <OrganizationModal
              resetData={() => {
                setSelectedUsers([]);
                setIsAllSelected(false);
                fetchData();
              }}
              user_ids={selectedUsers}
              modal={selectOrganizationModal}
            />

            <ConfirmationPopup
              modal={deleteUserModal}
              cancelButtonFunction={() => deleteUserModal.closeModal()}
              deleteTitle={t('UserManagement.UserList.Confirmation.DeleteTitle')}
              bodyText={t('UserManagement.UserList.Confirmation.DeleteDescription')}
              cancelButtonText={t('Dictionary.EditForm.CancelButton')}
              confirmButtonText={t('Settings.delete')}
              confirmButtonFunction={handleDeleteUser}
            />
          </>
        )
      )}
    </>
  );
};

export default StudentList;
