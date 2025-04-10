import React from 'react';
import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: true,
					title: 'Home',
					tabBarIcon: ({focused, color, size}) => (
						<Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="reservations"
				options={{
					headerShown: true,
					title: 'Reservation',
					tabBarIcon: ({focused, color, size}) => (
						<Ionicons name={focused ? 'book' : 'book-outline'} size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="menu"
				options={{
					headerShown: true,
					title: 'Menu',
					tabBarIcon: ({focused, color, size}) => (
						<Ionicons name={focused ? 'menu' : 'menu-outline'} size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
