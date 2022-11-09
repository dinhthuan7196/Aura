import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';

import { TextField as MuiTextField, Button, Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { spacing } from '@mui/system';

import Title from '@components/Title';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Wrapper = styled(Paper)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(5)};
    padding-top: ${(props) => props.theme.spacing(3)};
  }
`;

const Create: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title title="Input Business Value Realized" />
      <Wrapper>
        <Formik
          initialValues={{
            value: '',
            from: '',
            notes: '',
          }}
          validationSchema={Yup.object().shape({
            value: Yup.string().required('Value is required'),
            from: Yup.string().required('From is required'),
            notes: Yup.string().required('Note is required'),
          })}
          onSubmit={async (values, { setStatus }) => {
            try {
              // To Do: Call API businessValueRealized/summary/create;
              setStatus({ success: true });
              navigate('/businessValueRealized/summary');
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
                    name="value"
                    label="Value Realized"
                    value={values.value}
                    error={Boolean(touched.value && errors.value)}
                    helperText={touched.value && errors.value}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                  <TextField
                    fullWidth
                    name="from"
                    label="From User"
                    value={values.from}
                    error={Boolean(touched.from && errors.from)}
                    helperText={touched.from && errors.from}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="notes"
                    label="Notes"
                    value={values.notes}
                    error={Boolean(touched.notes && errors.notes)}
                    helperText={touched.notes && errors.notes}
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
export default Create;
