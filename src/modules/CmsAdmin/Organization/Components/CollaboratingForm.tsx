import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { FieldArray } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const CollaboratingForm = ({
  setFieldValue,
  values,
  setFieldTouched,
}: SectionProps) => {
  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
        <InputField
          name="eyebrow_title"
          label={t('Cms.organization.TitleHashTag')}
          placeholder={t('Cms.organization.TitleHashTag.PlaceHolder')}
          isCompulsory
        />
        <InputField
          name="title"
          label={t('Cms.homepage.banner.bannerTitle')}
          placeholder={t('Cms.homepage.banner.bannerTitlePlaceholder')}
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
        <div className="cms-button">
          <InputField
            name="button_text"
            label={t('Cms.homepage.story.buttonTitle')}
            placeholder={t('Cms.homepage.story.buttonTitlePlaceholder')}
            isCompulsory
          />
          <InputField
            name="button_url"
            label={t('Cms.homepage.story.buttonUrlTitle')}
            placeholder={t('Cms.homepage.story.buttonUrlPlaceholder')}
          />
        </div>
        <InputField
          name="form_title"
          label={t('Cms.organization.collaboration.formTitle')}
          placeholder={t('Cms.organization.collaboration.formPlaceholder')}
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

export default CollaboratingForm;
