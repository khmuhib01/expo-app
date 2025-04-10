// MainLayout.js (or inline within RootLayout.js if you prefer)
import React, {useContext} from 'react';
import {Stack} from 'expo-router';
import {Provider} from 'react-redux';
import {store} from './../store/store';
import {ThemeContext} from '../context/ThemeContext';

function MainLayout() {
	const {headerColor, headerTextColor, headerTextSize, headerButtonColor} = useContext(ThemeContext);

	const screenOptions = {
		headerStyle: {backgroundColor: headerColor},
		headerTitleStyle: {fontSize: headerTextSize, color: headerTextColor},
		headerTintColor: headerButtonColor,
	};

	return (
		<Provider store={store}>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen name="(tabs)" options={{headerShown: false, title: 'Table Bookings'}} />
				<Stack.Screen name="dashboard/todays-reservation" options={{headerShown: true, title: 'Todays Reservations'}} />
				<Stack.Screen
					name="dashboard/upcoming-reservation"
					options={{headerShown: true, title: 'Upcoming Reservations'}}
				/>
			</Stack>
		</Provider>
	);
}

export default MainLayout;
