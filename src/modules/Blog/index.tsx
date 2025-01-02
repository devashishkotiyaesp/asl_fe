import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader';
import Table from 'components/Table/Table';
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';

const Blog = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const { currentPage } = useSelector(currentPageSelector);
  const navigate = useNavigate();
  const [getApi] = useAxiosGet();
  const [deleteApi] = useAxiosDelete();

  const { t } = useTranslation();
  const deleteModal = useModal();

  const [modelData, setModelData] = useState({ name: '', slug: '' });
  const storeLang = useSelector(useLanguage);

  const [blogs, setBlogs] = useState<{
    count: number;
    currentPage: number;
    data: string[];
    lastPage: number;
    limit: number;
  }>();

  const actionRender = (item: any) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="action-button black"
          onClickHandler={() => {
            // setModelData({ id: item.id, level: item.level });
            // SelectModal.openModal();
            navigate(`/blog/update/${item?.slug}`);
          }}
        >
          <Image iconName="editPen" />
        </Button>
        <Button
          className="action-button red"
          onClickHandler={() => {
            setModelData({ name: item?.title, slug: item?.slug });
            deleteModal.openModal();
          }}
        >
          <Image iconName="trashIcon" />
        </Button>
      </div>
    );
  };
  const deleteBlog = async () => {
    const { error } = await deleteApi(`/blog/${modelData?.slug}`);
    if (!error) getBlogs();
  };
  const getBlogs = async () => {
    const response = await getApi('/blog', {
      params: {
        page: currentPage,
        limit: 10,
      },
    });
    setTotalPages(response.data.lastPage);
    setBlogs(response.data);
  };
  useEffect(() => {
    getBlogs();
  }, [currentPage, storeLang]);
  return (
    <>
      <PageHeader title={t('Blog.pageHeader.blogDetailTitle')} url="/page-list">
        <Button
          variants="black"
          onClickHandler={() => {
            navigate('/blog/add');
          }}
        >
          {t('Blog.pageHeader.CreateBlog')}
        </Button>
      </PageHeader>
      <div className="content-base">
        <Table
          headerData={[
            {
              header: `${t('Table.Number')}`,
              className: '[&>span]:justify-center',
              option: { isIndex: true },
            },
            {
              header: `${t('Blog.pageHeader.Title')}`,
              className: '[&>span]:justify-center',
              name: 'title',
            },
            {
              header: t('Community.Table.Action'),
              className: '[&>span]:justify-center',
              cell: (props: any) => actionRender(props),
            },
          ]}
          bodyData={blogs?.data}
          pagination
          totalPage={totalPages}
          dataCount={blogs?.count}
        />
        <ConfirmationPopup
          showCloseIcon
          modal={deleteModal}
          deleteTitle={`${t('Blog.confirmText.delete')}`}
          bodyText={`${t('Settings.confirmMiniText.delete')}`}
          linkText={`${modelData.name}?`}
          // navigateTo="./"
          cancelButtonText={`${t('Settings.cancel')}`}
          confirmButtonText={`${t('Settings.delete')}`}
          cancelButtonFunction={() => deleteModal.closeModal()}
          confirmButtonFunction={() => {
            deleteBlog();
            deleteModal.closeModal();
          }}
          popUpType="danger"
        />
      </div>
    </>
  );
};

export default Blog;
