import { User } from '@supabase/supabase-js';
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import StatusLabel from 'components/StatusLabel';
import Table from 'components/Table/Table';
import { CellProps } from 'components/Table/types';
import { TABLE_DATA_LIMIT } from 'constants/common.constant';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import { setCurrentPage } from 'reduxStore/slices/vocabSlice';
import { useDebounce } from 'utils';
import VocabularyModal from './components/VocabularyModal';
import './styles/index.css';
import { IDictionary } from './types';

const Dictionary = () => {
  const dictionaryRef = useModal();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(TABLE_DATA_LIMIT);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [dataCount, setDataCount] = useState<number>(0);
  const [filterTab, setFilterTab] = useState<string>('categories');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [currentSelectedCategoryIds, setCurrentSelectedCategoryIds] = useState<
    string[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<boolean | null>(null);
  const [currentSelectedStatus, setCurrentSelectedStatus] = useState<boolean | null>(
    null
  );
  const [selectedVocabularyIds, setSelectedVocabularyIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const { currentPage } = useSelector(currentPageSelector);
  const { language } = useSelector(useLanguage);
  const [callPostApi, { isLoading: isPostLoading }] = useAxiosPost();
  const [callGetApi, { isLoading }] = useAxiosGet();
  const { t } = useTranslation();
  const [vocabularies, setVocabularies] = useState<IDictionary[]>();
  const [vocabularyId, setVocabularyId] = useState<string>('');

  const [search, setSearch] = useState<string>();

  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 2000);

  const syncVocabularies = async () => {
    await callPostApi('/vocab/sync', {});
  };

  const handlePublishStatus = async (
    publish_status: boolean,
    vocabulary?: string
  ) => {
    await callPostApi('/vocab/status', {
      vocabularies: vocabulary ? [vocabulary] : selectedVocabularyIds,
      publish_status,
    });
    if (!vocabulary) {
      setVocabularies((prevVocabularies) =>
        prevVocabularies?.map((vocab) => {
          return {
            ...vocab,
            ...(selectedVocabularyIds.includes(vocab.id)
              ? {
                  is_published: publish_status,
                }
              : {}),
          };
        })
      );
    }
  };

  const handleCategorySelection = (categoryId: string) => {
    setCurrentSelectedCategoryIds((prevSelectedCategoryIds) => {
      if (currentSelectedCategoryIds.includes(categoryId)) {
        return currentSelectedCategoryIds.filter(
          (selected) => selected !== categoryId
        );
      }
      return [...prevSelectedCategoryIds, categoryId];
    });
  };

  const checkIsCategorySelected = (categoryId: string) => {
    return currentSelectedCategoryIds.includes(categoryId);
  };

  const handleCheckBox = (vocabulary: { id: string }) => {
    return (
      <Checkbox
        value={vocabulary.id}
        check={
          selectedVocabularyIds.filter((item) => item === vocabulary.id).length > 0
        }
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedVocabularyIds((prev) => [...prev, vocabulary.id]);
          } else {
            const disSelectedUser = selectedVocabularyIds.filter(
              (item) => item !== vocabulary.id
            );
            setSelectedVocabularyIds(disSelectedUser);
            setIsAllSelected(false);
          }
        }}
      />
    );
  };

  const handleSelectAll = () => {
    const vocabularyIds = vocabularies?.map((item) => item.id) ?? [];

    if (vocabularyIds?.length !== selectedVocabularyIds?.length) {
      setSelectedVocabularyIds(vocabularyIds);
      setIsAllSelected(true);
    } else {
      setSelectedVocabularyIds([]);
      setIsAllSelected(false);
    }
  };

  const fetchCategories = async () => {
    const { data } = await callGetApi('/vocab-category/all');
    setCategories(data?.data ?? []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setIsAllSelected(false);
    setSelectedVocabularyIds([]);
  }, [currentPage, limit]);

  const getVocabularies = async () => {
    const response = await callGetApi('/vocab/all', {
      params: {
        page: currentPage,
        limit,
        search: debouncedSearch,
        ...(selectedCategoryIds?.length > 0 && {
          category: JSON.stringify(selectedCategoryIds),
        }),
        ...(selectedStatus !== null && { is_published: selectedStatus }),
      },
    });
    setTotalPages(response.data.lastPage);
    setDataCount(response.data.count);
    setVocabularies(response.data.data);
    setLimit(response?.data?.limit);
  };

  useEffect(() => {
    getVocabularies();
  }, [
    currentPage,
    limit,
    language,
    debouncedSearch,
    selectedCategoryIds,
    selectedStatus,
  ]);

  return (
    <div className="">
      <Modal
        width="max-w-[1000px]"
        headerTitle={t('Dictionary.Modal.Header.Title')}
        modal={dictionaryRef}
      >
        <VocabularyModal
          vocabularyId={vocabularyId}
          setVocabularyId={setVocabularyId}
        />
      </Modal>
      <PageHeader title={t('Dictionary.Title')}>
        <div className="flex gap-4">
          <SearchComponent
            value={search}
            parentClass="1200:min-w-[300px] 1400:min-w-[440px]"
            placeholder={t('InputSearchPlaceholder')}
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e?.target?.value);
            }}
            onClear={() => setSearch('')}
            SearchBarChildren={(
              setFilterVisible: (filterVisible: boolean) => void
            ) => (
              <div className="dictionary-filter-inner">
                <div className="filter-title">
                  <p>{t('Dictionary.Filter.Label.Filter')}</p>
                </div>
                <ul className="dictionary-filter-tab">
                  <li>
                    <Button
                      className={`${filterTab === 'categories' ? 'active' : ''}`}
                      onClickHandler={() => setFilterTab('categories')}
                    >
                      {t('Dictionary.Filter.Label.Categories')}
                    </Button>
                  </li>
                  <li>
                    <Button
                      className={`${filterTab === 'status' ? 'active' : ''}`}
                      onClickHandler={() => setFilterTab('status')}
                    >
                      {t('Dictionary.Filter.Label.PublishStatus')}
                    </Button>
                  </li>
                </ul>
                {filterTab === 'categories' && (
                  <div className="dictionary-categories-list style-scroll">
                    {categories.map((category) => (
                      <span
                        key={category.id}
                        className={`${checkIsCategorySelected(category.id) ? 'active' : ''}`}
                        onClick={() => handleCategorySelection(category.id)}
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
                {filterTab === 'status' && (
                  <div className="dictionary-categories-list style-scroll">
                    <span
                      className={`${currentSelectedStatus ? 'active' : ''}`}
                      onClick={() =>
                        setCurrentSelectedStatus(
                          currentSelectedStatus !== true ? true : null
                        )
                      }
                    >
                      {t('Dictionary.VocabList.Label.Published')}
                    </span>
                    <span
                      className={`${currentSelectedStatus === false ? 'active' : ''}`}
                      onClick={() =>
                        setCurrentSelectedStatus(
                          currentSelectedStatus !== false ? false : null
                        )
                      }
                    >
                      {t('Dictionary.VocabList.Label.Unpublished')}
                    </span>
                  </div>
                )}
                <Button
                  className="mt-5 w-full"
                  variants="black"
                  onClickHandler={() => {
                    if (filterTab === 'categories') {
                      setSelectedCategoryIds(currentSelectedCategoryIds);
                    } else {
                      setSelectedStatus(currentSelectedStatus);
                    }
                    dispatch(setCurrentPage(1));
                    setFilterVisible(false);
                  }}
                >
                  {t('Dictionary.Filter.Button.Apply')}
                </Button>
              </div>
            )}
            IsFilter
          />
          <Button variants="black" onClickHandler={syncVocabularies}>
            {t('Dictionary.SubTitle')}
          </Button>
        </div>
      </PageHeader>
      {selectedVocabularyIds.length > 0 && (
        <div className="bulk-select-bar">
          <span className="bulk-select-count">
            {t('Dictionary.VocabList.LabelText', {
              VOCABULARIES: selectedVocabularyIds.length,
            })}
          </span>
          <Button onClickHandler={() => handlePublishStatus(true)}>
            {t('Dictionary.VocabList.Button.Publish')}
          </Button>
          <Button onClickHandler={() => handlePublishStatus(false)}>
            {t('Dictionary.VocabList.Button.Unpublish')}
          </Button>
        </div>
      )}
      <Table
        loader={isLoading || isPostLoading}
        headerData={[
          {
            header: '',
            isCheckBox: true,
            cell: (props) => handleCheckBox(props as unknown as User),
          },
          {
            header: `${t('Table.Number')}`,
            option: { isIndex: true },
          },
          { header: `${t('Dictionary.Table.Header.ASLGloss')}`, name: 'name' },
          {
            header: 'MP4/Gif',
            cell: (props: CellProps) =>
              props.sign_mp4_file ? (
                <span className="dictionary-media-wrap">
                  <video width="20px" src={props.sign_mp4_file} muted />
                </span>
              ) : (
                <span className="dictionary-media-wrap">
                  <Image src={props?.sign_gif ?? '/images/no-image.png'} />
                </span>
              ),
          },
          {
            header: `${t('Dictionary.Table.Header.Publish_Unpublish')}`,
            cell: (props: CellProps) =>
              props.is_published ? (
                <StatusLabel
                  variants="gray"
                  text={t('Dictionary.Table.Header.Unpublish')}
                  onClickHandler={async () => {
                    await handlePublishStatus(false, props.id);
                    props.is_published = '';
                  }}
                />
              ) : (
                <StatusLabel
                  text={t('Dictionary.Table.Header.Publish')}
                  onClickHandler={async () => {
                    await handlePublishStatus(true, props.id);
                    props.is_published = 'true';
                  }}
                />
              ),
          },
          {
            header: `${t('Dictionary.Table.Header.ASLCategory')}`,
            name: 'vocab_category.name',
          },
          {
            header: `${t('Dictionary.Table.Header.View')}`,
            cell: (cell) => (
              <div className="flex gap-3">
                {/* <Button className="action-button primary">
                  <Image iconName="linkIcon2" />
                </Button> */}
                <Button
                  className="action-button green"
                  onClickHandler={() => {
                    setVocabularyId(cell.id);
                    dictionaryRef.openModal();
                  }}
                >
                  <Image iconName="eyeIcon" />
                </Button>
                {/* <Button variants="black">
                  {t('Dictionary.Table.Cell.ViewStudent')}
                </Button> */}
              </div>
            ),
          },
        ]}
        bodyData={vocabularies}
        pagination
        dataPerPage={limit}
        setLimit={setLimit}
        totalPage={totalPages}
        dataCount={dataCount}
        handleSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
      />
    </div>
  );
};

export default Dictionary;
