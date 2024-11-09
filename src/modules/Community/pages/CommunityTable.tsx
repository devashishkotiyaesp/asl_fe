import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import { CommunityType } from 'modules/Community/constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter, getFullName } from 'utils';
import { ICommunityItem, ICommunityResponse, IProps } from '../types';

const CommunityTable = ({ communityType, search }: IProps) => {
  const navigate = useNavigate();
  const deleteCommunity = useModal();
  const [getDiscussion, { isLoading }] = useAxiosGet();
  const [deleteCommunityApi] = useAxiosDelete();
  const [selectedCommunity, setSelectedCommunity] = useState<ICommunityItem>();
  const [communityData, setCommunityData] = useState<ICommunityResponse>();
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');

  const handleGetDiscussion = async () => {
    const data = await getDiscussion('/community', {
      params: {
        type: communityType,
        sort,
        limit,
        search,
      },
    });
    setCommunityData(data.data);
  };

  useEffect(() => {
    handleGetDiscussion();
  }, [search]);

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
      header: capitalizeFirstLetter(communityType),
      name: 'name',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('Community.Table.PostedBy'),
      name: 'user',
      cell: (props) => handlePostedBy(props as unknown as ICommunityItem),
    },
    {
      header: t('Community.Table.Conversation'),
      name: 'postCount',
      cell: (props) => handlePostCount(props as unknown as ICommunityItem),
    },

    {
      header: t('Community.Table.Action'),
      cell: (props) => actionRender(props as unknown as ICommunityItem),
    },
  ];

  const actionRender = (props: ICommunityItem) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button green"
          onClickHandler={() => navigate(`/community/${props?.id}`)}
        >
          <Image iconName="eyeIcon" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            deleteCommunity.openModal();
            setSelectedCommunity(props);
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };

  const handlePostedBy = (props: ICommunityItem) => {
    return (
      <div className="user-profile-data">
        {props?.createdBy?.profile_image ? (
          <div className="user-profile-image">
            <Image src={props?.createdBy?.profile_image} />
          </div>
        ) : (
          ''
        )}
        <div className="user-profile-name">
          <p>
            {getFullName(props?.createdBy?.first_name, props?.createdBy?.last_name)}
          </p>
        </div>
      </div>
    );
  };

  const handlePostCount = (props: ICommunityItem) => {
    const count = Number(props?.postCount);
    if (count > 0) {
      return (
        <p>
          {count} {t('Community.Table.Conversation')}
        </p>
      );
    }

    return '-';
  };

  const handleDelete = async (id: string | undefined) => {
    const { error } = await deleteCommunityApi(`/community/${id}`);
    if (!error) handleGetDiscussion();
  };
  return (
    <>
      <Table
        headerExtra={
          <Button
            variants="black"
            onClickHandler={() => navigate(`/community/add/${communityType}`)}
          >
            {t('Community.Table.Add')}{' '}
            {communityType === CommunityType.DISCUSSION
              ? t('Community.Discussion')
              : t('Community.Topic')}
          </Button>
        }
        headerTitle={
          communityType === CommunityType.DISCUSSION
            ? t('Community.Discussion')
            : t('Community.Topic')
        }
        headerData={columnData}
        loader={isLoading}
        bodyData={communityData?.data}
        pagination
        dataPerPage={limit}
        setLimit={setLimit}
        totalPage={communityData?.totalPages}
        dataCount={communityData?.totalCount}
        setSort={setSort}
        sort={sort}
      />
      <ConfirmationPopup
        showCloseIcon
        modal={deleteCommunity}
        deleteTitle={t('Community.ConfirmationPopup.DeleteTitle')}
        bodyText={t('Community.ConfirmationPopup.DeleteBody')}
        cancelButtonText={t('Community.ConfirmationPopup.Cancel')}
        confirmButtonText={t('Community.ConfirmationPopup.Delete')}
        cancelButtonFunction={() => deleteCommunity.closeModal()}
        confirmButtonFunction={() => {
          handleDelete(selectedCommunity?.id);
          deleteCommunity.closeModal();
        }}
        popUpType="danger"
      />
    </>
  );
};

export default CommunityTable;
