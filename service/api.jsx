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
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching guest reservation info:', error.response ? error.response.data : error.message);
		throw error;
	}
};

export const getAcceptReservation = async (restaurantId, reservationId, userId) => {
	try {
		const response = await axiosInstance.get('/secure/restaurant/reservation-for-restaurant', {
			params: {
				rest_uuid: restaurantId,
				params: 'accept',
				uuid: reservationId,
				user_uuid: userId,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error accepting reservation:', error.response ? error.response.data : error.message);
		throw error;
	}
};

export const getRejectReservation = async (restaurantId, reservationId, userId) => {
	try {
		const response = await axiosInstance.get('/secure/restaurant/reservation-for-restaurant', {
			params: {
				rest_uuid: restaurantId,
				params: 'reject',
				uuid: reservationId,
				user_uuid: userId,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error rejecting reservation:', error.response ? error.response.data : error.message);
		throw error;
	}
};

export const getCancelReservation = async (restaurantId, reservationId, userId) => {
	try {
		const response = await axiosInstance.get('/secure/restaurant/reservation-for-restaurant', {
			params: {
				rest_uuid: restaurantId,
				params: 'cancel',
				uuid: reservationId,
				user_uuid: userId,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error cancelling reservation:', error.response ? error.response.data : error.message);
		throw error;
	}
};

export const getCheckInReservation = async (restaurantId, reservationId, checkInTime) => {
	try {
		const response = await axiosInstance.get('/secure/restaurant/reservation-for-restaurant', {
			params: {
				rest_uuid: restaurantId,
				params: 'checkin',
				checkin_time: checkInTime,
				uuid: reservationId,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error checking in:', error.response ? error.response.data : error.message);
		throw error;
	}
};

export const getCheckOutReservation = async (restaurantId, reservationId, checkedOutTime) => {
	try {
		const response = await axiosInstance.get('/secure/restaurant/reservation-for-restaurant', {
			params: {
				rest_uuid: restaurantId,
				params: 'checkout',
				uuid: reservationId,
				checkout_time: checkedOutTime,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error checking out:', error.response ? error.response.data : error.message);
		throw error;
	}
};