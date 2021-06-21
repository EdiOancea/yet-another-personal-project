import {configureStore} from '@reduxjs/toolkit';

import authSlice from 'features/SignInPage/authSlice';

export default configureStore({reducer: {auth: authSlice}});
