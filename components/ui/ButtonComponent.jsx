// Button.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator, View} from 'react-native';

const ButtonComponent = ({title, onPress, style, textStyle, loading, ...props}) => {
	return (
		<TouchableOpacity
			style={[styles.button, style]}
			onPress={onPress}
			disabled={loading} // disables the button while loading
			{...props}
		>
			<View style={styles.contentContainer}>
				{loading && <ActivityIndicator color="#FFF" style={styles.loader} />}
				<Text style={[styles.buttonText, textStyle]}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#EF4444',
		paddingVertical: 15,
		borderRadius: 8,
		width: '100%',
		alignItems: 'center',
		marginTop: 20,
	},
	contentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loader: {
		marginRight: 8, // spacing between the loader and text
	},
	buttonText: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: '600',
	},
});

export default ButtonComponent;
