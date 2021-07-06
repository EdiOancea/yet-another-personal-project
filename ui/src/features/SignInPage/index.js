import React from 'react';
import {useHistory} from 'react-router';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {
  Avatar,
  Paper,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import api from 'utils/api';
import {TextField, SubmitButton} from 'components';
import {logIn} from './authSlice';

const useStyles = makeStyles(theme => ({
  root: {height: '100vh', display: 'flex'},
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(3),
    margin: 'auto',
    height: 700,
    width: 500,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  buttons: {display: 'flex', justifyContent: 'space-between'},
}));

const signInSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {email: '', password: ''};

const SignInPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const signInMutation = useMutation(
    values => api.post('/signin', values),
    {onSuccess: ({token}) => dispatch(logIn(token))}
  );

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.title}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h4">Sign In</Typography>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema}
          onSubmit={signInMutation.mutate}
        >
          <Form>
            <TextField name="email" label="Email Address" autoFocus />
            <TextField name="password" label="Password" type="password" />
            <span className={classes.buttons}>
              <SubmitButton isLoading={signInMutation.isLoading}>
                Sign In
              </SubmitButton>
              <Button
                color="secondary"
                onClick={() => history.push('/signup')}
              >
                Sign Up
              </Button>
            </span>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
};

export default SignInPage;
