// ** Components **
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import { Modal } from 'components/Modal/Modal';

// ** Formik **
import { Form, Formik, FormikValues } from 'formik';

// ** Hooks **
import { useAxiosPatch, useAxiosPost } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';

// ** Validations **
import Button from 'components/Button/Button';
import { ICommunityItem } from '../types';
import { CommunityValidation } from '../validations';

interface AddEditTopicProps {
  modal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  orgId?: string;
  isDiscussion?: boolean;
  refetch?: () => void;
  editData?: ICommunityItem;
}

const AddEditTopic = ({
  modal,
  orgId,
  isDiscussion,
  refetch,
  editData,
}: AddEditTopicProps) => {
  const { t } = useTranslation();
  const [createCommunity, { isLoading }] = useAxiosPost();
  const [updateCommunity, { isLoading: isUpdateLoading }] = useAxiosPatch();

  const initialValues = {
    name: editData?.name ?? '',
    course_id: editData?.course_id ?? '1',
    description: editData?.description ?? '',
    media: editData?.media ?? '',
    type: editData?.type ?? (isDiscussion ? 'discussion' : 'topic'),
  };

  const OnSubmit = async (communityData: FormikValues) => {
    const formData = new FormData();

    Object.entries(communityData).forEach(([key, value]) => {
      if (
        (editData && key === 'type') ||
        (key === 'course_id' && !isDiscussion) ||
        (key === 'media' && !value)
      ) {
        return;
      }
      formData.append(key, value as string);
    });
    if (orgId) {
      formData.append('organization_id', orgId);
    }

    if (editData) {
      formData.append('id', editData?.id ?? '');
      const { error } = await updateCommunity(`/community`, formData);
      if (!error) {
        refetch?.();
        modal.closeModal();
      }
    } else {
      const { error } = await createCommunity('/community', formData);
      if (!error) {
        refetch?.();
        modal.closeModal();
      }
    }
  };

  return (
    <Modal
      modal={modal}
      headerTitle={
        isDiscussion
          ? t('Community.Buttons.CreateDiscussion')
          : t('Community.Buttons.CreateTopic')
      }
    >
      <div className="conversation-modal">
        <Formik
          initialValues={initialValues}
          validationSchema={CommunityValidation()}
          onSubmit={(values) => {
            return OnSubmit(values);
          }}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="">
                <DropZone
                  isCapture
                  parentClass="max-w-[270px] mb-5"
                  label={t('Community.UploadImage.SubTitle')}
                  name="media"
                  SubTitle={t('Community.UploadImage.SubTitle')}
                  setValue={setFieldValue}
                  value={values.media}
                />

                <InputField
                  isCompulsory
                  name="name"
                  placeholder={t('Community.DiscussionTitle.Placeholder')}
                  label={t('Community.Title.Label')}
                />

                <TextArea
                  isCompulsory
                  parentClass="mt-5"
                  rows={5}
                  name="description"
                  label={t('Community.Description.Label')}
                  placeholder={t('Community.Description.Placeholder')}
                />
                {isDiscussion && (
                  <ReactSelect
                    isCompulsory
                    label={t('Community.ConnectToCourse.Label')}
                    placeholder={t('Community.ConnectToCourse.Placeholder')}
                    options={[{ label: '1', value: '1' }]}
                    name="course_id"
                  />
                )}

                <div className="btn-wrapper">
                  <Button
                    className="w-fit"
                    variants="PrimaryWoodBorder"
                    onClickHandler={() => {
                      modal.closeModal();
                    }}
                  >
                    {t('Community.ConfirmationPopup.Cancel')}
                  </Button>
                  <Button
                    className="w-fit"
                    variants="black"
                    type="submit"
                    isLoading={isUpdateLoading ?? isLoading}
                  >
                    {isDiscussion
                      ? t('Community.Buttons.CreateDiscussion')
                      : t('Community.Buttons.CreateTopic')}
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

export default AddEditTopic;
