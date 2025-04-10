import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Link} from 'expo-router';
import {store} from 'expo-router/build/global-state/router-store';
import {use} from 'react';

const statsData = [
	{
		label: "Today's Reservations",
		value: 'N/A',
		icon: 'calendar',
		backgroundColor: '#B9CEF5',
		link: 'dashboard/todays-reservation',
	},
	{
		label: 'Upcoming Reservations',
		value: 'N/A',
		icon: 'checkmark-circle',
		backgroundColor: '#C6F6CF',
		link: 'dashboard/upcoming-reservation',
	},
];

export default function Home() {
	const navigator = useNavigation();

	const storeUser = useSelector((state) => state.auth.user);
	const storeUserToken = useSelector((state) => state.auth.token);

	console.log('storeUser', storeUser);
	console.log('storeUserToken', storeUserToken);

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			<View style={styles.statsContainer}>
				{statsData.map((item, index) => (
					<TouchableOpacity
						key={index}
						style={[styles.card, {backgroundColor: item.backgroundColor}]}
						onPress={() => navigator.navigate(item.link)}
					>
						<Ionicons name={item.icon} size={24} color="#333" style={{marginBottom: 8}} />
						<Text style={styles.cardValue}>{item.value}</Text>
						<Text style={styles.cardLabel}>{item.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		padding: 16,
	},
	statsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	card: {
		width: '48%',
		borderRadius: 8,
		marginBottom: 16,
		paddingVertical: 16,
		paddingHorizontal: 12,
		alignItems: 'center',
	},
	cardValue: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	cardLabel: {
		fontSize: 14,
		textAlign: 'center',
	},
});
