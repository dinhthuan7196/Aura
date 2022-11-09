import { store } from 'react-context-hook';

import styled from 'styled-components';

import { Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

import DoughnutChart from '@components/Charts/DoughnutChart';
import Title from '@components/Title';

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

function Scores() {
  const { user } = store.getState();
  const { name, nickname, username } = user || {};

  return (
    <>
      <Title
        title={`Welcome, ${name || nickname || username} !`}
        helmetTitle="Score Charts"
        description={
          <Typography variant="body1">
            Your membership score is: <GreenText>999,999</GreenText>
          </Typography>
        }
      />

      <Grid container spacing={4}>
        <Grid item xs={6} md={4}>
          <DoughnutChart />
        </Grid>
        <Grid item xs={6} md={4}>
          <DoughnutChart />
        </Grid>
        <Grid item xs={6} md={4}>
          <DoughnutChart />
        </Grid>
        <Grid item xs={6} md={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
    </>
  );
}

export default Scores;
