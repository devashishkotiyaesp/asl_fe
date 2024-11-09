import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

export const HomePageSection = () => {
  const { t } = useTranslation();
  return [
    {
      label: t('Cms.homepage.sectionBannerTitle'),
      value: 'banner',
    },
    {
      label: t('Cms.homepage.sectionStoryTitle'),
      value: 'ourStory',
    },
    {
      label: t('Cms.homepage.sectionChooseUsTitle'),
      value: 'whyChooseUs',
    },
    {
      label: t('Cms.homepage.sectionCtaTitle'),
      value: 'cta-one',
    },
    {
      label: t('Cms.homepage.sectionServiceTitle'),
      value: 'services',
    },
    {
      label: t('Cms.homepage.sectionInsightTitle'),
      value: 'userInsight',
    },
    {
      label: t('Cms.homepage.sectionASLTitle'),
      value: 'aslCourses',
    },
    {
      label: t('Cms.homepage.sectionTestimonialTitle'),
      value: 'testimonials',
    },
  ];
};

export enum ActionNameEnum {
  NEXT = 'next',
  PREV = 'prev',
  SUBMIT = 'submit',
  UPDATE = 'update',
}

export const KeysEnum = {
  Banner: 'banner',
  Story: 'ourStory',
  WhyChooseUs: 'whyChooseUs',
  CtaOne: 'cta-one',
  Services: 'services',
  UserInsight: 'userInsight',
  AslCourses: 'aslCourses',
  Testimonials: 'testimonials',
  CtaTwo: 'ctaTwo',
  AppDownload: 'appDownload',
  Footer: 'footer',
  Vision: 'ourVision',
  AboutUsers: 'aboutUsers',
  LocalStories: 'localStories',
  Crew: 'crew',
  Journey: 'ourJourney',
  aboutCta: 'aboutCta',
  AboutStory: 'aboutStory',
  PrivacyPolicy: 'privacyPolicy',
  TermsOfUse: 'termsOfUse',
  Courses: 'courses',
  Dictionary: 'dictionary',
};

export const AboutPageSection = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
  return [
    {
      label: t('Cms.homepage.sectionStoryTitle'),
      value: 'aboutStory',
    },
    {
      label: t('Cms.aboutUs.vision.title'),
      value: 'ourVision',
    },
    {
      label: t('Cms.aboutUs.user.title'),
      value: 'aboutUsers',
    },
    {
      label: t('Cms.aboutUs.crew.title'),
      value: 'crew',
    },
    {
      label: t('Cms.aboutUs.crew.journey'),
      value: 'ourJourney',
    },
    {
      label: t('Cms.aboutUs.stories.title'),
      value: 'localStories',
    },
    {
      label: t('Cms.aboutUs.cta.title'),
      value: 'aboutCta',
    },
  ];
};

export enum CMSEnum {
  HomePage = 'Home Page',
  AboutUs = 'About Us',
  AboutProfileDetails = 'About Profile Details',
  Courses = 'Courses',
  VirtualClass = 'Virtual Classes Schedule',
  Dictionary = 'Dictionary',
  Blog = 'Blog',
  BlogDetails = 'Blog Details',
  Events = 'Events',
  EventsDetails = 'Event Details',
  Organizations = 'Organizations',
  GiftCard = 'Gift Card',
  GiftOrZoomCardSession = 'Gift/Zoom Card Sessions',
  GiftOrSelfPacedCourses = 'Gift Card / Self-paced Courses',
  GiftOrCheckoutCard = 'Gift Card / Checkout',
  PrivacyPolicy = 'Privacy Policy',
  TermsOfUse = 'Terms of Use',
  ReferYourFriends = 'Refer Your Friends',
  GlobalSection = 'Global Section',
}

export const GlobalSection = () => {
  const { t } = useTranslation();
  return [
    {
      label: t('Cms.homepage.sectionDownloadTitle'),
      value: 'appDownload',
    },
    {
      label: t('Cms.homepage.sectionCta2Title'),
      value: 'ctaTwo',
    },
    {
      label: t('Cms.homepage.sectionFooterTitle'),
      value: 'footer',
    },
  ];
};
