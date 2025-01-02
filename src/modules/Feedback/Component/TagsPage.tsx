import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { LanguagesEnum } from 'constants/common.constant';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { TagItem, TagList } from '../types';

const TagsPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { language } = useSelector(useLanguage);
  const { currentPage } = useSelector(currentPageSelector);

  // STORE API DATA FOR SUPPORT REQUEST
  const [getTag] = useAxiosGet();

  const [deleteApi] = useAxiosDelete();

  const deleteModal = useModal();

  const [limit, setLimit] = useState<number>(10);

  const [tagData, setTagData] = useState<TagList>();

  const [search, setSearch] = useState<string>('');
  const [modelData, setModelData] = useState<{ slug: string }>();

  const handleTag = async () => {
    const data = await getTag('tags', {
      params: {
        page: currentPage,
        limit,
        language:
          language === 'en' ? LanguagesEnum?.ENGLISH : LanguagesEnum?.SPANISH,
        search,
      },
    });
    setTagData(data.data);
  };

  const columnData: ITableHeaderProps[] = [
    {
      header: t('Table.Number'),
      name: 'no',
      option: {
        sort: true,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      header: t('Profile.Common.Feedback.Table.Title'),
      name: 'tag',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Settings.table.action'),
      cell: (props) => actionRender(props as unknown as TagItem),
    },
  ];

  const actionRender = (item: any) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button green"
          onClickHandler={() => {
            navigate(`/tag/update/${item?.slug}`);
          }}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            deleteModal.openModal();
            setModelData({ slug: item?.slug });
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  useEffect(() => {
    handleTag();
  }, [search, limit, language, currentPage]);

  const deleteTag = async () => {
    const { error } = await deleteApi(`/tags/${modelData?.slug}`);
    if (!error) handleTag();
  };

  return (
    <div>
      <PageHeader title={t('Profile.Common.Feedback.Tags')} url="/settings">
        <div className="flex items-center gap-4">
          <SearchComponent
            parentClass="min-w-[300px]"
            placeholder={t('InputSearchPlaceholder')}
            onSearch={(e) => setSearch(e.target.value)}
          />
          <Button
            className="whitespace-nowrap"
            variants="black"
            onClickHandler={() => {
              navigate('/tag/add');
            }}
          >
            {t('Tag.Button.Add')}
          </Button>
        </div>
      </PageHeader>
      <div className="content-base">
        <Table
          // islastRowOnRight={false}
          bodyData={tagData?.data}
          pagination
          totalPage={tagData?.lastPage}
          dataCount={tagData?.count}
          dataPerPage={limit}
          setLimit={setLimit}
          headerData={columnData}
          parentClassName=""
        />

        <ConfirmationPopup
          showCloseIcon
          modal={deleteModal}
          deleteTitle={`${t('Tag.confirmText.Delete')}`}
          bodyText={`${t('Settings.confirmMiniText.delete')}`}
          // navigateTo="./"
          cancelButtonText={`${t('Settings.cancel')}`}
          confirmButtonText={`${t('Settings.delete')}`}
          cancelButtonFunction={() => deleteModal.closeModal()}
          confirmButtonFunction={() => {
            deleteTag();
            deleteModal.closeModal();
          }}
          popUpType="danger"
        />
      </div>
    </div>
  );
};

export default TagsPage;
