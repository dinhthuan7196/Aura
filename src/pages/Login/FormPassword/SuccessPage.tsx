import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';

const SuccessPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
        }}
      >
        <CheckCircleOutlineIcon fontSize="large" sx={{ color: green[500] }} />
      </Box>
      <Typography variant="h3" align="center" gutterBottom>
        Reset Password Success.
      </Typography>
    </>
  );
};

export default SuccessPage;
