import Button from 'components/Button/Button';
import ReactSelect from 'components/FormElement/ReactSelect';
import Loaders from 'components/Loaders';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { UserModalType } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const VocabListModal = ({
  vocabularyId,
  modal,
  setIsShowCreateListModal,
}: {
  readonly vocabularyId: string;
  readonly modal: UserModalType;
  readonly setIsShowCreateListModal?: (isShow: boolean) => void;
}) => {
  const [vocabLists, setVocabLists] = useState<{ id: string; name: string }[]>([]);
  const [listId, setListId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [callGetApi, { isLoading: isGetLoading }] = useAxiosGet();
  const [callPostApi, { isLoading: isPostLoading }] = useAxiosPost();
  const { t } = useTranslation();

  const addToList = async () => {
    await callPostApi(`/vocab-list/${listId}/add`, {
      vocabulary_id: vocabularyId,
    });
    modal?.closeModal();
  };
  const fetchUserLists = async () => {
    const response = await callGetApi('/vocab-list');
    setVocabLists(response.data?.data);
  };

  useEffect(() => {
    fetchUserLists();
  }, []);
  return (
    <>
      {(isGetLoading || isPostLoading) && <Loaders />}
      <>
        <p>{t('Dictionary.QuizModal.Text.List')}</p>
        <ReactSelect
          placeholder={t('Dictionary.QuizModal.Placeholder.List')}
          options={
            vocabLists?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }) ?? []
          }
          selectedValue={listId}
          onChange={(option) => setListId((option as { value: string }).value)}
          className="select"
        />
        {error && <p className="text-red-600">{error}</p>}
        <div className="btn-wrap">
          <Button
            variants="blackBorder"
            className="border-dashed w-full"
            onClickHandler={() => {
              if (setIsShowCreateListModal) setIsShowCreateListModal(true);
            }}
          >
            {t('Dictionary.QuizModal.Button.CreateVocabList')}
          </Button>
          <Button
            onClickHandler={() => {
              setListId('');
              modal?.closeModal();
            }}
            variants="PrimaryWoodBorder"
          >
            {t('Button.Cancel')}
          </Button>
          <Button
            onClickHandler={() => {
              if (listId) addToList();
              else setError(t('Dictionary.QuizModal.Error.List'));
            }}
            variants="black"
          >
            {t('Button.Add')}
          </Button>
        </div>
      </>
    </>
  );
};

export default VocabListModal;
