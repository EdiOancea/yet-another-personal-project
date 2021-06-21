import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {BrowserRouter, Switch, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {CssBaseline} from '@material-ui/core';

import api from 'utils/api';
import {UnprotectedRoute, ProtectedRoute} from 'utils/routing';
import {AppLayout} from 'components';
import {setLoggedUser, logIn} from 'features/SignInPage/authSlice';
import SignInPage from 'features/SignInPage';
import SignUpPage from 'features/SignUpPage';
import QuizzesPage from 'features/QuizzesPage';
import QuizPage from 'features/QuizPage';
import QuizQuestionPage from 'features/QuizQuestionPage';
import AssignQuizPage from 'features/AssignQuizPage';
import GradeQuizPage from 'features/GradeQuizPage';
import TakeQuizPage from 'features/TakeQuizPage';

const App = () => {
  const [didLoadFromLocalStorage, setDidLoadFromLocalStorage] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const meQuery = useQuery(
    'me',
    () => api.get('/me'),
    {
      onSuccess: loggedUser => dispatch(setLoggedUser(loggedUser)),
      enabled: !!token,
    },
  );

  useEffect(() => {
    const storageToken = localStorage.getItem('token');

    if (storageToken) {
      dispatch(logIn(storageToken));
    }

    setDidLoadFromLocalStorage(true);
  }, [dispatch]);

  if (!didLoadFromLocalStorage || meQuery.isLoading) {
    return <AppLayout isLoading />;
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <ProtectedRoute path="/quiz/:quizId/question/:questionId?" types={['professor']}>
          <QuizQuestionPage />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId/assign" types={['professor']}>
          <AssignQuizPage />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId/grade" types={['professor']}>
          <GradeQuizPage />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId?/take" types={['student']}>
          <TakeQuizPage />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId?" types={['professor']}>
          <QuizPage />
        </ProtectedRoute>
        <ProtectedRoute path="/quizzes" types={['professor', 'student']}>
          <QuizzesPage />
        </ProtectedRoute>
        <UnprotectedRoute path="/signin">
          <SignInPage />
        </UnprotectedRoute>
        <UnprotectedRoute path="/signup">
          <SignUpPage />
        </UnprotectedRoute>
        <UnprotectedRoute path="/">
          <Redirect to="/signin" />
        </UnprotectedRoute>
      </Switch>
    </BrowserRouter>
  );
};
export default App;
