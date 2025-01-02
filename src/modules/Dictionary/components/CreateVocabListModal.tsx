import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { UserModalType } from 'hooks/useModal';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { removeDuplicates, useDebounce } from 'utils';
import { IDictionary } from '../types';

export default function CreateVocabListModal({
  quizModalRef,
  vocabularyId,
}: {
  readonly quizModalRef: UserModalType;
  readonly vocabularyId?: string;
}) {
  const [callApi] = useAxiosGet();
  const [callPostApi] = useAxiosPost();
  const [search, setSearch] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const [vocabularies, setVocabularies] = useState<IDictionary[]>([]);
  const [selectedVocabularyIds, setSelectedVocabularyIds] = useState<string[]>([
    ...(vocabularyId ? [vocabularyId] : []),
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const pageChangeRef = useRef<boolean>(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const debounceSearch = useDebounce(search, 300);

  const fetchVocabularies = async () => {
    const response = await callApi('/vocab/get-all', {
      params: {
        ...(debounceSearch ? { search: debounceSearch } : {}),
        limit: 30,
        page: currentPage,
      },
    });
    if (response.data?.currentPage === 1) {
      setVocabularies(response?.data?.data);
    } else {
      setVocabularies(
        removeDuplicates([...vocabularies, ...(response?.data?.data ?? [])])
      );
    }
    setIsShowMore(response.data?.currentPage < response.data?.lastPage);
  };

  const handleVocabularySelect = (vocabularyId: string) => {
    if (selectedVocabularyIds.includes(vocabularyId)) {
      setSelectedVocabularyIds(
        selectedVocabularyIds.filter((id) => id !== vocabularyId)
      );
    } else {
      setSelectedVocabularyIds([...selectedVocabularyIds, vocabularyId]);
    }
  };

  const createVocabList = async () => {
    if (!listName) {
      setError(t('Dictionary.CreateVocabList.Error.ListName'));
      return;
    }
    await callPostApi('/vocab-list/create', {
      name: listName,
      vocabularies: selectedVocabularyIds,
    });
    quizModalRef.closeModal();
  };

  const isVocabularySelected = (vocabularyId: string) => {
    return selectedVocabularyIds.find((id) => id === vocabularyId);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debounceSearch]);

  useEffect(() => {
    if (pageChangeRef.current) {
      pageChangeRef.current = false;
      return;
    }
    fetchVocabularies();
  }, [currentPage, debounceSearch]);

  return (
    <div className="">
      <div className="select-vocab-list-wrap">
        <InputField
          value={listName}
          placeholder={t('Dictionary.CreateVocabList.PlaceHolder.ListName')}
          onChange={(e) => setListName(e.target.value)}
          label={t('Dictionary.CreateVocabList.Label.ListName')}
        />
        {error && <p className="text-red-600">{error}</p>}
        <InputField
          label={t('Dictionary.CreateVocabList.Label.Search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('Dictionary.CreateVocabList.Placeholder.Search')}
        />
        <div className="vocab-list">
          {vocabularies?.map((vocabulary) => (
            <span
              className={`${isVocabularySelected(vocabulary.id) ? 'active' : ''} vocab-list-item`}
              key={vocabulary.id}
              onClick={() => handleVocabularySelect(vocabulary.id)}
            >
              {vocabulary.name}
            </span>
          ))}
        </div>
        {isShowMore && (
          <Button
            variants="PrimaryWood"
            onClickHandler={() => {
              setCurrentPage((prevPage) => prevPage + 1);
            }}
          >
            {t('Button.LoadMore')}
          </Button>
        )}

        <div className="btn-wrap">
          <Button
            variants="PrimaryWoodBorder"
            onClickHandler={() => quizModalRef.closeModal()}
          >
            {t('Button.Cancel')}
          </Button>
          <Button onClickHandler={createVocabList} variants="black">
            {t('Dictionary.CreateVocabList.Button.CreateVocabList')}
          </Button>
        </div>
      </div>
    </div>
  );
}
