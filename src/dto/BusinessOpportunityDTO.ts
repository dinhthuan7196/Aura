import { method, actions } from '@utils/types';

export type InputRecord = {
  id?: number | string;
  user?: number | string;
  name?: string;
  from?: number;
  company?: string;
  details?: string;
  status?: string;
  phone?: string;
  email?: string;
};
export type TableProps = {
  data: {
    list: InputRecord[];
  };
  active: InputRecord[] | null;
  total: number;
};

export type OpportunityProps = actions & {
  method: method;
  list: InputRecord[];
};
