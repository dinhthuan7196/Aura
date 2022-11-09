import { useCallback, useState } from 'react';
import { useStore } from 'react-context-hook';
import { capitalize, size } from 'lodash';

import { InputRecord } from '@dto/VisitorDTO';

import { api, catchError } from '@utils/api';
import { STORES, URLS } from '@utils/constants';
import { method, actions, pagination } from '@utils/types';

import { useContent } from './useContent';

type VisitorProps = actions & {
  method: method;
  list: InputRecord[];
};

export const useVisitors = () => {
  // const { setToaster } = useContent();
  const [visitors, setVisitors] = useStore<InputRecord[]>(STORES.VISITORS);
  const [loading, setLoading] = useState<boolean>(false);

  const accessToken = localStorage.getItem('access_token');
  const configs = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const updateVisitors = (data: InputRecord[], method: method) => {
    const newVisitors = visitors;

    switch (method) {
      case 'create':
        break;
      case 'edit':
        break;
      case 'delete':
        break;
      default:
        break;
    }

    setVisitors(newVisitors);
  };

  const fetchVisitors = useCallback(async (payload: pagination) => {
    setLoading(true);
    try {
      const { data: resp } = await api.post(
        URLS.VisitorSummary,
        payload,
        configs
      );
      setVisitors((resp?.data || []) as InputRecord[]);
    } catch (error) {
      const { message } = catchError(error);
      throw new Error(message);
    }
    setLoading(false);
  }, []);

  const actionsVisitors = useCallback(
    async ({ list, method }: VisitorProps) => {
      try {
        if (size(list)) {
          const { data } = await api.post(
            URLS.VisitorSubmit,
            { data: { mode: method, payload: { list } } },
            configs
          );
          updateVisitors(data, method);
          // setToaster({
          //   message: `${capitalize(method)} Data Success.`,
          //   type: 'success',
          // });
        }
      } catch (error) {
        const { message } = catchError(error);
        // setToaster({
        //   message,
        //   type: 'error',
        // });
        throw new Error(message);
      }
    },
    []
  );

  return {
    loading,
    visitors,
    fetchVisitors,
    actionsVisitors,
  };
};
