import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Route, useHistory} from 'react-router-dom';

const UnprotectedRoute = props => {
  const history = useHistory();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      history.push('/quizzes');
    }
  }, [token, history]);

  return <Route {...props} />;
};

export default UnprotectedRoute;
