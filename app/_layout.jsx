// MainLayout.js
import React, {useContext, useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {Stack, useRouter} from 'expo-router';
import {store, persistor} from './../store/store';
import {ThemeContext} from '../context/ThemeContext';
import {PersistGate} from 'redux-persist/integration/react';

function MainLayoutInner() {
	const {headerColor, headerTextColor, headerTextSize, headerButtonColor} = useContext(ThemeContext);
	const router = useRouter();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		// When not authenticated, redirect to login screen
		if (!isAuthenticated) {
			router.push('/auth/login');
		}
	}, [isAuthenticated, router]);

	const screenOptions = {
		headerStyle: {backgroundColor: headerColor},
		headerTitleStyle: {fontSize: headerTextSize, color: headerTextColor},
		headerTintColor: headerButtonColor,
	};

	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name="(tabs)" options={{headerShown: false, title: 'Table Bookings'}} />
			<Stack.Screen name="dashboard/todays-reservation" options={{headerShown: true, title: "Today's Reservations"}} />
			<Stack.Screen
				name="dashboard/upcoming-reservation"
				options={{headerShown: true, title: 'Upcoming Reservations'}}
			/>
			<Stack.Screen name="auth/login" options={{headerShown: false, title: 'Login'}} />
		</Stack>
	);
}

function MainLayout() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<MainLayoutInner />
			</PersistGate>
		</Provider>
	);
}

export default MainLayout;
