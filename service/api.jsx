// apiService.js

import axiosInstance from './axiosInstance';

// LOGIN API
export const postUserLogin = async (data) => {
	try {
		const response = await axiosInstance.post('/user/login', data, {
			headers: {'Content-Type': 'application/json'},
		});
		return response.data;
	} catch (error) {
		console.error('Error logging in:', error.response ? error.response.data : error.message);
		throw error;
	}
};

export const getGuestReservationInfo = async (restaurantId) => {
	try {
		const response = await axiosInstance.get('/secure/restaurant/reservation-for-restaurant', {
			params: {
				rest_uuid: restaurantId,
				params: 'info',
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching guest reservation info:', error.response ? error.response.data : error.message);
		throw error;
	}
};
