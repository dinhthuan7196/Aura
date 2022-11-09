import { useCallback, useState } from 'react';
import { useStore } from 'react-context-hook';
import { size, capitalize } from 'lodash';

import {
  InputRecord,
  TableProps,
  OpportunityProps,
} from '@dto/BusinessOpportunityDTO';

import { api, catchError } from '@utils/api';
import { STORES, URLS } from '@utils/constants';
import { method, pagination } from '@utils/types';

import { useContent } from './useContent';

export const useOpportunities = () => {
  // const { setToaster } = useContent();
  const [opportunities, setOpportunities] = useStore<TableProps>(
    STORES.OPPORTUNITIES
  );
  const [loading, setLoading] = useState<boolean>(false);

  const accessToken = localStorage.getItem('access_token');
  const configs = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const updateOpportunities = (data: InputRecord[], method: method) => {
    const newOpportunities = opportunities;

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

    setOpportunities(newOpportunities);
  };

  const fetchOpportunities = useCallback(async (payload: pagination) => {
    setLoading(true);
    try {
      const { data: resp } = await api.post(
        URLS.OpportunitySummary,
        payload,
        configs
      );
      setOpportunities((resp || {}) as TableProps);
    } catch (error) {
      const { message } = catchError(error);
      throw new Error(message);
    }
    setLoading(false);
  }, []);

  const actionsOpportunity = useCallback(
    async ({ list, method }: OpportunityProps) => {
      try {
        if (size(list) !== 0) {
          const { data } = await api.post(
            URLS.OpportunitySubmit,
            { data: { mode: method, payload: { list } } },
            configs
          );
          updateOpportunities(data, method);
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
    opportunities,
    fetchOpportunities,
    actionsOpportunity,
  };
};
