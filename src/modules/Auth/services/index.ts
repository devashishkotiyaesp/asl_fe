import { createClient } from '@supabase/supabase-js';
import { AxiosRequestConfig } from 'axios';
import {
  REACT_APP_API_URL,
  REACT_APP_SUPABASE_ANON_KEY,
  REACT_APP_SUPABASE_URL,
} from 'config';
import { useAxiosPost } from 'hooks/useAxios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from 'reduxStore/slices/tokenSlice';

// User Login Api
export const useUserLoginApi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const loginUserApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    const response = await callApi(`${REACT_APP_API_URL}/auth/login`, data, config);
    if (response.data.session) {
      const { access_token, refresh_token } = response.data.session;

      dispatch(setToken({ token: access_token }));
      const supabase = createClient(
        REACT_APP_SUPABASE_URL ?? '',
        REACT_APP_SUPABASE_ANON_KEY ?? '',
        {
          global: {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        }
      );

      await supabase.auth.setSession({ access_token, refresh_token });
      navigate('/');
    }
  };

  return { loginUserApi, isError, isLoading, isSuccess };
};
