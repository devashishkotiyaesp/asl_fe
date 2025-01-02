import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import { t } from 'i18next';
import { SectionProps } from '../types';

const CtaTwoForm = ({ setFieldValue, values }: SectionProps) => {
  const AttachmentFileType = [EnumFileType.Image].toString();
  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
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
          dropdownInnerClass="two-clm"
        />
        <InputField
          name="title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
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
      </div>
    </>
  );
};

export default CtaTwoForm;
