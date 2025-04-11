import {View, Text} from 'react-native';
import React from 'react';
import {useLocalSearchParams} from 'expo-router';

export default function ReservationDetails() {
	const params = useLocalSearchParams();
	const reservation = params?.reservation ? JSON.parse(params.reservation) : null;

	console.log('Reservation', reservation);

	return (
		<View style={{padding: 20}}>
			<View
				style={{
					width: 30,
					height: 2,
					backgroundColor: 'gray',
					borderRadius: 20,
					marginBottom: 20,
					alignSelf: 'center',
				}}
			/>
			<Text style={{fontSize: 20, fontWeight: 'bold'}}>Reservation Details</Text>
			<Text>ID: {reservation?.reservation_id}</Text>
			<Text>Guests: {reservation?.number_of_people}</Text>
			<Text>Time: {reservation?.reservation_time}</Text>
			<Text>Date: {reservation?.reservation_date}</Text>
			<Text>Status: {reservation?.status}</Text>
		</View>
	);
}
