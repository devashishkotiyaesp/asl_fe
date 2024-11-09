import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import TextArea from 'components/FormElement/TextArea';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { IAddPostProps } from '../types';
import { ConversationValidation } from '../validations';

const AddEditConversation = ({ modal, refetch }: IAddPostProps) => {
  const params = useParams();
  const [createPost, { isLoading }] = useAxiosPost();
  const { t } = useTranslation();
  const initialValues = {
    description: '',
    media: '',
    community_id: params.id,
  };

  const OnSubmit = async (communityData: FormikValues) => {
    const formData = new FormData();

    Object.entries(communityData).forEach(([key, value]) => {
      if (key === 'media' && !value) return;
      formData.append(key, value as string);
    });

    const { error } = await createPost('/post', formData);
    if (!error) {
      modal.closeModal();
      refetch?.();
    }
  };

  return (
    <Modal modal={modal} closeOnEscape headerTitle={t('Conversation.Start')}>
      <div className="conversation-modal">
        <Formik
          initialValues={initialValues}
          validationSchema={ConversationValidation()}
          onSubmit={(values) => OnSubmit(values)}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="">
                <DropZone
                  parentClass="max-w-[270px]"
                  label={t('Community.UploadImage.Label')}
                  name="media"
                  SubTitle={t('Community.UploadImage.SubTitle')}
                  setValue={setFieldValue}
                  acceptTypes="image/*"
                  value={values.media}
                  fileType={EnumFileType.Image}
                />
                <TextArea
                  parentClass="mt-5"
                  rows={5}
                  name="description"
                  label={t('Community.PostDescription.Label')}
                  placeholder={t('Community.PostDescription.Placeholder')}
                />

                <div className="btn-wrapper">
                  <Button className="w-fit" variants="PrimaryWoodBorder">
                    {t('Community.ConfirmationPopup.Cancel')}
                  </Button>
                  <Button
                    className="w-fit"
                    variants="black"
                    type="submit"
                    isLoading={isLoading}
                  >
                    {t('Community.Buttons.UpdatePost')}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddEditConversation;
