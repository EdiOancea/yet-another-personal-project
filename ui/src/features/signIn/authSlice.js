import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    firstName: '',
    lastName: '',
    type: '',
  },
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, {payload: token}) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    setLoggedUser(state, {payload: user}) {
      localStorage.setItem('userType', user.type);
      state.user = user;
    },
    logOut(state) {
      localStorage.clear();
      state.token = initialState.token;
      state.user = initialState.user;
    },
  },
});

export const {logIn, setLoggedUser, logOut} = authSlice.actions;

export default authSlice.reducer;
