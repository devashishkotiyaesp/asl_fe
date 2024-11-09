import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { FieldArray } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const UserInsightForm = ({
  setFieldValue,
  values,
  setFieldTouched,
}: SectionProps) => {
  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
        <InputField
          name="title"
          label={t('Cms.homepage.story.eyebrowTitle')}
          placeholder={t('Cms.homepage.story.eyebrowTitlePlaceholder')}
          isCompulsory
        />
        <InputField
          name="sub_title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChooseTitle')}
          isCompulsory
        />
        <FieldArray
          name="point_data_array"
          render={() => {
            return (
              <>
                {Array.isArray(values?.point_data_array) &&
                  values?.point_data_array?.length > 0 &&
                  values?.point_data_array.map((insightData, index: number) => {
                    return (
                      <div
                        className="point-list-item mb-3"
                        key={`point_list_${index + 1}`}
                      >
                        <div className="point-list-item__title">
                          <span className="text">
                            {t('Cms.homepage.services.featureLabel')} {index + 1}
                          </span>
                        </div>
                        <div className="left-part">
                          <DropZone
                            dropdownInnerClass="two-clm"
                            // className="xl:max-w-[330px]"
                            label={t('Dictionary.EditForm.UploadPhoto')}
                            name={`point_data_array[${index}].banner_image`}
                            SubTitle={t('Dictionary.EditForm.UploadPhoto')}
                            setValue={setFieldValue}
                            value={insightData?.banner_image}
                            acceptTypes="image/*"
                            fileType={EnumFileType.Image}
                            isCompulsory
                          />
                        </div>
                        <div className="right-part">
                          <InputField
                            name={`point_data_array[${index}].title`}
                            label={t('Cms.homepage.story.whyChooseTitle')}
                            placeholder={t(
                              'Cms.homepage.story.whyChoosePlaceholder'
                            )}
                            isCompulsory
                          />
                          <ReactEditor
                            label={t('Cms.homepage.banner.description')}
                            parentClass="h-unset"
                            name={`point_data_array[${index}].description`}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            value={insightData?.description}
                            isCompulsory
                          />
                        </div>
                      </div>
                    );
                  })}
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default UserInsightForm;
