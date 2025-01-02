// ** Components **
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import StudentList from './components/StudentList';

// ** Hooks **
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// ** Constants **
import { OrganizationNavigation } from 'constants/navigation.constant';

const ManageStudents = () => {
  // ** Hooks **
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const [searchOn, setSearchOn] = useState<Array<string>>([]);
  const navigate = useNavigate();

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
      <PageHeader title={t('Organization.ManageStudent.PageHeading')}>
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
            onClickHandler={() =>
              navigate(OrganizationNavigation.deletedStudent.view.path)
            }
          >
            {t('UserManagement.Button.DeletedUser')}
          </Button>

          <Button
            variants="black"
            className="whitespace-nowrap"
            onClickHandler={() =>
              navigate(OrganizationNavigation.manageStudent.add.path)
            }
          >
            {t('UserManagement.Button.AddStudent')}
          </Button>
        </div>
      </PageHeader>
      <div>
        <StudentList search={search} searchOn={searchOn} />
      </div>
    </>
  );
};

export default ManageStudents;
