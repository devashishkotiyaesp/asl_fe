import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import { t } from 'i18next';
import { SectionProps } from '../types';

const CtaForm = ({ setFieldValue, values }: SectionProps) => {
  return (
    <>
      <div className="left-small-column">
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.cta.imageTitle')}
          name="image"
          SubTitle={t('Cms.homepage.cta.imageTitle')}
          setValue={setFieldValue}
          value={values?.image}
          acceptTypes="image/*"
          fileType={EnumFileType.Image}
          isCompulsory
        />
      </div>
      <div className="right-big-column">
        <InputField
          name="title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
          isCompulsory
        />
        <div className="cms-button">
          <InputField
            name="cta_button_title"
            label={t('Cms.homepage.story.buttonTitle')}
            placeholder={t('Cms.homepage.story.buttonTitlePlaceholder')}
            isCompulsory
          />
          <InputField
            name="cta_button_url"
            label={t('Cms.homepage.story.buttonUrlTitle')}
            placeholder={t('Cms.homepage.story.buttonUrlPlaceholder')}
          />
        </div>
        <DropZone
          className="xl:max-w-[330px]"
          labelClass=" cta-upload"
          label={t('Cms.homepage.cta.imageTitle')}
          name="banner_image"
          SubTitle={t('Cms.homepage.cta.imageInnerTitle')}
          setValue={setFieldValue}
          value={values?.banner_image}
          isCompulsory
          acceptTypes="image/*"
          fileType={EnumFileType.Image}
        />
      </div>
    </>
  );
};

export default CtaForm;
