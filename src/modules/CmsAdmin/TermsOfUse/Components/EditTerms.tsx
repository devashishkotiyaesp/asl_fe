import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const EditTerms = ({ setFieldValue, values, setFieldTouched }: SectionProps) => {
  const handleAddTerms = (arrayHelpers: FieldArrayRenderProps): void => {
    arrayHelpers.push({
      title: '',
      description: '',
    });
  };
  return (
    <div className="cms-form-card-wrap">
      <div className="left-small-column" />
      <div className="right-big-column">
        <InputField
          name="title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.titleValidation')}
          isCompulsory
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values.description}
          isCompulsory
        />
        <ReactEditor
          label={t('Cms.privacyPolicy.summaryPoints.title')}
          parentClass="h-unset"
          name="summary_keyPoints"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values.summary_keyPoints}
          isCompulsory
        />
      </div>
      <div className="right-big-column">
        <FieldArray
          name="point_data_array"
          render={(productArrayHelpers) => {
            return (
              <div>
                <div className="table-of-content">
                  <h2>{t('Cms.privacyPolicy.content.title')}</h2>
                  <Button
                    variants="PrimaryWoodLight"
                    onClickHandler={() => {
                      handleAddTerms(productArrayHelpers);
                    }}
                    className="gap-1 h-10"
                  >
                    <Image iconName="plus" />
                    {t('Community.Table.Add')}
                  </Button>
                </div>

                {Array.isArray(values?.point_data_array) &&
                  values?.point_data_array.length > 0 &&
                  values.point_data_array.map((serviceData, index) => (
                    <div
                      className="point-list-item mb-3"
                      key={`point_list_${index + 1}`}
                    >
                      <InputField
                        name={`point_data_array[${index}].title`}
                        label={t('Cms.homepage.story.whyChooseTitle')}
                        placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
                        isCompulsory
                      />
                      <ReactEditor
                        label={t('Cms.homepage.banner.description')}
                        parentClass="h-unset"
                        name={`point_data_array[${index}].description`}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        value={serviceData.description}
                        isCompulsory
                      />
                      {values?.point_data_array.length > 1 && (
                        <Button
                          className="action-button red icon-delete"
                          onClickHandler={() => {
                            productArrayHelpers.remove(index);
                          }}
                        >
                          <Image iconName="trashIcon" />
                        </Button>
                      )}
                    </div>
                  ))}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default EditTerms;
