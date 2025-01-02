import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { FieldArray } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const ServiceForm = ({ setFieldValue, values, setFieldTouched }: SectionProps) => {
  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
        <InputField
          name="eyebrow_title"
          label={t('Cms.homepage.story.eyebrowTitle')}
          placeholder={t('Cms.homepage.story.eyebrowTitlePlaceholder')}
          isCompulsory
        />
        <InputField
          name="title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
          isCompulsory
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values?.description}
          placeholder={t('Cms.homepage.services.serviceDescriptionPlaceholder')}
          isCompulsory
        />
        <FieldArray
          name="point_data_array"
          render={() => {
            return (
              <div>
                {Array.isArray(values?.point_data_array) &&
                  values?.point_data_array?.length > 0 &&
                  values?.point_data_array.map((_, index: number) => (
                    <div
                      className="point-list-item mb-3"
                      key={`point_list_${index + 1}`}
                    >
                      <div className="point-list-item__title">
                        <span className="text">
                          {t('Cms.homepage.story.pointLabel')} {index + 1}
                        </span>
                      </div>
                      <div className="right-part">
                        <InputField
                          name={`point_data_array[${index}].title`}
                          label={t('Cms.homepage.story.whyChooseTitle')}
                          placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
                          isCompulsory
                        />
                        <TextArea
                          rows={5}
                          name={`point_data_array[${index}].description`}
                          label={t('Cms.homepage.banner.description')}
                          placeholder={t(
                            'Dictionary.EditForm.TitleDescription.PlaceHolder'
                          )}
                          isCompulsory
                        />
                      </div>
                    </div>
                  ))}
              </div>
            );
          }}
        />
      </div>
    </>
  );
};

export default ServiceForm;
