import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { t } from 'i18next';
import { SectionProps } from '../types';

const BannerForm = ({
  setFieldValue,
  values,
  setFieldTouched,
  isLoading,
}: SectionProps) => {
  const AttachmentFileType = (
    [EnumFileType.Image, EnumFileType.Video] as any
  ).toString();
  return (
    <>
      <div className="left-small-column">
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.banner.imageLabel')}
          name="banner_image"
          SubTitle={t('Cms.homepage.banner.imageInnerText')}
          setValue={setFieldValue}
          value={values?.banner_image ?? ''}
          acceptTypes={AttachmentFileType}
          fileType={[EnumFileType.Image, EnumFileType.Video]}
          isCompulsory
          size={40}
          isLoading={isLoading}
        />
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.banner.collaborativeImagesLabel')}
          name="collaboration_logos"
          SubTitle={t('Cms.homepage.banner.collaborativeImageInnerText')}
          setValue={setFieldValue}
          value={values?.collaboration_logos}
          acceptTypes="image/*"
          fileType={EnumFileType.Image}
          isMulti
          limit={10}
          isCompulsory
          isLoading={isLoading}
        />
      </div>
      <div className="right-big-column">
        <InputField
          name="title_hashing"
          label={t('Cms.homepage.banner.hashTitle')}
          placeholder={t('Cms.homepage.banner.hashTitlePlaceholder')}
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
          placeholder={t('Cms.homepage.services.serviceDescriptionPlaceholder')}
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
            name="link_btn_url"
            label={t('Cms.homepage.banner.linkUrlTitle')}
            placeholder={t('Cms.homepage.banner.linkUrlTitlePlaceholder')}
          />
        </div>
        <div className="cms-button">
          <InputField
            name="banner_button"
            label={t('Cms.homepage.banner.linkTitle')}
            placeholder={t('Cms.homepage.banner.linkTitlePlaceholder')}
            isCompulsory
            isLoading={isLoading}
          />
          <InputField
            name="banner_button_url"
            label={t('Cms.homepage.banner.linkUrlTitle')}
            placeholder={t('Cms.homepage.banner.linkUrlTitlePlaceholder')}
          />
        </div>
        <div className="cms-button">
          <InputField
            name="collaboration_logos_title"
            label={t('Cms.homepage.banner.collaborationLogoTitle')}
            placeholder={t('Cms.homepage.banner.collaborationLogoTitle.Placeholder')}
            isCompulsory
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default BannerForm;
