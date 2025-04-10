import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {login} from './../../store/slice/auth/authSlice';
import {postUserLogin} from './../../service/api';

export default function Login() {
	const [email, setEmail] = useState('khmuhib2013@gmail.com');
	const [password, setPassword] = useState('password');
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const handleLogin = async () => {
		if (email && password) {
			try {
				const response = await postUserLogin({email, password});
				console.log('response', response);
				dispatch(
					login({
						token: response.token,
						user: response.data,
					})
				);

				navigation.reset({
					index: 0,
					routes: [{name: '(tabs)'}],
				});
			} catch (error) {
				console.error('Login failed:', error);
				Alert.alert('Login Failed', 'Please check your credentials and try again.');
			}
		} else {
			Alert.alert('Validation Error', 'Please enter both email and password');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.header}>Login</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					placeholderTextColor="#999"
					keyboardType="email-address"
					autoCapitalize="none"
					style={styles.input}
					value={email}
					onChangeText={setEmail}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Password"
					placeholderTextColor="#999"
					secureTextEntry
					style={styles.input}
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Log In</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		width: '90%',
		padding: 20,
		alignSelf: 'center',
		marginTop: 50,
		borderRadius: 8,
		borderColor: '#ccc',
		borderWidth: 1,
	},
	header: {
		fontSize: 32,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginBottom: 40,
	},
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#333',
	},
	button: {
		backgroundColor: '#EF4444',
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 20,
		marginTop: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		alignSelf: 'center',
	},
});
