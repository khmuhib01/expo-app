// components/ReservationCard.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function ReservationCard({item}) {
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
							{item.number_of_people} Guest{item.guests > 1 && 's'}
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

			<View style={styles.buttonRow}>
				<TouchableOpacity style={[styles.button, styles.viewButton]}>
					<Text style={[styles.buttonText, styles.viewButtonText]}>View</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.cancelButton]}>
					<Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.checkInButton]}>
					<Text style={[styles.buttonText, styles.checkInButtonText]}>Check In</Text>
				</TouchableOpacity>
			</View>
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
