// MainLayout.js
import React, {useContext, useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {Stack, useRouter} from 'expo-router';
import {store} from './../store/store';
import {ThemeContext} from '../context/ThemeContext';

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
		<Stack screenOptions={screenOptions} initialRouteName={isAuthenticated ? '(tabs)' : 'auth/login'}>
			<Stack.Screen name="(tabs)" options={{headerShown: false, title: 'Table Bookings'}} />
			<Stack.Screen name="auth/login" options={{headerShown: false, title: 'Login'}} />
			<Stack.Screen
				name="reservation/[details]"
				options={{
					presentation: 'formSheet',
					gestureDirection: 'vertical',
					animation: 'slide_from_bottom',
					sheetInitialDetentIndex: 0,
					sheetAllowedDetents: [0.5, 1.0],
				}}
			/>
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
