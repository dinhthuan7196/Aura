import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import { Divider as MuiDivider, Typography } from '@mui/material';

import { spacing } from '@mui/system';

const Divider = styled(MuiDivider)(spacing);

interface TitleProps {
  title: string;
  helmetTitle?: string;
  description?: ReactElement;
  isDivider?: boolean;
}

const Title: FC<TitleProps> = ({
  helmetTitle,
  title,
  description,
  isDivider = true,
}: TitleProps) => {
  return (
    <>
      <Helmet title={helmetTitle || title} />
      <Typography variant="h3">{title.toUpperCase()}</Typography>
      {description && description}
      {isDivider && <Divider my={6} />}
    </>
  );
};
export default Title;
