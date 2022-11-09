import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';

import { TextField as MuiTextField, Button, Box } from '@mui/material';
import { spacing } from '@mui/system';
import { Avatar, Paper } from '@mui/material';

import { useUser } from '@hooks/useUser';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const FormSignIn = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

function Login() {
  const { signIn } = useUser();

  return (
    <>
      <FormSignIn>
        <Wrapper>
          <Helmet title="Sign In" />
          <BigAvatar alt="unknown" src="" />
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('User is required'),
              password: Yup.string().required('Password is required'),
            })}
            onSubmit={async (values, { setStatus }) => {
              try {
                await signIn({
                  payload: values,
                  onSuccess: () => {
                    setStatus({ success: true });
                  },
                  onError: (msg: string) => {
                    setStatus({ success: false });
                  },
                });
              } catch (error: any) {
                setStatus({ success: false });
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="username"
                  label="User"
                  value={values.username}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={2}
                />
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={2}
                />
                <Box mb={2}>
                  <Button component={Link} to="/reset-password" color="primary">
                    Forgot password
                  </Button>
                </Box>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
              </form>
            )}
          </Formik>
        </Wrapper>
      </FormSignIn>
    </>
  );
}

export default Login;
