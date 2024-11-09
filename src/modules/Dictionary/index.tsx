import Button from 'components/Button/Button';
import Table from 'components/Table/Table';
import { CellProps } from 'components/Table/types';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';

const Dictionary = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const { currentPage } = useSelector(currentPageSelector);
  const [callApi] = useAxiosPost();
  const [getApi] = useAxiosGet();
  const { t } = useTranslation();
  const [vocabularies, setVocabularies] = useState<
    {
      name: string;
      asl_level: string;
      sign_gif: string;
      sign_mp4_file: string;
      sign_photo: string;
    }[]
  >();
  const syncVocabularies = async () => {
    await callApi('/vocab/sync', {});
  };

  useEffect(() => {
    const getVocabularies = async () => {
      const response = await getApi('/vocab/all', {
        params: {
          page: currentPage,
          limit: 10,
        },
      });
      setTotalPages(response.data.totalPages);
      setVocabularies(response.data.items);
    };
    getVocabularies();
  }, [currentPage]);
  return (
    <div className="text-center relative">
      <h1 className="text-3xl font-bold">{t('Dictionary.Title')}</h1>
      <Button
        className="absolute top-0 right-0 bg-black text-white p-2 rounded-lg font-bold"
        onClickHandler={syncVocabularies}
      >
        {t('Dictionary.SubTitle')}
      </Button>
      <Table
        headerData={[
          {
            header: `${t('Table.Number')}`,
            option: { isIndex: true },
          },
          { header: `${t('Dictionary.Table.Header.ASLGloss')}`, name: 'name' },
          { header: 'MP4/Gif', name: 'sign_gif' },
          {
            header: `${t('Dictionary.Table.Header.Publish_Unpublish')}`,
            cell: (props: CellProps) =>
              props.publish_status === 'Publish' ? (
                <span className="border border-black">
                  {t('Dictionary.Table.Header.Unpublish')}
                </span>
              ) : (
                <span className="border border-black p-1 px-2 rounded-lg cursor-pointer">
                  {t('Dictionary.Table.Header.Publish')}
                </span>
              ),
          },
          {
            header: `${t('Dictionary.Table.Header.ASLCategory')}`,
            name: 'vocab_category.name',
          },
          {
            header: `${t('Dictionary.Table.Header.UploadedSentences')}`,
            cell: () => (
              <div className="flex gap-3">
                <Button>L</Button>
                <Button>V</Button>
                <Link to="/" className="text-blue-600 underline">
                  {t('Dictionary.Table.Header.ViewStudent')}
                </Link>
              </div>
            ),
          },
          // { header: 'Video', name: 'sign_mp4_file' },
        ]}
        bodyData={vocabularies}
        pagination
        totalPage={totalPages}
      />
    </div>
  );
};

export default Dictionary;
