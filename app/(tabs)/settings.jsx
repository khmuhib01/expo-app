import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const MenuItem = ({icon, title, onPress, style}) => (
	<TouchableOpacity onPress={onPress} style={[styles.menuItem, style]}>
		<Ionicons name={icon} size={24} color="#333" />
		<Text style={styles.menuItemText}>{title}</Text>
	</TouchableOpacity>
);

export default function Settings() {
	// Replace these handlers with your actual navigation or functionality logic.
	const handlePress = (item) => {
		console.log(item + ' pressed');
	};

	const handleLogout = () => {
		console.log('Logout pressed');
		// Add logout logic here (e.g. clearing auth tokens, navigating to login screen, etc.)
	};

	return (
		<ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Menu</Text>
			</View>
			<View style={styles.menuContainer}>
				<MenuItem icon="person-outline" title="Profile" onPress={() => handlePress('Profile')} />
				<MenuItem icon="settings-outline" title="Settings" onPress={() => handlePress('Settings')} />
				<MenuItem icon="notifications-outline" title="Notifications" onPress={() => handlePress('Notifications')} />
				<MenuItem icon="help-circle-outline" title="Help" onPress={() => handlePress('Help')} />
				<MenuItem icon="information-circle-outline" title="About" onPress={() => handlePress('About')} />
				{/* Separator before Logout */}
				<View style={styles.separator} />
				<MenuItem icon="log-out-outline" title="Logout" onPress={handleLogout} style={styles.logoutItem} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3F3F3',
	},
	contentContainer: {
		padding: 16,
		paddingBottom: 32,
	},
	header: {
		paddingVertical: 16,
		alignItems: 'center',
	},
	headerText: {
		fontSize: 24,
		fontWeight: '700',
		color: '#333',
	},
	menuContainer: {
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingVertical: 8,
		// Shadow for Android
		elevation: 2,
		// Shadow for iOS
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	menuItemText: {
		fontSize: 16,
		marginLeft: 16,
		color: '#333',
	},
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginVertical: 8,
		marginHorizontal: 16,
	},
	logoutItem: {
		backgroundColor: '#ffe6e6',
	},
});
