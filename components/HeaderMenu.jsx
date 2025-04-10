import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function HeaderMenu({iconColor = '#fff'}) {
	const [menuVisible, setMenuVisible] = useState(false);

	const navigator = useNavigation();

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const handleOptionSelect = (option) => {
		console.log(`Selected ${option}`);
		if (option === 'Option 1') {
			// Add logout logic here
			navigator.navigate('auth/login');
		}
		setMenuVisible(false);
	};

	return (
		<View style={styles.container}>
			{/* Three-dot icon that toggles the menu */}
			<TouchableOpacity onPress={toggleMenu}>
				<Ionicons name="ellipsis-vertical" size={24} color={iconColor} />
			</TouchableOpacity>

			{/* Modal overlay for detecting taps outside the menu */}
			<Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
				<TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
					<View style={styles.modalOverlay}>
						{/* Stop propagation of touch events inside the menu */}
						<TouchableWithoutFeedback>
							<View style={styles.menuContainer}>
								<TouchableOpacity onPress={() => handleOptionSelect('Option 1')} style={styles.menuItem}>
									<Text style={styles.menuItemText}>Option 1</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => handleOptionSelect('Option 2')} style={styles.menuItem}>
									<Text style={styles.menuItemText}>Option 2</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => handleOptionSelect('Option 3')} style={styles.menuItem}>
									<Text style={styles.menuItemText}>Option 3</Text>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginRight: 16,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'transparent',
		// Align the menu near the top-right corner of the screen;
		// adjust these values as needed to position the menu relative to your header icon.
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	menuContainer: {
		marginTop: 50, // Adjust this so the menu appears just below your header icon
		marginRight: 10,
		backgroundColor: '#fff',
		borderRadius: 4,
		paddingVertical: 8,
		width: 150, // Suitable width for mobile screens
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		elevation: 5,
	},
	menuItem: {
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	menuItemText: {
		fontSize: 16,
		color: '#333',
	},
});
