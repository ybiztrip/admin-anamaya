import { Form, type FormInstance, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUserDetail } from '@/api';
import { AUTH_LOGIN_API } from '@/constants/api';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import { HOME_PATH, LOGIN_PATH } from '@/constants/routePath';
import { ACCESS_TOKEN, USER } from '@/constants/storageKey';
import type { UserType } from '@/types';
import axios from '@/utils/api';
import { localStorageClear, localStorageSet } from '@/utils/localStorage';
import { sessionStorageClear } from '@/utils/sessionStorage';

export type useLoginProps = {
  isLoading: boolean;
  form: FormInstance;
  login: any;
};

const useLogin = () => {
  const { useForm } = Form;
  const [form] = useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (values: any) => {
    setIsLoading(true);
    const apiURL = AUTH_LOGIN_API;
    const payload = {
      email: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post(apiURL, payload);
      const { token, id } = response.data.data;
      localStorageSet(ACCESS_TOKEN, token);

      const userDetail = await fetchUserDetail(id);
      const roleCodes = userDetail.data?.roles?.map((role) => role.roleCode) ?? [];
      const isSuperAdmin = roleCodes.includes('SUPER_ADMIN');

      if (!isSuperAdmin) {
        localStorageClear();
        sessionStorageClear();
        message.error('You are not authorized to access this application');
        navigate(LOGIN_PATH, { replace: true });
        return;
      }

      localStorageSet<UserType>(USER, { ...userDetail.data });
      navigate(HOME_PATH);
    } catch (e: any) {
      if (e?.response?.data?.message) {
        message.error(e?.response?.data?.message);
      } else {
        message.error(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    form,
    login,
  };
};

export default useLogin;
