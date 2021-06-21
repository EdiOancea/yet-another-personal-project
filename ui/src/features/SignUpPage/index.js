import React from 'react';
import {useHistory} from 'react-router';
import {useMutation} from 'react-query';
import {Paper, Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import {
  RadioGroup,
  TextField,
  PasswordField,
  SubmitButton,
} from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    margin: 'auto',
  },
  formContainer: {width: 500},
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
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
      <Paper className={classes.paper} elevation={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={signUpMutation.mutate}
        >
          <Form className={classes.formContainer}>
            <Typography component="h1" variant="h5">
              Please fill out this form to request an account.
            </Typography>
            <TextField name="firstName" label="First Name" />
            <TextField name="lastName" label="Last Name" />
            <RadioGroup
              name="type"
              label="Account Type"
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
            <SubmitButton isLoading={signUpMutation.isLoading}>Sign Up</SubmitButton>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
