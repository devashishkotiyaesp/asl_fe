import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import Loaders from 'components/Loaders';
import { Modal } from 'components/Modal/Modal';
import PageHeader from 'components/PageHeader';
import { Roles } from 'constants/common.constant';
import { StudentNavigation } from 'constants/navigation.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/SignModal.css';
import CreateVocabListModal from './CreateVocabListModal';
import VocabListModal from './VocabListModal';

export default function VocabularyModal({
  vocabularyId,
  setVocabularyId,
  isModal,
  isSentenceModal = false,
  showBreadCrumb = false,
}: {
  readonly vocabularyId: string;
  readonly setVocabularyId: (vocabularyId: string, isSentence?: boolean) => void;
  readonly isModal?: boolean;
  readonly isSentenceModal?: boolean;
  readonly showBreadCrumb?: boolean;
}) {
  const { t } = useTranslation();
  const { language } = useSelector(useLanguage);
  const [callApi, { isLoading }] = useAxiosGet();
  const [vocabulary, setVocabulary] = useState<{
    name?: string;
    sentence?: string;
    asl_gloss?: string;
    display_notes?: string | null;
    sign_mp4_file?: string | null;
    signer?: {
      name: string;
      designation?: string;
      profile_image?: string;
    };
    dominant_hand?: string;
    related?: {
      id: string;
      name: string;
    }[];
    vocabularies?: {
      id: string;
      name: string;
    }[];
    sentences?: {
      id: string;
      thumbnail: string | null;
      video_url: string | null;
    }[];
  }>();
  const [isSentence, setIsSentence] = useState<boolean>(isSentenceModal);
  const modalRef = useModal();
  const user = useSelector(getCurrentUser);
  const [isShowCreateListModal, setIsShowCreateListModal] = useState<boolean>(false);

  const getVocabulary = async () => {
    let url = '/vocab/';
    if (isSentence) url = '/sentence/';
    const { data } = await callApi(`${url}${vocabularyId}`);
    setVocabulary(data);
  };

  useEffect(() => {
    getVocabulary();
  }, [vocabularyId, isSentence, language]);

  return (
    <>
      {isLoading && <Loaders />}
      <Modal
        width="max-w-[600px]"
        headerTitle={t('Dictionary.VocabListModal.Header.Title')}
        modal={modalRef}
      >
        {isShowCreateListModal ? (
          <CreateVocabListModal
            quizModalRef={modalRef}
            vocabularyId={vocabularyId}
          />
        ) : (
          <VocabListModal
            vocabularyId={vocabularyId}
            modal={modalRef}
            setIsShowCreateListModal={setIsShowCreateListModal}
          />
        )}
      </Modal>
      <div className="dictionary-details dict-modal-wrap">
        <div className="container">
          {showBreadCrumb && (
            <>
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
                  {
                    label: vocabulary?.name ?? '',
                    url: `${StudentNavigation.dictionary.view.path}/${vocabularyId}`,
                  },
                ]}
              />
              <PageHeader title={vocabulary?.name}>
                {user?.role?.role === Roles.Student ? (
                  <Button
                    variants="black"
                    onClickHandler={() => {
                      setIsShowCreateListModal(false);
                      modalRef.openModal();
                    }}
                  >
                    {t('Dictionary.Button.AddToList')}
                  </Button>
                ) : (
                  <></>
                )}
              </PageHeader>
            </>
          )}

          <div className="dict-row row">
            <div className="left-part">
              <div className="video-wrap">
                {vocabulary?.sign_mp4_file ? (
                  <video
                    width="100%"
                    src={vocabulary.sign_mp4_file}
                    controls
                    muted
                    // autoPlay
                    // loop
                  />
                ) : (
                  <Image src="/images/no-image.png" />
                )}
              </div>
            </div>
            <div className="right-part">
              {vocabulary?.display_notes && (
                <div className="dict-part">
                  <span className="dict-part-title">
                    {t('Dictionary.Modal.Label.Notes')}
                  </span>
                  <p>
                    {vocabulary.display_notes ? vocabulary?.display_notes : '---'}
                  </p>
                </div>
              )}
              {vocabulary?.sentence && (
                <div className="dict-part">
                  <span className="dict-part-title">
                    {t('Dictionary.Modal.Label.English')}
                  </span>
                  <p>{vocabulary.sentence}</p>
                </div>
              )}
              {vocabulary?.asl_gloss && (
                <div className="dict-part">
                  <span className="dict-part-title">
                    {t('Dictionary.Modal.Label.Gloss')}
                  </span>
                  <p>{vocabulary.asl_gloss}</p>
                </div>
              )}
              {vocabulary?.signer && (
                <div className="dict-part-title">
                  <span className="dict-part-title">
                    {t('Dictionary.Modal.Label.Signer')}
                  </span>
                  <div className="dict-part-profile">
                    <div className="img">
                      <Image
                        isFromDataBase={false}
                        src={
                          vocabulary?.signer?.profile_image
                            ? vocabulary?.signer?.profile_image
                            : './images/no-image.png'
                        }
                      />
                    </div>
                    <div className="content">
                      <p className="name">
                        {vocabulary?.signer?.name ? vocabulary?.signer?.name : '---'}
                      </p>
                      {vocabulary?.signer?.designation && (
                        <span className="role">
                          {vocabulary?.signer?.designation
                            ? vocabulary?.signer?.designation
                            : '---'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {vocabulary?.dominant_hand && (
                <div className="dict-part">
                  <span className="dict-part-title">
                    {t('Dictionary.Modal.Label.DominantHand')}
                  </span>
                  <ul className="dict-hand-sign-wrap">
                    <li>
                      <span className="dict-hand-sign">
                        <span
                          className={`inline-block
                     ${
                       vocabulary?.dominant_hand !== 'Right Handed'
                         ? '-scale-x-100'
                         : ''
                     }
                    `}
                        >
                          &#9995;
                        </span>{' '}
                        {vocabulary?.dominant_hand}
                      </span>
                    </li>
                  </ul>
                </div>
              )}
              {Boolean(vocabulary?.sentences?.length) && (
                <div className="dict-part slider-part">
                  <span className="dict-part-title">
                    {t('Dictionary.Modal.Label.Sentences')}
                  </span>
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation
                    speed={800}
                    className="dict-slider"
                    modules={[Navigation]}
                    // autoplay={{
                    //   delay: 2000,
                    //   disableOnInteraction: false,
                    // }}
                  >
                    {vocabulary?.sentences?.map((sentence) => (
                      <SwiperSlide
                        key={sentence.id}
                        className="dict-slide"
                        onClick={() => {
                          if (!isModal) setIsSentence(true);
                          setVocabularyId(sentence.id, true);
                        }}
                      >
                        {sentence?.video_url ? (
                          <div className="video-wrap">
                            <video
                              width="100%"
                              src={sentence.video_url}
                              muted
                              // autoPlay
                              // loop
                            />
                            <span className="play-button" />
                          </div>
                        ) : (
                          <Image src="/images/no-image.png" />
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
              {(Boolean(vocabulary?.related?.length) ||
                Boolean(vocabulary?.vocabularies)) && (
                <div className="dict-part">
                  <span className="dict-part-title">
                    {t('Dictionary.Modal.Label.RelatedVocab')}
                  </span>
                  <ul className="dict-vocab-list">
                    {[
                      ...(vocabulary?.related ?? []),
                      ...(vocabulary?.vocabularies ?? []),
                    ]?.map((vocab) => (
                      <li key={vocab.id}>
                        <Button
                          className="dict-vocab-item"
                          onClickHandler={() => {
                            setIsSentence(false);
                            setVocabularyId(vocab.id);
                          }}
                        >
                          {vocab.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
