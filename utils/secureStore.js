// utils/secureStore.js
import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token) => {
	try {
		await SecureStore.setItemAsync('userToken', token);
	} catch (error) {
		console.error('Error saving token:', error);
	}
};

export const getToken = async () => {
	try {
		return await SecureStore.getItemAsync('userToken');
	} catch (error) {
		console.error('Error retrieving token:', error);
		return null;
	}
};

export const deleteToken = async () => {
	try {
		await SecureStore.deleteItemAsync('userToken');
	} catch (error) {
		console.error('Error deleting token:', error);
	}
};
