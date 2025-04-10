import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

export default function ExampleScreen() {
	const {theme, toggleTheme} = useContext(ThemeContext);

	// Apply dynamic styles based on the current theme
	const containerStyle = [styles.container, {backgroundColor: theme === 'light' ? '#fff' : '#333'}];
	const textStyle = {color: theme === 'light' ? '#333' : '#fff'};

	return (
		<View style={containerStyle}>
			<Text style={[styles.text, textStyle]}>The current theme is {theme}</Text>
			<Button title="Toggle Theme" onPress={toggleTheme} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	text: {
		fontSize: 18,
		marginBottom: 16,
	},
});
