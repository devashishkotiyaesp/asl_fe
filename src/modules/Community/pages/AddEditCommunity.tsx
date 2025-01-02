import Button from 'components/Button/Button';
import Card from 'components/Card';
import Checkbox from 'components/FormElement/CheckBox';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import PageHeader from 'components/PageHeader';
import { CourseTypeEnum } from 'constants/common.constant';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPatch, useAxiosPost } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { OrganizationType } from 'reduxStore/types';
import { CommunityType } from '../constants';
import '../index.css';
import { ICommunityItem, PermissionType } from '../types';
import { CommunityValidation } from '../validations';

const AddEditCommunity = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [createCommunity, { isLoading }] = useAxiosPost();
  const [getOrganization] = useAxiosGet();
  const [getCourses] = useAxiosGet();

  const [updateCommunity] = useAxiosPatch();
  const navigate = useNavigate();
  const params = useParams();
  const communityUrlType = new URLSearchParams(location.search).get('community');

  const [getDiscussion] = useAxiosGet();
  const [communityData, setCommunityData] = useState<ICommunityItem>();
  const [organizationData, setOrganizationData] =
    useState<{ label: string; value: string }[]>();
  const [courseData, setCourseData] = useState<{ label: string; value: string }[]>();

  const isEditing = !!params.id;
  const handleCommunityDetail = async () => {
    if (isEditing) {
      const data = await getDiscussion(`/community/${params.id}`);
      setCommunityData(data.data);
    }
    const organization = await getOrganization('/organization/get-all');
    const data = organization?.data?.map((data: OrganizationType) => {
      return { label: data?.userDetails?.full_name, value: data?.id };
    });
    setOrganizationData(data);

    const courses = await getCourses('/courses', {
      params: {
        type: CourseTypeEnum.SELF_PACED_COURSES,
        dropdown: true,
        label: 'title',
        value: 'id',
      },
    });
    setCourseData(courses?.data);
  };

  useEffect(() => {
    handleCommunityDetail();
  }, []);

  // initial values object
  const initialValues = {
    name: communityData?.name ?? '',
    course_id: communityData?.course_id ?? '',
    description: communityData?.description ?? '',
    media: communityData?.media ?? '',
    type: communityData?.type ?? params?.type,
    organization_id: communityData?.organization_id ?? '',
    permission_type: communityData?.permission_type ?? '',
  };

  const OnSubmit = async (values: FormikValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        (isEditing && key === 'type') ||
        (key === 'course_id' && params?.type !== CommunityType.DISCUSSION) ||
        (key === 'media' && !value)
      ) {
        return;
      }
      formData.append(key, value as string);
    });

    if (isEditing) {
      formData.append('id', communityData?.id ?? '');
      const { error } = await updateCommunity(`/community`, formData);
      if (!error) navigate(`/community?community=${params?.type}`);
    } else {
      const { error } = await createCommunity('/community', formData);
      if (!error) navigate(`/community?community=${params?.type}`);
    }
  };

  return (
    <div>
      <PageHeader
        title={
          params?.type === CommunityType.DISCUSSION ||
          communityUrlType === CommunityType.DISCUSSION
            ? t('Community.PageHeader.CreateNewDiscussion')
            : t('Community.PageHeader.CreateNewTopic')
        }
        url={`/community?community=${communityUrlType}`}
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
                      isCapture
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
                    {(params?.type === CommunityType.DISCUSSION ||
                      communityUrlType === CommunityType.DISCUSSION) && (
                      <ReactSelect
                        label={t('Community.ConnectToCourse.Label')}
                        placeholder={t('Community.ConnectToCourse.Placeholder')}
                        options={courseData}
                        name="course_id"
                      />
                    )}
                    <Card
                      title={t('Community.Permission.Type.Title')}
                      minimal
                      isGray
                      className="read-write-card"
                    >
                      <div className="checkbox-wrapper">
                        <Checkbox
                          check={
                            values?.permission_type ===
                            PermissionType?.SPECIFIC_ORGANIZATION
                          }
                          text={t('Community.Permission.Type.Specific')}
                          value="permission_type"
                          onChange={() => {
                            setFieldValue(
                              'permission_type',
                              values?.permission_type === ''
                                ? PermissionType?.SPECIFIC_ORGANIZATION
                                : ''
                            );
                          }}
                        />
                      </div>
                      <div>
                        <ReactSelect
                          label={t('Community.Organization.orgTitle')}
                          placeholder={t('Community.Organization.orgTitle')}
                          options={organizationData}
                          name="organization_id"
                        />
                      </div>
                    </Card>
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
