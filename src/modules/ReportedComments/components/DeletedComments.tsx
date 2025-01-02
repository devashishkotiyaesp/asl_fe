import Image from 'components/Image';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { format, parseISO } from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import '../style/index.css';
import { DeletedComment, DeletedCommentsResponse } from '../types';

type IDeletedProps = {
  search: string;
};
const DeletedComments = ({ search }: IDeletedProps) => {
  const { currentPage } = useSelector(currentPageSelector);
  const { t } = useTranslation();
  const [getReportedComments, { isLoading }] = useAxiosGet();
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [deletedCommentData, setDeletedCommentData] =
    useState<DeletedCommentsResponse>();

  const handleGetReportedComments = async () => {
    const data = await getReportedComments('/report-comment/deleted-comments', {
      params: {
        limit,
        sort,
        search,
        page: currentPage,
      },
    });
    setDeletedCommentData(data.data);
    setLimit(deletedCommentData?.limit ?? 10);
  };

  useEffect(() => {
    handleGetReportedComments();
  }, [search, currentPage]);

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
      header: t('Table.Name'),
      name: 'user.full_name',
      option: {
        sort: true,
        hasFilter: false,
      },
      cell: (props) => handleProfile(props as unknown as DeletedComment),
    },
    {
      header: t('Table.ReportedComments'),
      name: 'comment.description',
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('DeletedComments.DeletedBy'),
      name: '',
      cell: (props) => handleDeletedByUser(props as unknown as DeletedComment),
    },
    {
      header: 'Date',
      name: 'deleted_at',
      cell: (props) => renderDeletedAt(props as unknown as DeletedComment),
    },
  ];

  const renderDeletedAt = (commentData: DeletedComment) => {
    return <p>{format(parseISO(commentData?.deleted_at ?? ''), 'dd/MM/yyyy')}</p>;
  };

  const handleProfile = (commentData: DeletedComment) => {
    return (
      <div className="user-profile-data">
        <div className="user-profile-image">
          <Image src={commentData?.user?.profile_image} />
        </div>
        <div className="user-profile-name">
          <span>{commentData?.user?.full_name}</span>
        </div>
      </div>
    );
  };

  const handleDeletedByUser = (commentData: DeletedComment) => {
    return (
      <div className="user-profile-data flex">
        <div className="user-profile-image">
          <Image src={commentData?.deletedByUser?.profile_image} />
        </div>
        <div className="user-profile-details">
          <div className="user-profile-name">
            <span>{commentData?.deletedByUser?.full_name}</span>
          </div>
          <div className="user-profile-role bg-LightWood text-black text-xs inline-block px-1 py-0.5 pb-1 rounded capitalize">
            <p>{commentData?.deletedByUser?.role?.role}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Table
      loader={isLoading}
      pagination
      dataPerPage={limit}
      setLimit={setLimit}
      setSort={setSort}
      sort={sort}
      headerData={columnData}
      totalPage={deletedCommentData?.lastPage}
      dataCount={deletedCommentData?.count}
      bodyData={deletedCommentData?.data}
    />
  );
};

export default DeletedComments;
