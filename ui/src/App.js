import React from 'react';
import {useQuery} from 'react-query';
import {BrowserRouter, Switch, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {CssBaseline} from '@material-ui/core';

import api from 'utils/api';
import {UnprotectedRoute, ProtectedRoute} from 'utils/routing';
import {FullPageLoader} from 'components';
import {setLoggedUser} from 'features/signIn/authSlice';
import SignInPage from 'features/signIn/SignInPage';
import SignUpPage from 'features/signUp/SignUpPage';
import Dashboard from 'features/dashboard/DashboardPage';
import Quizzes from 'features/quizzes/QuizzesPage';
import Quiz from 'features/quizzes/QuizPage';
import QuizQuestion from 'features/quizzes/QuizQuestionPage';
import AssignQuiz from 'features/quizzes/AssignQuizPage';
import TakeQuiz from 'features/quizzes/TakeQuizPage';

const App = () => {
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

  if (meQuery.isLoading) {
    return <FullPageLoader />;
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <ProtectedRoute path="/dashboard" types={['professor', 'student']}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId/question/:questionId?" types={['professor']}>
          <QuizQuestion />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId/assign" types={['professor']}>
          <AssignQuiz />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId?/take" types={['student']}>
          <TakeQuiz />
        </ProtectedRoute>
        <ProtectedRoute path="/quiz/:quizId?" types={['professor']}>
          <Quiz />
        </ProtectedRoute>
        <ProtectedRoute path="/quizzes" types={['professor', 'student']}>
          <Quizzes />
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
