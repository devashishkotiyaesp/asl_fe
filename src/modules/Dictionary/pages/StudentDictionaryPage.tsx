import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import Loaders from 'components/Loaders';
import { Modal } from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader';
import SearchComponent from 'components/search';
import { Roles } from 'constants/common.constant';
import { StudentNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import {
  addVocabularies,
  getVocabularies,
  setCurrentPage,
  setVocabularies,
} from 'reduxStore/slices/vocabSlice';
import { useDebounce } from 'utils';
import CreateVocabListModal from '../components/CreateVocabListModal';
import QuizModal from '../components/QuizModal';
import QuizQuestionsModal from '../components/QuizQuestionsModal';
import '../styles/StudentDictionaryPage.style.css';
import { IQuiz } from '../types';

const StudentDictionaryPage = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const limit = 30;
  const { vocabularies, currentPage } = useSelector(getVocabularies);
  const [filterTab, setFilterTab] = useState<string>('categories');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [currentSelectedCategoryIds, setCurrentSelectedCategoryIds] = useState<
    string[]
  >([]);
  const [selectedLanguageIds, setSelectedLanguageIds] = useState<string[]>([]);
  const [currentSelectedLanguageIds, setCurrentSelectedLanguageIds] = useState<
    string[]
  >([]);
  const [isShowGifApplied, setIsShowGifApplied] = useState<boolean>(false);
  const [isShowGif, setIsShowGif] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('quiz');
  const [quizType, setQuizType] = useState<string>('');
  const [quiz, setQuiz] = useState<IQuiz>();
  const [selectedId, setSelectedId] = useState<string>('');
  const user = useSelector(getCurrentUser);
  const { allLanguages } = useSelector(useLanguage);
  const [search, setSearch] = useState<string>('');
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const debounceSearch = useDebounce(search, 300);
  const { language } = useSelector(useLanguage);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPageUpdate = useRef(false);
  const fetchVocabularies = async () => {
    const response = await callApi('/vocab/get-all', {
      params: {
        limit,
        page: currentPage,
        ...(search && { search }),
        ...(selectedCategoryIds?.length > 0 && {
          category: JSON.stringify(selectedCategoryIds),
        }),
        ...(selectedLanguageIds?.length > 0 && {
          language_ids: JSON.stringify(selectedLanguageIds),
        }),
        ...(isShowGifApplied && {
          show_gif: isShowGifApplied,
        }),
      },
    });
    if (response.data) {
      const { data, currentPage: page, lastPage } = response.data;
      if (page < lastPage) setIsLoadMore(true);
      else setIsLoadMore(false);
      if (page === 1) {
        dispatch(setVocabularies(data));
      } else {
        dispatch(addVocabularies(data));
      }
    }
  };
  const fetchQuiz = async () => {
    const response = await callApi('/vocab/quiz', {
      params: {
        ...(quizType === 'category' && { category_id: selectedId }),
        ...(quizType === 'list' && { list_id: selectedId }),
      },
    });
    if (!response.data) {
      setQuiz({ name: response.message ?? '' });
    } else setQuiz(response.data);
  };

  useEffect(() => {
    if (selectedId) fetchQuiz();
  }, [selectedId]);

  const dictionaryUnlock = useModal();
  const quizModalRef = useModal();

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

  const handleLanguageSelection = (languageId: string) => {
    setCurrentSelectedLanguageIds((prevSelectedLanguageIds) => {
      if (currentSelectedLanguageIds.includes(languageId)) {
        return currentSelectedLanguageIds.filter(
          (selected) => selected !== languageId
        );
      }
      return [...prevSelectedLanguageIds, languageId];
    });
  };

  const checkIsCategorySelected = (categoryId: string) => {
    return currentSelectedCategoryIds.includes(categoryId);
  };

  const checkIsLanguageSelected = (languageId: string) => {
    return currentSelectedLanguageIds.includes(languageId);
  };

  const fetchCategories = async () => {
    const { data } = await callApi('/vocab-category/all');
    setCategories(data?.data ?? []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [debounceSearch, selectedCategoryIds, selectedLanguageIds, isShowGifApplied]);

  useEffect(() => {
    if (isPageUpdate.current) {
      isPageUpdate.current = false;
      return;
    }
    fetchVocabularies();
  }, [
    language,
    currentPage,
    debounceSearch,
    selectedCategoryIds,
    selectedLanguageIds,
    isShowGifApplied,
  ]);

  return (
    <div className="dictionary-sign">
      {isLoading && <Loaders />}
      <div className="container">
        <Button
          variants="black"
          onClickHandler={() => dictionaryUnlock.openModal()}
          className="hidden"
        >
          Open Unlock Modal
        </Button>
        <Breadcrumbs
          className="student-page-header"
          items={[
            {
              label: 'Home',
              url: '/',
            },
            {
              label: 'ASL Dictionary',
              url: StudentNavigation.dictionary.view.path,
            },
          ]}
        />
        <PageHeader title={t('Dictionary.SignList.Title')}>
          <div className="flex gap-4">
            <SearchComponent
              value={search}
              onSearch={(e) => setSearch(e.target.value)}
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
                        className={`${filterTab === 'display' ? 'active' : ''}`}
                        onClickHandler={() => setFilterTab('display')}
                      >
                        {t('Dictionary.Filter.Label.Display')}
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
                  {filterTab === 'display' && (
                    <div className="dictionary-categories-list style-scroll">
                      <span
                        className={isShowGif ? 'active' : ''}
                        onClick={() => setIsShowGif(!isShowGif)}
                      >
                        GIFs
                      </span>
                      {allLanguages?.map((language) => (
                        <span
                          key={language.id}
                          className={`${checkIsLanguageSelected(language.id) ? 'active' : ''}`}
                          onClick={() => handleLanguageSelection(language.id)}
                        >
                          {language.name?.charAt(0)?.toUpperCase()}
                          {language.name?.slice(1)}
                        </span>
                      ))}
                    </div>
                  )}
                  <Button
                    className="mt-5 w-full"
                    variants="black"
                    onClickHandler={() => {
                      if (currentPage !== 1) isPageUpdate.current = true;
                      if (filterTab === 'categories') {
                        setSelectedCategoryIds(currentSelectedCategoryIds);
                      } else {
                        setSelectedLanguageIds(currentSelectedLanguageIds);
                        setIsShowGifApplied(isShowGif);
                      }
                      setFilterVisible(false);
                    }}
                  >
                    {t('Dictionary.Filter.Button.Apply')}
                  </Button>
                </div>
              )}
              IsFilter
              placeholder={t('InputSearchPlaceholder')}
            />
            {user?.role?.role === Roles.Student && (
              <Button
                onClickHandler={() => {
                  setQuizType('');
                  setSelectedId('');
                  setModalType('quiz');
                  quizModalRef.openModal();
                }}
                variants="black"
              >
                {t('Dictionary.Button.Quiz')}
              </Button>
            )}
          </div>
        </PageHeader>
        <div className="dictionary-sign-list">
          {vocabularies?.map((vocabulary) => (
            <div
              key={vocabulary.id}
              className="dictionary-sign-item"
              onClick={() =>
                navigate(
                  `${StudentNavigation.dictionary.view.path}/${vocabulary.id}`
                )
              }
            >
              <div className="dictionary-sign-name">
                <span>{vocabulary.name}</span>
              </div>
              <Image src={vocabulary.sign_photo ?? '/images/no-image.png'} />
            </div>
          ))}
        </div>
        {isLoadMore && (
          <div className="btn-wrap !justify-center">
            <Button
              isLoading={isLoading}
              variants="black"
              onClickHandler={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              {t('Dictionary.SignList.LoadMore')}
            </Button>
          </div>
        )}
      </div>

      <Modal
        width="max-w-[450px]"
        modalBodyClassName="dictionary-unlock-modal"
        modal={dictionaryUnlock}
        closeOnEscape
        closeOnOutsideClick
      >
        <>
          <div className="dictionary-unlock-icon">
            <Image iconName="ban" />
          </div>
          <h2>{t('Dictionary.Modal.AccessRestricted.Header')}</h2>
          <p>{t('DIctionary.Modal.AccessRestricted.Description')}</p>
          <div className="btn-wrap !justify-center">
            <Button
              onClickHandler={() => dictionaryUnlock.closeModal()}
              variants="PrimaryWoodBorder"
            >
              {t('Button.Cancel')}
            </Button>
            <Button variants="black">
              {t('Dictionary.Modal.AccessRestricted.Button.UpgradeNow')}
            </Button>
          </div>
        </>
      </Modal>
      <Modal
        width="max-w-[600px]"
        modalBodyClassName="dictionary-quiz-modal"
        modal={quizModalRef}
        closeOnEscape
        closeOnOutsideClick
        headerTitle={`${quiz?.name ? quiz.name : modalType === 'quiz' ? 'Quiz Yourself' : 'Create Vocab List'}`}
      >
        {quizType && selectedId ? (
          quiz?.questions?.length && quiz.questions.length > 0 ? (
            <QuizQuestionsModal
              questions={quiz.questions}
              quizModalRef={quizModalRef}
            />
          ) : (
            <></>
          )
        ) : modalType === 'quiz' ? (
          <QuizModal
            quizModalRef={quizModalRef}
            setModalType={setModalType}
            quizType={quizType}
            setQuizType={setQuizType}
            setSelectedId={setSelectedId}
          />
        ) : (
          <CreateVocabListModal quizModalRef={quizModalRef} />
        )}
      </Modal>
    </div>
  );
};

export default StudentDictionaryPage;
