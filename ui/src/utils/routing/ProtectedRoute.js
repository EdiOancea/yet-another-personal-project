import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({types, ...rest}) => {
  const userType = useSelector(state => state.auth.user.type);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!types.includes(userType)) {
      window.location.href = '/signin';
    }
  }, [types, userType]);

  useEffect(() => {
    if (!token) {
      window.location.href = '/signin';
    }
  }, [token]);

  return <Route {...rest} />;
};

export default ProtectedRoute;
