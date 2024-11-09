import { Store } from '@reduxjs/toolkit';
import { REACT_APP_NODE_ENV } from 'config';
import { LayoutConstant } from 'constants/common.constant';
import { PublicNavigation } from 'constants/navigation.constant';
import { format } from 'date-fns';
import { useAxiosGet } from 'hooks/useAxios';
import { decode, encode, isValid } from 'js-base64';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setActiveLayoutType } from 'reduxStore/slices/layoutSlice';
import { getRolesPermission } from 'reduxStore/slices/rolePermissionSlice';
import { clearToken } from 'reduxStore/slices/tokenSlice';
import sanitizeHtml from 'sanitize-html';
import tlds from 'tlds';
import supabase from '../supabase';

export const logger = (value: Error) => {
  if (REACT_APP_NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('error------', value?.message ? value?.message : value);
  }
};

export const encodeToBase64 = (data: string, urlSafe = false) => {
  return encode(data, urlSafe);
};

export const decodeFromBase64 = (data: string) => {
  return isValid(data) ? decode(data) : '';
};

export const isValidBase64 = (data: string) => {
  return isValid(data);
};

export const parseData = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const changeMaskInputValueFunction = (
  value: string,
  fieldName: string,
  onChange: (...event: string[]) => void
) => {
  switch (fieldName) {
    case 'mask_input_phone':
      return onChange(value.length ? value?.replace(/[^A-Z0-9]/gi, '') : value);
    case 'mask_input_time':
    default:
      return onChange(value);
  }
};

export const formatMaskValue = (value: string | number, inputTypeName: string) => {
  switch (inputTypeName) {
    case 'mask_input_phone':
      if (value) {
        const cleaned = value?.toString()?.replace(/\D/g, '') || '';
        const match =
          /^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{1,4})$/.exec(cleaned);
        if (match) {
          const intlCode = match[1] ? '+1 ' : '';
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return cleaned;
      }
      return null;
    case 'mask_input_time':
    default:
      return value;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkInputIsNumber = (e: any) => {
  const k = e.which;
  if ((k < 48 || k > 57) && (k < 96 || k > 105) && k !== 8) {
    e.preventDefault();
    return false;
  }
};

export const isValidEmail = (v: string | null | undefined) => {
  const tld = (v ?? '').split('.').slice(-1)[0];

  const isValidTLDs = tlds.includes(tld);
  if (!isValidTLDs) {
    return false;
  }
  return true;
};

export const isValidDomain = (input: string | null | undefined) => {
  const tld = (input ?? '').split('.').slice(-1)[0];
  const isValidTLDs = tlds.includes(tld);
  if (input && input.indexOf('@') === -1 && input.indexOf('.') > 0 && isValidTLDs) {
    return true;
  }
  return false;
};

export const isValidDate = (date: string | Date) => {
  if (typeof date === 'string') {
    return (
      Object.prototype.toString.call(new Date(date)).slice(8, -1) === 'Date' &&
      new Date(date)?.toString() !== 'Invalid Date'
    );
  }
  return date instanceof Date && new Date(date)?.toString() !== 'Invalid Date';
};

export const getUrlHostName = (urlString: string) => {
  try {
    const url = new URL(urlString);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.hostname;
    }
  } catch (error) {
    return '';
  }
};
type NumberType = string | number | undefined;

export const isNumberInRange = (
  enteredNumber: NumberType,
  number_min: NumberType,
  number_max: NumberType
) => {
  number_min = Number(number_min) || undefined;
  number_max = Number(number_max) || undefined;
  enteredNumber = Number(enteredNumber);
  const inRange =
    (number_min !== undefined ? enteredNumber >= number_min : true) &&
    (number_max !== undefined ? enteredNumber <= number_max : true);
  return inRange;
};

export const isNumberInteger = (
  enteredNumber: number,
  has_allow_decimal: boolean
) => {
  if (has_allow_decimal) {
    return true;
  }
  return _.isInteger(enteredNumber);
};

export const isPercentageValid = (
  enteredNumber: string,
  number_min: number,
  number_max: number,
  has_allow_multiple: boolean,
  multiple_of: number,
  has_allow_decimal: boolean
) => {
  const enteredNumberAsNumber = Number(enteredNumber);
  if (
    isNumberInteger(enteredNumberAsNumber, has_allow_decimal) &&
    isNumberInRange(enteredNumberAsNumber, number_min, number_max) &&
    ((has_allow_multiple &&
      (_.isNaN(multiple_of) || enteredNumberAsNumber % multiple_of === 0)) ||
      (has_allow_decimal && (enteredNumberAsNumber * 100) % 1 === 0) ||
      (!has_allow_decimal && !has_allow_multiple))
  ) {
    return true;
  }
  return false;
};

export const formatPhoneNumber = (value = '') => {
  if (typeof value === 'string') {
    const cleaned = value?.replace(/\D/g, '');
    const match =
      /^\s*(\+\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\s*$/.exec(cleaned);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }
  return null;
};

export const searchItemFromArray = (
  data: { template_name: string }[],
  search: string
) => {
  const searchData = data.filter((obj) => {
    return JSON.stringify(obj?.template_name || '')
      .toLocaleLowerCase()
      .includes(search.trim().toString());
  });
  if (_.isArray(searchData)) {
    return searchData;
  }
  return [];
};

export const checkAndReturnActualDateOrTime = (val: string) => {
  const actualDate = format(new Date(val), 'MMM-dd-yyyy');
  const today = format(new Date(), 'MMM-dd-yyyy');
  const currentDateYear = new Date().getFullYear();
  const actualDateYear = new Date(val).getFullYear();

  if (actualDate === today) {
    return format(new Date(val), 'h:mm a');
  }
  if (currentDateYear === actualDateYear) {
    return format(new Date(val), 'dd MMM');
  }
  return actualDate;
};

export const customRandomNumberGenerator = (max?: number | null) => {
  if (max) {
    return Math.floor(Math.random() * max) + 1;
  }
  return Math.floor(Math.random() * 100000) + 1;
};

export const safeHTML = (string: string, options: sanitizeHtml.IOptions = {}) => {
  const data = sanitizeHtml(string, options);
  return data;
};

export const dasherSize = (str: string) => {
  return str
    ?.trim()
    .split(' ')
    .map((value) => value.toLowerCase())
    .join('-');
};

export const refreshAuthToken = async (store: Store) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

    if (error) {
      throw new Error(error.message);
    }
    return session?.access_token;
  } catch (error) {
    logout(store);
  }
};

