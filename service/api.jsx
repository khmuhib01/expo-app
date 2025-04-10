// apiService.js

import axios from 'axios';
import {store} from '../store/store';

const baseURL = 'https://apiservice.tablebookings.co.uk/api/v1/';

// Helper function to generate headers with the current token.
const getAuthHeaders = () => {
	const token = store.getState().auth.token;
	return {
		'Content-Type': 'application/json',
		Authorization: token ? `Bearer ${token}` : '',
	};
};

const postUserLogin = async (data) => {
	try {
		// Axios automatically stringifies the data to JSON
		const response = await axios.post(`${baseURL}user/login`, data, {
			headers: {'Content-Type': 'application/json'},
		});
		return response.data;
	} catch (error) {
		console.error('Error logging in:', error.response ? error.response.data : error.message);
		throw error;
	}
};

const getGuestReservationInfo = async (restaurantId) => {
	try {
		const response = await axios.get(`${baseURL}secure/restaurant/reservation-for-restaurant`, {
			params: {
				rest_uuid: restaurantId,
				params: 'info',
			},
			headers: getAuthHeaders(),
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching guest reservation info:', error.response ? error.response.data : error.message);
		throw error;
	}
};

export {postUserLogin, getGuestReservationInfo};
