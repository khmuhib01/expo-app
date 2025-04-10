import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slice/counter/counterSlice';
import authReducer from './slice/auth/authSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure persistence for the auth slice only
const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	whitelist: ['token', 'user'], // Only persist these fields from your auth reducer
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: persistedAuthReducer,
	},
});

export const persistor = persistStore(store);
