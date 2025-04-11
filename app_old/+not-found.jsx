import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';

export default function NotFound() {
	const router = useRouter();

	const handleGoHome = () => {
		// Navigate back to home; update the path if needed
		router.push('/');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Oops!</Text>
			<Text style={styles.message}>We couldn't find the page you're looking for.</Text>
			<TouchableOpacity style={styles.button} onPress={handleGoHome}>
				<Text style={styles.buttonText}>Go Home</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		marginBottom: 16,
		color: '#333',
	},
	message: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 24,
		color: '#666',
		paddingHorizontal: 10,
	},
	button: {
		backgroundColor: '#1A73E8',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	buttonText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '600',
	},
});
