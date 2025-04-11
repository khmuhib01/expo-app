import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getGuestReservationInfo} from '../../service/api';

export default function Home() {
	const [todaysReservations, setTodaysReservations] = useState([]);
	const [upcomingReservations, setUpcomingReservations] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();

	const storeUser = useSelector((state) => state.auth.user);

	const formatDate = (dateObj) => {
		const day = dateObj.getDate().toString().padStart(2, '0');
		const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const fetchReservationsInfo = useCallback(async () => {
		if (!storeUser?.res_uuid) return;

		try {
			setIsLoading(true);
			const response = await getGuestReservationInfo(storeUser.res_uuid);
			const reservations = response?.data?.data || [];
			const today = formatDate(new Date());

			const todayList = [];
			const upcomingList = [];

			reservations.forEach((res) => {
				if (res.reservation_date === today) {
					todayList.push(res);
				} else if (res.reservation_date > today) {
					upcomingList.push(res);
				}
			});

			setTodaysReservations(todayList);
			setUpcomingReservations(upcomingList);
		} catch (error) {
			console.error('Reservation error:', error.response?.data?.message || error.message);
		} finally {
			setIsLoading(false);
		}
	}, [storeUser?.res_uuid]);

	useEffect(() => {
		fetchReservationsInfo();
	}, [fetchReservationsInfo]);

	// 👇 Refresh when screen is focused
	useFocusEffect(
		useCallback(() => {
			fetchReservationsInfo();
		}, [fetchReservationsInfo])
	);

	const statsData = [
		{
			label: "Today's Reservations",
			data: todaysReservations,
			value: todaysReservations.length,
			icon: 'calendar',
			backgroundColor: '#B9CEF5',
			link: 'dashboard/todays-reservation',
		},
		{
			label: 'Upcoming Reservations',
			data: upcomingReservations,
			value: upcomingReservations.length,
			icon: 'checkmark-circle',
			backgroundColor: '#C6F6CF',
			link: 'dashboard/upcoming-reservation',
		},
	];

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#333" />
					<Text style={{marginTop: 10, color: '#666'}}>Loading Reservations...</Text>
				</View>
			) : (
				<View style={styles.statsContainer}>
					{statsData.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={[styles.card, {backgroundColor: item.backgroundColor}]}
							onPress={() =>
								navigation.navigate(item.link, {
									data: item.data,
								})
							}
						>
							<Ionicons name={item.icon} size={24} color="#333" style={{marginBottom: 8}} />
							<Text style={styles.cardValue}>{item.value}</Text>
							<Text style={styles.cardLabel}>{item.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 200,
	},
});
