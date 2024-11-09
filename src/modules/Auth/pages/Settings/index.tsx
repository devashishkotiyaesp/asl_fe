// import Image from 'components/Image';
// import { languageConstant } from 'constants/common.constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { setLanguage, useLanguage } from 'reduxStore/slices/languageSlice';
// import { useDispatch } from 'react-redux';
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { PublicNavigation } from 'constants/navigation.constant';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import AddAslModel from './Component/AddASLModel';
import './index.css';

const AdminDashboard = () => {
  const SelectModal = useModal();
  const deleteModal = useModal();
  const [callApi] = useAxiosGet();
  const [callApiPost] = useAxiosPost();
  const [data, setData] = useState([]);
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
  const getDate = async () => {
    const res = await callApi(PublicNavigation.GetAll, {});
    setData(res.data);
  };
  const OnSubmit = async (userData: any) => {
    if (userData.id !== '') {
      const res = await callApiPost(PublicNavigation.EditLevel, userData);
      if (res.data) {
        getDate();
        SelectModal.closeModal();
      }
    } else {
      const insert = {
        level: userData.level,
      };
      const res = await callApiPost(PublicNavigation.AddLevel, insert);
      if (res.data) {
        getDate();
        SelectModal.closeModal();
      }
    }
  };
  // const OnAddSubmit = async (userData: any) => {

  // };
  const deleteLevel = async (id: { id: string }) => {
    const res = await callApiPost(PublicNavigation.DeleteLevel, id);
    if (res.data) {
      getDate();
      deleteModal.closeModal();
    }
  };
  useEffect(() => {
    getDate();
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
      <Table
        headerExtra={
          <>
            <Button
              variants="black"
              onClickHandler={() => {
                setModelData({ id: '', level: '' });
                SelectModal.openModal();
              }}
            >
              {`${t('Settings.table.addButton')}`}
            </Button>
          </>
        }
        headerTitle={`${t('Settings.label')}`}
        headerData={columnData}
        bodyData={data}
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

export default AdminDashboard;
