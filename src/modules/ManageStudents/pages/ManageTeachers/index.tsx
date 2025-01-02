// ** Components **
import Checkbox from 'components/FormElement/CheckBox';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import StudentList from 'modules/ManageStudents/components/StudentList';

// ** Hooks **
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** Constants **

const ManageTeachers = () => {
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
      <PageHeader title={t('Organization.ManageTeachers.PageHeading')}>
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
        </div>
      </PageHeader>
      <div>
        <StudentList isTeacher search={search} searchOn={searchOn} />
      </div>
    </>
  );
};

export default ManageTeachers;
