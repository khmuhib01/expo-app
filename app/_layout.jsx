import React, {useContext, useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {Stack, useRouter} from 'expo-router';
import {store} from './../store/store';
import {ThemeContext} from '../context/ThemeContext';

function MainLayoutInner() {
	const {headerColor, headerTextColor, headerTextSize, headerButtonColor} = useContext(ThemeContext);
	const router = useRouter();
	// Assume your auth slice holds an "isAuthenticated" boolean flag in the Redux store.
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		// If the user is not authenticated, push them to the login screen.
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
			<Stack.Screen name="auth/login" options={{headerShown: true, title: 'Login'}} />
		</Stack>
	);
}

function MainLayout() {
	return (
		<Provider store={store}>
			<MainLayoutInner />
		</Provider>
	);
}

export default MainLayout;
