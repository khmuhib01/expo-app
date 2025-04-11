// app/dashboard/todays-reservation.jsx
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useRouter} from 'expo-router';
import {useSelector} from 'react-redux';
import ReservationCard from '../../components/ReservationCard';
import {
	getAcceptReservation,
	getCancelReservation,
	getCheckInReservation,
	getCheckOutReservation,
	getRejectReservation,
} from './../../service/api';

export default function TodaysReservation() {
	const route = useRoute();
	const passedData = route.params?.data || [];

	const [reservationsData, setReservationsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Instead of a boolean, use an object: { reservationId, action }
	const [loadingAction, setLoadingAction] = useState(null);

	const router = useRouter();
	const storeUserId = useSelector((state) => state.auth?.user?.uuid);
	const storeRestaurantId = useSelector((state) => state.auth?.user?.res_uuid);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setReservationsData(passedData);
			setIsLoading(false);
		}, 300);
		return () => clearTimeout(timeout);
	}, [passedData]);

	// Get current time in HH:mm:ss
	const getFormattedTime = () => {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	};

	const handleAcceptPress = async (reservationId) => {
		try {
			setLoadingAction({reservationId, action: 'accept'});
			const data = await getAcceptReservation(storeRestaurantId, reservationId, storeUserId);
			console.log('Accepted:', data);
			// Optionally, update the UI or refresh list here.
		} catch (error) {
			console.error('Error accepting reservation:', error);
			Alert.alert('Error', 'Something went wrong while accepting the reservation.');
		} finally {
			setLoadingAction(null);
		}
	};

	const handleRejectPress = async (reservationId) => {
		try {
			setLoadingAction({reservationId, action: 'reject'});
			const data = await getRejectReservation(storeRestaurantId, reservationId, storeUserId);
			console.log('Rejected:', data);
		} catch (error) {
			console.error('Error rejecting reservation:', error);
			Alert.alert('Error', 'Something went wrong while rejecting the reservation.');
		} finally {
			setLoadingAction(null);
		}
	};

	const handleCancelPress = async (reservationId) => {
		try {
			setLoadingAction({reservationId, action: 'cancel'});
			const data = await getCancelReservation(storeRestaurantId, reservationId, storeUserId);
			console.log('Cancelled:', data);
		} catch (error) {
			console.error('Error cancelling reservation:', error);
			Alert.alert('Error', 'Something went wrong while cancelling the reservation.');
		} finally {
			setLoadingAction(null);
		}
	};

	const handleCheckInPress = async (reservationId) => {
		try {
			setLoadingAction({reservationId, action: 'checkin'});
			const time = getFormattedTime();
			const data = await getCheckInReservation(storeRestaurantId, reservationId, time);
			console.log('Checked In:', data);
		} catch (error) {
			console.error('Error checking in:', error);
			Alert.alert('Error', 'Something went wrong while checking in.');
		} finally {
			setLoadingAction(null);
		}
	};

	const handleCheckOutPress = async (reservationId) => {
		try {
			setLoadingAction({reservationId, action: 'checkout'});
			const time = getFormattedTime();
			const data = await getCheckOutReservation(storeRestaurantId, reservationId, time);
			console.log('Checked Out:', data);
		} catch (error) {
			console.error('Error checking out:', error);
			Alert.alert('Error', 'Something went wrong while checking out.');
		} finally {
			setLoadingAction(null);
		}
	};

	const handleViewPress = (item) => {
		router.push({
			pathname: '/dashboard/[details]',
			params: {reservation: JSON.stringify(item)},
		});
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#333" />
				<Text style={styles.loadingText}>Loading reservations...</Text>
			</View>
		);
	}

	if (reservationsData.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>No reservations found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={reservationsData}
				keyExtractor={(item) => item.uuid || item.id?.toString()}
				renderItem={({item}) => (
					<ReservationCard
						item={item}
						handleAcceptPress={handleAcceptPress}
						handleRejectPress={handleRejectPress}
						handleCancelPress={handleCancelPress}
						handleCheckInPress={handleCheckInPress}
						handleCheckOutPress={handleCheckOutPress}
						handleViewPress={handleViewPress}
						loadingAction={loadingAction} // pass the object containing id & action
					/>
				)}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: '#F3F3F3'},
	listContainer: {paddingTop: 16, paddingHorizontal: 16, paddingBottom: 16},
	loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
	loadingText: {marginTop: 10, color: '#666'},
	emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
	emptyText: {color: '#888', fontSize: 16},
});
