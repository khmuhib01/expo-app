import React, {useContext} from 'react';
import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {ThemeContext} from '../../context/ThemeContext';
import {TouchableOpacity} from 'react-native';
import HeaderMenu from '../../components/HeaderMenu';

export default function TabLayout() {
	const {headerColor, headerTextColor, headerTextSize, headerButtonColor} = useContext(ThemeContext);

	return (
		<Tabs
			screenOptions={{
				headerStyle: {backgroundColor: headerColor},
				headerTitleStyle: {fontSize: headerTextSize, color: headerTextColor},
				headerTintColor: headerButtonColor,
				headerRight: () => <HeaderMenu iconColor={headerButtonColor} />,
				tabBarStyle: {backgroundColor: headerColor},
				tabBarActiveTintColor: headerButtonColor,
				tabBarInactiveTintColor: '#fff',
				tabBarLabelStyle: {color: '#fff'},
				tabBarIconStyle: {color: '#fff'},
			}}
		>
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
				name="settings"
				options={{
					headerShown: true,
					title: 'Settings',
					tabBarIcon: ({focused, color, size}) => (
						<Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
