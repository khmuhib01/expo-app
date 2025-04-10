// context/ThemeContext.js
import React, {createContext, useState, useEffect} from 'react';
import {Appearance} from 'react-native';

export const ThemeContext = createContext({
	theme: 'light',
	headerColor: '#C1272D',
	headerTextColor: '#fff',
	headerTextSize: 20,
	headerButtonColor: '#fff',
	toggleTheme: () => {},
});

const lightTheme = {
	theme: 'light',
	headerColor: '#C1272D',
	headerTextColor: '#fff',
	headerTextSize: 20,
	headerButtonColor: '#1A73E8',
};

const darkTheme = {
	theme: 'dark',
	headerColor: '#333',
	headerTextColor: '#fff',
	headerTextSize: 20,
	headerButtonColor: '#BB86FC',
};

export const ThemeProvider = ({children}) => {
	// Set the initial theme from the system setting.
	const colorScheme = Appearance.getColorScheme();
	const [currentTheme, setCurrentTheme] = useState(colorScheme === 'dark' ? darkTheme : lightTheme);

	// Toggle between light and dark themes.
	const toggleTheme = () => {
		setCurrentTheme((prevTheme) => (prevTheme.theme === 'light' ? darkTheme : lightTheme));
	};

	// Listen for system theme changes (optional).
	useEffect(() => {
		const subscription = Appearance.addChangeListener(({colorScheme}) => {
			setCurrentTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
		});
		return () => subscription.remove();
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				...currentTheme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
