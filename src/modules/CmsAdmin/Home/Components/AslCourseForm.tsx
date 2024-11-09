import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const AslCourseForm = ({ setFieldValue, values, setFieldTouched }: SectionProps) => {
  const handleAddCourse = (arrayHelpers: FieldArrayRenderProps): void => {
    arrayHelpers.push({
      title: '',
      description: '',
      banner_image: '',
      button_text: '',
    });
  };
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
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="short_description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values?.short_description}
          isCompulsory
        />
        <FieldArray
          name="point_data_array"
          render={(productArrayHelpers) => {
            return (
              <div>
                {Array.isArray(values?.point_data_array) &&
                  values?.point_data_array.length > 0 &&
                  values.point_data_array.map((serviceData, index) => (
                    <div
                      className="point-list-item mb-3"
                      key={`point_list_${index + 1}`}
                    >
                      <div className="point-list-item__title">
                        <span className="text">
                          {t('Cms.homepage.course.courseLabel')} {index + 1}
                        </span>
                        <Button
                          className="action-button small red"
                          onClickHandler={() => {
                            productArrayHelpers.remove(index);
                          }}
                        >
                          <Image iconName="trashIcon" />
                        </Button>
                      </div>
                      <div className="left-part">
                        <DropZone
                          dropdownInnerClass="two-clm"
                          // className="xl:max-w-[330px]"
                          label={t('Dictionary.EditForm.UploadPhoto')}
                          name={`point_data_array[${index}].banner_image`}
                          SubTitle={t('Dictionary.EditForm.UploadPhoto')}
                          setValue={setFieldValue}
                          value={serviceData?.banner_image}
                          acceptTypes="image/*"
                          fileType={EnumFileType.Image}
                          isCompulsory
                        />
                      </div>
                      <div className="right-part">
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
                            placeholder={t(
                              'Cms.homepage.story.buttonUrlPlaceholder'
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Move the button outside of the map function */}
                <Button
                  variants="PrimaryWoodLight"
                  // variants="primary"
                  onClickHandler={() => {
                    handleAddCourse(productArrayHelpers);
                  }}
                  className="gap-1 h-10 w-full"
                >
                  <Image iconName="plus" />
                  {t('addAslCourse')}
                </Button>
              </div>
            );
          }}
        />
      </div>
    </>
  );
};

export default AslCourseForm;
