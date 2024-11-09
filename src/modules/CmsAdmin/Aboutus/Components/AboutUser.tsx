import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { t } from 'i18next';
import { SectionProps } from '../types';

const AboutUser = ({ setFieldValue, values, setFieldTouched }: SectionProps) => {
  const AttachmentFileType = [EnumFileType.Image].toString();
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
          name="banner_title"
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
          isCompulsory
        />
        <InputField
          name="fun_tidbits"
          label={t('Cms.aboutUs.aboutUsers.funTidbitsTitle')}
          placeholder={t('Cms.aboutUs.aboutUsers.funTidbitsPlaceholder')}
          isCompulsory
        />
      </div>
    </>
  );
};

export default AboutUser;
