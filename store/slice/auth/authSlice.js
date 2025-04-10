// authSlice.js
import {createSlice} from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
	token: null,
	user: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Synchronous login action (for example purposes)
		login(state, action) {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.isAuthenticated = true;
		},
		// Logout action to clear authentication state
		logout(state) {
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

// Export actions for use in components
export const {login, logout} = authSlice.actions;

// Export the reducer to add to your store
export default authSlice.reducer;
