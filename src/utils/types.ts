import { ReactElement } from 'react';
import { ThemeProps } from 'styled-components';
import { Theme } from '@mui/material';

export type method = 'create' | 'edit' | 'delete';

export type objProps = {
  [key: string]: any;
};

export type actions = {
  onSuccess?: (value: any) => void;
  onError?: (value: any) => void;
};

export type pagination = {
  offset?: number;
  posts_per_page?: number;
};

export type GlobalStyleProps = {
  theme: ThemeProps<Theme> & { palette: any };
};

export type SidebarItemsType = {
  href: string;
  title: string;
  icon?: React.FC<any>;
  children: SidebarItemsType[];
  badge?: string;
};

export type TCell = {
  accessor: string;
  header: string;
  isRight?: boolean;
  disabledEdit?: boolean;
  type?: 'text' | 'number' | 'select' | 'checkbox' | 'date';
  options?: any; // for select type
  render?: (values: any) => ReactElement;
};
