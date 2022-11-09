import { FC, memo } from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';

import {
  TextField as MuiTextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { spacing } from '@mui/system';

import { InfoProps, ActionsProps } from '@pages/Login/FormPassword/type';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

type ValidateCodeFormProps = ActionsProps & {
  info: InfoProps;
};

const ValidateCodeForm: FC<ValidateCodeFormProps> = ({
  info,
  onActions,
  setInfo,
}: ValidateCodeFormProps) => {
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Confirm Code
      </Typography>
      <Typography variant="body1" align="center">
        Enter your code to confirm set new password
      </Typography>
      <Formik
        initialValues={{
          code: '',
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required('Code is required'),
        })}
        onSubmit={(values, { setStatus: onSetStatus }) => {
          onActions({
            values: {
              ...values,
              email: info.email,
            },
            action: info.action,
            setStatus: (isSuccess: boolean) => {
              if (isSuccess) {
                setInfo({ ...info, ...values, action: 'set-password' });
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
              name="code"
              label="Code"
              value={values.code}
              error={Boolean(touched.code && errors.code)}
              helperText={touched.code && errors.code}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button fullWidth type="submit" variant="contained" color="primary" >
              Validate Code
            </Button>
            <Button
              fullWidth
              style={{ marginTop: 10 }}
              variant="outlined"
              color="success"
              onClick={() =>
                setInfo({
                  action: 'reset-password',
                })
              }
            >
              Back
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(ValidateCodeForm);
