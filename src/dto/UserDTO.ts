import { pagination } from '@utils/types';

export type FetchUsers = pagination & {
  search?: string;
  roles?: string | string[];
  order?: 'asc' | 'desc';
};

export type User = {
  id?: number | string;
  first_name?: string;
  last_name?: string;
  name?: string;
  nickname?: string;
  username?: string;
  password?: string;
  email?: string;
  roles?: string[];
  url?: string;
  reassign?: number | true | false;
  force?: true | false;
};

export type SignIn = {
  username: string;
  password: string;
};

export type AccessToken = {
  token: string;
};
