import { useDispatch, useSelector } from 'react-redux';
import {
  getActiveLanguage,
  setAllLanguage,
  setLanguage,
} from 'reduxStore/slices/languageSlice';
import { AllLanguages } from 'reduxStore/types';
import { useAxiosGet } from './useAxios';

export const useLanguages = () => {
  const dispatch = useDispatch();
  const activeLanguage = useSelector(getActiveLanguage);
  const [getRequest] = useAxiosGet();

  const fetchLanguages = async () => {
    const response = await getRequest('/language', {});
    dispatch(
      setAllLanguage({
        allLanguages: response?.data?.data,
      })
    );
    response?.data?.data.forEach((data: AllLanguages) => {
      if (data.is_default && !activeLanguage) {
        dispatch(
          setLanguage({
            language: data.short_name,
          })
        );
      }
    });
  };

  return { fetchLanguages };
};
