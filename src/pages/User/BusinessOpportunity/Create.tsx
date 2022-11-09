import { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';

import {
  TextField as MuiTextField,
  Button,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';
import { spacing } from '@mui/system';

import Dialog from '@components/Dialog';
import Title from '@components/Title';

import { useUser } from '@hooks/useUser';
import { useOpportunities } from '@hooks/useOpportunities';
import { regexPhone } from '@utils/regex';
import { objProps } from '@utils/types';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Wrapper = styled(Paper)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(5)};
    padding-top: ${(props) => props.theme.spacing(3)};
  }
`;

type CreateProps = {
  onSubmit: (values: objProps) => void;
  onClose: () => void;
};

const Create: FC<CreateProps> = ({ onSubmit, onClose }: CreateProps) => {
  const { actionsOpportunity } = useOpportunities();
  const { users } = useUser();

  return (
    <>
      <Title title="create new business opportunity" />
      <Wrapper>
        <Formik
          initialValues={{
            user: '',
            contact: '',
            company: '',
            phone: '',
            email: '',
            details: '',
          }}
          validationSchema={...}
          onSubmit={async (values, { setStatus, resetForm }) => {
            try {
              onSubmit({
                method: 'create',
                list: [
                  {
                    user: values.user,
                    name: values.contact,
                    company: values.company,
                    phone: values.phone,
                    email: values.email,
                    details: values.details,
                  },
                ],
              });
              resetForm();
            } catch (error: any) {
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
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12} md={5} pl={2} pr={2}>
                  <TextField
                    select
                    fullWidth
                    name="user"
                    label="For"
                    value={values.user}
                    error={Boolean(touched.user && errors.user)}
                    helperText={touched.user && errors.user}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  >
                    {users.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    name="contact"
                    label="Contact Name"
                    value={values.contact}
                    error={Boolean(touched.contact && errors.contact)}
                    helperText={touched.contact && errors.contact}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                  <TextField
                    fullWidth
                    name="company"
                    label="Company"
                    value={values.company}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
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
                    multiline
                    rows={4}
                    name="details"
                    label="Details"
                    value={values.details}
                    error={Boolean(touched.details && errors.details)}
                    helperText={touched.details && errors.details}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    my={2}
                  />
                </Grid>
              </Grid>
              <ButtonGroup>
                <Grid item xs={12} md={1} pl={2} pr={2} mb={2}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Create
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </ButtonGroup>
            </Box>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};
export default Create;
