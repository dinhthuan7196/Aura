import { FC } from 'react';
import styled from 'styled-components';

import { Box, Typography } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { grey, green } from '@mui/material/colors';

import useDeviceDetect from '@hooks/useDeviceDetect';

interface ProgressProps {
  value?: number;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: green[200],
  },
}));

const ValueProgress = styled(Typography)`
  position: absolute;
  top: 0;
  left: 50%;
`;

const Progress: FC<ProgressProps> = ({ value }: ProgressProps) => {
  const isMobile = useDeviceDetect();

  return (
    <Box sx={{ position: 'relative', width: `${isMobile ? '100%' : '50%'}` }}>
      <BorderLinearProgress variant="determinate" value={value} />
      {value ? <ValueProgress variant="h6">{`${value}%`}</ValueProgress> : null}
    </Box>
  );
};
export default Progress;
