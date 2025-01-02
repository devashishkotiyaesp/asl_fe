import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { ToastVariant } from 'constants/common.constant';
import { AdminNavigation } from 'constants/navigation.constant';
import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPost,
  useAxiosPut,
} from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { setToast } from 'reduxStore/slices/toastSlice';
import { OrganizationTypeItem, OrganizationTypeList } from '../types';
import OrganizationTypeAddModel from './OrganizationTypeAddModel';

const OrganizationTypes = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { language } = useSelector(useLanguage);
  const { currentPage } = useSelector(currentPageSelector);

  // STORE API DATA FOR SUPPORT REQUEST
  const [getOrganizationType, { isLoading }] = useAxiosGet();

  const [deleteApi] = useAxiosDelete();
  const [addApi] = useAxiosPost();
  const [editApi] = useAxiosPut();

  const deleteModal = useModal();
  const selectModal = useModal();

  const [limit, setLimit] = useState<number>(10);

  const [organizationTypeData, setOrganizationTypeData] =
    useState<OrganizationTypeList>();

  const [search, setSearch] = useState<string>('');
  const [modelData, setModelData] = useState<{ type: string; slug: string }>({
    type: '',
    slug: '',
  });

  const OnSubmit = async (organizationType: any) => {
    if (organizationType.slug !== '') {
      const res = await editApi('/organization_type', {
        type: organizationType.type,
        slug: organizationType.slug,
      });
      if (res.data) {
        handleOrganizationType();
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Common.ToastMessage.Success.Update'),
            type: 'success',
            id: Date.now(),
          })
        );
        setModelData({ type: '', slug: '' });
        selectModal.closeModal();
      }
    } else {
      const { error } = await addApi('/organization_type', {
        type: organizationType.type,
      });
      if (!error) {
        handleOrganizationType();
        dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: t('Common.ToastMessage.Success.Create'),
            type: 'success',
            id: Date.now(),
          })
        );
        selectModal.closeModal();
      }
    }
  };

  const handleOrganizationType = async () => {
    const data = await getOrganizationType('/organization_type', {
      params: {
        page: currentPage,
        limit,
        search,
      },
    });
    setOrganizationTypeData(data.data);
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
      header: t('OrganizationType.Table.Column.Type'),
      name: 'type',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Settings.table.action'),
      cell: (props) => actionRender(props as unknown as OrganizationTypeItem),
    },
  ];

  const actionRender = (item: any) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button green"
          onClickHandler={() => {
            setModelData({ type: item?.type, slug: item?.slug });
            selectModal.openModal();
          }}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            deleteModal.openModal();
            setModelData({ type: item?.type, slug: item?.slug });
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  useEffect(() => {
    handleOrganizationType();
  }, [search, limit, language, currentPage]);

  const deleteOrganizationType = async () => {
    const { error } = await deleteApi(`/organization_type/${modelData?.slug}`);
    if (!error) handleOrganizationType();
  };

  return (
    <>
      <PageHeader
        showBackButton
        url={AdminNavigation.settings.view.path}
        title={t('OrganizationTypes')}
      >
        <div className="flex items-center gap-4">
          <SearchComponent
            parentClass="min-w-[320px]"
            placeholder={t('InputSearchPlaceholder')}
            onSearch={(e) => setSearch(e.target.value)}
          />
          <Button
            variants="black"
            className="whitespace-nowrap"
            onClickHandler={() => {
              setModelData({ type: '', slug: '' });
              selectModal.openModal();
            }}
          >
            {t('OrganizationType.Button.Add')}
          </Button>
        </div>
      </PageHeader>
      <div className="content-base">
        <Table
          // islastRowOnRight={false}
          bodyData={organizationTypeData?.data}
          pagination
          totalPage={organizationTypeData?.lastPage}
          dataCount={organizationTypeData?.count}
          dataPerPage={limit}
          setLimit={setLimit}
          headerData={columnData}
          parentClassName=""
          loader={isLoading}
        />
        <OrganizationTypeAddModel
          OnSubmit={OnSubmit}
          modal={selectModal}
          data={modelData}
        />
        <ConfirmationPopup
          showCloseIcon
          modal={deleteModal}
          deleteTitle={`${t('OrganizationType.confirmText.Delete')}`}
          bodyText={`${t('Settings.confirmMiniText.delete')}`}
          // navigateTo="./"
          cancelButtonText={`${t('Settings.cancel')}`}
          confirmButtonText={`${t('Settings.delete')}`}
          cancelButtonFunction={() => {
            setModelData({ type: '', slug: '' });
            deleteModal.closeModal();
          }}
          confirmButtonFunction={() => {
            deleteOrganizationType();
            setModelData({ type: '', slug: '' });
            deleteModal.closeModal();
          }}
          popUpType="danger"
        />
      </div>
    </>
  );
};

export default OrganizationTypes;
