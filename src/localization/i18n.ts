import { languageConstant } from 'constants/common.constant';
import i18n, { InitOptions, ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

interface IExtendedReactOptions {
  useSuspense?: boolean;
  wait?: boolean;
}

interface ITranslationResources extends ResourceLanguage {
  translation: Record<string, string>;
}

interface I18nConfig extends InitOptions {
  resources: Record<string, ITranslationResources>;
}

const i18nConfig: I18nConfig = {
  resources: {
    en: { translation: {} },
    es: { translation: {} },
  },
  lng: languageConstant.en,
  fallbackLng: languageConstant.en,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },

  react: {
    // wait: true,
    useSuspense: true, // or true depending on your preference
  } as IExtendedReactOptions,
};

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
