import { FC, useState } from 'react';
import styled from 'styled-components';

import { Typography, Button, TextField, Grid, Paper } from '@mui/material';
import { MobileDatePicker as DatePicker } from '@mui/lab';

import { useDiscoveries } from '@hooks/useDiscoveries';
import { useUser } from '@hooks/useUser';

import ProgressLiner from '@components/Progress';
import Table from '@components/Table';
import Title from '@components/Title';
import Autocomplete, {
  option as AutoOption,
  selectedOption,
} from '@components/Autocomplete';

import { convertDateToTimeStamp } from '@utils/helpers';
import { TCell } from '@utils/types';

const Wrapper = styled(Paper)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(3)};
  }
`;

const GridItem = styled(Grid).attrs({
  container: true,
  item: true,
  direction: 'column',
  display: 'flex',
  justifyContent: 'center',
})``;

const BusinessDiscovery: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedUser, setSelectedUser] = useState<AutoOption>();

  const { loading, discoveries, fetchDiscoveries, actionsDiscovery } =
    useDiscoveries();
  const { users } = useUser();

  const handleSubmit = async () => {
    await actionsDiscovery({
      method: 'create',
      list: [
        {
          date: convertDateToTimeStamp(selectedDate),
          user: selectedUser?.value,
        },
      ],
    });
  };

  const handleChangeDate = (value: Date | null) => {
    if (value) setSelectedDate(value);
  };

  const columns: TCell[] = [
    {
      accessor: 'user_name',
      header: 'User',
      disabledEdit: true,
    },
    {
      accessor: 'date',
      header: 'Date',
      type: 'date',
    },
  ];

  return (
    <>
      <Title title="Business Discovery" />
      <Typography mb={2} variant="h6">
        6 - MONTH ... (from ...)
      </Typography>
      <ProgressLiner value={70}> </ProgressLiner>
      <Typography mt={6} mb={2} variant="h6">
        New
      </Typography>
      <Wrapper>
        <Grid container spacing={3} mb={2}>
          <GridItem xs={1} md={1}>
            <Typography variant="h6">I met</Typography>
          </GridItem>
          <GridItem xs={2} md={2}>
            <Autocomplete
              options={users.map(({ id, name }) => ({
                label: name,
                value: `${id}`,
              }))}
              value={selectedUser}
              onChange={(value: selectedOption) =>
                setSelectedUser(value as AutoOption)
              }
            />
          </GridItem>
          <GridItem xs={2} md={2}>
            <Typography variant="h6">for a BD section on</Typography>
          </GridItem>
          <GridItem xs={2} md={2}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </GridItem>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Wrapper>
      <Typography mt={6} mb={2} variant="h6">
        LOG
      </Typography>
      <Table
        loading={loading}
        columns={columns}
        rows={discoveries?.data?.list ?? []}
        total={discoveries?.total ?? 0}
        actions={{
          edit: true,
          delete: true,
        }}
        fetchData={fetchDiscoveries}
        onActions={actionsDiscovery}
      />
    </>
  );
};
export default BusinessDiscovery;
