import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
// import search from 'components/search';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { AdminNavigation } from 'constants/navigation.constant';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getActiveLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { capitalizeFirstLetter, useDebounce } from 'utils';
import {
  CourseCategoryResponse,
  ICourseCategory,
} from '../common/types/course.type';
import AddEditCategory from './component/AddEditCategory';

const CourseCategory = () => {
  const { t } = useTranslation();
  const activeLanguage = useSelector(getActiveLanguage);
  const { currentPage } = useSelector(currentPageSelector);
  const [categoryData, setCategoryData] = useState<CourseCategoryResponse>();
  const [getDiscussion, { isLoading }] = useAxiosGet();
  const [categorySlug, setCategorySlug] = useState<string>('');
  const [deleteCategory] = useAxiosDelete();

  const [search, setSearch] = useState('');

  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const addEditCategoryModal = useModal();
  const deleteCategoryModal = useModal();

  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);

  const handleGetCategory = async () => {
    const data = await getDiscussion('/course-category', {
      params: {
        page: currentPage,
        sort,
        limit,
        search: debouncedSearch,
      },
    });
    setCategoryData(data.data);
  };

  useEffect(() => {
    handleGetCategory();
  }, [debouncedSearch, currentPage, activeLanguage]);

  const columnData: ITableHeaderProps[] = [
    {
      header: 'No',
      name: 'no',
      option: {
        sort: true,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      header: 'Name',
      name: 'name',
      option: {
        sort: true,
        hasFilter: false,
      },
    },

    {
      header: t('Community.Table.Action'),
      cell: (props) => actionRender(props as unknown as ICourseCategory),
    },
  ];

  const actionRender = (item: ICourseCategory) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button black"
          onClickHandler={() => addEditCategoryModal?.openModalWithData?.(item)}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            deleteCategoryModal.openModal();
            setCategorySlug(item.slug);
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  const handleDelete = async (slug: string) => {
    const { error } = await deleteCategory(`/course-category/${slug}`);
    if (!error) {
      setCategorySlug('');
    }
  };
  return (
    <>
      <PageHeader
        showBackButton
        url={AdminNavigation.settings.view.path}
        title={`${t('CourseCategory')}`}
      >
        <div className="flex items-center gap-4">
          <SearchComponent
            onSearch={(e) => setSearch(e.target.value)}
            parentClass="min-w-[320px]"
          />
          <Button
            variants="black"
            className="whitespace-nowrap"
            onClickHandler={() => addEditCategoryModal?.openModalWithData?.(null)}
          >
            {t('Community.Table.Add')}
          </Button>
        </div>
      </PageHeader>
      <Table
        headerData={columnData}
        loader={isLoading}
        bodyData={categoryData?.data}
        pagination
        dataPerPage={limit}
        setLimit={setLimit}
        totalPage={categoryData?.lastPage}
        dataCount={categoryData?.count}
        setSort={setSort}
        sort={sort}
      />
      <ConfirmationPopup
        showCloseIcon
        modal={deleteCategoryModal}
        deleteTitle={t('Community.ConfirmationPopup.DeleteTitle', {
          TYPE: capitalizeFirstLetter('hey'),
        })}
        bodyText={t('Community.ConfirmationPopup.DeleteBody')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deleteCategoryModal.closeModal()}
        confirmButtonFunction={() => {
          handleDelete(categorySlug);
          deleteCategoryModal.closeModal();
        }}
        popUpType="danger"
      />
      {addEditCategoryModal.isOpen && (
        <AddEditCategory modal={addEditCategoryModal} refetch={handleGetCategory} />
      )}
    </>
  );
};

export default CourseCategory;
