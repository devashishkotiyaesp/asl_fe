// ** Components **
import Button from 'components/Button/Button';
import InputField from 'components/FormElement/InputField';
import TextArea from 'components/FormElement/TextArea';
import Image from 'components/Image';

// **  Types **
import { IconTypes } from 'components/Icon/types';
import { CmsSectionProps } from '../../HomeCMS/types';
import { BannerResponse } from '../types';

// **  Utilities **
import { Formik } from 'formik';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Form, Link } from 'react-router-dom';
import { formatCMSObjectData } from '../../HomeCMS/helper';
import './index.css';

const OrgBanner = ({ orgBannerData }: { orgBannerData: CmsSectionProps[] }) => {
  const initialValue = {
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    org_name: '',
    message: '',
  };
  const { t } = useTranslation();
  const bannerIconArray: IconTypes[] = [
    'starRounded',
    'videoRounded',
    'noteBookmark',
  ];
  const data = !_.isUndefined(orgBannerData)
    ? formatCMSObjectData({ data: orgBannerData })
    : {};

  const {
    button_text,
    button_url,
    description,
    eyebrow_title,
    form_title,
    point_data_array,
    title,
  } = data as unknown as BannerResponse;

  return (
    <section className="org-banner fill">
      <div className="container">
        <div className="wrapper">
          <div className="left-part">
            <div className="section-title">
              <span className="hashtag-label">{eyebrow_title}</span>
              <h1 className="h2">{title}</h1>
              <p dangerouslySetInnerHTML={{ __html: description }} />
              <div className="btn btn-black-border">
                <Link to={button_url ?? ''}>
                  {button_text} <Image iconName="arrowRight" />
                </Link>
              </div>
            </div>
          </div>
          <div className="right-part">
            <Formik
              initialValues={initialValue}
              onSubmit={(values) => {
                console.log(values);
              }}
              enableReinitialize
            >
              {() => {
                return (
                  <Form id="scrollable-form">
                    <div className="org-form">
                      <span className="org-form__title">{form_title}</span>
                      <div className="flex flex-col text-start gap-2">
                        <div className="flex w-full gap-2">
                          <InputField
                            name="first_name"
                            label={t('Demo.Form.FirstName')}
                            placeholder={t('Demo.Form.FirstName.Placeholder')}
                            type="text"
                            parentClass="mb-2 w-2/3"
                            isCompulsory
                          />
                          <InputField
                            name="last_name"
                            label={t('Demo.Form.LastName')}
                            placeholder={t('Demo.Form.LastName.Placeholder')}
                            type="text"
                            parentClass="mb-2 w-2/3"
                            isCompulsory
                          />
                        </div>
                        <InputField
                          name="email"
                          label={t('Demo.Form.Email')}
                          placeholder={t('Demo.Form.Email.Placeholder')}
                          type="text"
                          parentClass="mb-2 w-2/3"
                          isCompulsory
                        />
                        <InputField
                          name="org_name"
                          label={t('Demo.Form.OrgName')}
                          placeholder={t('Demo.Form.OrgName.Placeholder')}
                          type="text"
                          parentClass="mb-2 w-2/3"
                          isCompulsory
                        />
                        <TextArea
                          name="message"
                          label={t('Demo.Form.Message')}
                          placeholder={t('Demo.Form.Message.Placeholder')}
                          parentClass="mb-2 w-2/3"
                          isCompulsory
                        />
                        <Button
                          variants="black"
                          className="w-full col-span-2 rounded-full py-3"
                        >
                          {t('Event.EditForm.SubmitButton')}
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <div className="org-achieve">
        <div className="container">
          <div className="wrapper">
            {point_data_array.map((item, index) => (
              <div className="org-achieve__item" key={`orgBannerList${index + 1}`}>
                <span className="icons">
                  <Image iconName={bannerIconArray[index]} />
                </span>
                <div className="text">
                  <span className="title">{item.title}</span>
                  <span className="desc">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgBanner;
