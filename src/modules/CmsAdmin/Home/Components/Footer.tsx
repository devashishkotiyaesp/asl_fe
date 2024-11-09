import Card from 'components/Card';
import DropZone from 'components/FormElement/DropZoneField';
import { EnumFileType } from 'components/FormElement/enum';
import InputField from 'components/FormElement/InputField';
import { FieldArray } from 'formik';
import { t } from 'i18next';
import { SectionProps } from '../types';

const Footer = ({ values, setFieldValue }: SectionProps) => {
  return (
    <>
      <div className="left-small-column">
        <p>{t('footer.logoTitle')}</p>
        <DropZone
          className="xl:max-w-[330px]"
          label={t('Cms.homepage.cta.imageTitle')}
          name="image"
          SubTitle={t('Cms.homepage.cta.imageInnerTitle')}
          setValue={setFieldValue}
          value={values?.image}
          acceptTypes="image/*"
          fileType={EnumFileType.Image}
        />
        <InputField
          name="short_description"
          label={t('Cms.homepage.story.buttonTitle')}
          placeholder={t('Cms.homepage.story.buttonTitlePlaceholder')}
        />
      </div>
      <div className="right-big-column">
        <Card minimal title={t('footer.quickLInks')}>
          <div className="mb-3">
            <InputField
              name="quick_link_title"
              label={t('Cms.homepage.story.whyChooseTitle')}
              placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
            />
            <FieldArray
              name="quick_titles"
              render={() => {
                return (
                  <>
                    {Array.isArray(values?.quick_titles) &&
                      values?.quick_titles?.length > 0 &&
                      values?.quick_titles.map((_, index: number) => (
                        <div
                          className="cms-button p-0 mt-4"
                          key={`point_list_${index + 1}`}
                        >
                          <InputField
                            name={`quick_titles[${index}].link_name`}
                            label={t('Cms.homepage.footer.linkTitle')}
                            placeholder={t(
                              'Cms.homepage.footer.linkTitlePlaceholder'
                            )}
                          />
                          <InputField
                            name={`quick_titles[${index}].link_url`}
                            label={t('Cms.homepage.footer.linkUrl')}
                            placeholder={t('Cms.homepage.footer.linkUrlPlaceholder')}
                          />
                        </div>
                      ))}
                  </>
                );
              }}
            />
          </div>
        </Card>

        <Card minimal title={t('footer.resources')}>
          <InputField
            name="resources_link_title"
            label={t('Cms.homepage.story.whyChooseTitle')}
            placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
          />
          <FieldArray
            name="resources_titles"
            render={() => {
              return (
                <div>
                  {Array.isArray(values?.resources_titles) &&
                    values?.resources_titles?.length > 0 &&
                    values?.resources_titles.map((_, index: number) => (
                      <div
                        className="cms-button p-0 mt-4"
                        key={`point_list_${index + 1}`}
                      >
                        <InputField
                          name={`resources_titles[${index}].link_name`}
                          label={t('Cms.homepage.footer.linkTitle')}
                          placeholder={t('Cms.homepage.footer.linkTitlePlaceholder')}
                        />
                        <InputField
                          name={`resources_titles[${index}].link_url`}
                          label={t('Cms.homepage.footer.linkUrl')}
                          placeholder={t('Cms.homepage.footer.linkUrlPlaceholder')}
                        />
                      </div>
                    ))}
                </div>
              );
            }}
          />
        </Card>
        <Card title={t('footer.membersArea')} minimal>
          <InputField
            name="members_title"
            label={t('Cms.homepage.story.whyChooseTitle')}
            placeholder={t('Cms.homepage.story.whyChoosePlaceholder')}
          />

          <FieldArray
            name="members_titles"
            render={() => {
              return (
                <div className="cms-button p-0 mt-4">
                  {Array.isArray(values?.members_titles) &&
                    values?.members_titles?.length > 0 &&
                    values?.members_titles.map((_, index: number) => (
                      <>
                        <InputField
                          name={`members_titles[${index}].link_name`}
                          label={t('Cms.homepage.footer.linkTitle')}
                          placeholder={t('Cms.homepage.footer.linkTitlePlaceholder')}
                        />
                        <InputField
                          name={`members_titles[${index}].link_url`}
                          label={t('Cms.homepage.footer.linkUrl')}
                          placeholder={t('Cms.homepage.footer.linkUrlPlaceholder')}
                        />
                      </>
                    ))}
                  <div className="cms-button p-0 mt-4 col-span-full">
                    <InputField
                      name="button_text"
                      label={t('Cms.homepage.services.serviceTitle')}
                      placeholder={t(
                        'Cms.homepage.services.serviceTitlePlaceholder'
                      )}
                    />
                    <InputField
                      name="button_url"
                      label={t('Cms.homepage.story.buttonUrlTitle')}
                      placeholder={t('Cms.homepage.story.buttonUrlPlaceholder')}
                    />
                  </div>
                </div>
              );
            }}
          />
        </Card>
        <Card title={t('footer.contactDetailsTitle')} minimal>
          <div className="flex flex-col gap-3">
            <FieldArray
              name="contact_number_title"
              render={() => {
                return (
                  <>
                    {Array.isArray(values?.contact_number_title) &&
                      values?.contact_number_title?.length > 0 &&
                      values?.contact_number_title.map((_, index: number) => (
                        <InputField
                          label={t('footer.phoneDetailsTitle')}
                          name={`contact_number_title[${index}]`}
                          placeholder={t('footer.phoneNumberPlaceholder')}
                        />
                      ))}
                  </>
                );
              }}
            />
            <FieldArray
              name="contact_email_title"
              render={() => {
                return (
                  <>
                    {Array.isArray(values?.contact_email_title) &&
                      values?.contact_email_title?.length > 0 &&
                      values?.contact_email_title.map((_, index: number) => (
                        <InputField
                          label={t('footer.emailDetailsTitle')}
                          name={`contact_email_title[${index}]`}
                          placeholder={t('Auth.Login.emailPlaceholder')}
                        />
                      ))}
                  </>
                );
              }}
            />
          </div>
        </Card>
        <Card minimal title={t('footer.socialDetailsTitle')}>
          <FieldArray
            name="contact_social_links"
            render={() => {
              return (
                <div className="flex flex-col gap-3">
                  {Array.isArray(values?.contact_social_links) &&
                    values?.contact_social_links?.length > 0 &&
                    values?.contact_social_links.map((_, index: number) => (
                      <div className="" key={`point_list_${index + 1}`}>
                        <div className="right-part">
                          <InputField
                            name={`contact_social_links[${index}].link_url`}
                            placeholder="http://"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              );
            }}
          />
        </Card>
      </div>
    </>
  );
};

export default Footer;
