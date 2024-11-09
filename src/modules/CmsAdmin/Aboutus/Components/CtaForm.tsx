import InputField from 'components/FormElement/InputField';
import { t } from 'i18next';

const CtaForm = () => {
  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
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
      </div>
    </>
  );
};

export default CtaForm;
