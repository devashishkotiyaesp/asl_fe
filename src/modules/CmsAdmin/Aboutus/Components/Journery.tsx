import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import { KeysEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CommonSelectProps,
  ICrewItem,
  JourneyDataProps,
  JourneyProps,
} from '../types';

const Journey = (props: JourneyProps) => {
  const { handleAddEditJourneyClick, getEditId, formLanguage } = props;
  const deleteCommunity = useModal();
  const [getDiscussion, { isLoading }] = useAxiosGet();
  const [deleteCmsSectionApi] = useAxiosDelete();
  const [selectedJourney, setSelectedJourney] = useState<CommonSelectProps>();
  const [journeyData, setJourneyData] = useState<JourneyDataProps>();
  const [limit, setLimit] = useState<number>(10);
  const { id } = useParams();
  const [sort, setSort] = useState<string>('-updated_at');
  const handleGetSection = async () => {
    const data = await getDiscussion(`/cms-page-section/${id}`, {
      params: {
        sectionName: KeysEnum.Journey,
        sort,
        limit,
        language: formLanguage,
        fieldName: 'journey_years',
      },
    });
    setJourneyData(data.data);
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
      header: 'Year',
      name: 'name',
      cell: (props) => yearRender(props as unknown as ICrewItem),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: 'Title',
      name: 'like',
      cell: (props) => titleRender(props as unknown as ICrewItem),
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
  const yearRender = ({ field_value }: ICrewItem) => {
    const parsedFieldValue = field_value ? JSON.parse(field_value) : {};
    return <div>{parsedFieldValue?.year}</div>;
  };
  const titleRender = ({ field_value }: ICrewItem) => {
    const parsedFieldValue = field_value ? JSON.parse(field_value) : {};
    return <div>{parsedFieldValue?.banner_title}</div>;
  };
  const actionRender = (props: ICrewItem) => {
    const { slug } = props;
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button small green"
          onClickHandler={() => getEditId(slug)}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button small red"
          onClickHandler={() => {
            deleteCommunity.openModal();
            setSelectedJourney(props);
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
        <InputField
          name="eyebrow_title"
          label={t('Cms.homepage.story.eyebrowTitle')}
          placeholder={t('Cms.homepage.story.eyebrowTitlePlaceholder')}
        />
        <Button
          variants="black"
          onClickHandler={() => handleAddEditJourneyClick(true)}
        >
          {t('Cms.aboutUs.journey.yearTitle')}
        </Button>
      </div>
      <div>
        <Table
          headerData={columnData}
          loader={isLoading}
          bodyData={journeyData?.ourJourney as any}
          pagination
          dataPerPage={limit}
          setLimit={setLimit}
          totalPage={journeyData?.totalPages}
          dataCount={journeyData?.totalCount}
          setSort={setSort}
          sort={sort}
        />
        <ConfirmationPopup
          showCloseIcon
          modal={deleteCommunity}
          deleteTitle={t('Cms.aboutUs.journey.deleteTitle')}
          bodyText={t('Cms.aboutUs.journey.deleteText', {
            yearName:
              selectedJourney &&
              JSON.parse(selectedJourney?.field_value as string)?.year,
          })}
          cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
          confirmButtonText={t('Community.ConfirmationPopup.Delete')}
          cancelButtonFunction={() => deleteCommunity.closeModal()}
          confirmButtonFunction={() => {
            handleDelete(selectedJourney?.id);
            deleteCommunity.closeModal();
          }}
          popUpType="danger"
        />
      </div>
    </>
  );
};

export default Journey;