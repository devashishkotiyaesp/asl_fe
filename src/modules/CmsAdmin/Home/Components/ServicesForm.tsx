import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { FieldArray } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const ServicesForm = ({ setFieldValue, values, setFieldTouched }: SectionProps) => {
  return (
    <>
      <div className="left-small-column">
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.services.imageTitle')}
          name="banner_image"
          SubTitle={t('Cms.homepage.cta.imageTitle')}
          setValue={setFieldValue}
          value={values?.banner_image ?? ''}
          acceptTypes="image/*"
          fileType={EnumFileType.Image}
          isCompulsory
        />
      </div>
      <div className="right-big-column">
        <InputField
          name="eyebrow_title"
          label={t('Cms.homepage.story.eyebrowTitle')}
          placeholder={t('Cms.homepage.story.eyebrowTitlePlaceholder')}
          isCompulsory
        />
        <InputField
          name="service_sub_title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChooseTitle')}
          isCompulsory
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="short_description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values?.short_description}
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
        <FieldArray
          name="point_data_array"
          render={() => {
            return (
              <div>
                {Array.isArray(values?.point_data_array) &&
                  values?.point_data_array?.length > 0 &&
                  values?.point_data_array.map((serviceData, index: number) => (
                    <div
                      className="point-list-item mb-3"
                      key={`point_list_${index + 1}`}
                    >
                      <div className="point-list-item__title">
                        <span className="text">
                          {t('Cms.homepage.services.serviceLabel')} {index + 1}
                        </span>
                      </div>
                      <InputField
                        name={`point_data_array[${index}].title`}
                        label={t('Cms.homepage.services.serviceTitle')}
                        placeholder={t(
                          'Cms.homepage.services.serviceTitlePlaceholder'
                        )}
                        isCompulsory
                      />
                      <ReactEditor
                        label={t('Cms.homepage.banner.description')}
                        parentClass="h-unset"
                        placeholder={t(
                          'Cms.homepage.services.serviceDescriptionPlaceholder'
                        )}
                        name={`point_data_array[${index}].description`}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        value={serviceData.description}
                        isCompulsory
                      />
                      <div className="cms-button simple">
                        <InputField
                          name={`point_data_array[${index}].button_text`}
                          label={t('Cms.homepage.story.buttonTitle')}
                          placeholder={t(
                            'Cms.homepage.story.buttonTitlePlaceholder'
                          )}
                          isCompulsory
                        />
                        <InputField
                          name={`point_data_array[${index}].button_url`}
                          label={t('Cms.homepage.story.buttonUrlTitle')}
                          placeholder={t('Cms.homepage.story.buttonUrlPlaceholder')}
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

export default ServicesForm;
