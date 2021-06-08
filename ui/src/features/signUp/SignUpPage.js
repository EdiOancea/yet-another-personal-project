import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {useMutation} from 'react-query';
import {
  Button,
  Paper,
  Container,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import {Formik} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import {RadioGroup, TextField, PasswordField} from 'utils/form';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    margin: 'auto',
    height: 700,
    width: 700,
  },
  formContainer: {width: 500},
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loader: {marginLeft: 'auto'},
}));

const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('This field is required'),
  password: yup.string().required('This field is required'),
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf(
      [yup.ref('password')],
      'Please confirm your password'
    ),
});

const initialValues = {
  type: 'student',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

const SignUpPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const signUpMutation = useMutation(
    newUser => api.post('/signup', newUser),
    {onSuccess: () => history.push('/signin')}
  );

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={6} square>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={signUpMutation.mutate}
        >
          {({handleSubmit}) => (
            <div className={classes.formContainer}>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <TextField name="firstName" label="First Name" />
              <TextField name="lastName" label="Last Name" />
              <RadioGroup
                name="type"
                label="Type"
                row
                options={[
                  {value: 'student', label: 'Student'},
                  {value: 'professor', label: 'Professor'},
                ]}
              />
              <TextField name="email" label="Email Address" autoComplete="off" />
              <PasswordField name="password" label="Password" />
              <PasswordField name="confirmPassword" label="Confirm Password" />

              {signUpMutation.isError && <div>{signUpMutation.error.message}</div>}
              {signUpMutation.isLoading
                ? <CircularProgress className={classes.loader} />
                : (
                  <Button color="primary" variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
            </div>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
