import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
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
import {getGuestReservationInfo} from './../../service/api';
import PopupModal from '../../components/PopupModal';

export default function TodaysReservation() {
	const [reservationsData, setReservationsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const [modalConfig, setModalConfig] = useState({
		visible: false,
		title: '',
		message: '',
		action: null,
		reservationId: null,
	});

	const route = useRoute();
	const passedData = route.params?.data || [];
	const router = useRouter();
	const storeUserId = useSelector((state) => state.auth?.user?.uuid);
	const storeRestaurantId = useSelector((state) => state.auth?.user?.res_uuid);

	const formatDate = (dateObj) => {
		const day = dateObj.getDate().toString().padStart(2, '0');
		const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const refreshReservations = async () => {
		try {
			setIsLoading(true);
			const response = await getGuestReservationInfo(storeRestaurantId);
			const reservations = response?.data?.data || [];
			const today = formatDate(new Date());

			// Filter to only show today's reservations
			const todayList = reservations.filter((res) => res.reservation_date === today);
			setReservationsData(todayList);
		} catch (error) {
			console.error('Error refreshing reservations:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (passedData && passedData.length > 0) {
			setReservationsData(passedData);
			setIsLoading(false);
		} else {
			refreshReservations();
		}
	}, [passedData]);

	const getFormattedTime = () => {
		const now = new Date();
		return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
			.getSeconds()
			.toString()
			.padStart(2, '0')}`;
	};

	const showConfirmationModal = (action, reservationId) => {
		const messages = {
			accept: {
				title: 'Confirm Acceptance',
				message: 'Are you sure you want to accept this reservation?',
			},
			reject: {
				title: 'Confirm Rejection',
				message: 'Are you sure you want to reject this reservation?',
			},
			cancel: {
				title: 'Confirm Cancellation',
				message: 'Are you sure you want to cancel this reservation?',
			},
			checkin: {
				title: 'Confirm Check-In',
				message: 'Are you sure you want to check in this guest?',
			},
			checkout: {
				title: 'Confirm Check-Out',
				message: 'Are you sure you want to check out this guest?',
			},
		};

		setModalConfig({
			visible: true,
			...messages[action],
			action,
			reservationId,
		});
	};

	const handleConfirmAction = async () => {
		try {
			setIsProcessing(true);
			const {action, reservationId} = modalConfig;
			let data;

			switch (action) {
				case 'accept':
					data = await getAcceptReservation(storeRestaurantId, reservationId, storeUserId);
					break;
				case 'reject':
					data = await getRejectReservation(storeRestaurantId, reservationId, storeUserId);
					break;
				case 'cancel':
					data = await getCancelReservation(storeRestaurantId, reservationId, storeUserId);
					break;
				case 'checkin':
					const checkInTime = getFormattedTime();
					data = await getCheckInReservation(storeRestaurantId, reservationId, checkInTime);
					break;
				case 'checkout':
					const checkOutTime = getFormattedTime();
					data = await getCheckOutReservation(storeRestaurantId, reservationId, checkOutTime);
					break;
				default:
					break;
			}

			console.log(`${action} successful:`, data);
			await refreshReservations();
		} catch (error) {
			console.error(`Error in ${modalConfig.action}:`, error);
		} finally {
			setIsProcessing(false);
			setModalConfig({...modalConfig, visible: false});
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
		<>
			<View style={styles.container}>
				<FlatList
					data={reservationsData}
					keyExtractor={(item) => item.uuid || item.id?.toString()}
					renderItem={({item}) => (
						<ReservationCard
							item={item}
							onAccept={() => showConfirmationModal('accept', item.uuid)}
							onReject={() => showConfirmationModal('reject', item.uuid)}
							onCancel={() => showConfirmationModal('cancel', item.uuid)}
							onCheckIn={() => showConfirmationModal('checkin', item.uuid)}
							onCheckOut={() => showConfirmationModal('checkout', item.uuid)}
							onView={() => handleViewPress(item)}
						/>
					)}
					contentContainerStyle={styles.listContainer}
				/>
			</View>

			<PopupModal
				isVisible={modalConfig.visible}
				onClose={() => !isProcessing && setModalConfig({...modalConfig, visible: false})}
				title={modalConfig.title}
				message={modalConfig.message}
				isLoading={isProcessing}
				loadingButtonIndex={1}
				buttons={[
					{
						text: 'Cancel',
						onPress: () => setModalConfig({...modalConfig, visible: false}),
						style: {backgroundColor: '#f44336'},
						textStyle: {fontSize: 16},
					},
					{
						text: 'Confirm',
						onPress: handleConfirmAction,
						style: {backgroundColor: '#4CAF50'},
						textStyle: {fontSize: 16},
					},
				]}
			/>
		</>
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
