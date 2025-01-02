import Table from 'components/Table/Table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';

import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import StatusLabel from 'components/StatusLabel';
import { ITableHeaderProps } from 'components/Table/types';
import { FilterValues } from 'components/TableFilter/types';
import { CourseTypeEnum } from 'constants/common.constant';
import { useAxiosDelete, useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter, useDebounce } from 'utils';
import { CourseResponseData, ICourseItem } from '../common/types/course.type';
import AdminFilter from './components/AdminFilter';

const AdminCourse = () => {
  /* hooks */
  const [getApi, { isLoading: isLoadingGetApi }] = useAxiosGet();
  const [duplicateCourseApi, { isLoading: isLoadingDuplicateCourseApi }] =
    useAxiosPost();
  const [deleteCourseApi, { isLoading: isLoadingDeleteApi }] = useAxiosDelete();
  const { t } = useTranslation();
  const deleteCourse = useModal();
  const duplicateCourse = useModal();
  const navigate = useNavigate();

  /* States */
  const [search, setSearch] = useState<string>('');
  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);
  const { currentPage } = useSelector(currentPageSelector);
  const [selectedCourse, setSelectedCourse] = useState<ICourseItem>();
  const [courses, setCourses] = useState<CourseResponseData>();
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (newValues: FilterValues) => {
    setFilterValues(newValues);
    getCourses(newValues);
  };

  const getCourses = async (filterValues?: FilterValues) => {
    const response = await getApi('/courses', {
      params: {
        tableView: true,
        page: currentPage,
        sort,
        limit,
        search: debouncedSearch,
        ...(Array.isArray(filterValues?.course_category) &&
        filterValues?.course_category?.length
          ? { course_category: filterValues.course_category.toString() }
          : {}),
        ...(Array.isArray(filterValues?.asl_level) && filterValues?.asl_level?.length
          ? { asl_level: filterValues.asl_level.toString() }
          : {}),
        ...(filterValues?.is_published
          ? { is_published: filterValues.is_published === 'published' }
          : {}),
        ...(Array.isArray(filterValues?.course_type) &&
        filterValues?.course_type?.length
          ? { course_type: filterValues.course_type.toString() }
          : {}),
      },
    });
    setCourses(response?.data);
  };

  const handleDelete = async (id: string | undefined) => {
    const { error } = await deleteCourseApi(`/courses/${id}`);
    if (!error) getCourses();
  };
  const handleDuplicateCourse = async (selectedCourse: ICourseItem) => {
    const { error } = await duplicateCourseApi(
      `/courses/duplicate/${selectedCourse?.common_id}`,
      {}
    );
    if (!error) getCourses();
  };

  useEffect(() => {
    getCourses();
  }, [currentPage, debouncedSearch, limit]);

  const RequestStatus = (props: ICourseItem) => {
    return (
      <StatusLabel
        variants={props?.is_published ? 'lightwoodBorder' : 'lightgray'}
        text={props?.is_published ? t('Publish') : t('Un-Published')}
      />
    );
  };
  const actionRender = (courseItem: ICourseItem) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button green"
          onClickHandler={() =>
            navigate(
              `/courses/view/${courseItem?.slug}/${courseItem.common_id}?course_type=${courseItem.type.type}`
            )
          }
        >
          <Image iconName="eyeIcon" />
        </Button>
        <Button
          className="action-button blue p-3"
          onClickHandler={() => {
            navigate({
              pathname: `/courses/${courseItem.common_id}/${courseItem.slug}`,
              search:
                courseItem.type.type === CourseTypeEnum.SELF_PACED_COURSES
                  ? `?lang=${courseItem.language_id}&course_id=${courseItem.id}&step=1`
                  : `?course_id=${courseItem.id}&step=1`,
            });
          }}
        >
          <Image iconName="editpen2" iconClassName="w-full h-full" />
        </Button>

        <Button
          className="action-button primary"
          onClickHandler={() => {
            setSelectedCourse(courseItem);
            duplicateCourse.openModal();
          }}
        >
          <Image iconName="copyFile" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            deleteCourse.openModal();
            setSelectedCourse(courseItem);
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  const columnData: ITableHeaderProps[] = [
    { header: 'No.', option: { isIndex: true } },
    { header: t('CoursesManagement.Admin.Course.Table.CourseName'), name: 'title' },
    {
      header: t('CoursesManagement.Admin.Course.Table.CourseLevel'),
      name: 'AslLevel.level',
    },
    {
      header: t('CoursesManagement.Admin.Course.Table.CourseCategory'),
      name: 'courseCategory.name',
    },
    {
      header: t('CoursesManagement.Admin.Course.Table.CourseType'),
      name: 'type.type',
    },
    {
      header: t('CoursesManagement.Admin.Course.Table.Language'),
      name: 'language.name',
    },
    {
      header: t('CoursesManagement.Admin.Course.Table.Students'),
      name: 'student_count',
    },
    {
      header: t('CoursesManagement.Admin.Course.Table.Publish_Unpublish'),
      name: 'status',
      cell: (props) => RequestStatus(props as unknown as ICourseItem),
    },
    {
      header: t('CourseManagement.AddEditForm.Module.Table.Action'),

      cell: (props) => actionRender(props as unknown as ICourseItem),
    },
  ];

  return (
    <>
      <PageHeader title={t('Courses.Title')}>
        <div className="flex gap-4">
          <SearchComponent
            parentClass="min-w-[300px]"
            placeholder={t('InputSearchPlaceholder')}
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e?.target?.value);
            }}
            onClear={() => {
              setSearch('');
            }}
            IsFilter
            SearchBarChildren={
              <AdminFilter
                handleFilterChange={handleFilterChange}
                filterValues={filterValues}
              />
            }
          />
          <Button
            variants="black"
            className="flex whitespace-nowrap gap-1"
            onClickHandler={() => {
              navigate('/courses/add');
            }}
          >
            <span>
              <Image iconName="plus" />
            </span>
            {t('CoursesManagement.CourseCategory.AddEditCategory.addCategory')}
          </Button>
        </div>
      </PageHeader>
      <div className="">
        <Table
          headerData={columnData}
          bodyData={courses?.data || []}
          loader={isLoadingGetApi}
          pagination
          dataPerPage={limit}
          setLimit={setLimit}
          totalPage={courses?.lastPage}
          dataCount={courses?.count}
          setSort={setSort}
          sort={sort}
        />
      </div>
      <ConfirmationPopup
        showCloseIcon
        modal={deleteCourse}
        deleteTitle={t('Community.ConfirmationPopup.DeleteTitle', {
          TYPE: capitalizeFirstLetter('Are you sure you want to delete Course?'),
        })}
        bodyText={t('Community.ConfirmationPopup.DeleteBody')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deleteCourse.closeModal()}
        confirmButtonFunction={() => {
          handleDelete(selectedCourse?.id);
          deleteCourse.closeModal();
        }}
        popUpType="danger"
        isLoading={isLoadingDeleteApi}
      />
      <ConfirmationPopup
        showCloseIcon
        modal={duplicateCourse}
        deleteTitle={t('Course.Table.ConfirmationPopup.DuplicateCourseTitle', {
          TYPE: capitalizeFirstLetter(
            'This process may take a while, are you sure you want to duplicate Course?'
          ),
        })}
        bodyText={t('Course.Table.ConfirmationPopup.DuplicateCourseBody')}
        cancelButtonText={t('Course.Table.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Course.Table.ConfirmationPopup.DuplicateCourse')}
        cancelButtonFunction={() => duplicateCourse.closeModal()}
        confirmButtonFunction={() => {
          handleDuplicateCourse(selectedCourse as ICourseItem);
          duplicateCourse.closeModal();
        }}
        popUpType="info"
        isLoading={isLoadingDuplicateCourseApi}
      />
    </>
  );
};

export default AdminCourse;
