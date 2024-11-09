import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import { KeysEnum } from 'modules/CmsAdmin/constants';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CommonSelectProps,
  CrewDataProps,
  CrewTableProps,
  ICrewItem,
} from '../types';

const Crew = ({ setShowAddEditCrew, getEditId, formLanguage }: CrewTableProps) => {
  const deleteCommunity = useModal();
  const [getDiscussion, { isLoading }] = useAxiosGet();
  const [deleteCmsSectionApi] = useAxiosDelete();
  const [selectedCrew, setSelectedCrew] = useState<CommonSelectProps>();
  const [crewData, setCrewData] = useState<CrewDataProps>();
  const [limit, setLimit] = useState<number>(10);
  const { id } = useParams();
  const [sort, setSort] = useState<string>('-updated_at');
  const handleGetSection = async () => {
    const data = await getDiscussion(`/cms-page-section/${id}`, {
      params: {
        sectionName: KeysEnum.Crew,
        sort,
        limit,
        language: formLanguage,
      },
    });
    setCrewData(data.data);
  };

  useEffect(() => {
    handleGetSection();
  }, [formLanguage]);

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
      cell: (props) => nameRender(props as unknown as ICrewItem),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: 'Designation',
      name: 'like',
      cell: (props) => designationRender(props as unknown as ICrewItem),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Community.Table.Action'),
      cell: (props) => actionRender(props as unknown as ICrewItem),
    },
  ];

  const nameRender = ({ field_value }: ICrewItem) => {
    const parsedFieldValue = field_value ? JSON.parse(field_value) : {};
    return <div>{parsedFieldValue.username}</div>;
  };

  const designationRender = ({ field_value }: ICrewItem) => {
    const parsedFieldValue = field_value ? JSON.parse(field_value) : {};
    return <div>{parsedFieldValue.username}</div>;
  };
  const actionRender = (props: ICrewItem) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button black"
          onClickHandler={() => {
            setShowAddEditCrew(true);
            getEditId(props.slug);
          }}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            deleteCommunity.openModal();
            setSelectedCrew(props);
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  const handleDelete = async (id: string | undefined) => {
    const { error } = await deleteCmsSectionApi(`/cms-page-section/${id}`);
    if (!error) handleGetSection();
  };
  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
        <div>
          <Table
            headerData={columnData}
            loader={isLoading}
            bodyData={crewData?.crew as any}
            pagination
            dataPerPage={limit}
            setLimit={setLimit}
            totalPage={crewData?.totalPages}
            dataCount={crewData?.totalCount}
            setSort={setSort}
            sort={sort}
          />
          <ConfirmationPopup
            showCloseIcon
            modal={deleteCommunity}
            deleteTitle={t('Cms.aboutUs.crew.deleteTitle')}
            bodyText={t('Cms.aboutUs.crew.deleteText', {
              crewName:
                selectedCrew &&
                JSON.parse(selectedCrew?.field_value as string)?.username,
            })}
            cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
            confirmButtonText={t('Community.ConfirmationPopup.Delete')}
            cancelButtonFunction={() => deleteCommunity.closeModal()}
            confirmButtonFunction={() => {
              handleDelete(selectedCrew?.id);
              deleteCommunity.closeModal();
            }}
            popUpType="danger"
          />
        </div>
      </div>
    </>
  );
};

export default memo(Crew);
