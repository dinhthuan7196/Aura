import { useCallback, useState } from 'react';
import { useStore } from 'react-context-hook';
import { capitalize, size } from 'lodash';

import {
  InputRecord,
  RealizerProps,
  TableProps,
} from '@dto/BusinessRealizedDTO';

import { api, catchError } from '@utils/api';
import { STORES, URLS } from '@utils/constants';
import { method, pagination } from '@utils/types';

import { useContent } from './useContent';

export const useRealizers = () => {
  // const { setToaster } = useContent();
  const [realizers, setRealizers] = useStore<TableProps>(STORES.REALIZERS);
  const [loading, setLoading] = useState<boolean>(false);

  const accessToken = localStorage.getItem('access_token');
  const configs = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const updateRealizers = (data: InputRecord[], method: method) => {
    const newRealizers = realizers;

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

    setRealizers(newRealizers);
  };

  const fetchRealizers = useCallback(async (payload: pagination) => {
    setLoading(true);
    try {
      const { data: resp } = await api.post(
        URLS.ValueRealisedSummary,
        payload,
        configs
      );
      setRealizers((resp?.data || []) as TableProps);
    } catch (error) {
      const { message } = catchError(error);
      throw new Error(message);
    }
    setLoading(false);
  }, []);

  const actionsRealizers = useCallback(
    async ({ list, method }: RealizerProps) => {
      try {
        if (size(list)) {
          const { data } = await api.post(
            URLS.ValueRealisedSubmit,
            { data: { mode: method, payload: { list } } },
            configs
          );
          updateRealizers(data, method);
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
    realizers,
    fetchRealizers,
    actionsRealizers,
  };
};
