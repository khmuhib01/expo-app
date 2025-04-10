import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './../../store/slice/auth/authSlice';
import {postUserLogin} from './../../service/api';
import {useRouter} from 'expo-router';
import ButtonComponent from '../../components/ui/ButtonComponent';
import {isLoading} from 'expo-font';

export default function Login() {
	const [email, setEmail] = useState('khmuhib2013@gmail.com');
	const [password, setPassword] = useState('password');
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const router = useRouter();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			router.replace('/(tabs)');
		}
	}, [isAuthenticated, router]);

	const handleLogin = async () => {
		if (email && password) {
			try {
				setIsLoading(true);
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
			} finally {
				setIsLoading(false);
			}
		} else {
			Alert.alert('Validation Error', 'Please enter both email and password');
		}
	};

return (
	<SafeAreaView style={styles.safeArea}>
		<View style={styles.container}>
			<Image source={require('./../../assets/images/react-logo.png')} style={styles.logo} resizeMode="contain" />
			<Text style={styles.welcomeText}>Welcome Back!</Text>
			<Text style={styles.header}>Login to your Account</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					placeholderTextColor="#A7A7A7"
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
					placeholderTextColor="#A7A7A7"
					secureTextEntry
					style={styles.input}
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<ButtonComponent title="Login" onPress={handleLogin} loading={isLoading} />
			{/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity> */}
		</View>
	</SafeAreaView>
);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#F7F8FA',
		justifyContent: 'center',
	},
	container: {
		width: '90%',
		alignSelf: 'center',
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 12,
		paddingVertical: 40,
		paddingHorizontal: 20,
		shadowColor: '#ccc',
		shadowOffset: {width: 0, height: 4},
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		alignItems: 'center',
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	welcomeText: {
		fontSize: 18,
		color: '#555',
		marginBottom: 10,
	},
	header: {
		fontSize: 24,
		fontWeight: '700',
		color: '#333',
		marginBottom: 30,
		textAlign: 'center',
	},
	inputContainer: {
		width: '100%',
		marginBottom: 15,
	},
	input: {
		backgroundColor: '#F7F8FA',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		fontSize: 16,
		color: '#333',
		borderWidth: 1,
		borderColor: '#E5E5E5',
	},
	button: {
		backgroundColor: '#EF4444',
		paddingVertical: 15,
		borderRadius: 8,
		width: '100%',
		alignItems: 'center',
		marginTop: 20,
	},
	buttonText: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: '600',
	},
});
