import { Modal } from 'components/Modal/Modal';
import { StudentNavigation } from 'constants/navigation.constant';
import { useModal } from 'hooks/useModal';
import { t } from 'i18next';
import NotFound from 'modules/Auth/pages/NotFound';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VocabularyModal from '../components/VocabularyModal';

const StudentDictionarySignPage = () => {
  const [sentenceId, setSentenceId] = useState<string>('');
  const { vocabularyId } = useParams();
  const navigate = useNavigate();
  const dictionaryRef = useModal();

  if (!vocabularyId) return <NotFound />;
  return (
    <>
      <VocabularyModal
        vocabularyId={vocabularyId}
        setVocabularyId={(id: string, isSentence?: boolean) => {
          if (isSentence) {
            dictionaryRef.openModal();
            setSentenceId(id);
          } else {
            dictionaryRef.closeModal();
            navigate(`${StudentNavigation.dictionary.view.path}/${id}`);
          }
        }}
        showBreadCrumb
        isModal
      />
      <Modal
        width="max-w-[1000px]"
        headerTitle={t('Dictionary.Modal.Header.Title')}
        modal={dictionaryRef}
      >
        <VocabularyModal
          vocabularyId={sentenceId}
          setVocabularyId={(id: string) => {
            dictionaryRef.closeModal();
            navigate(`${StudentNavigation.dictionary.view.path}/${id}`);
          }}
          isSentenceModal
        />
      </Modal>
    </>
  );
};

export default StudentDictionarySignPage;
