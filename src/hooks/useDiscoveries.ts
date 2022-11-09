import { useCallback, useState } from 'react';
import { useStore } from 'react-context-hook';
import { capitalize, size } from 'lodash';

import {
  InputRecord,
  TableProps,
  DiscoveryProps,
} from '@dto/BusinessDiscoveryDTO';

import { api, catchError } from '@utils/api';
import { STORES, URLS } from '@utils/constants';
import { pagination, method } from '@utils/types';

import { useContent } from './useContent';

export const useDiscoveries = () => {
  // const { setToaster } = useContent();
  const [discoveries, setDiscoveries] = useStore<TableProps>(
    STORES.DISCOVERIES
  );
  const [loading, setLoading] = useState<boolean>(false);

  const accessToken = localStorage.getItem('access_token');
  const configs = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  // To Do: Update data in UI ???????
  const updateDiscoveries = (data: InputRecord[], method: method) => {
    const newDiscoveries = discoveries;

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

    setDiscoveries(newDiscoveries);
  };

  const fetchDiscoveries = useCallback(async (payload: pagination) => {
    setLoading(true);
    try {
      const { data: resp } = await api.post(
        URLS.DiscoverySummary,
        payload,
        configs
      );
      setDiscoveries((resp || {}) as TableProps);
    } catch (error) {
      const { message } = catchError(error);
      // setToaster({
      //   message,
      //   type: 'error',
      // });
      throw new Error(message);
    }
    setLoading(false);
  }, []);

  const actionsDiscovery = useCallback(
    async ({ list, method }: DiscoveryProps) => {
      try {
        if (size(list)) {
          const { data } = await api.post(
            URLS.DiscoverySubmit,
            { data: { mode: method, payload: { list } } },
            configs
          );
          updateDiscoveries(data, method);
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
    discoveries,
    fetchDiscoveries,
    actionsDiscovery,
  };
};
