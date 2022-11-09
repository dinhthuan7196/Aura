import { FC } from 'react';

import { Typography } from '@mui/material';

import ProgressLiner from '@components/Progress';
import Table from '@components/Table';
import Title from '@components/Title';

import { useOpportunities } from '@hooks/useOpportunities';
import { useUser } from '~/hooks/useUser';
import { TCell, objProps } from '@utils/types';

import CreateForm from './Create';

const status = [
  {
    label: 'New',
    value: 'new',
  },
  {
    label: 'In Progress',
    value: 'in progress',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
];

const Summary: FC = () => {
  const { loading, opportunities, fetchOpportunities, actionsOpportunity } = useOpportunities();
  const { users } = useUser();

  const columns: TCell[] = [
    {
      accessor: 'name',
      header: 'Name',
      disabledEdit: true,
    },
    {
      accessor: 'from',
      header: 'User',
      disabledEdit: true,
      render: ({ from }: objProps) => {
        return (
          <p>{users.find(({ id }: objProps) => id === from)?.name ?? from}</p>
        );
      },
    },
    {
      accessor: 'date',
      header: 'Date',
      type: 'date',
      disabledEdit: true,
    },
    {
      accessor: 'company',
      header: 'Company',
      disabledEdit: true,
    },
    {
      accessor: 'details',
      header: 'Details',
      disabledEdit: true,
    },
    {
      accessor: 'status',
      header: 'Status',
      type: 'select',
      options: status,
      render: (values: objProps) => {
        return (
          <p>
            {status.find(({ value }) => values.status === value)?.label ?? ''}
          </p>
        );
      },
    },
  ];

  return (
    <>
      <Title title="Business Opportunity summary" />
      <Typography mb={2} variant="h6">
        6 - MONTH ... (from ...)
      </Typography>
      <ProgressLiner value={30}> </ProgressLiner>

      <Typography mt={6} mb={3} variant="h6">
        BUSINESS OPPORTUNITIES (FROM OTHERS)
      </Typography>
      <Table
        columns={columns}
        rows={opportunities?.data?.list ?? []}
        loading={loading}
        total={opportunities?.total ?? 0}
        actions={{
          edit: true,
          delete: true,
          create: true,
        }}
        fetchData={fetchOpportunities}
        onActions={actionsOpportunity}
        CreateForm={(
          onSubmit: (values: objProps) => void,
          onClose: () => void
        ) => <CreateForm onSubmit={onSubmit} onClose={onClose} />}
      />
    </>
  );
};
export default Summary;
