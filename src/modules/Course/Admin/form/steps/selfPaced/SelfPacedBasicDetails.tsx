import Button from 'components/Button/Button';
import Card from 'components/Card';
import CreatableReactSelect from 'components/FormElement/CreatableReactSelect';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType, fileInputEnum } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import { IOptions } from 'components/FormElement/types';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { Roles } from 'constants/common.constant';
import { Form, Formik } from 'formik';
import { useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { SelfPacedValidations } from 'modules/Course/Admin/form/validations';
import {
  useCommonAslLevel,
  useCommonCourseCategory,
} from 'modules/Course/common/hooks';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'reduxStore/slices/authSlice';
import { SetFieldValue } from 'types';
import { CourseBasicDetailDataTypes, SelfPacedBasicTypes } from '../../types';

interface SelfPacedBasicDetailsProps {
  initialData: { data: CourseBasicDetailDataTypes };
  onSubmit: (data: SelfPacedBasicTypes) => void;
  isLoading: boolean;
}

const SelfPacedBasicDetails: FC<SelfPacedBasicDetailsProps> = ({
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const courseCategory = useCommonCourseCategory();
  const userFromRedux = useSelector(getCurrentUser)?.role?.role ?? Roles.Admin;
  const [invitedEditors, setInvitedEditors] = useState<IOptions[]>();
  const [isAdmin, setIsAdmin] = useState<boolean>(userFromRedux === Roles.Admin);
  const [callApi] = useAxiosGet();
  const levels = useCommonAslLevel();
  const [aslLevel, setAslLevel] = useState(levels);
  const [createAslLevel, { isLoading: creatingLevel }] = useAxiosPost();
  const initialValues = {
    cover_video: initialData.data.cover_video ?? null,
    cover_image: initialData.data.cover_image ?? null,
    srt_file_path: initialData.data.srt_file_path ?? null,
    description: initialData.data.description || '',
    title: initialData.data.title || '',
    asl_level_id: initialData.data.asl_level_id || '',
    key_learnings: initialData.data.key_learnings || [],
    editor_teacher_id:
      initialData.data.invited_course_editors?.map(
        (editor) => editor.user_teacher_id
      ) || [],
    subscription_type_id: initialData.data.subscription_type_id || '',
    category_id: initialData.data.category_id || undefined,
  };

  const getCourseEditors = async () => {
    const response = await callApi('/role/get-all');
    const teacherId = response.data.find(
      (item: { role: string; id: string }) => item.role === Roles.Teacher
    );
    const { data, error } = await callApi('/users', {
      params: {
        dropdown: true,
        role: teacherId.id,
      },
    });
    if (data && !error) {
      setInvitedEditors(data);
    }
  };

  useEffect(() => {
    getCourseEditors();
  }, []);

  useEffect(() => {
    setIsAdmin(userFromRedux === Roles.Admin);
  }, [userFromRedux]);

  const handleAslCreateOption = async (
    value: string,
    setFieldValue: SetFieldValue
  ) => {
    const { error, data } = await createAslLevel(`/asl`, { level: value });
    if (!error) {
      setAslLevel((prev) => [...prev, { label: data?.level, value: data?.id }]);
      setFieldValue(`asl_level_id`, data?.id);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SelfPacedValidations(1, t, isAdmin)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        return (
          <Card isGray className="course-inner-card">
            <div className="course-card-title">
              {t('CourseManagement.AddEditForm.BasicFormHeader')}
            </div>
            <Form className="">
              <div className="row">
                <div className="left-part">
                  <DropZone
                    fileInputIcon="camera"
                    name="cover_image"
                    setValue={setFieldValue}
                    value={values.cover_image ?? null}
                    label={t('CourseManagement.AddEditForm.CoverPhotoLabel')}
                    SubTitle={t('CourseManagement.AddEditForm.CoverPhotoSubTitle')}
                    acceptTypes="image/*"
                    fileType={EnumFileType.Image}
                  />
                  <DropZone
                    fileInputIcon="pause"
                    name="cover_video"
                    setValue={setFieldValue}
                    value={values.cover_video ?? null}
                    label={t('CourseManagement.AddEditForm.CoverVideoLabel')}
                    SubTitle={t('CourseManagement.AddEditForm.CoverVideoSubTitle')}
                    acceptTypes="video/*"
                    fileType={EnumFileType.Video}
                  />
                  <DropZone
                    fileInputIcon="camera"
                    name="srt_file_path"
                    setValue={setFieldValue}
                    value={values.srt_file_path ?? null}
                    Title={t('CourseManagement.AddEditForm.SRTFileLabel')}
                    label={t('SelfPacedBasicDetails.UploadCaptionLabel')}
                    acceptTypes="image/*"
                    variant={fileInputEnum.LinkFileInput}
                  />
                </div>
                <div className="right-part">
                  <InputField
                    name="title"
                    label={t('CourseManagement.AddEditForm.TitleLabel')}
                    placeholder={t('CourseManagement.AddEditForm.TitlePlaceholder')}
                    value={values.title}
                    isCompulsory
                  />
                  <ReactEditor
                    label={t('CourseManagement.AddEditForm.DescriptionLabel')}
                    parentClass="h-unset"
                    name="description"
                    placeholder={t(
                      'CourseManagement.AddEditForm.DescriptionPlaceholder'
                    )}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    value={values?.description}
                    isCompulsory
                  />
                  {isAdmin && (
                    <ReactSelect
                      name="category_id"
                      options={courseCategory ?? []}
                      placeholder={t(
                        'CourseManagement.AddEditForm.CourseCategoryPlaceholder'
                      )}
                      label={t('CourseManagement.AddEditForm.CourseCategoryLabel')}
                      parentClass="width-full"
                      isCompulsory
                    />
                  )}
                  <CreatableReactSelect
                    name="asl_level_id"
                    options={aslLevel.length > 0 ? aslLevel : levels}
                    placeholder={t(
                      'CourseManagement.AddEditForm.CourseLevelPlaceholder'
                    )}
                    isLoading={creatingLevel}
                    handleCreateOption={(e) => {
                      handleAslCreateOption(e, setFieldValue);
                    }}
                    isCompulsory
                    label={t('CourseManagement.AddEditForm.CourseLevelLabel')}
                    parentClass="width-full"
                  />
                  {/* this is static but will be dynamic in future */}
                  {isAdmin && (
                    <ReactSelect
                      options={[
                        { value: 'basic', label: 'Basic Subscription' },
                        { value: 'advanced', label: 'Advanced Subscription' },
                        { value: 'premium', label: 'Premium Subscription' },
                      ]}
                      placeholder={t(
                        'CourseManagement.AddEditForm.SubscriptionLevelPlaceholder'
                      )}
                      label={t(
                        'CourseManagement.AddEditForm.SubscriptionLevelLabel'
                      )}
                      name="subscription_type_id"
                      parentClass="width-full"
                    />
                  )}
                  <ReactSelect
                    options={[
                      { value: 'numbers', label: 'Numbers' },
                      { value: 'basic fingerspell', label: 'Basic FingerSpell' },
                      { value: 'interesting topic', label: 'Interesting Topic' },
                    ]}
                    isMulti
                    placeholder={t(
                      'CourseManagement.AddEditForm.KeyLearningPlaceholder'
                    )}
                    label={t('CourseManagement.AddEditForm.KeyLearningLabel')}
                    name="key_learnings"
                    parentClass="width-full"
                    isCompulsory
                  />
                  {isAdmin && (
                    <ReactSelect
                      options={invitedEditors || []}
                      placeholder={t(
                        'CourseManagement.AddEditForm.InvitedEditorPlaceholder'
                      )}
                      label={t('CourseManagement.AddEditForm.InvitedEditorLabel')}
                      name="editor_teacher_id"
                      parentClass="width-full"
                      isMulti
                    />
                  )}
                  <div className="bnt-wrap">
                    <Button
                      variants="black"
                      className="w-fit"
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {t('CourseManagement.AddEditForm.NextButtonText')}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card>
        );
      }}
    </Formik>
  );
};

export default SelfPacedBasicDetails;
