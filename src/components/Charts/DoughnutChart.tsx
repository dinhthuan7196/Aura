import { FC } from 'react';

import styled from 'styled-components';
import Chart from 'react-chartjs-2';

import { CardContent, Card as MuiCard, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { spacing } from '@mui/system';

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;

interface DoughnutChartProps {}

const DoughnutChart: FC<DoughnutChartProps> = (props: DoughnutChartProps) => {
  const data = {
    labels: ['Social', 'Search Engines'],
    datasets: [
      {
        data: [260, 125],
        backgroundColor: [green[400], grey[50]],
        borderColor: 'transparent',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card variant="outlined" mb={1}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Title
        </Typography>
        <Typography variant="body2" gutterBottom>
          Chart description.
        </Typography>
        <Spacer mb={6} />
        <ChartWrapper>
          <Chart type="doughnut" data={data} options={options} />
        </ChartWrapper>
        <Spacer mb={6} />
        <Typography variant="h5" align="center">
          70%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
