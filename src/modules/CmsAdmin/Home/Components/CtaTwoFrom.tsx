import InputField from 'components/FormElement/InputField';
import { t } from 'i18next';

const CtaTwoForm = () => {
  return (
    <>
      <div className="left-small-column" />
      <div className="right-big-column">
        <InputField
          name="title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
        />
      </div>
    </>
  );
};

export default CtaTwoForm;
