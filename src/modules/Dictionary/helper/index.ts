import { AllLanguages } from 'reduxStore/types';

export const sortLanguages = (a: AllLanguages, b: AllLanguages) => {
  if (a.is_default === b.is_default) {
    return 0;
  }
  return a.is_default ? -1 : 1;
};

export const scrollFormToTop = () => {
  const formElement = document.querySelector('#scrollable-form');
  if (formElement) {
    formElement?.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' });
  }
};
