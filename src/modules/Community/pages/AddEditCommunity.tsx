import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import PageHeader from 'components/PageHeader';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { CommunityType } from '../constants';
import '../index.css';
import { CommunityValidation } from '../validations';

const AddEditCommunity = () => {
  const { t } = useTranslation();
  const [createCommunity, { isLoading }] = useAxiosPost();
  const navigate = useNavigate();
  const params = useParams();

  // initial values object
  const initialValues = {
    name: '',
    course_id: '',
    description: '',
    media: '',
    type: params?.type,
  };

  const OnSubmit = async (communityData: FormikValues) => {
    const formData = new FormData();

    Object.entries(communityData).forEach(([key, value]) => {
      if (
        (key === 'course_id' && params?.type !== CommunityType.DISCUSSION) ||
        (key === 'media' && !value)
      ) {
        return;
      }
      formData.append(key, value as string);
    });
    const { error } = await createCommunity('/community', formData);
    if (!error) navigate('/community');
  };

  return (
    <div>
      <PageHeader
        title={
          params?.type === CommunityType.DISCUSSION
            ? t('Community.PageHeader.CreateNewDiscussion')
            : t('Community.PageHeader.CreateNewTopic')
        }
        url="/community"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={CommunityValidation()}
        onSubmit={(values) => OnSubmit(values)}
        enableReinitialize
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="content-base">
                <div className="add-topic-wrap row">
                  <div className="left-part">
                    <DropZone
                      isCompulsory
                      label={t('Community.UploadImage.Label')}
                      name="media"
                      SubTitle={t('Community.UploadImage.SubTitle')}
                      setValue={setFieldValue}
                      acceptTypes="image/*"
                      value={values.media}
                      fileType={EnumFileType.Image}
                    />
                  </div>
                  <div className="right-part">
                    <InputField
                      isCompulsory
                      placeholder={t('Community.DiscussionTitle.Placeholder')}
                      type="text"
                      value={values.name}
                      label={t('Community.Title.Label')}
                      name="name"
                    />
                    <TextArea
                      isCompulsory
                      rows={2}
                      placeholder={t('Community.Description.Placeholder')}
                      label={t('Community.Description.Label')}
                      value={values.description}
                      name="description"
                    />
                    {params?.type === CommunityType.DISCUSSION && (
                      <ReactSelect
                        isCompulsory
                        label={t('Community.ConnectToCourse.Label')}
                        placeholder={t('Community.ConnectToCourse.Placeholder')}
                        options={[{ label: '1', value: '1' }]}
                        name="course_id"
                      />
                    )}
                    <Button
                      variants="black"
                      className="w-20"
                      type="submit"
                      isLoading={isLoading}
                    >
                      {t('Community.Table.Add')}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEditCommunity;
