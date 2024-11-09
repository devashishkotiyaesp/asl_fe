import DatePicker from 'components/FormElement/datePicker';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import { format } from 'date-fns';
import { FieldArray } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const LocalStoriesForm = ({ setFieldValue, values }: SectionProps) => {
  return (
    <FieldArray
      name="point_data_array"
      render={() => {
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
                name="banner_title"
                label={t('Cms.homepage.story.whyChooseTitle')}
                placeholder={t('Cms.homepage.services.serviceTitlePlaceholder')}
                isCompulsory
              />
              {Array.isArray(values?.point_data_array) &&
                values?.point_data_array?.length > 0 &&
                values?.point_data_array.map((storiesData, index: number) => {
                  return (
                    <div
                      className="point-list-item mb-3"
                      key={`point_list_${index + 1}`}
                    >
                      <div className="cms-form-card-wrap">
                        <div className="left-small-column">
                          <DropZone
                            className="xl:max-w-[330px]"
                            label={t('Cms.homepage.cta.imageTitle')}
                            name={`point_data_array[${index}].banner_image`}
                            SubTitle={t('Cms.homepage.cta.imageTitle')}
                            setValue={setFieldValue}
                            value={storiesData?.banner_image ?? ''}
                            acceptTypes={'image/*'}
                            fileType={[EnumFileType.Image]}
                            isCompulsory
                          />
                        </div>
                        <div className="right-big-column">
                          <InputField
                            name={`point_data_array[${index}].title`}
                            label={t('Cms.homepage.story.whyChooseTitle')}
                            placeholder={t(
                              'Cms.homepage.services.serviceTitlePlaceholder'
                            )}
                            isCompulsory
                          />
                          <InputField
                            name={`point_data_array[${index}].story_link`}
                            label={t('Cms.aboutUs.stories.storyLinkTitle')}
                            placeholder={t(
                              'Cms.aboutUs.stories.storyLinkPlaceholder'
                            )}
                          />
                          <DatePicker
                            parentClass=""
                            label={t('Cms.date.title')}
                            isCompulsory
                            icon
                            selectedDate={
                              storiesData?.date ? new Date(storiesData?.date) : null
                            }
                            onChange={(date) => {
                              if (setFieldValue)
                                setFieldValue(
                                  `point_data_array[${index}].date`,
                                  format(date, 'yyyy-MM-dd')
                                );
                            }}
                            placeholder={t('Cms.date.titlePlaceholder')}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        );
      }}
    />
  );
};

export default LocalStoriesForm;
