import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { t } from 'i18next';
import { SectionProps } from '../types';

const StoryForm = ({
  setFieldValue,
  values,
  setFieldTouched,
  isLoading,
}: SectionProps) => {
  const AttachmentFileType = ([EnumFileType.Image] as unknown as string).toString();
  return (
    <>
      <div className="left-small-column">
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.cta.imageTitle')}
          name="banner_image"
          SubTitle={t('Cms.homepage.cta.imageTitle')}
          setValue={setFieldValue}
          value={values?.banner_image ?? ''}
          acceptTypes={AttachmentFileType}
          fileType={[EnumFileType.Image]}
          isCompulsory
          isLoading={isLoading}
        />
      </div>
      <div className="right-big-column">
        <InputField
          name="eyebrow_title"
          label={t('Cms.homepage.story.eyebrowTitle')}
          placeholder={t('Cms.homepage.story.eyebrowTitlePlaceholder')}
          isCompulsory
          isLoading={isLoading}
        />
        <InputField
          name="banner_title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
          isCompulsory
          isLoading={isLoading}
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values?.description}
          isCompulsory
          isLoading={isLoading}
        />
        <div className="cms-button">
          <InputField
            name="button_text"
            label={t('Cms.homepage.story.buttonTitle')}
            placeholder={t('Cms.homepage.story.buttonTitlePlaceholder')}
            isCompulsory
            isLoading={isLoading}
          />
          <InputField
            name="button_url"
            label={t('Cms.homepage.story.buttonUrlTitle')}
            placeholder={t('Cms.homepage.story.buttonUrlPlaceholder')}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default StoryForm;
