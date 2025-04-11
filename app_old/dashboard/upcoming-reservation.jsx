import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import ReservationCard from '../../components/ReservationCard';

export default function UpcomingReservation() {
	const route = useRoute();
	const passedData = route.params?.data || [];

	const [reservationsData, setReservationsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setReservationsData(passedData);
			setIsLoading(false);
		}, 300);

		return () => clearTimeout(timeout);
	}, [passedData]);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#333" />
					<Text style={styles.loadingText}>Loading upcoming reservations...</Text>
				</View>
			) : reservationsData.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No upcoming reservations found.</Text>
				</View>
			) : (
				<FlatList
					data={reservationsData}
					keyExtractor={(item) => item.uuid || item.id?.toString()}
					renderItem={({item}) => <ReservationCard item={item} />}
					contentContainerStyle={styles.listContainer}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3F3F3',
	},
	listContainer: {
		paddingTop: 16,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 10,
		color: '#666',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		color: '#888',
		fontSize: 16,
	},
});
