import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { t } from 'i18next';
import { FileAcceptType } from 'modules/Dictionary/constant';
import { SectionProps } from '../types';

const VisionForm = ({
  setFieldValue,
  values,
  setFieldTouched,
  isLoading,
}: SectionProps) => {
  return (
    <>
      <div className="left-small-column">
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.cta.imageTitle')}
          name="collaboration_logos"
          SubTitle={t('Cms.homepage.cta.imageTitle')}
          setValue={setFieldValue}
          value={values?.collaboration_logos ?? []}
          acceptTypes={FileAcceptType[EnumFileType.Image].toString()}
          fileType={EnumFileType.Image}
          isMulti
          limit={2}
          isCompulsory
          isLoading={isLoading}
        />
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.cta.imageTitle')}
          name="multiple_banner_images"
          SubTitle={t('Cms.homepage.cta.imageTitle')}
          setValue={setFieldValue}
          value={values?.multiple_banner_images ?? []}
          acceptTypes={FileAcceptType[EnumFileType.Image].toString()}
          fileType={EnumFileType.Image}
          isMulti
          limit={2}
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
          label={t('Cms.homepage.banner.bannerTitle')}
          placeholder={t('Cms.homepage.banner.bannerTitlePlaceholder')}
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
            name="link_button"
            label={t('Cms.homepage.banner.linkTitle')}
            placeholder={t('Cms.homepage.banner.linkTitlePlaceholder')}
            isCompulsory
            isLoading={isLoading}
          />
          <InputField
            name="link_url"
            label={t('Cms.homepage.banner.linkUrlTitle')}
            placeholder={t('Cms.homepage.banner.linkUrlTitlePlaceholder')}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default VisionForm;
