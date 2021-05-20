import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, useHistory} from 'react-router-dom';

import {logOut} from 'features/signIn/authSlice';

const UnprotectedRoute = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      history.push('/dashboard');
    }
  }, [token, history]);

  return <Route {...props} />;
};

export default UnprotectedRoute;