export const logout = async (store: Store) => {
  try {
    supabase.auth.signOut();
    store.dispatch(clearToken());
    store.dispatch(setActiveLayoutType(LayoutConstant.CMS));
    setTimeout(() => {
      window.location.href = PublicNavigation.login;
    }, 0);
  } catch (error) {
    localStorage.clear();
  }
};

export const checkRolePermission = (featureName: string, permissionName: string) => {
  const rolePermissions = useSelector(getRolesPermission);
  const checkPermission = rolePermissions?.findIndex(
    (data) =>
      data.feature_name === featureName && data.permission_name === permissionName
  );
  return checkPermission > -1;
};

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue?.trim();
}
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ''; // Handle empty string or null case
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getFieldValue = (dataArray: any[], key: string) => {
  return dataArray?.find((item) => item.field_name === key)?.field_value;
};

export const useFetchData = (url: string) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [callApi, { isLoading }] = useAxiosGet();

  const fetchData = async () => {
    try {
      const response = await callApi(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export const capitalizeFirstCharacter = (inputString: string) => {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

export const getObjectKey = (jsonData: any, fieldToConvert?: string[]) => {
  const allStrings: string[] = [];
  const stringMap = new Map();

  // Function to collect all strings
  function collectStrings(obj: any, parentKey = '') {
    if (typeof obj === 'string') {
      if (
        (!fieldToConvert || fieldToConvert.includes(parentKey)) &&
        !stringMap.has(parentKey)
      ) {
        stringMap.set(parentKey, null);
        allStrings.push(parentKey);
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item) => collectStrings(item, parentKey));
    } else if (obj !== null && typeof obj === 'object') {
      // collectStrings(value, key)
      Object.entries(obj).forEach(([key, value]) => {
        collectStrings(value, key);
      });
    }
  }
  collectStrings(jsonData);
  return allStrings;
};

export const getFullName = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) {
    return 'No name provided';
  }

  const trimmedFirstName = firstName ? firstName.trim() : '';
  const trimmedLastName = lastName ? lastName.trim() : '';

  if (trimmedFirstName && trimmedLastName) {
    return `${trimmedFirstName} ${trimmedLastName}`;
  }
  if (trimmedFirstName) {
    return trimmedFirstName;
  }
  if (trimmedLastName) {
    return trimmedLastName;
  }
  return 'No name provided';
};
