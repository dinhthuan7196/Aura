import { method, actions } from '@utils/types';

export type InputRecord = {
  business_discovery?: number | string;
  business?: number | string;
  user?: number | string;
  date?: number;
};

export type TableProps = {
  data: {
    list: InputRecord[];
  };
  active: InputRecord[] | null;
  total: number;
};

export type DiscoveryProps = actions & {
  method: method;
  list: InputRecord[];
};
