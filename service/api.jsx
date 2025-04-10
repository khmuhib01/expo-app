// apiService.js

const baseURL = 'https://apiservice.tablebookings.co.uk/api/v1/';

const postUserLogin = async (data) => {
	try {
		const response = await fetch(`${baseURL}user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// If needed, you can add Accept or other headers here:
				// Accept: 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			// Optionally, you can extract the error message from the response
			const errorData = await response.text();
			throw new Error(`Login failed: ${errorData}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error logging in:', error);
		throw error;
	}
};

export {postUserLogin};
