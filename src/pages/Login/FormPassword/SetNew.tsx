import { FC, memo } from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';

import { TextField as MuiTextField, Button, Typography } from '@mui/material';
import { spacing } from '@mui/system';

import { InfoProps, ActionsProps } from '@pages/Login/FormPassword/type';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

type SetNewPasswordFormProps = ActionsProps & {
  info: InfoProps;
};

const SetNewPasswordForm: FC<SetNewPasswordFormProps> = ({
  info,
  onActions,
  setInfo,
}: SetNewPasswordFormProps) => {
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Set New Password
      </Typography>
      <Typography variant="body1" align="center">
        Enter your new password
      </Typography>
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={(values, { setStatus: onSetStatus }) => {
          onActions({
            values: {
              ...values,
              email: info.email,
              code: info.code,
            },
            action: info.action,
            setStatus: (isSuccess: boolean) => {
              if (isSuccess) {
                setInfo({ ...info, ...values, action: 'done' });
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
              name="password"
              label="New Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button fullWidth type="submit" variant="contained" color="primary">
              Confirm
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(SetNewPasswordForm);
