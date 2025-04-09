import {View, Button} from 'react-native';
import React from 'react';
import {useNavigation} from 'expo-router';

export default function Home() {
	const navigator = useNavigation();
	return (
		<View>
			<Button title="Click me" onPress={() => navigator.navigate('test')} />
		</View>
	);
}
