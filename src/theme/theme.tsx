import React from 'react';
import { ThemeProvider } from 'styled-components';

const baseTheme = {
	fontSizes: {
		xs: '0.8rem',
		s: '1rem',
		m: '1.2rem',
		l: '1.4rem',
		xl: '1.8rem',
	},
	colors: {
		main: ['#ffffff', '#f8f8f8'],
		gray: ['#ededed', '#d5d5d5', '#bdbdbd', '#828282'],
		text: ['#ffffff', '#002366', '#000000'],
		primary: ['#4961e1', '#354bc4'],
		secondary: ['#e5f2fC', '#f2f2f2'],
		positive: ['#35bea0', '#2a967e'],
		negative: ['#b80f0a', '#990c08'],
		alternate: ['#e0e0e0', '#d0d0d0'],
		error: '#ff8888',
	},
};

const theme = {
	...baseTheme,
	buttons: {
		primary: {
			color: baseTheme.colors.text[0],
			backgroundColor: baseTheme.colors.primary[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.primary[1],
			},
		},
		secondary: {
			backgroundColor: baseTheme.colors.main,
			color: baseTheme.colors.text[1],
			'&:hover': {
				backgroundColor: baseTheme.colors.secondary,
			},
		},
		positive: {
			backgroundColor: baseTheme.colors.positive[0],
			color: baseTheme.colors.text[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.positive[1],
			},
		},
		negative: {
			backgroundColor: baseTheme.colors.negative[0],
			color: baseTheme.colors.text[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.negative[1],
			},
		},
		alternate: {
			backgroundColor: baseTheme.colors.alternate[0],
			color: baseTheme.colors.text[1],
			'&:hover': {
				backgroundColor: baseTheme.colors.alternate[1],
			},
		},
	},
};

interface themeInterface {
	children: React.ReactNode;
}

function Theme({ children }: themeInterface) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
