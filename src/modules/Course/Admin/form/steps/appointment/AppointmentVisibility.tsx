import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { REACT_APP_API_URL } from 'config';
import { Roles, TABLE_DATA_LIMIT } from 'constants/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { IUserListResponse, Organization, User } from 'modules/ManageUsers/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { useDebounce } from 'utils';
import { updateParamActiveStep } from '../../helper/form.helper';
import { CourseVisibilityField } from '../../types/courseVisibilitySetting.types';

interface AppointmentVisibilityProps {
  onSubmit: (data: CourseVisibilityField) => void;
  isLoading?: boolean;
}
const AppointmentVisibility = ({
  onSubmit,
  isLoading,
}: AppointmentVisibilityProps) => {
  const { t } = useTranslation();

  const { currentPage } = useSelector(currentPageSelector);
  const { language } = useSelector(useLanguage);

  const navigate = useNavigate();

  const { common_id } = useParams();

  // ** State & Variables **
  const [userData, setUserData] = useState<IUserListResponse>();
  const [limit, setLimit] = useState(TABLE_DATA_LIMIT);
  const [sort, setSort] = useState<string>('-created_at');
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [search, setSearch] = useState<string>('');

  // ** API **
  const [getApi, { isLoading: apiLoading }] = useAxiosGet();
  const [getAppointMentVisibility] = useAxiosGet();
  const debounceSearch = useDebounce(search, 300);

  const fetchVisibilityData = async () => {
    const { data } = await getAppointMentVisibility(`/courses/course-visibility`, {
      params: {
        ...(common_id ? { common_id } : {}),
      },
    });
    if (data) {
      const selectedUsers =
        data?.course_visibility?.map((item: { user_id: string }) => item.user_id) ??
        [];
      setSelectedUsers(selectedUsers);
    }
  };

  useEffect(() => {
    fetchVisibilityData();
  }, []);

  const fetchData = async () => {
    const data = await getApi(`${REACT_APP_API_URL}/users`, {
      params: {
        page: currentPage,
        sort,
        limit,
        search,
        roleName: Roles.Student,
      },
    });
    setUserData(data?.data);
    setLimit(data?.data?.limit);
  };
  useEffect(() => {
    fetchData();
    setIsAllSelected(false);
    setSelectedUsers([]);
  }, [language, currentPage, sort, debounceSearch, limit]);

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

  const renderOrganizationData = (organizations: Organization[]) => {
    if (organizations.length > 1) {
      return `${organizations[0]?.organizationInfo?.full_name} +${organizations.length - 1} more`;
    }
    return organizations[0]?.organizationInfo?.full_name ?? '-';
  };

  const handleSelectAll = () => {
    const userIds =
      userData?.data
        ?.filter((item) => item.role?.role !== Roles.Admin)
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
    },
    {
      header: t('UserManagement.Table.Column.Email'),
      name: 'email',
    },

    {
      header: t('UserManagement.Table.Column.Organization'),
      name: 'member_of_organizations',
      cell: (props) =>
        renderOrganizationData((props as unknown as User).member_of_organizations),
    },
  ];

  return (
    <>
      <Card isGray className="add-general-course">
        <div className="course-card-title mb-5">
          {t('AppointMent.VisibilitySetting.Title')}
        </div>
        <PageHeader title={t('PrivacySettingCard.Table.Row.Students')}>
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
          loader={apiLoading && !userData}
          bodyData={userData?.data ?? []}
          pagination
          dataPerPage={limit}
          setLimit={setLimit}
          totalPage={userData?.lastPage ?? 0}
          dataCount={userData?.count ?? 0}
          setSort={setSort}
          sort={sort}
          handleSelectAll={() => handleSelectAll()}
          isAllSelected={isAllSelected}
        />
      </Card>
      <div className="btn-wrap">
        <Button
          variants="PrimaryWoodLight"
          onClickHandler={() => updateParamActiveStep(false, navigate)}
        >
          {t('CourseContentManager.Form.Button.Back')}
        </Button>
        <Button
          variants="black"
          isLoading={isLoading}
          onClickHandler={() =>
            onSubmit({
              user_ids: selectedUsers,
              visibility_to: Roles.Student,
              can_teacher_view: 'true',
            })
          }
        >
          {t('PrivacySettingCard.Button.Save')}
        </Button>
        <Button variants="PrimaryWoodLight">
          {t('PrivacySettingCard.Button.SaveAndPublish')}
        </Button>
      </div>
    </>
  );
};

export default AppointmentVisibility;
