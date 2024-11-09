import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { t } from 'i18next';
import { SectionProps } from '../types';

const AppDownloadForm = ({
  setFieldValue,
  values,
  setFieldTouched,
}: SectionProps) => {
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
          acceptTypes="image/*"
          fileType={EnumFileType.Image}
        />
      </div>
      <div className="right-big-column">
        <InputField
          name="title"
          label={t('Cms.homepage.story.eyebrowTitle')}
          placeholder={t('Cms.homepage.story.eyebrowTitlePlaceholder')}
        />
        <InputField
          name="sub_title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChooseTitle')}
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="short_description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values?.short_description}
        />
      </div>
    </>
  );
};

export default AppDownloadForm;
