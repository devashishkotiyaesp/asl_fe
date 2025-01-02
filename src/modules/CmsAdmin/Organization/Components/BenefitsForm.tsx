import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import { KeysEnum } from 'modules/CmsAdmin/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import {
  BenefitDataProps,
  CommonSelectProps,
  ICrewItem,
  TestimonialProps,
} from '../types';

const BenefitsForm = (props: TestimonialProps) => {
  const {
    getEditId,
    formLanguage,
    setFieldTouched,
    setFieldValue,
    values,
    setAddButtonClick,
  } = props;
  const deleteCommunity = useModal();
  const [getDiscussion, { isLoading }] = useAxiosGet();
  const [deleteCmsSectionApi] = useAxiosDelete();
  const [selectedBenefit, setSelectedBenefit] = useState<CommonSelectProps>();
  const [benefitsData, setBenefitsData] = useState<BenefitDataProps>();
  const { currentPage } = useSelector(currentPageSelector);
  const [limit, setLimit] = useState<number>(10);
  const { id } = useParams();
  const [sort, setSort] = useState<string>('-updated_at');
  const handleGetSection = async () => {
    const data = await getDiscussion(`/cms-page-section/${id}`, {
      params: {
        sectionName: KeysEnum.OrgBenefits,
        sort,
        limit,
        language: formLanguage,
        fieldName: 'benefit_add',
        page: currentPage,
      },
    });
    setBenefitsData(data.data);
  };
  useEffect(() => {
    handleGetSection();
  }, [formLanguage, currentPage, limit, sort]);
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
      header: t('Dictionary.EditForm.Title'),
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
  const titleRender = ({ field_value }: ICrewItem) => {
    const parsedFieldValue = field_value ? JSON.parse(field_value) : {};
    return <div>{parsedFieldValue?.benefit_title}</div>;
  };
  const actionRender = (props: ICrewItem) => {
    const { slug } = props;
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button black"
          onClickHandler={() => getEditId(slug)}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            deleteCommunity.openModal();
            setSelectedBenefit(props);
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
  const handleClick = () => {
    setAddButtonClick(true);
  };

  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
        <InputField
          name="eyebrow_title"
          label={t('Cms.homepage.story.eyebrowTitle')}
          placeholder={t('Cms.homepage.story.eyebrowTitlePlaceholder')}
          isCompulsory
        />
        <InputField
          name="banner_title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
          isCompulsory
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values?.description}
          isCompulsory
        />
        <div className="flex justify-between items-center">
          <span className="font-semibold text-2xl">{t('Cms.Benefits.title')}</span>
          <Button
            variants="PrimaryWoodLight"
            onClickHandler={handleClick}
            className="gap-1 h-10"
          >
            <Image iconName="plus" />
            {t('Cms.Benefits.addBenefitTitle')}
          </Button>
        </div>
      </div>
      <div>
        <Table
          headerData={columnData}
          loader={isLoading}
          bodyData={benefitsData?.orgBenefits}
          pagination
          dataPerPage={limit}
          setLimit={setLimit}
          totalPage={benefitsData?.lastPage}
          dataCount={benefitsData?.count}
          setSort={setSort}
          sort={sort}
        />
        <ConfirmationPopup
          showCloseIcon
          modal={deleteCommunity}
          deleteTitle={t('Cms.aboutUs.journey.deleteTitle')}
          bodyText={t('Cms.aboutUs.journey.deleteText', {
            yearName:
              selectedBenefit &&
              JSON.parse(selectedBenefit?.field_value as string)?.benefit_title,
          })}
          cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
          confirmButtonText={t('Community.ConfirmationPopup.Delete')}
          cancelButtonFunction={() => deleteCommunity.closeModal()}
          confirmButtonFunction={() => {
            handleDelete(selectedBenefit?.id);
            deleteCommunity.closeModal();
          }}
          popUpType="danger"
        />
      </div>
    </>
  );
};

export default BenefitsForm;
