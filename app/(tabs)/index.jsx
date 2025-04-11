import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {useSelector} from 'react-redux';
import ReservationCard from '../../components/ReservationCard';
import {
	getAcceptReservation,
	getCancelReservation,
	getCheckInReservation,
	getCheckOutReservation,
	getRejectReservation,
	getGuestReservationInfo,
} from '../../service/api';
import PopupModal from '../../components/PopupModal';

export default function Home() {
	const [allReservations, setAllReservations] = useState([]);
	const [filteredReservations, setFilteredReservations] = useState([]);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [isListLoading, setIsListLoading] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [activeFilter, setActiveFilter] = useState('today');
	const [modalConfig, setModalConfig] = useState({
		visible: false,
		title: '',
		message: '',
		action: null,
		reservationId: null,
	});

	const router = useRouter();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
		const storeUserId = useSelector((state) => state.auth?.user?.uuid);
		const storeRestaurantId = useSelector((state) => state.auth?.user?.res_uuid);

		const formatDate = (dateObj) => {
			const day = dateObj.getDate().toString().padStart(2, '0');
			const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
			const year = dateObj.getFullYear();
			return `${day}/${month}/${year}`;
		};

		const parseDate = (dateString) => {
			const [day, month, year] = dateString.split('/').map(Number);
			return new Date(year, month - 1, day);
		};

		const getFormattedTime = () => {
			const now = new Date();
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		};

		const filterReservations = useCallback((reservations, filterType) => {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			return reservations.filter((res) => {
				try {
					const resDate = parseDate(res.reservation_date);
					if (filterType === 'today') {
						return resDate.getTime() === today.getTime();
					} else {
						return resDate > today;
					}
				} catch (e) {
					console.error('Error parsing date:', res.reservation_date, e);
					return false;
				}
			});
		}, []);

		const refreshReservations = useCallback(async () => {
			if (!isAuthenticated) {
				console.log('Not authenticated, skipping refresh');
				return;
			}

			try {
				setIsListLoading(true);
				const response = await getGuestReservationInfo(storeRestaurantId);
				const reservations = response?.data?.data || [];
				setAllReservations(reservations);
				const filtered = filterReservations(reservations, activeFilter);
				setFilteredReservations(filtered);
			} catch (error) {
				console.error('Error refreshing reservations:', error);
				if (error.response?.status === 401) {
					// Handle unauthorized error
					router.push('/auth/login');
				}
			} finally {
				setIsListLoading(false);
			}
		}, [storeRestaurantId, activeFilter, filterReservations, isAuthenticated, router]);

	const loadInitialData = useCallback(async () => {
		try {
			setIsInitialLoading(true);
			await refreshReservations();
		} finally {
			setIsInitialLoading(false);
		}
	}, [refreshReservations]);

	useEffect(() => {
		loadInitialData();
	}, [loadInitialData]);

	const handleFilterChange = async (filterType) => {
		try {
			setIsListLoading(true);
			setActiveFilter(filterType);
			const filtered = filterReservations(allReservations, filterType);
			setFilteredReservations(filtered);
		} finally {
			setIsListLoading(false);
		}
	};

	const getFilteredCounts = useCallback(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		let todayCount = 0;
		let upcomingCount = 0;

		allReservations.forEach((res) => {
			try {
				const resDate = parseDate(res.reservation_date);
				if (resDate.getTime() === today.getTime()) {
					todayCount++;
				} else if (resDate > today) {
					upcomingCount++;
				}
			} catch (e) {
				console.error('Error counting reservation:', res.reservation_date, e);
			}
		});

		return {todayCount, upcomingCount};
	}, [allReservations]);

	const {todayCount, upcomingCount} = getFilteredCounts();

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
			pathname: '/reservation/[details]',
			params: {reservation: JSON.stringify(item)},
		});
	};

	const renderContent = () => {
		if (isInitialLoading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#333" />
					<Text style={styles.loadingText}>Loading reservations...</Text>
				</View>
			);
		}

		if (isListLoading) {
			return (
				<View style={styles.listLoadingContainer}>
					<ActivityIndicator size="small" color="#333" />
				</View>
			);
		}

		if (filteredReservations.length === 0) {
			return (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>
						{activeFilter === 'today' ? 'No reservations for today' : 'No upcoming reservations'}
					</Text>
				</View>
			);
		}

		return (
			<FlatList
				data={filteredReservations}
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
						showOnlyViewButton={activeFilter === 'upcoming'}
					/>
				)}
				contentContainerStyle={styles.listContainer}
				refreshing={isListLoading}
				onRefresh={refreshReservations}
			/>
		);
	};

	return (
		<>
			<View style={styles.container}>
				{/* Filter tabs - always visible */}
				<View style={styles.filterContainer}>
					<TouchableOpacity
						style={[styles.filterButton, activeFilter === 'today' && styles.activeFilter]}
						onPress={() => handleFilterChange('today')}
					>
						<Text style={[styles.filterText, activeFilter === 'today' && styles.activeFilterText]}>
							Today's ({todayCount})
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.filterButton, activeFilter === 'upcoming' && styles.activeFilter]}
						onPress={() => handleFilterChange('upcoming')}
					>
						<Text style={[styles.filterText, activeFilter === 'upcoming' && styles.activeFilterText]}>
							Upcoming ({upcomingCount})
						</Text>
					</TouchableOpacity>
				</View>

				{/* Content area - changes based on state */}
				<View style={styles.contentContainer}>{renderContent()}</View>
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
	container: {
		flex: 1,
		backgroundColor: '#F3F3F3',
	},
	contentContainer: {
		flex: 1,
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 12,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	filterButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	activeFilter: {
		backgroundColor: '#EF4444',
	},
	filterText: {
		fontSize: 16,
		color: '#555',
		fontWeight: '500',
	},
	activeFilterText: {
		color: '#fff',
		fontWeight: '600',
	},
	listContainer: {
		paddingTop: 8,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listLoadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
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
