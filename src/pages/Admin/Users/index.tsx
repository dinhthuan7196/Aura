import { FC, useState } from 'react';
import styled from 'styled-components';

import { Grid, Typography, Button, TextField, Paper } from '@mui/material';
import { green } from '@mui/material/colors';

import Title from '@components/Title';

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const Wrapper = styled(Paper)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(5)};
  }
`;

const Users: FC = () => {
  const [search, setSearch] = useState<string | undefined>();

  return (
    <>
      <Title title="user lookup" />
      <Wrapper>
        <Grid container spacing={3} mb={5}>
          <Grid
            item
            direction="column"
            display="flex"
            justifyContent="center"
            xs={2}
            md={2}
          >
            <Typography variant="h4">Search for user</Typography>
          </Grid>
          <Grid
            item
            direction="column"
            display="flex"
            justifyContent="center"
            xs={4}
            md={4}
          >
            <TextField
              fullWidth
              name="search"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
          </Grid>
          <Grid
            item
            direction="column"
            display="flex"
            justifyContent="center"
            xs={2}
            md={2}
          >
            <Button variant="outlined" onClick={() => {}}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={5} pl={3}>
          <Typography variant="h4">Name: .....</Typography>
        </Grid>
        <Grid container spacing={3} mb={5}>
          <Grid item xs={6} md={6}>
            <Typography variant="h4">
              Status: <GreenText>Green</GreenText> (85/100)
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} pl={3}>
            <Button variant="outlined" onClick={() => {}}>
              Print Report
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={5} pl={3}>
          <Typography variant="h4">Member Since: xx-xx-xxxx</Typography>
        </Grid>
        <Grid container spacing={3} mb={5} pl={3}>
          <Typography variant="h4">Pass 6 month breakdown</Typography>
        </Grid>
        <Grid container spacing={3} mb={5} pl={3}>
          <Typography variant="h4">Input Calculations</Typography>
        </Grid>
        <Grid container spacing={3} mb={5} pl={3}>
          <Typography variant="h4">Able to view and edit data</Typography>
        </Grid>
        <Grid container spacing={3} mb={5} pl={3}>
          <Typography variant="h4">Set user role</Typography>
        </Grid>
      </Wrapper>
    </>
  );
};
export default Users;
