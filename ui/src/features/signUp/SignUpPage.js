import React, {Fragment, useState} from 'react';
import {useHistory} from 'react-router';
import {useMutation} from 'react-query';
import {
  Button,
  Paper,
  Container,
  CircularProgress,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import WhoAreYou from './WhoAreYou';
import GeneralInfo from './GeneralInfo';

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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loader: {marginLeft: 'auto'},
}));

const validationSchemas = [
  yup.object().shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
  }),
  yup.object().shape({
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
  }),
];

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
  const [step, setStep] = useState(0);
  const signUpMutation = useMutation(
    newUser => api.post('/signup', newUser),
    {onSuccess: () => history.push('/signin')}
  );
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step]}
          onSubmit={(values, {setTouched}) => {
            setTouched({});

            return step < 1 ? setStep(step + 1) : signUpMutation.mutate(values);
          }}
        >
          {({handleSubmit}) => (
            <Fragment>
              {step === 0 && <WhoAreYou />}
              {step === 1 && <GeneralInfo />}
              {signUpMutation.isError && <div>{signUpMutation.error.message}</div>}
              {signUpMutation.isLoading
                ? <CircularProgress className={classes.loader} />
                : (
                  <div className={classes.buttons}>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => setStep(step - 1)}
                      disabled={step === 0}
                    >
                      Back
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Next
                    </Button>
                  </div>
                )}

            </Fragment>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
