import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import { Modal } from 'components/Modal/Modal';
import { Form, Formik, FormikValues } from 'formik';
import { useAxiosGet, useAxiosPost, useAxiosPut } from 'hooks/useAxios';
import { t } from 'i18next';
import {
  AddEditCategoryProps,
  ICourseCategory,
} from 'modules/Course/common/types/course.type';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from 'reduxStore/slices/languageSlice';
import { capitalizeFirstLetter } from 'utils';

const AddEditCategory = ({ modal, refetch }: AddEditCategoryProps) => {
  const existData = modal?.modalData as unknown as ICourseCategory;
  const { allLanguages } = useSelector(useLanguage);
  const [createCategory] = useAxiosPost();
  const [updateCategory] = useAxiosPut();
  const [editGetData] = useAxiosGet();
  const [courseCategoryData, setCourseCategoryData] = useState<ICourseCategory[]>(
    []
  );
  const handleGetCategory = async () => {
    if (existData?.slug) {
      const data = await editGetData(`/course-category/${existData?.slug}`, {
        params: {
          allLanguage: true,
        },
      });
      setCourseCategoryData(data.data.data);
    }
  };

  useEffect(() => {
    if (existData) handleGetCategory();
  }, []);

  const formLanguages = [...(allLanguages ?? [])]?.map((lang) => ({
    name: lang.name,
    id: lang.id,
  }));

  const initialValues = formLanguages.reduce(
    (acc, lang) => {
      const existingData = courseCategoryData.find(
        (category: ICourseCategory) => category.language_id === lang.id
      );
      acc[lang.id] = existingData ? existingData.name : '';
      return acc;
    },
    {} as Record<string, string>
  );

  const OnSubmit = async (values: FormikValues) => {
    const isUpdate = Boolean(existData);

    const categories = Object.entries(values).map(([key, value]) => {
      const existingItem = courseCategoryData.find(
        (category: ICourseCategory) => category.language_id === key
      );

      return isUpdate
        ? {
            id: existingItem?.id,
            language_id: key,
            name: value,
          }
        : {
            language_id: key,
            name: value,
          };
    });

    const payload = { categories };
    if (isUpdate) {
      const { error } = await updateCategory('/course-category', payload);
      if (!error) {
        modal?.closeModal();
        refetch();
      }
    } else {
      const { error } = await createCategory('/course-category', payload);
      if (!error) {
        modal?.closeModal();
        refetch();
      }
    }
  };
  return (
    <Modal modal={modal} headerTitle="Course Category">
      <div className="conversation-modal">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => OnSubmit(values)}
          enableReinitialize
        >
          {() => (
            <Form>
              <div className="row">
                {formLanguages?.map((lang) => (
                  <InputField
                    parentClass="left-part"
                    key={lang.id}
                    isCompulsory
                    name={lang.id}
                    placeholder={`Enter name for ${lang.name}`}
                    label={`Category Name ${capitalizeFirstLetter(lang.name)}`}
                    //   value={values[lang.id]}
                  />
                )) ?? ''}
              </div>

              <div className="btn-wrap">
                <Button
                  className="w-fit"
                  variants="PrimaryWoodBorder"
                  onClickHandler={() => {
                    modal.closeModal();
                  }}
                >
                  {t('Community.ConfirmationPopup.Cancel')}
                </Button>
                <Button className="w-fit" variants="black" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddEditCategory;
