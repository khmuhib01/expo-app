import {Stack} from 'expo-router';
import {Provider} from 'react-redux';
import {store} from './../store/store';

export default function RootLayout() {
	console.log('RootLayout');
	return (
		<Provider store={store}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{headerShown: false, title: 'Table Bookings'}} />
				<Stack.Screen name="dashboard/todays-reservation" options={{headerShown: true, title: 'Todays Reservations'}} />
				<Stack.Screen
					name="dashboard/todays-confirmed-reservation"
					options={{headerShown: true, title: 'Todays Confirmed Reservations'}}
				/>
				<Stack.Screen
					name="dashboard/todays-cancelled-reservation"
					options={{headerShown: true, title: 'Todays Cancelled Reservations'}}
				/>
			</Stack>
		</Provider>
	);
}
