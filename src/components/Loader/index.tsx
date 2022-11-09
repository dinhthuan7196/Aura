import { FC } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

const Loader: FC = () => {
  return (
    <Root>
      <CircularProgress color="success" />
    </Root>
  );
};

export default Loader;
