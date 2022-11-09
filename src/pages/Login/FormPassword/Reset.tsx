import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';

import { TextField as MuiTextField, Button, Typography } from '@mui/material';
import { spacing } from '@mui/system';

import { InfoProps, ActionsProps } from '@pages/Login/FormPassword/type';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

type ResetFormProps = ActionsProps & {
  info: InfoProps;
};

const ResetForm: FC<ResetFormProps> = ({
  info,
  onActions,
  setInfo,
}: ResetFormProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="body1" align="center">
        Enter your email to reset your password
      </Typography>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .required('Email is required'),
        })}
        onSubmit={(values, { setStatus: onSetStatus }) => {
          onActions({
            values: values,
            action: info.action,
            setStatus: (isSuccess: boolean) => {
              if (isSuccess) {
                setInfo({ ...info, ...values, action: 'validate-code' });
              }
              onSetStatus({ success: isSuccess });
            },
          });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button fullWidth type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
            <Button
              fullWidth
              style={{ marginTop: 10 }}
              variant="outlined"
              color="success"
              onClick={() => navigate('/')}
            >
              Back
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(ResetForm);
