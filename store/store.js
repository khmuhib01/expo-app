// store.js
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slice/counter/counterSlice';
import authReducer from './slice/auth/authSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
	},
});

export default store;
