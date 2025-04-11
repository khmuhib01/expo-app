import {View, Text} from 'react-native';
import React from 'react';

export default function test() {
	return (
		<View>
			<View
				style={{
					width: 30,
					height: 2,
					backgroundColor: 'gray',
					borderRadius: 20,
					marginHorizontal: 'auto',
					marginTop: 4,
				}}
			/>
			<Text>test</Text>
		</View>
	);
}
