import { FC } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  TextField as MuiTextField,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { spacing } from '@mui/system';
import { Paper } from '@mui/material';
import { MobileDatePicker as DatePicker } from '@mui/lab';

import { regexPhone } from '@utils/regex';

import ProgressLiner from '@components/Progress';
import Title from '@components/Title';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Wrapper = styled(Paper)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(5)};
    padding-top: ${(props) => props.theme.spacing(3)};
  }
`;

const Visitors: FC = () => {
  return (
    <>
      <Title title="Visitors Summary" />
      <Typography mb={2} variant="h6">
        6 - MONTH ... (from ...)
      </Typography>
      <ProgressLiner value={70} />
      <Typography mt={6} mb={2} variant="h6">
        Input Visitor
      </Typography>
      <Wrapper>
        <Formik
          initialValues={{
            name: '',
            date: new Date().getTime(),
            phone: '',
            email: '',
            industry: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Value is required'),
            date: Yup.number().required('Date is required'),
            industry: Yup.string().required('From is required'),
            email: Yup.string().email().required('Email is required'),
            phone: Yup.string()
              .required('Phone is required')
              .matches(regexPhone, 'Phone number is not valid'),
          })}
          onSubmit={async (values, { setStatus }) => {
            try {
              // To Do: Call API visitor/create;
              setStatus({ success: true });
            } catch (error) {
              setStatus({ success: false });
            }
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12} md={5} pl={2} pr={2}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Visitor Name"
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                  <DatePicker
                    label="Date"
                    value={new Date(values.date)}
                    onChange={(newValue) => {
                      console.log(newValue?.getTime());
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth my={2} {...params} />
                    )}
                  />
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone"
                    value={values.phone}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                  <TextField
                    fullWidth
                    name="industry"
                    label="Industry"
                    value={values.industry}
                    error={Boolean(touched.industry && errors.industry)}
                    helperText={touched.industry && errors.industry}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={1} pl={2} pr={2} mb={2}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};
export default Visitors;
