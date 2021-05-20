import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';

import {logIn, logOut} from 'features/signIn/authSlice';

export const useCorrectUserTypes = types => {
  const dispatch = useDispatch();
  const userType = useSelector(state => state.auth.user.type);

  useEffect(() => {
    if (!types.includes(userType) && !types.includes(localStorage.getItem('userType'))) {
      dispatch(logOut());
    }
  }, [dispatch, types, userType]);
};

export const useCorrectToken = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const storageToken = localStorage.getItem('token');

    if (token) {
      return;
    }

    if (!storageToken) {
      return history.push('/signin');
    }

    dispatch(logIn(storageToken));
  }, [dispatch, history, token]);
};
