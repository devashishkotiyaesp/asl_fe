import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { AdminNavigation, PublicNavigation } from 'constants/navigation.constant';
import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPatch,
  useAxiosPost,
} from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ASLLevelData } from '../utils';
import AddAslModel from './AddASLModel';

const ASLLevels = () => {
  const SelectModal = useModal();
  const deleteModal = useModal();
  const [callApi, { isLoading }] = useAxiosGet();
  const [callApiPost] = useAxiosPost();
  const [levelDelete] = useAxiosDelete();
  const [levelUpdate] = useAxiosPatch();
  const [data, setData] = useState<ASLLevelData[]>([]);
  const { t } = useTranslation();
  const [limit, setlimit] = useState<number>(10);
  const [modelData, setModelData] = useState({ id: '', level: '' });
  const columnData: ITableHeaderProps[] = [
    {
      header: `${t('Settings.table.check')}`,
      name: 'edit',
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: () => {
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <Checkbox name="" check={false} />
          </label>
        );
      },
    },
    {
      header: `${t('Settings.table.no')}`,
      name: 'id',
      option: {
        sort: true,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      header: `${t('Settings.table.level')}`,
      name: 'level',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: `${t('Settings.table.action')}`,
      cell: (props: any) => actionRender(props),
    },
  ];
  // const { language, defaultLanguage } = useSelector(useLanguage);
  // const dispatch = useDispatch();

  // const [toggleSidebar, setToggleSidebar] = useState(true);
  const getData = async () => {
    const res = await callApi(PublicNavigation.GetAll, {
      params: {
        limit,
      },
    });
    if (res.data) {
      setData(res.data.data);
    }
  };
  const OnSubmit = async (userData: any) => {
    if (userData.id !== '') {
      const res = await levelUpdate(PublicNavigation.EditLevel, userData);
      if (res.data) {
        getData();
        SelectModal.closeModal();
      }
    } else {
      const insert = {
        level: userData.level,
      };
      const res = await callApiPost(PublicNavigation.AddLevel, insert);
      if (res.data) {
        getData();
        SelectModal.closeModal();
      }
    }
  };
  const deleteLevel = async (id: { id: string }) => {
    const res = await levelDelete(`/asl/${id.id}`);
    if (res.data) {
      getData();
      deleteModal.closeModal();
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const actionRender = (item: any) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button green"
          onClickHandler={() => {
            setModelData({ id: item.id, level: item.level });
            SelectModal.openModal();
          }}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            setModelData({ id: item.id, level: item.level });
            deleteModal.openModal();
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  return (
    <>
      <PageHeader
        showBackButton
        url={AdminNavigation.settings.view.path}
        title={`${t('Settings.label')}`}
      >
        <div className="flex items-center gap-4">
          <SearchComponent
            parentClass="min-w-[320px]"
            placeholder={t('InputSearchPlaceholder')}
          />
          <Button
            variants="black"
            className="whitespace-nowrap"
            onClickHandler={() => {
              setModelData({ id: '', level: '' });
              SelectModal.openModal();
            }}
          >
            {`${t('Settings.table.addButton')}`}
          </Button>
        </div>
      </PageHeader>
      <Table
        headerData={columnData}
        bodyData={data}
        dataPerPage={limit}
        setLimit={setlimit}
        loader={isLoading}
      />
      <AddAslModel OnSubmit={OnSubmit} modal={SelectModal} data={modelData} />
      <ConfirmationPopup
        showCloseIcon
        modal={deleteModal}
        deleteTitle={`${t('Settings.confirmText.delete')}`}
        bodyText={`${t('Settings.confirmMiniText.delete')}`}
        linkText={`${modelData.level}?`}
        // navigateTo="./"
        cancelButtonText={`${t('Settings.cancel')}`}
        confirmButtonText={`${t('Settings.delete')}`}
        cancelButtonFunction={() => deleteModal.closeModal()}
        confirmButtonFunction={() => {
          deleteLevel({ id: modelData.id });
          deleteModal.closeModal();
        }}
        popUpType="danger"
      />
    </>
  );
};

export default ASLLevels;
