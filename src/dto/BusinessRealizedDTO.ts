import { method, actions } from '@utils/types';

export type TableProps = {
  list: InputRecord[];
  active: InputRecord[] | null;
  total: number;
};

export type InputRecord = {
  id_value_realised?: number | string;
  user_target?: number | string;
  date?: number;
  amount?: number;
};

export type RealizerProps = actions & {
  method: method;
  list: InputRecord[];
};
