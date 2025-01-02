// ** Components **
import Checkbox from 'components/FormElement/CheckBox';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import UserList from 'modules/ManageUsers/components/UserList';

// ** Hooks **
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** Constants **
import { PrivateNavigation } from 'constants/navigation.constant';

const DeletedUserLists = () => {
  // ** Hooks **
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
      <PageHeader
        title={t('UserManagement.Button.DeletedUser')}
        url={PrivateNavigation.users.view.path}
      >
        <div className="flex gap-4">
          <SearchComponent
            IsFilter
            SearchBarChildren={
              <div className="student-filter-inner">
                <Checkbox
                  check={searchOn.filter((item) => item === 'first_name').length > 0}
                  text={t('UserManagement.SearchFilter.ByName')}
                  value="first_name"
                  onChange={(e) => getSearchArray(e, 'first_name')}
                />
                <Checkbox
                  check={searchOn.filter((item) => item === 'email').length > 0}
                  text={t('UserManagement.SearchFilter.ByEmail')}
                  value="email"
                  onChange={(e) => getSearchArray(e, 'email')}
                />
                <Checkbox
                  check={searchOn.filter((item) => item === 'role.role').length > 0}
                  text={t('UserManagement.SearchFilter.ByRole')}
                  value="role.role"
                  onChange={(e) => getSearchArray(e, 'role.role')}
                />
                <Checkbox
                  check={
                    searchOn.filter((item) => item === 'organization').length > 0
                  }
                  text={t('UserManagement.SearchFilter.ByOrganization')}
                  value="organization"
                  onChange={(e) => getSearchArray(e, 'organization')}
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
        </div>
      </PageHeader>
      <div>
        <UserList isDeletedUser search={search} searchOn={searchOn} />
      </div>
    </>
  );
};

export default DeletedUserLists;
