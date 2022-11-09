import { FC } from 'react';
import styled from 'styled-components';

import { Grid, Typography, Paper } from '@mui/material';

import Title from '@components/Title';

const Wrapper = styled(Paper)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(5)};
  }
`;

const Trends: FC = () => {
  return (
    <>
      <Title helmetTitle="Trends" title="View Trends" />
      <Wrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">Total members: xx</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">
              Total Business opportunities: xx
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">Total BVR: $xx,xxx</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">Total Visitors: xxx</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">Total BDs done: xxx</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">[Table view key metrics]</Typography>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};
export default Trends;
