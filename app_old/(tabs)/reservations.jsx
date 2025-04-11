import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {getGuestReservationInfo} from '../../service/api';
import {useSelector} from 'react-redux';
import ReservationCard from '../../components/ReservationCard';

const reservationsData = [
	{
		id: '1',
		table: 'T1',
		guests: 1,
		time: '10:00 AM',
		date: '10/04/2025',
		status: 'Confirmed',
	},
	{
		id: '2',
		table: 'T2',
		guests: 2,
		time: '11:00 AM',
		date: '10/04/2025',
		status: 'Pending',
	},
	{
		id: '3',
		table: 'T3',
		guests: 3,
		time: '12:00 PM',
		date: '10/04/2025',
		status: 'Cancelled',
	},
	{
		id: '4',
		table: 'T3',
		guests: 3,
		time: '12:00 PM',
		date: '10/04/2025',
		status: 'Cancelled',
	},
	{
		id: '5',
		table: 'T3',
		guests: 3,
		time: '12:00 PM',
		date: '10/04/2025',
		status: 'Cancelled',
	},
];

const filterOptions = ['Today', 'Upcoming', 'Checked In', 'Check Out'];

export default function Reservations() {
	const [selectedFilter, setSelectedFilter] = useState('Today');
	const [reservations, setReservations] = useState([]);

	const restaurantId = useSelector((state) => state.auth.user.res_uuid);

	const filteredData = reservationsData.filter((item) => {
		if (selectedFilter === 'Today') {
			return item.date === '10/04/2025';
		}
		if (selectedFilter === 'Upcoming') {
			return item.date !== '10/04/2025';
		}
		if (selectedFilter === 'Checked In') {
			return item.status === 'Confirmed';
		}
		if (selectedFilter === 'Check Out') {
			return item.status === 'Cancelled';
		}
		return true;
	});

	// Fetch reservations on component mount
	useEffect(() => {
		console.log('restaurantId', restaurantId);
		fetchReservations();
	}, []);

	const fetchReservations = async () => {
		try {
			const data = await getGuestReservationInfo(restaurantId);
			setReservations(data);
		} catch (error) {
			console.error('Error fetching reservations:', error);
		}
	};

	const renderItem = ({item}) => <ReservationCard item={item} />;

	const FilterBar = () => {
		return (
			<View style={styles.filterBar}>
				{filterOptions.map((option) => (
					<TouchableOpacity
						key={option}
						style={[styles.filterButton, selectedFilter === option && styles.activeFilterButton]}
						onPress={() => setSelectedFilter(option)}
					>
						<Text style={[styles.filterText, selectedFilter === option && styles.activeFilterText]}>{option}</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FilterBar />
			<FlatList
				data={filteredData}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3F3F3',
	},
	filterBar: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	filterButton: {
		marginLeft: 8,
		paddingVertical: 4,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
	},
	filterText: {
		fontSize: 14,
		color: '#555',
	},
	activeFilterButton: {
		backgroundColor: '#1A73E8',
		borderColor: '#1A73E8',
	},
	activeFilterText: {
		color: '#fff',
	},
	listContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		elevation: 2, // Android shadow
		shadowColor: '#000', // iOS shadow
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	topRow: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	tableBadge: {
		backgroundColor: '#E0ECFF',
		borderRadius: 6,
		padding: 8,
		marginRight: 12,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
	},
	badgeLabel: {
		fontSize: 10,
		color: '#888',
		marginBottom: 2,
	},
	badgeValue: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1A73E8',
	},
	infoContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	infoIcon: {
		marginRight: 4,
	},
	infoText: {
		fontSize: 14,
		color: '#333',
	},
	confirmedText: {
		color: '#28a745',
		fontWeight: '600',
	},
	pendingText: {
		color: '#FFA500',
		fontWeight: '600',
	},
	cancelledText: {
		color: '#dc3545',
		fontWeight: '600',
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	button: {
		borderRadius: 4,
		borderWidth: 1,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginRight: 8,
	},
	buttonText: {
		fontWeight: '600',
		fontSize: 14,
	},
	viewButton: {
		borderColor: '#28a745',
	},
	viewButtonText: {
		color: '#28a745',
	},
	cancelButton: {
		borderColor: '#dc3545',
	},
	cancelButtonText: {
		color: '#dc3545',
	},
	checkInButton: {
		borderColor: '#0d6efd',
	},
	checkInButtonText: {
		color: '#0d6efd',
	},
});
