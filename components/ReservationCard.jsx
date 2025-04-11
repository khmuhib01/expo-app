// components/ReservationCard.jsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function ReservationCard({
	item,
	onAccept,
	onReject,
	onCancel,
	onCheckIn,
	onCheckOut,
	onView,
	loadingAction,
	showOnlyViewButton = false, // New prop
}) {
	// Utility function to check if a button for this item should show loading
	const isButtonLoading = (action) => {
		return loadingAction && loadingAction.reservationId === item.uuid && loadingAction.action === action;
	};

	return (
		<View style={styles.card}>
			<View style={styles.topRow}>
				<View style={styles.tableBadge}>
					<Text style={styles.badgeLabel}>TABLE</Text>
					<Text style={styles.badgeValue}>{item.table_master.table_name}</Text>
				</View>
				<View style={styles.infoContainer}>
					<View style={styles.infoRow}>
						<Ionicons name="people-outline" size={16} color="#555" style={styles.infoIcon} />
						<Text style={styles.infoText}>
							{item.number_of_people} Guest{item.number_of_people > 1 ? 's' : ''}
						</Text>
					</View>
					<View style={styles.infoRow}>
						<Ionicons name="time-outline" size={16} color="#555" style={styles.infoIcon} />
						<Text style={styles.infoText}>{item.reservation_time}</Text>
					</View>
					<View style={styles.infoRow}>
						<Ionicons name="calendar-outline" size={16} color="#555" style={styles.infoIcon} />
						<Text style={styles.infoText}>{item.reservation_date}</Text>
					</View>
					<View style={styles.infoRow}>
						<Ionicons name="flash-outline" size={16} color="#555" style={styles.infoIcon} />
						<Text
							style={[
								styles.infoText,
								item.status === 'Confirmed'
									? styles.confirmedText
									: item.status === 'Pending'
									? styles.pendingText
									: styles.cancelledText,
							]}
						>
							{item.status}
						</Text>
					</View>
				</View>
			</View>

			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonRow}>
				<TouchableOpacity style={[styles.button, styles.viewButton]} onPress={() => onView(item)}>
					<Text style={[styles.buttonText, styles.viewButtonText]}>View</Text>
				</TouchableOpacity>

				{!showOnlyViewButton && (
					<>
						{item.status === 'pending' && (
							<>
								<TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => onReject(item.uuid)}>
									<View style={styles.contentContainer}>
										{isButtonLoading('reject') ? <ActivityIndicator color="#FFF" style={styles.loader} /> : null}
										<Text style={[styles.buttonText, styles.rejectButtonText]}>Reject</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => onAccept(item.uuid)}>
									<View style={styles.contentContainer}>
										{isButtonLoading('accept') ? <ActivityIndicator color="#FFF" style={styles.loader} /> : null}
										<Text style={[styles.buttonText, styles.acceptButtonText]}>Accept</Text>
									</View>
								</TouchableOpacity>
							</>
						)}

						{item.status === 'confirmed' && (
							<>
								<TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => onCancel(item.uuid)}>
									<View style={styles.contentContainer}>
										{isButtonLoading('cancel') ? <ActivityIndicator color="#FFF" style={styles.loader} /> : null}
										<Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.button, styles.checkInButton]} onPress={() => onCheckIn(item.uuid)}>
									<View style={styles.contentContainer}>
										{isButtonLoading('checkin') ? <ActivityIndicator color="#FFF" style={styles.loader} /> : null}
										<Text style={[styles.buttonText, styles.checkInButtonText]}>Check In</Text>
									</View>
								</TouchableOpacity>
							</>
						)}

						{item.status === 'check_in' && (
							<TouchableOpacity style={[styles.button, styles.checkOutButton]} onPress={() => onCheckOut(item.uuid)}>
								<View style={styles.contentContainer}>
									{isButtonLoading('checkout') ? <ActivityIndicator color="#FFF" style={styles.loader} /> : null}
									<Text style={[styles.buttonText, styles.checkOutButtonText]}>Check Out</Text>
								</View>
							</TouchableOpacity>
						)}
					</>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	contentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
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
		paddingTop: 8,
		paddingBottom: 4,
	},
	button: {
		borderRadius: 4,
		borderWidth: 1,
		paddingVertical: 6,
		paddingHorizontal: 12,
		marginRight: 8,
	},
	buttonText: {
		fontWeight: '600',
		fontSize: 14,
	},
	viewButton: {
		borderColor: '#28a745',
		backgroundColor: '#E6F4EA',
	},
	viewButtonText: {
		color: '#1A7F3B',
	},
	acceptButton: {
		borderColor: '#28a745',
		backgroundColor: '#D1FAE5',
	},
	acceptButtonText: {
		color: '#065F46',
	},
	rejectButton: {
		borderColor: '#dc3545',
		backgroundColor: '#FEE2E2',
	},
	rejectButtonText: {
		color: '#991B1B',
	},
	cancelButton: {
		borderColor: '#dc3545',
		backgroundColor: '#FEF3C7',
	},
	cancelButtonText: {
		color: '#92400E',
	},
	checkInButton: {
		borderColor: '#0d6efd',
		backgroundColor: '#DBEAFE',
	},
	checkInButtonText: {
		color: '#1D4ED8',
	},
	checkOutButton: {
		borderColor: '#D97706',
		backgroundColor: '#FDE68A',
	},
	checkOutButtonText: {
		color: '#B45309',
	},
	loader: {
		marginRight: 4,
	},
});
