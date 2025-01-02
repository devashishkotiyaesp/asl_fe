import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import ReactEditor from 'components/ReactQuillEditor/ReactQuillEditor';
import { t } from 'i18next';
import { SectionProps } from '../types';

const EditPrivacyPolicy = ({
  setFieldValue,
  values,
  setFieldTouched,
}: SectionProps) => {
  return (
    <div className="cms-form-card-wrap">
      <div className="left-small-column" />
      <div className="right-big-column">
        <InputField
          name="eyebrow_title"
          label={t('Cms.ReferFriends.TitleHashTag')}
          placeholder={t('Cms.ReferFriends.TitleHashTag.PlaceHolder')}
          isCompulsory
        />
        <InputField
          name="title"
          label={t('Cms.homepage.story.whyChooseTitle')}
          placeholder={t('Cms.homepage.story.titleValidation')}
          isCompulsory
        />
        <InputField
          name="banner_title"
          label={t('Cms.ReferYourFriends.shortTitle')}
          placeholder={t('Cms.ReferYourFriends.shortPlaceholder')}
          isCompulsory
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="description"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values.description}
          isCompulsory
        />
        <DropZone
          dropdownInnerClass="two-clm"
          name="banner_image"
          SubTitle={t('Cms.GiftCard.bannerImageTitle')}
          setValue={setFieldValue}
          value={values?.banner_image ?? ''}
          acceptTypes={'image/*'}
          fileType={[EnumFileType.Image]}
          isCompulsory
        />
        <div className="cms-button">
          <InputField
            name="link_button"
            label={t('Cms.homepage.story.buttonTitle')}
            placeholder={t('Cms.homepage.story.buttonTitlePlaceholder')}
            isCompulsory
          />
          <InputField
            name="link_btn_url"
            label={t('Cms.homepage.story.buttonUrlTitle')}
            placeholder={t('Cms.homepage.story.buttonUrlPlaceholder')}
          />
        </div>
        <DropZone
          dropdownInnerClass="two-clm"
          name="image"
          label={t('Dictionary.EditForm.UploadPhoto')}
          SubTitle={t('Dictionary.EditForm.UploadPhoto')}
          setValue={setFieldValue}
          value={values?.image ?? ''}
          acceptTypes={'image/*'}
          fileType={[EnumFileType.Image]}
          isCompulsory
        />
        <ReactEditor
          label={t('Cms.homepage.banner.description')}
          parentClass="h-unset"
          name="button_title"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={values.button_title}
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
    </div>
  );
};

export default EditPrivacyPolicy;
