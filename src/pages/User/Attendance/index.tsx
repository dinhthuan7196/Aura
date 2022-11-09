import { FC } from 'react';

import { Typography, Button } from '@mui/material';

import ProgressLiner from '@components/Progress';
import Table from '@components/Table';
import Title from '@components/Title';

const Attendance: FC = () => {
  const columns = [
    {
      accessor: 'date',
      header: 'Date',
    },
    {
      accessor: 'attendance',
      header: 'Attendance',
    },
    {
      accessor: 'dispute',
      header: '',
      render: (values: any) => (
        <Button onClick={() => console.log({ values })}>Dispute</Button>
      ),
    },
  ];

  return (
    <>
      <Title title="attendance score" helmetTitle="Attendance" />
      <Typography mb={2} variant="h6">
        6 - MONTH ... (from ...)
      </Typography>
      <ProgressLiner value={70}> </ProgressLiner>
      <Typography mt={6} mb={2} variant="h6">
        PASS MEETINGS
      </Typography>
      <Table columns={columns} rows={[]} />
    </>
  );
};
export default Attendance;
