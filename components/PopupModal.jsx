import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, Animated} from 'react-native';

const FadeModal = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity: 0

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => setModalVisible(false));
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setModalVisible(true);
					fadeIn();
				}}
			>
				<Text style={styles.buttonText}>Open Modal</Text>
			</TouchableOpacity>

			<Modal
				animationType="fade" // This affects how the modal enters the screen
				transparent={true}
				visible={modalVisible}
				onRequestClose={fadeOut}
				onShow={fadeIn}
			>
				<Animated.View style={[styles.modalContainer, {opacity: fadeAnim}]}>
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>This is a fade popup modal!</Text>

						<TouchableOpacity style={styles.closeButton} onPress={fadeOut}>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#3498db',
		padding: 15,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	closeButton: {
		backgroundColor: '#e74c3c',
		padding: 10,
		borderRadius: 5,
	},
	closeButtonText: {
		color: 'white',
	},
});

export default FadeModal;
