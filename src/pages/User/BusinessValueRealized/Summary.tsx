import { FC } from 'react';

import { Typography } from '@mui/material';

import ProgressLiner from '@components/Progress';
import Table from '@components/Table';
import Title from '@components/Title';

import { useRealizers } from '@hooks/useRealizers';

const Summary: FC = () => {
  const { loading, realizers, fetchRealizers, actionsRealizers } =
    useRealizers();

  const columns = [
    {
      accessor: 'from',
      header: 'From',
    },
    {
      accessor: 'amount',
      header: 'Amount',
      isRight: true,
    },
    {
      accessor: 'date',
      header: 'Date',
      isRight: true,
    },
  ];

  return (
    <>
      <Title title="Business Vale Realized" />

      <Typography mb={2} variant="h6">
        6 - MONTH ... (from ...)
      </Typography>
      <ProgressLiner value={70}> </ProgressLiner>

      <Typography mt={6} mb={2} variant="h6">
        LOG
      </Typography>
      <Table
        columns={columns}
        rows={realizers?.list ?? []}
        loading={loading}
        total={realizers?.total ?? 0}
        fetchData={fetchRealizers}
        actions={{
          edit: true,
          delete: true,
        }}
        onActions={actionsRealizers}
      />
    </>
  );
};
export default Summary;
