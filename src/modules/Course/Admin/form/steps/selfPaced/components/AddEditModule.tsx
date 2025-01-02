import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useAxiosPost } from 'hooks/useAxios';
import { t } from 'i18next';
import { IModulesItem } from 'modules/Course/common/types/course.type';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQueryParams } from '../../../helper/form.helper';
import { SelfPacedValidations } from '../../../validations';
import { AddEditModuleProps } from '../types/selfPacedMaterial.type';

const AddEditModule = ({
  modal,
  refetch,
  selectedModule,
  sortOrder,
}: AddEditModuleProps) => {
  const formikRef = useRef<FormikProps<IModulesItem>>(null);
  const { slug: course_slug, common_id: course_common_id } = useParams();
  const existData = selectedModule || null;
  const [postApi, { isLoading: isLoadingCreateModule }] = useAxiosPost();
  const { language_id } = getQueryParams();
  const [courseModuleData, setCourseModuleData] = useState<IModulesItem>(
    (existData as IModulesItem) || {
      title: '',
      cover_image: '',
    }
  );

  const handleModuleSubmit = async (
    values: IModulesItem,
    helpers: FormikHelpers<IModulesItem>
  ) => {
    const formData = new FormData();
    const payload = {
      title: values.title,
      cover_image: values.cover_image,
      ...(values.slug ? { slug: values.slug } : { sort_order: sortOrder }),
      ...(values.slug ? { slug: values.slug } : {}),
      ...(values.common_id ? { common_id: values.common_id } : {}),
      language_id,
      course_slug,
      course_common_id,
    };

    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    const result = await postApi('/courses/module', formData);
    if (result.data) {
      helpers.resetForm();
      modal.closeModal();
      refetch();
    }
  };

  return (
    <Modal
      headerTitle={
        existData?.slug
          ? t('Course.AddEditModule.HeaderTitle')
          : t('Course.AddEditModule.HeaderTitle.Edit')
      }
      modal={modal}
      closeOnEscape
      closeOnOutsideClick
      setDataClear={setCourseModuleData}
    >
      <Formik<IModulesItem>
        initialValues={courseModuleData}
        validationSchema={() => SelfPacedValidations(2, t)}
        onSubmit={handleModuleSubmit}
        innerRef={formikRef}
      >
        {({ values, setFieldValue, submitForm }) => (
          <Form>
            <div className="flex flex-col gap-5">
              <DropZone
                parentClass="max-w-[330px]"
                fileInputIcon="camera"
                name="cover_image"
                setValue={setFieldValue}
                value={values?.cover_image}
                isCompulsory
                label={t(
                  'CourseManagement.AddEditForm.AddEditModule.CoverImageLabel'
                )}
                SubTitle={t(
                  'CourseManagement.AddEditForm.AddEditModule.CoverImageSubTitle'
                )}
                acceptTypes="image/*"
                fileType={EnumFileType.Image}
              />

              <InputField
                name="title"
                label={t(
                  'CourseManagement.AddEditForm.AddEditModule.ModuleTitleLabel'
                )}
                placeholder={t(
                  'CourseManagement.AddEditForm.AddEditModule.ModuleTitlePlaceholder'
                )}
                type="text"
                value={values?.title}
              />
            </div>
            <div className="btn-wrap">
              <Button
                type="button"
                variants="blackBorder"
                onClickHandler={modal.closeModal}
              >
                {t('CourseManagement.AddEditForm.PreviousButtonText')}
              </Button>

              <Button
                type="button"
                variants="black"
                disabled={isLoadingCreateModule}
                onClickHandler={submitForm}
                isLoading={isLoadingCreateModule}
              >
                {t('CourseManagement.AddEditForm.ContinueButtonText')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddEditModule;
