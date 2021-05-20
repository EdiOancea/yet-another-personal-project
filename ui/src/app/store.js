import {configureStore} from '@reduxjs/toolkit';

import authSlice from 'features/signIn/authSlice';

export default configureStore({reducer: {auth: authSlice}});
