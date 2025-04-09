import {View, Text} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="home" options={{headerShown: true, title: 'Home'}} />
			<Tabs.Screen name="reservations" options={{headerShown: true, title: 'Reservation'}} />
			<Tabs.Screen name="menu" options={{headerShown: true, title: 'menu'}} />
		</Tabs>
	);
}
