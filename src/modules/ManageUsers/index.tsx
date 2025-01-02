// ** Components **
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import UserList from './components/UserList';

// ** Hooks **
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import './index.css';

// ** Constants **
import { PrivateNavigation } from 'constants/navigation.constant';

const ManageUsers = () => {
  // ** Hooks **
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const [searchOn, setSearchOn] = useState<Array<string>>([]);

  const getSearchArray = (
    e: ChangeEvent<HTMLInputElement>,
    searchParams: string
  ) => {
    if (e.target.checked) {
      setSearchOn((prev) => [...prev, e.target.value]);
    } else {
      const searchArray = searchOn.filter((item) => item !== searchParams);
      setSearchOn(searchArray);
    }
  };

  return (
    <>
      <PageHeader title={t('UserManagement.PageHeading')}>
        <div className="flex gap-4">
          <SearchComponent
            IsFilter
            SearchBarChildren={
              <div className="manage-user-filter-box">
                <Checkbox
                  check={searchOn.filter((item) => item === 'first_name').length > 0}
                  text={t('UserManagement.SearchFilter.ByName')}
                  value="first_name"
                  onChange={(e) => getSearchArray(e, 'first_name')}
                  id="ByName"
                />
                <Checkbox
                  check={searchOn.filter((item) => item === 'email').length > 0}
                  text={t('UserManagement.SearchFilter.ByEmail')}
                  value="email"
                  onChange={(e) => getSearchArray(e, 'email')}
                  id="Bymail"
                />
                <Checkbox
                  check={searchOn.filter((item) => item === 'role.role').length > 0}
                  text={t('UserManagement.SearchFilter.ByRole')}
                  value="role.role"
                  onChange={(e) => getSearchArray(e, 'role.role')}
                  id="ByRole"
                />
                <Checkbox
                  check={
                    searchOn.filter((item) => item === 'organization').length > 0
                  }
                  text={t('UserManagement.SearchFilter.ByOrganization')}
                  value="organization"
                  onChange={(e) => getSearchArray(e, 'organization')}
                  id="Byorg"
                />
              </div>
            }
            parentClass="min-w-[300px]"
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e?.target?.value);
            }}
            value={search}
            placeholder={t('InputSearchPlaceholder')}
            onClear={() => {
              setSearch('');
            }}
          />
          <Button
            variants="PrimaryWoodLight"
            className="whitespace-nowrap text-PrimaryWood"
            onClickHandler={() => navigate(PrivateNavigation.deletedUser.view.path)}
          >
            {t('UserManagement.Button.DeletedUser')}
          </Button>
          <Button
            variants="PrimaryWoodLight"
            className="whitespace-nowrap text-PrimaryWood"
            onClickHandler={() => navigate(PrivateNavigation.users.add.path)}
          >
            {t('UserManagement.Button.AddUser')}
          </Button>
        </div>
      </PageHeader>
      <div>
        <UserList search={search} searchOn={searchOn} />
      </div>
    </>
  );
};

export default ManageUsers;
