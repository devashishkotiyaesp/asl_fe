import { useDispatch, useSelector } from 'react-redux';
import {
  setAllLanguage,
  setDefaultLanguage,
  setLanguage,
  useLanguage,
} from 'reduxStore/slices/languageSlice';
import { AllLanguages } from 'reduxStore/types';

export const useLanguages = () => {
  const dispatch = useDispatch();
  const storeLang = useSelector(useLanguage);

  const getLanguages = async () => {
    const resp = {
      data: [
        {
          id: 1,
          name: 'english',
          short_name: 'en',
          is_default: true,
        },
        {
          id: 2,
          name: 'spanish',
          short_name: 'es',
          is_default: true,
        },
      ],
    };
    if (resp?.data) {
      const defaultLanguage =
        resp?.data?.find((lang: AllLanguages) => lang.is_default)?.short_name ??
        resp.data[0].short_name;

      dispatch(
        setDefaultLanguage({
          defaultLanguage,
        })
      );
      dispatch(
        setLanguage({
          language: storeLang?.language ? storeLang?.language : defaultLanguage,
        })
      );
      dispatch(
        setAllLanguage({
          allLanguages: resp?.data,
        })
      );
    }

    return resp;
  };

  return { getLanguages };
};
