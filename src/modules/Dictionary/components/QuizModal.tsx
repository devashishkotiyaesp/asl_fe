import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useAxiosGet } from 'hooks/useAxios';
import { UserModalType } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/index.css';

export default function QuizModal({
  quizModalRef,
  setModalType,
  quizType,
  setQuizType,
  setSelectedId,
}: {
  readonly quizModalRef: UserModalType;
  readonly setModalType: (modelType: string) => void;
  readonly quizType: string;
  readonly setQuizType: (type: string) => void;
  readonly setSelectedId: (id: string) => void;
}) {
  const { t } = useTranslation();
  const [callApi] = useAxiosGet();
  const [quizBy, setQuizBy] = useState<string>('');
  const [categoriesOrVocabLists, setCategoriesOrVocabLists] = useState<
    { id: string; name: string }[]
  >([]);
  const [currentSelectedId, setCurrentSelectedId] = useState<string>('');

  const fetchVocabCategoriesOrVocabLists = async () => {
    let url = '/vocab-category/all';
    if (quizType === 'list') url = '/vocab-list';
    const response = await callApi(url);
    setCategoriesOrVocabLists(response.data?.data);
  };

  useEffect(() => {
    setCategoriesOrVocabLists([]);
    setSelectedId('');
    setCurrentSelectedId('');
    fetchVocabCategoriesOrVocabLists();
  }, [quizType]);

  return (
    <>
      <p className="dictionary-quiz-text">
        {t(
          quizType === 'list'
            ? 'Dictionary.QuizModal.Text.List'
            : 'Dictionary.QuizModal.Text'
        )}
      </p>
      {quizType && (
        <div className="select-quiz-list">
          {categoriesOrVocabLists?.map((item) => (
            <Button
              className={`select-quiz-item ${currentSelectedId === item.id ? 'active' : ''}`}
              onClickHandler={() => setCurrentSelectedId(item.id)}
              key={item.id}
            >
              {item.name}
              <Image iconName="chevronRight" />
            </Button>
          ))}
          {quizType === 'list' && (
            <Button
              variants="blackBorder"
              className="border-dashed w-full"
              onClickHandler={() => setModalType('list')}
            >
              {t('Dictionary.QuizModal.Button.CreateVocabList')}
            </Button>
          )}
        </div>
      )}
      {!quizType && (
        <div className="select-quiz-list">
          <Button
            className={`select-quiz-item ${quizBy === 'category' ? 'active' : ''}`}
            onClickHandler={() => setQuizBy('category')}
          >
            <div className="text-icon">📙</div>
            {t('Dictionary.QuizModal.Button.ByVocabCategory')}
            <Image iconName="chevronRight" />
          </Button>
          <Button
            className={`select-quiz-item ${quizBy === 'list' ? 'active' : ''}`}
            onClickHandler={() => setQuizBy('list')}
          >
            <div className="text-icon">📋</div>
            <span>{t('Dictionary.QuizModal.Button.ByList')}</span>
            <Image iconName="chevronRight" />
          </Button>
        </div>
      )}

      <div className="btn-wrap">
        <Button
          variants="PrimaryWoodBorder"
          onClickHandler={() => quizModalRef.closeModal()}
        >
          {t('Button.Cancel')}
        </Button>
        <Button
          onClickHandler={() => {
            if (quizType && currentSelectedId) setSelectedId(currentSelectedId);
            else if (quizBy) setQuizType(quizBy);
          }}
          variants="black"
        >
          {t('Button.Next')}
        </Button>
      </div>
    </>
  );
}
