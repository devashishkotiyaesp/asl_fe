import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import Image from 'components/Image';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { t } from 'i18next';
import { FileAcceptType } from 'modules/Dictionary/constant';
import { SectionProps } from '../types';

const EditCourses = ({ setFieldValue, values, setFieldTouched }: SectionProps) => {
  const handleAddTerms = (arrayHelpers: FieldArrayRenderProps): void => {
    arrayHelpers.push({
      title: '',
      description: '',
      banner_image: '',
      banner_video: '',
      button_text: '',
      button_url: '',
      link_button: '',
      link_btn_url: '',
      fun_tidbits: '',
      isFree: '',
    });
  };
  function stringToBoolean(str?: string) {
    if (typeof str === 'string') {
      return str.toLowerCase() === 'true';
    }
    return false;
  }
  return (
    <>
      <div className="left-small-column" />
      <div className="right-small-column">
        <InputField
          name="title_hashing"
          label={t('Cms.homepage.banner.hashTitle')}
          placeholder={t('Cms.homepage.banner.hashTitlePlaceholder')}
          isCompulsory
        />
      </div>
      <div className="right-big-column">
        <FieldArray
          name="point_data_array"
          render={(productArrayHelpers) => {
            return (
              <>
                {Array.isArray(values?.point_data_array) &&
                  values?.point_data_array.length > 0 &&
                  values.point_data_array.map((courseData, index) => {
                    return (
                      <div
                        className="point-list-item mb-3"
                        key={`point_list_${index + 1}`}
                      >
                        <div className="cms-form-card-wrap">
                          <div className="left-small-column">
                            <DropZone
                              className="xl:max-w-[330px]"
                              label={t('Cms.aboutUs.crew.uploadVideoTitle')}
                              name={`point_data_array[${index}].banner_video`}
                              SubTitle={t('Cms.courses.fileUploadSubText')}
                              setValue={setFieldValue}
                              value={courseData?.banner_video ?? ''}
                              acceptTypes={'videos/*'}
                              fileType={[EnumFileType.Video]}
                              size={40}
                            />
                            <DropZone
                              className="xl:max-w-[330px]"
                              label={t('Community.UploadImage.Label')}
                              name={`point_data_array[${index}].banner_image`}
                              SubTitle={t('Cms.courses.fileUploadSubText')}
                              setValue={setFieldValue}
                              value={courseData?.banner_image ?? ''}
                              acceptTypes={FileAcceptType[
                                EnumFileType.Image
                              ].toString()}
                              fileType={[EnumFileType.Image]}
                              isCompulsory
                              size={40}
                            />
                          </div>
                          <div className="right-big-column">
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
                              value={courseData.description}
                              isCompulsory
                            />
                            {courseData?.fun_tidbits && (
                              <ReactEditor
                                label={t('Cms.aboutUs.aboutUsers.funTidbitsTitle')}
                                parentClass="h-unset"
                                name={`point_data_array[${index}].fun_tidbits`}
                                placeholder={t(
                                  'Dictionary.EditForm.TitleDescription.PlaceHolder'
                                )}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                value={courseData.fun_tidbits}
                              />
                            )}
                            <div className="cms-button color">
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
                            {courseData.link_button && (
                              <div className="cms-button color">
                                <InputField
                                  name={`point_data_array[${index}].link_button`}
                                  label={t('Cms.homepage.story.buttonTitle')}
                                  placeholder={t(
                                    'Cms.homepage.story.buttonTitlePlaceholder'
                                  )}
                                  isCompulsory
                                />
                                <InputField
                                  name={`point_data_array[${index}].link_btn_url`}
                                  label={t('Cms.homepage.story.buttonUrlTitle')}
                                  placeholder={t(
                                    'Cms.homepage.story.buttonUrlPlaceholder'
                                  )}
                                />
                              </div>
                            )}
                            <Checkbox
                              id="isFree"
                              labelClass="font-semibold"
                              name={`point_data_array[${index}].isFree`}
                              onChange={(e) => {
                                const newValue = e.target.checked;
                                setFieldValue(
                                  `point_data_array[${index}].isFree`,
                                  String(newValue)
                                );
                              }}
                              check={stringToBoolean(courseData?.isFree)}
                              text={t('Cms.courses.freeCourseTitle')}
                            />
                          </div>
                        </div>
                        {values?.point_data_array.length > 1 && (
                          <Button
                            className="action-button small red icon-delete"
                            onClickHandler={() => {
                              productArrayHelpers.remove(index);
                            }}
                          >
                            <span>
                              <Image iconName="trashIcon" />
                              {/* {t('Settings.delete')} */}
                            </span>
                          </Button>
                        )}
                      </div>
                    );
                  })}
                <Button
                  variants="PrimaryWoodLight"
                  // variants="primary"
                  onClickHandler={() => {
                    handleAddTerms(productArrayHelpers);
                  }}
                  className="gap-1 h-10 w-full"
                >
                  <Image iconName="plus" />
                  {t('Cms.crew.addCourse')}
                </Button>
              </>
            );
          }}
        />
      </div>
      <DropZone
        className="xl:max-w-[330px]"
        label={t('Dictionary.EditForm.UploadPhoto')}
        name="banner_image"
        SubTitle={t('Dictionary.EditForm.UploadPhoto')}
        setValue={setFieldValue}
        value={values?.banner_image ?? ''}
        acceptTypes={'image/*'}
        fileType={[EnumFileType.Image]}
        size={40}
      />
      <InputField
        name="eyebrow_title"
        label={t('Dictionary.EditForm.Title')}
        placeholder={t('Dictionary.EditForm.Title.PlaceHolder')}
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
    </>
  );
};

export default EditCourses;
