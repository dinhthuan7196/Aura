import { useCallback } from 'react';
import { store, useStore } from 'react-context-hook';

import { STORES } from '@utils/constants';
import {
  adminDashboardItems,
  userDashboardItems,
} from '@components/Sidebar/dashboardItems';
// import { ToasterProps } from '@components/Toaster';

import { defaultRoutes, adminRoutes, userRoutes } from '../routes';

export const useContent = () => {
  // const [toaster, setToaster] = useStore<ToasterProps | undefined>(
  //   STORES.TOASTER
  // );

  const stores = store.getState();
  const user = stores[STORES.USER];

  const getRoutes = useCallback(() => {
    let routes = defaultRoutes;
    if (user) {
      routes = (user?.roles ?? []).includes('administrator')
        ? [...routes, ...adminRoutes]
        : [...routes, ...userRoutes];
    }
    return routes;
  }, [user]);

  const getDashboardItems = useCallback(() => {
    if (!user) return [];
    return (user?.roles ?? []).includes('administrator')
      ? adminDashboardItems
      : userDashboardItems;
  }, [user]);

  return {
    // toaster,
    // setToaster,
    getRoutes,
    getDashboardItems,
  };
};
